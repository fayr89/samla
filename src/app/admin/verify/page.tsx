import {redirect} from 'next/navigation';
import {consumeMagicLinkToken, setSessionCookie} from '@/lib/admin-auth';

export const metadata = {title: 'Admin · Verify'};
export const dynamic = 'force-dynamic';

export default async function VerifyPage({
  searchParams
}: {
  searchParams: Promise<{token?: string}>;
}) {
  const {token} = await searchParams;
  if (!token) redirect('/admin/login?error=Нет+токена');
  const email = consumeMagicLinkToken(token);
  if (!email) {
    redirect('/admin/login?error=Ссылка+истекла+или+недействительна');
  }
  await setSessionCookie(email);
  redirect('/admin');
}
