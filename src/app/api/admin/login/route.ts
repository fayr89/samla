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

    const allowed = adminEmail();
    if (email !== allowed) {
      console.warn(
        `[admin/login] email mismatch: got "${email}", expected "${allowed}"`
      );
      return redirectTo(req, '/admin/login', {
        error: `Этот email не разрешён в админке. Разрешён только ${allowed}.`
      });
    }

    const token = createMagicLinkToken(email);
    const link = `${origin(req)}/admin/verify?token=${encodeURIComponent(token)}`;

    const from = process.env.EMAIL_FROM!.trim();
    const resend = new Resend(process.env.RESEND_API_KEY!.trim());
    const result = await resend.emails.send({
      from,
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
      console.error('[admin/login] Resend error:', result.error);
      const err = result.error;
      const name = err.name ? `${err.name}: ` : '';
      return redirectTo(req, '/admin/login', {
        error: `Resend ${name}${err.message ?? 'не удалось отправить письмо'}`
      });
    }

    console.log(
      `[admin/login] magic link sent to ${email} from ${from} (id=${result.data?.id ?? 'unknown'})`
    );

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
