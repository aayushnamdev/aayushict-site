// Email signup. The form posts here and this adds the person to Buttondown with the private API key.
// The key lives in .env and in Vercel's environment settings only. It never reaches the browser.
// Works with JavaScript (replies with JSON) and without it (redirects back to the page).
import type { APIRoute } from 'astro';

export const prerender = false;

const reply = (request: Request, ok: boolean, message: string, status: number) => {
  if ((request.headers.get('accept') ?? '').includes('application/json')) {
    return new Response(JSON.stringify({ ok, message }), { status, headers: { 'content-type': 'application/json' } });
  }
  const back = request.headers.get('referer') ?? '/';
  const url = new URL(back, request.url);
  url.searchParams.set('subscribed', ok ? '1' : '0');
  return new Response(null, { status: 303, headers: { location: url.pathname + url.search } });
};

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  // A filled honeypot means a bot. Say it worked and do nothing.
  if (String(form.get('website') ?? '')) return reply(request, true, 'ok', 200);

  const email = String(form.get('email') ?? '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return reply(request, false, 'Please enter a valid email.', 400);

  const key = import.meta.env.BUTTONDOWN_API_KEY;
  if (!key) return reply(request, false, 'Signup is not set up yet.', 500);

  try {
    const res = await fetch('https://api.buttondown.com/v1/subscribers', {
      method: 'POST',
      headers: { Authorization: `Token ${key}`, 'Content-Type': 'application/json' },
      // "unactivated" keeps double opt-in: they get a confirmation email first.
      body: JSON.stringify({ email_address: email, type: 'unactivated', tags: ['website'] }),
    });
    if (res.ok) return reply(request, true, 'ok', 200);
    const body = await res.json().catch(() => ({}));
    // Already on the list counts as success. Nobody needs to know.
    if (res.status === 400 && /already|exists/i.test(JSON.stringify(body))) return reply(request, true, 'ok', 200);
    console.error('Buttondown error', res.status, JSON.stringify(body));
    return reply(request, false, 'That did not go through.', 502);
  } catch (err) {
    console.error('Buttondown request failed', err);
    return reply(request, false, 'That did not go through.', 502);
  }
};
