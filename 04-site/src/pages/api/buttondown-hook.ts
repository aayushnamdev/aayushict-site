// Buttondown calls this on every "subscriber.confirmed" (webhook made through the API, 21 Nov 2026).
// One rule (src/lib/leadmagnet.ts): metadata.source "style-test" gets the style test result email, everyone else who confirms gets the
// reel welcome email until it ends on 4 Dec 2026. We send that email once.
// No shared secret needed: we never trust the request body. We look the subscriber up in Buttondown ourselves
// and only send to confirmed subscribers.
// Calls per confirm: 2 (read the subscriber, send). Buttondown refuses a second send of the same email to the same
// person ("EMAIL_ALREADY_SENT"), so that is the once-only guard and a repeat call is safe. No flag has to be written.
import type { APIRoute } from 'astro';
import { leadMagnets, leadMagnetNeeds, upgradeAlert } from '../../config/email';
import { sourceFor } from '../../lib/leadmagnet';

export const prerender = false;

const api = 'https://api.buttondown.com/v1';
const ok = (note: string) => new Response(JSON.stringify({ ok: true, note }), { status: 200, headers: { 'content-type': 'application/json' } });

// The payload is { event_type, data: { subscriber: "<id>" } }. Accept a few shapes so a format change does not break it.
const findId = (body: any): string | null => {
  const d = body?.data ?? body;
  const s = d?.subscriber ?? d?.subscriber_id ?? d?.id;
  if (typeof s === 'string') return s;
  if (s && typeof s.id === 'string') return s.id;
  return null;
};

export const POST: APIRoute = async ({ request }) => {
  const key = import.meta.env.BUTTONDOWN_API_KEY;
  if (!key) return new Response('not set up', { status: 500 });
  const body = await request.json().catch(() => null);
  const id = findId(body);
  if (!id || !/^[\w-]{1,80}$/.test(id)) return ok('no subscriber id');

  const headers = { Authorization: `Token ${key}`, 'Content-Type': 'application/json' };
  // The upgrade check costs 2 calls, and the count only has to be roughly right, so it runs on about 1 in 10 confirms.
  if (Math.random() < 0.1) await checkUpgrade(headers).catch((err) => console.error('Upgrade alert check failed', err));

  const res = await fetch(`${api}/subscribers/${encodeURIComponent(id)}`, { headers });
  if (!res.ok) return ok('subscriber not found');
  const sub = await res.json();

  const source = sourceFor(sub);
  const emailId = leadMagnets[source];
  if (!emailId) return ok('no lead magnet for this source');
  if (sub?.type !== 'regular') return ok('not confirmed');
  // The style test email is made from the saved result. Signed up without one: nothing to send.
  const need = leadMagnetNeeds[source];
  if (need && !sub?.metadata?.[need]) return ok('no result saved');

  const send = await fetch(`${api}/subscribers/${encodeURIComponent(id)}/emails/${emailId}`, { method: 'POST', headers });
  if (!send.ok) {
    const text = await send.text().catch(() => '');
    if (send.status === 400 && /EMAIL_ALREADY_SENT|already received/i.test(text)) return ok('already sent');
    console.error('Buttondown send failed', send.status, text);
    return new Response('send failed', { status: 502 }); // non 2xx so Buttondown retries
  }
  return ok('sent');
};

// Emails Aayush once when confirmed subscribers reach the threshold, so he upgrades before the free plan limit.
async function checkUpgrade(headers: Record<string, string>) {
  const { threshold, emailId, ownerSubscriberId: owner } = upgradeAlert;
  const res = await fetch(`${api}/subscribers?type=regular&page_size=1`, { headers });
  if (!res.ok) return;
  const count = Number((await res.json())?.count ?? 0);
  if (count < threshold) return;
  const me = await fetch(`${api}/subscribers/${owner}`, { headers });
  if (!me.ok) return;
  const meta = (await me.json())?.metadata ?? {};
  const flag = `alert_${threshold}`;
  if (meta[flag]) return;
  await fetch(`${api}/subscribers/${owner}`, { method: 'PATCH', headers, body: JSON.stringify({ metadata: { ...meta, [flag]: `${count} on ${new Date().toISOString()}` } }) });
  await fetch(`${api}/subscribers/${owner}/emails/${emailId}`, { method: 'POST', headers });
}
