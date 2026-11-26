// Signed result token for the trading style test.
// /api/style-test signs the result it just made. /api/subscribe checks the signature before it saves anything on the
// Buttondown subscriber, so nobody can post a fake result or someone else's words under Aayush's name.
// It carries the answer labels too, so the deep breakdown email can be written from their real answers.
// Format: base64url(JSON) + "." + base64url(HMAC SHA256). The secret is STYLE_TEST_SECRET (Vercel environment only).
import { createHmac, timingSafeEqual } from 'node:crypto';
import type { Flag, Style } from './styletest';

export interface TokenPayload {
  style: Style;
  lean: Style | null;
  current: Style | null;
  mismatch: boolean;
  percent: Record<Style, number>;
  flags: Flag[];
  labels: string[]; // [what they trade now, then one answer per question in the order of questions[]]
  name: string;
}

const sign = (body: string, secret: string) => createHmac('sha256', secret).update(body).digest('base64url');

export function signToken(payload: TokenPayload, secret: string): string {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${body}.${sign(body, secret)}`;
}

const isStyle = (s: unknown): s is Style => s === 'S' || s === 'I' || s === 'W';
const FLAGS = ['revenge', 'rulehop', 'boredom'];

export function verifyToken(token: unknown, secret: string | undefined): TokenPayload | null {
  if (!secret || typeof token !== 'string' || token.length > 8000) return null;
  const [body, sig, extra] = token.split('.');
  if (!body || !sig || extra !== undefined) return null;
  const want = Buffer.from(sign(body, secret));
  const got = Buffer.from(sig);
  if (want.length !== got.length || !timingSafeEqual(want, got)) return null;
  try {
    const p = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (!isStyle(p?.style) || (p.lean !== null && !isStyle(p.lean)) || (p.current !== null && !isStyle(p.current))) return null;
    if (typeof p.name !== 'string' || typeof p.mismatch !== 'boolean') return null;
    if (!Array.isArray(p.flags) || !p.flags.every((f: unknown) => typeof f === 'string' && FLAGS.includes(f))) return null;
    if (!Array.isArray(p.labels) || p.labels.length > 20 || !p.labels.every((l: unknown) => typeof l === 'string' && l.length <= 200)) return null;
    return p as TokenPayload;
  } catch {
    return null;
  }
}
