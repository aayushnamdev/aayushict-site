// Buttondown calls this on every "subscriber.confirmed" (webhook made through the API, 21 Nov 2026).
// If the subscriber came from a reel page (metadata.source is in leadMagnets), we send that reel's email once.
// No shared secret needed: we never trust the request body. We look the subscriber up in Buttondown ourselves,
// only send to confirmed subscribers, and mark metadata.sent_<source> so a repeat call sends nothing.
import type { APIRoute } from 'astro';
import { leadMagnets } from '../../config/email';

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
  const res = await fetch(`${api}/subscribers/${encodeURIComponent(id)}`, { headers });
  if (!res.ok) return ok('subscriber not found');
  const sub = await res.json();

  const source = String(sub?.metadata?.source ?? '');
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
