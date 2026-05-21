import {createHmac, timingSafeEqual} from 'crypto';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

const COOKIE_NAME = 'admin_session';
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours
const LINK_TTL = 60 * 15; // 15 minutes for the magic-link token

type TokenPayload = {email: string; exp: number};

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 16) {
    throw new Error('AUTH_SECRET env var missing or too short (>=16 chars).');
  }
  return s;
}

function sign(payload: TokenPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = createHmac('sha256', secret()).update(body).digest('base64url');
  return `${body}.${sig}`;
}

function verify(token: string): TokenPayload | null {
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  let expected: string;
  try {
    expected = createHmac('sha256', secret()).update(body).digest('base64url');
  } catch {
    return null;
  }
  if (
    expected.length !== sig.length ||
    !timingSafeEqual(Buffer.from(expected), Buffer.from(sig))
  ) {
    return null;
  }
  let payload: TokenPayload;
  try {
    payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
  if (typeof payload.email !== 'string' || typeof payload.exp !== 'number') return null;
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

export function adminEmail(): string {
  const e = process.env.ADMIN_EMAIL?.trim();
  if (!e) throw new Error('ADMIN_EMAIL env var missing.');
  return e.toLowerCase();
}

export function createMagicLinkToken(email: string): string {
  return sign({
    email: email.toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + LINK_TTL
  });
}

export function consumeMagicLinkToken(token: string): string | null {
  const p = verify(token);
  if (!p) return null;
  let allowed: string;
  try {
    allowed = adminEmail();
  } catch {
    return null;
  }
  if (p.email !== allowed) return null;
  return p.email;
}

export async function setSessionCookie(email: string): Promise<void> {
  const token = sign({
    email: email.toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE
  });
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE
  });
}

export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getSession(): Promise<{email: string} | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const p = verify(token);
  if (!p) return null;
  let allowed: string;
  try {
    allowed = adminEmail();
  } catch {
    return null;
  }
  if (p.email !== allowed) return null;
  return {email: p.email};
}

export async function requireSession(): Promise<{email: string}> {
  const s = await getSession();
  if (!s) redirect('/admin/login');
  return s;
}
