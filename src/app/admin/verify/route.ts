import {NextResponse, type NextRequest} from 'next/server';
import {consumeMagicLinkToken, setSessionCookie} from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.redirect(
      new URL('/admin/login?error=Нет+токена', req.url),
      {status: 303}
    );
  }

  let email: string | null = null;
  try {
    email = consumeMagicLinkToken(token);
  } catch (e) {
    console.error('Verify route: token check crashed:', e);
    const msg = e instanceof Error ? e.message : 'неизвестная ошибка';
    return NextResponse.redirect(
      new URL(`/admin/login?error=${encodeURIComponent('Ошибка сервера: ' + msg)}`, req.url),
      {status: 303}
    );
  }

  if (!email) {
    return NextResponse.redirect(
      new URL('/admin/login?error=Ссылка+истекла+или+недействительна', req.url),
      {status: 303}
    );
  }

  await setSessionCookie(email);
  return NextResponse.redirect(new URL('/admin', req.url), {status: 303});
}
