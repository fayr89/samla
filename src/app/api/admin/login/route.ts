import {NextResponse, type NextRequest} from 'next/server';
import {Resend} from 'resend';
import {adminEmail, createMagicLinkToken} from '@/lib/admin-auth';

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} env var missing.`);
  return v;
}

function origin(req: NextRequest): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host');
  const proto = req.headers.get('x-forwarded-proto') ?? 'https';
  return `${proto}://${host}`;
}

export async function POST(req: NextRequest) {
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

  const resend = new Resend(env('RESEND_API_KEY'));
  await resend.emails.send({
    from: env('EMAIL_FROM'),
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

  return redirectTo(req, '/admin/login', {sent: '1'});
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
