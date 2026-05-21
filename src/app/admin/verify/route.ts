import {NextResponse, type NextRequest} from 'next/server';
import {consumeMagicLinkToken, setSessionCookie} from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token');
    if (!token) {
      return redirectTo(req, '/admin/login', {error: 'Нет токена'});
    }
    const email = consumeMagicLinkToken(token);
    if (!email) {
      return redirectTo(req, '/admin/login', {
        error: 'Ссылка истекла или недействительна'
      });
    }
    await setSessionCookie(email);
    return NextResponse.redirect(new URL('/admin', req.url), {status: 303});
  } catch (e) {
    console.error('Verify route crashed:', e);
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
