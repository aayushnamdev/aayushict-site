// Email signup. The form posts here and this adds the person to Buttondown with the private API key.
// The key lives in .env and in Vercel's environment settings only. It never reaches the browser.
// Works with JavaScript (replies with JSON) and without it (redirects back to the page).
import type { APIRoute } from 'astro';
import { leadMagnets, leadMagnetNeeds } from '../../config/email';
import { styleName, styleTitle } from '../../lib/styletest';
import { deepBreakdown } from '../../lib/deepbreakdown';
import { verifyToken } from '../../lib/styletoken';

export const prerender = false;

// Where a signup came from. Saved as a Buttondown tag so he can email only the people who asked for a post.
// gold-bounce: the gold bounce reel (/gold). A Buttondown automation sends the checklist when they confirm.
const sources = ['website', 'home', 'start-here', 'about', 'how-i-trade', 'gold-bounce', 'style-test'];
// Tags that already exist in Buttondown. The free plan cannot create new ones, and an unknown tag fails the signup.
// Every source is also saved as metadata.source, which works on any plan.
const tagged = ['home', 'start-here', 'about', 'how-i-trade'];

// The style test result, saved on the subscriber so the confirm email can show it (Buttondown metadata, used as
// {{ subscriber.metadata.st_title }} and so on in the email). Only saved when the signed token checks out.
// The deep breakdown is written here by Claude from their real answers (or the fixed text for their style if that fails).
// Every field is capped, and angle brackets are removed. A whole result is about 3 KB. Buttondown took a 40,000 character value in a test.
const line = (s: string, n: number) => s.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, n);
type Meta = Record<string, string | string[]>;
async function resultMetadata(token: unknown): Promise<Meta> {
  const secret = import.meta.env.STYLE_TEST_SECRET ?? (globalThis as any).process?.env?.STYLE_TEST_SECRET;
  const p = verifyToken(token, secret);
  if (!p) return {};
  const { deep, ai, why } = await deepBreakdown(p);
  return {
    st_style: styleName[p.style],
    st_title: styleTitle[p.style],
    st_lean: p.lean ? styleName[p.lean] : '',
    st_mismatch_line: p.mismatch && p.current ? `You trade ${styleTitle[p.current]} right now. That might explain a lot.` : '',
    st_name: line(p.name, 24),
    st_head: deep.head.slice(0, 4).map((b) => line(b, 400)),
    st_chart: deep.chart.slice(0, 3).map((b) => line(b, 400)),
    st_work: deep.work.slice(0, 3).map((b) => line(b, 200)),
    st_question: line(deep.question, 240),
    st_ai: ai ? 'yes' : why ? `no ${why}` : 'no',
  };
}

// Writing the breakdown costs an AI call, so signups that carry a result are limited per IP (in memory, per server instance).
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  if (recent.length >= 5) { hits.set(ip, recent); return true; }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const reply = (request: Request, ok: boolean, message: string, status: number) => {
  if ((request.headers.get('accept') ?? '').includes('application/json')) {
    return new Response(JSON.stringify({ ok, message }), { status, headers: { 'content-type': 'application/json' } });
  }
  const back = request.headers.get('referer') ?? '/';
  const url = new URL(back, request.url);
  url.searchParams.set('subscribed', ok ? '1' : '0');
  return new Response(null, { status: 303, headers: { location: url.pathname + url.search } });
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const form = await request.formData();
  // A filled honeypot means a bot. Say it worked and do nothing.
  if (String(form.get('website') ?? '')) return reply(request, true, 'ok', 200);

  const email = String(form.get('email') ?? '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return reply(request, false, 'Please enter a valid email.', 400);

  const asked = String(form.get('source') ?? 'website');
  const source = sources.includes(asked) ? asked : 'website';

  // A bad or missing token just means no result is saved. The signup goes ahead.
  const fwdFor = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || clientAddress || 'unknown';
  const result: Meta = source === 'style-test' && form.get('token') && !limited(fwdFor) ? await resultMetadata(form.get('token')) : {};

  const key = import.meta.env.BUTTONDOWN_API_KEY;
  if (!key) return reply(request, false, 'Signup is not set up yet.', 500);

  // The reader's own IP. Without it Buttondown's firewall only sees Vercel's server IP for every signup and blocks them.
  const fwd = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim();
  const ip = fwd || clientAddress || '';
  const ipOk = /^[\d.]{7,15}$|^[0-9a-f:]{2,39}$/i.test(ip);

  try {
    const res = await fetch('https://api.buttondown.com/v1/subscribers', {
      method: 'POST',
      headers: { Authorization: `Token ${key}`, 'Content-Type': 'application/json' },
      // "unactivated" keeps double opt-in: they get a confirmation email first.
      body: JSON.stringify({
        email_address: email,
        type: 'unactivated',
        tags: tagged.includes(source) ? ['website', source] : ['website'],
        metadata: { source, ...result },
        ...(ipOk ? { ip_address: ip } : {}),
      }),
    });
    if (res.ok) return reply(request, true, 'ok', 200);
    const body = await res.json().catch(() => ({}));
    // Already on the list counts as success. Nobody needs to know.
    // But Buttondown sends nothing in that case, so we do it: resend the confirm email if they never confirmed,
    // or send the reel's email straight away if they are already a confirmed reader.
    if (res.status === 400 && /already|exists/i.test(JSON.stringify(body))) {
      await existing(key, email, source, result).catch((err) => console.error('Existing subscriber follow up failed', err));
      return reply(request, true, 'ok', 200);
    }
    console.error('Buttondown error', res.status, JSON.stringify(body));
    return reply(request, false, 'That did not go through.', 502);
  } catch (err) {
    console.error('Buttondown request failed', err);
    return reply(request, false, 'That did not go through.', 502);
  }
};

const api = 'https://api.buttondown.com/v1';
async function existing(key: string, email: string, source: string, result: Meta) {
  const headers = { Authorization: `Token ${key}`, 'Content-Type': 'application/json' };
  const res = await fetch(`${api}/subscribers/${encodeURIComponent(email)}`, { headers });
  if (!res.ok) return;
  const sub = await res.json();
  const emailId = leadMagnets[source];
  const meta = { ...(sub.metadata ?? {}) };
  if (sub.type === 'unactivated') {
    // Save the latest source so the confirm hook sends the right email, then resend the confirm email.
    if (emailId) await fetch(`${api}/subscribers/${sub.id}`, { method: 'PATCH', headers, body: JSON.stringify({ metadata: { ...meta, source, ...result } }) });
    await fetch(`${api}/subscribers/${sub.id}/send-reminder`, { method: 'POST', headers });
    return;
  }
  if (sub.type === 'regular') {
    // Already confirmed. Keep their latest result on file, and send the email once if it has not been sent.
    const need = leadMagnetNeeds[source];
    const next: Record<string, unknown> = { ...meta, ...result };
    const send = !!emailId && !meta[`sent_${source}`] && (!need || !!next[need]);
    const flag = `sent_${source}`;
    const before = { ...meta, ...result };
    if (send) next[flag] = new Date().toISOString();
    // Mark first, so two calls at once cannot both send.
    if (send || Object.keys(result).length) await fetch(`${api}/subscribers/${sub.id}`, { method: 'PATCH', headers, body: JSON.stringify({ metadata: next }) });
    if (send) {
      const res = await fetch(`${api}/subscribers/${sub.id}/emails/${emailId}`, { method: 'POST', headers });
      if (!res.ok) {
        // Same as the confirm hook: if the send failed, take the sent flag off so a later try can send it.
        console.error('Buttondown send failed', res.status, await res.text().catch(() => ''));
        await fetch(`${api}/subscribers/${sub.id}`, { method: 'PATCH', headers, body: JSON.stringify({ metadata: before }) });
      }
    }
  }
}
