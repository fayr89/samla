import {NextResponse, type NextRequest} from 'next/server';
import {Resend} from 'resend';
import {adminEmail, createMagicLinkToken} from '@/lib/admin-auth';

const REQUIRED_ENV = ['ADMIN_EMAIL', 'AUTH_SECRET', 'RESEND_API_KEY', 'EMAIL_FROM'];

function missingEnv(): string[] {
  return REQUIRED_ENV.filter((k) => !process.env[k] || process.env[k]!.length === 0);
}

function origin(req: NextRequest): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host');
  const proto = req.headers.get('x-forwarded-proto') ?? 'https';
  return `${proto}://${host}`;
}

export async function POST(req: NextRequest) {
  try {
    const missing = missingEnv();
    if (missing.length > 0) {
      return redirectTo(req, '/admin/login', {
        error: `Не заданы env-переменные на Vercel: ${missing.join(', ')}`
      });
    }
    if ((process.env.AUTH_SECRET ?? '').length < 16) {
      return redirectTo(req, '/admin/login', {
        error: 'AUTH_SECRET слишком короткий (нужно ≥16 символов).'
      });
    }

    const form = await req.formData();
    const emailRaw = form.get('email');
    if (typeof emailRaw !== 'string') {
      return redirectTo(req, '/admin/login', {error: 'Введите email.'});
    }
    const email = emailRaw.trim().toLowerCase();

    // Always pretend success to avoid email enumeration leaks
    if (email !== adminEmail()) {
      return redirectTo(req, '/admin/login', {sent: '1'});
    }

    const token = createMagicLinkToken(email);
    const link = `${origin(req)}/admin/verify?token=${encodeURIComponent(token)}`;

    const resend = new Resend(process.env.RESEND_API_KEY!);
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: 'Вход в админку PROBOXы',
      text: `Откройте ссылку, чтобы войти (действует 15 минут):\n\n${link}\n\nЕсли не вы запрашивали — проигнорируйте это письмо.`,
      html: `
        <div style="font-family:system-ui,sans-serif;color:#0b1220;line-height:1.6;max-width:560px;margin:0 auto;padding:24px">
          <h1 style="font-size:20px;margin:0 0 12px">Вход в админку PROBOXы</h1>
          <p style="margin:0 0 20px;color:#475569">Нажмите кнопку, чтобы войти. Ссылка действует 15 минут.</p>
          <p style="margin:0 0 24px">
            <a href="${link}" style="display:inline-block;background:#0066ff;color:#fff;text-decoration:none;padding:12px 22px;border-radius:12px;font-weight:600">Войти</a>
          </p>
          <p style="margin:0;color:#64748b;font-size:13px">Если не вы запрашивали — проигнорируйте это письмо.</p>
        </div>
      `
    });
    if (result.error) {
      console.error('Resend error:', result.error);
      return redirectTo(req, '/admin/login', {
        error: `Resend: ${result.error.message ?? 'не удалось отправить письмо'}`
      });
    }

    return redirectTo(req, '/admin/login', {sent: '1'});
  } catch (e) {
    console.error('Login route crashed:', e);
    const msg = e instanceof Error ? e.message : 'неизвестная ошибка';
    return redirectTo(req, '/admin/login', {error: `Ошибка сервера: ${msg}`});
  }
}

function redirectTo(
  req: NextRequest,
  path: string,
  params: Record<string, string>
) {
  const url = new URL(path, req.url);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return NextResponse.redirect(url, {status: 303});
}
