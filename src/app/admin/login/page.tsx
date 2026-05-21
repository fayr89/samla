import {redirect} from 'next/navigation';
import {getSession} from '@/lib/admin-auth';
import {Input} from '@/components/ui/input';

export const metadata = {title: 'Admin · Вход'};

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{sent?: string; error?: string}>;
}) {
  const sp = await searchParams;
  if (await getSession()) redirect('/admin');

  const sent = sp.sent === '1';
  const error = sp.error;

  return (
    <main className="min-h-screen flex items-center justify-center bg-muted p-6">
      <div className="w-full max-w-md bg-background border border-border rounded-2xl shadow-sm p-8">
        <h1 className="font-display text-2xl font-extrabold mb-2">Admin</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Введите email администратора — пришлём ссылку для входа.
        </p>

        {sent ? (
          <div className="rounded-xl bg-success/10 border border-success/30 text-success-foreground p-4 text-sm">
            <p className="font-semibold text-success">Ссылка отправлена.</p>
            <p className="text-foreground mt-1">
              Проверьте почту. Ссылка действует 15 минут.
            </p>
          </div>
        ) : (
          <form action="/api/admin/login" method="post" className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Email
              </label>
              <Input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                autoComplete="email"
                autoFocus
              />
            </div>
            {error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : null}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary text-white font-semibold hover:bg-[#0052cc] transition"
            >
              Прислать ссылку
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
