// Buttondown calls this on every "subscriber.confirmed" (webhook made through the API, 21 Nov 2026).
// If the subscriber came from a reel page (metadata.source is in leadMagnets), we send that reel's email once.
// No shared secret needed: we never trust the request body. We look the subscriber up in Buttondown ourselves,
// only send to confirmed subscribers, and mark metadata.sent_<source> so a repeat call sends nothing.
import type { APIRoute } from 'astro';
import { leadMagnets, upgradeAlert } from '../../config/email';

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
  // Runs on every confirm, whatever page they came from. Failures here never block the checklist.
  await checkUpgrade(headers).catch((err) => console.error('Upgrade alert check failed', err));

  const res = await fetch(`${api}/subscribers/${encodeURIComponent(id)}`, { headers });
  if (!res.ok) return ok('subscriber not found');
  const sub = await res.json();

  // Signups through Buttondown's own form (our fallback when the API limit is hit) may not keep metadata.
  // Then the page they came from tells us: a referrer on /gold means the gold reel.
  let source = String(sub?.metadata?.source ?? '');
  if (!source && /aayushict\.space\/gold\b/.test(String(sub?.referrer_url ?? ''))) source = 'gold-bounce';
  // During the gold reel push (until 28 Nov 2026), anyone who signs up on Buttondown's own page
  // (buttondown.com/aayushict, not through our API) is from the reel, so they get the checklist too.
  if (!source && sub?.source && sub.source !== 'api' && Date.now() < Date.parse('2026-11-28T00:00:00Z')) source = 'gold-bounce';
  const emailId = leadMagnets[source];
  if (!emailId) return ok('no lead magnet for this source');
  if (sub?.type !== 'regular') return ok('not confirmed');
  const flag = `sent_${source}`;
  if (sub?.metadata?.[flag]) return ok('already sent');

  // Mark first, so two calls at once cannot both send.
  const mark = await fetch(`${api}/subscribers/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ metadata: { ...sub.metadata, [flag]: new Date().toISOString() } }),
  });
  if (!mark.ok) {
    console.error('Buttondown mark failed', mark.status, await mark.text().catch(() => ''));
    return new Response('mark failed', { status: 502 }); // non 2xx so Buttondown retries
  }

  const send = await fetch(`${api}/subscribers/${encodeURIComponent(id)}/emails/${emailId}`, { method: 'POST', headers });
  if (!send.ok) {
    console.error('Buttondown send failed', send.status, await send.text().catch(() => ''));
    // Undo the mark so a retry can send it.
    await fetch(`${api}/subscribers/${encodeURIComponent(id)}`, { method: 'PATCH', headers, body: JSON.stringify({ metadata: sub.metadata ?? {} }) });
    return new Response('send failed', { status: 502 });
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
