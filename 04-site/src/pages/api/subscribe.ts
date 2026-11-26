// Email signup. The form posts here and this adds the person to Buttondown with the private API key.
// The key lives in .env and in Vercel's environment settings only. It never reaches the browser.
// Works with JavaScript (replies with JSON) and without it (redirects back to the page).
import type { APIRoute } from 'astro';
import { leadMagnets } from '../../config/email';

export const prerender = false;

// Where a signup came from. Saved as a Buttondown tag so he can email only the people who asked for a post.
// gold-bounce: the gold bounce reel (/gold). A Buttondown automation sends the checklist when they confirm.
const sources = ['website', 'home', 'start-here', 'about', 'how-i-trade', 'gold-bounce', 'style-test'];
// Tags that already exist in Buttondown. The free plan cannot create new ones, and an unknown tag fails the signup.
// Every source is also saved as metadata.source, which works on any plan.
const tagged = ['home', 'start-here', 'about', 'how-i-trade'];

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
        metadata: { source },
        ...(ipOk ? { ip_address: ip } : {}),
      }),
    });
    if (res.ok) return reply(request, true, 'ok', 200);
    const body = await res.json().catch(() => ({}));
    // Already on the list counts as success. Nobody needs to know.
    // But Buttondown sends nothing in that case, so we do it: resend the confirm email if they never confirmed,
    // or send the reel's email straight away if they are already a confirmed reader.
    if (res.status === 400 && /already|exists/i.test(JSON.stringify(body))) {
      await existing(key, email, source).catch((err) => console.error('Existing subscriber follow up failed', err));
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
async function existing(key: string, email: string, source: string) {
  const headers = { Authorization: `Token ${key}`, 'Content-Type': 'application/json' };
  const res = await fetch(`${api}/subscribers/${encodeURIComponent(email)}`, { headers });
  if (!res.ok) return;
  const sub = await res.json();
  const emailId = leadMagnets[source];
  const meta = { ...(sub.metadata ?? {}) };
  if (sub.type === 'unactivated') {
    // Save the latest source so the confirm hook sends the right email, then resend the confirm email.
    if (emailId) await fetch(`${api}/subscribers/${sub.id}`, { method: 'PATCH', headers, body: JSON.stringify({ metadata: { ...meta, source } }) });
    await fetch(`${api}/subscribers/${sub.id}/send-reminder`, { method: 'POST', headers });
    return;
  }
  if (sub.type === 'regular' && emailId && !meta[`sent_${source}`]) {
    await fetch(`${api}/subscribers/${sub.id}`, { method: 'PATCH', headers, body: JSON.stringify({ metadata: { ...meta, [`sent_${source}`]: new Date().toISOString() } }) });
    await fetch(`${api}/subscribers/${sub.id}/emails/${emailId}`, { method: 'POST', headers });
  }
}
