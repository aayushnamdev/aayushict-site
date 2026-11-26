// Trading style test result. The page posts the answers here.
// 1. Code scores them (src/lib/styletest.ts). The style is decided here, never by the AI.
// 2. Claude writes a few short blocks from their exact answers (src/lib/claude.ts).
// 3. The response is logged to a Google Sheet through an Apps Script webhook.
// 4. The result is signed (STYLE_TEST_SECRET) so the email signup can trust it later.
// Keys live in Vercel's environment settings only: ANTHROPIC_API_KEY, SHEET_WEBHOOK_URL, STYLE_TEST_SECRET, optional STYLE_TEST_MODEL.
// If the AI or the sheet fails, the person still gets their result with fixed blocks.
import type { APIRoute } from 'astro';
import { current, fallbackBlocks, questions, score, styleCopy, styleName, styleTitle, type Result } from '../../lib/styletest';
import { signToken } from '../../lib/styletoken';
import { askJson, askWithRetry, cleanText, env, wordCount } from '../../lib/claude';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

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
Every sentence must make sense on its own. No vague lines like 'your change is worth watching'. Say exactly what to do or notice.

Return ONLY JSON: {"blocks": [string, string, string, string]}
4 to 6 blocks. Each block is 1 or 2 short sentences. About 80 to 100 words in total.
Order: first, what this style means for them. Then why, pointing to 2 or 3 of their real answers. If they trade a different style now, the last block explains the mismatch.
No tips. No advice section.`;

// One try. Returns the blocks, or null with a short reason in `why.v`.
async function tryBlocks(r: Result, labels: string[], name: string, why: { v: string }): Promise<string[] | null> {
  const lines = [
    name ? `Name: ${name}` : 'Name: not given',
    `Main style (decided): ${styleTitle[r.style]}${r.lean ? `, close second: ${styleTitle[r.lean]}` : ''}`,
    `Scores: Scalping ${r.percent.S}%, Intraday ${r.percent.I}%, Swing ${r.percent.W}%`,
    `Trades now: ${r.current ? styleTitle[r.current] : 'not sure yet'} (${labels[0]})${r.mismatch ? ' (MISMATCH with their result)' : ''}`,
    'Their answers (the voice in their head):',
    ...questions.map((q, i) => `- ${q.scene}. ${q.text} -> ${labels[i + 1]}`),
    'Warning signs: ' + (r.flags.length ? r.flags.map((f) => flagText[f]).join(' ') : 'none'),
  ].join('\n');

  const out = await askJson(system, lines, why, 12000, 1500);
  if (!out) return null;
  const blocks: string[] = Array.isArray(out.blocks) ? out.blocks.map(cleanText).filter(Boolean) : [];
  // 4 to 6 blocks, each 1 or 2 short sentences (about 45 words at most), 70 to 110 words in all.
  const total = wordCount(blocks.join(' '));
  if (blocks.length < 4 || blocks.length > 6 || blocks.some((b) => wordCount(b) > 45)) { why.v = 'shape'; return null; }
  if (total < 70) { why.v = 'short'; return null; }
  if (total > 110) { why.v = 'long'; return null; }
  return blocks;
}

const writeBlocks = (r: Result, labels: string[], name: string, why: { v: string }) =>
  askWithRetry(() => tryBlocks(r, labels, name, why), why, 8000);

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
  const ai = await writeBlocks(result, labels, name, why);
  const blocks = ai ?? fallbackBlocks(result.style, result.current, result.mismatch);

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
    note: blocks.join('\n\n'),
    source: String(body?.source ?? '').slice(0, 30),
  });

  // Signed copy of this result, with their answers. The email signup sends it back so /api/subscribe can trust it.
  const secret = env('STYLE_TEST_SECRET');
  const token = secret
    ? signToken({ style: result.style, lean: result.lean, current: result.current, mismatch: result.mismatch, percent: result.percent, flags: result.flags, labels, name }, secret)
    : undefined;

  return json({ ok: true, ...result, token, styleName: styleName[result.style], leanName: result.lean ? styleName[result.lean] : null, blocks, gold: styleCopy[result.style].gold });
};
