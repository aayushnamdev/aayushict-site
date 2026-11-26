// Trading style test result. The page posts the answers here.
// 1. Code scores them (src/lib/styletest.ts). The style is decided here, never by the AI.
// 2. Claude writes a short personal note from their exact answers.
// 3. The response is logged to a Google Sheet through an Apps Script webhook.
// Keys live in Vercel's environment settings only: ANTHROPIC_API_KEY, SHEET_WEBHOOK_URL, optional STYLE_TEST_MODEL.
// If the AI or the sheet fails, the person still gets their result with the fixed note.
import type { APIRoute } from 'astro';
import { current, questions, score, styleCopy, styleName, type Result } from '../../lib/styletest';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

const env = (k: string): string | undefined =>
  (import.meta.env as Record<string, string | undefined>)[k] ?? (globalThis as any).process?.env?.[k];

const flagText: Record<string, string> = {
  revenge: 'After losing days they feel they must win it back (revenge trading risk).',
  rulehop: 'After 3 losses they change their target or stop right away (they keep rewriting their system).',
  boredom: 'When down and bored they start seeing setups that are not there (forcing trades).',
};

const system = `You write a short personal result for a trading style test made by Aayush (@aayush_ict), a funded Nasdaq futures scalper with a Master's in Psychology.
Readers are retail traders, mostly India and Africa, many trade gold on MT5, many are not native English speakers.

The code has ALREADY decided their style. Never change it, never suggest a different main style.

Voice: Aayush talking to a friend. Speak to "you". Simple words, short sentences of about 9 to 13 words. Warm, direct, never preachy.
Use at most 2 psychology terms, and explain each inside the same sentence in everyday words (for example: "your tilt threshold, simply how many losses you can take before your decisions change").
Refer to 2 or 3 of their actual answers so it feels personal. Do not quote the questions.
If they trade a different style now, explain the mismatch kindly: what in their answers clashes with how they trade now.
If warning signs are listed, name the most important one gently.
No em dashes, no hyphens as connectors, no emoji, no hashtags, no markdown. No trade calls, no promises of profit. Not a diagnosis.

Return ONLY JSON: {"note": string, "tips": [string, string, string]}
"note": 2 short paragraphs separated by a blank line, 70 to 95 words in total.
"tips": 2 or 3 practical things to work on, each under 16 words.
Whole result must stay under 150 words.`;

// `why` receives a short failure reason (an HTTP status or a word). It goes in the Sheet's ai column, never to the visitor.
async function writeNote(r: Result, labels: string[], name: string, why: { v: string }) {
  const key = env('ANTHROPIC_API_KEY');
  if (!key) { why.v = 'nokey'; return null; }
  const model = env('STYLE_TEST_MODEL') || 'claude-haiku-5-5';
  const lines = [
    name ? `Name: ${name}` : 'Name: not given',
    `Main style (decided): ${styleName[r.style]}${r.lean ? `, close second: ${styleName[r.lean]}` : ''}`,
    `Scores: Scalper ${r.percent.S}%, Intraday ${r.percent.I}%, Swing ${r.percent.W}%`,
    `Trades now: ${labels[0]}${r.mismatch ? ' (MISMATCH with their result)' : ''}`,
    'Their answers:',
    ...questions.map((q, i) => `- ${q.text} -> ${labels[i + 1]}`),
    'Warning signs: ' + (r.flags.length ? r.flags.map((f) => flagText[f]).join(' ') : 'none'),
  ].join('\n');

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: ctrl.signal,
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model, max_tokens: 1500, thinking: { type: 'disabled' }, system, messages: [{ role: 'user', content: lines }] }),
    });
    if (!res.ok) {
      console.error('Style test AI error', res.status, await res.text().catch(() => ''));
      why.v = String(res.status);
      return null;
    }
    const data = await res.json();
    const blocks: any[] = Array.isArray(data?.content) ? data.content : [];
    const text: string = blocks.filter((c) => c.type === 'text').map((c) => String(c.text ?? '')).join('\n');
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) { why.v = `noparse ${data?.stop_reason ?? ''} ${blocks.map((c) => c.type).join('+')}`.trim(); return null; }
    const out = JSON.parse(match[0]);
    // Clean up anything that breaks the house style.
    const clean = (s: unknown) => String(s ?? '').replace(/\s*[—–]\s*/g, ', ').replace(/[*#]/g, '').trim();
    const note = clean(out.note);
    const tips = Array.isArray(out.tips) ? out.tips.map(clean).filter(Boolean).slice(0, 3) : [];
    if (note.split(/\s+/).length < 30 || tips.length < 2) { why.v = 'short'; return null; }
    return { note, tips };
  } catch (err) {
    console.error('Style test AI failed', err);
    why.v = 'exception';
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function logRow(row: Record<string, unknown>) {
  const url = env('SHEET_WEBHOOK_URL');
  if (!url) return;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 6000);
  try {
    // Apps Script answers with a redirect. Following it is fine, we ignore the body.
    await fetch(url, { method: 'POST', signal: ctrl.signal, headers: { 'content-type': 'text/plain' }, body: JSON.stringify(row) });
  } catch (err) {
    console.error('Style test sheet log failed', err);
  } finally {
    clearTimeout(timer);
  }
}

// Abuse guard. At most 10 requests per IP per 10 minutes, and bodies over 2 KB are refused.
// Kept in memory, so each server instance counts on its own. Good enough to stop a script from running up the AI bill.
const LIMIT = 10;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_BODY = 2048;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) { hits.set(ip, recent); return true; }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return false;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = (request.headers.get('x-forwarded-for')?.split(',')[0] || clientAddress || 'unknown').trim();
  if (limited(ip)) return json({ ok: false, message: 'Too many tries. Please wait a few minutes.' }, 429);

  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY) return json({ ok: false, message: 'Request too large.' }, 413);
  const raw = await request.text().catch(() => '');
  if (raw.length > MAX_BODY) return json({ ok: false, message: 'Request too large.' }, 413);
  let body: any = null;
  try { body = JSON.parse(raw); } catch { /* handled below */ }
  const answers = body?.answers;
  const result = score(answers);
  if (!result) return json({ ok: false, message: 'Please answer every question.' }, 400);

  const name = String(body?.name ?? '').replace(/[^\p{L}\p{M} .'’]/gu, '').trim().slice(0, 24);
  const labels = [current.options[answers[0]].label, ...questions.map((q, i) => q.options[answers[i + 1]].label)];

  const why = { v: '' };
  const ai = await writeNote(result, labels, name, why);
  const copy = styleCopy[result.style];
  const note = ai?.note ?? copy.note;
  const tips = ai?.tips ?? copy.tips;

  await logRow({
    time: new Date().toISOString(),
    name,
    result: styleName[result.style],
    lean: result.lean ? styleName[result.lean] : '',
    scalper: result.percent.S,
    intraday: result.percent.I,
    swing: result.percent.W,
    current: labels[0],
    mismatch: result.mismatch ? 'yes' : 'no',
    flags: result.flags.join(' '),
    ai: ai ? 'yes' : why.v ? `no ${why.v}` : 'no',
    answers: labels.slice(1).join(' | '),
    note,
    source: String(body?.source ?? '').slice(0, 30),
  });

  return json({ ok: true, ...result, styleName: styleName[result.style], leanName: result.lean ? styleName[result.lean] : null, line: copy.line, note, tips });
};
