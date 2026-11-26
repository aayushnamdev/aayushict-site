// One place for the Claude call used by the style test routes (the result blocks and the deep breakdown email).
// Server only. The key is ANTHROPIC_API_KEY in Vercel. STYLE_TEST_MODEL is optional and defaults to claude-haiku-5-5.
// Thinking is switched off: with it on, the model can spend its whole token budget thinking and never write the answer.
export const env = (k: string): string | undefined =>
  (import.meta.env as Record<string, string | undefined>)[k] ?? (globalThis as any).process?.env?.[k];

// Cleans a line the AI wrote so it follows the house style: no em or en dashes, no markdown marks, no angle brackets.
export const cleanText = (s: unknown) =>
  String(s ?? '')
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/[*#`_<>]/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim();

export const wordCount = (s: string) => s.split(/\s+/).filter(Boolean).length;

// Asks for JSON and returns the parsed object, or null. `why.v` gets a short failure reason (an HTTP status or a word).
export async function askJson(system: string, user: string, why: { v: string }, timeoutMs = 12000, maxTokens = 1500): Promise<any | null> {
  why.v = '';
  const key = env('ANTHROPIC_API_KEY');
  if (!key) { why.v = 'nokey'; return null; }
  const model = env('STYLE_TEST_MODEL') || 'claude-haiku-5-5';
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: ctrl.signal,
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model, max_tokens: maxTokens, thinking: { type: 'disabled' }, system, messages: [{ role: 'user', content: user }] }),
    });
    if (!res.ok) {
      console.error('Style test AI error', res.status, await res.text().catch(() => ''));
      why.v = String(res.status);
      return null;
    }
    const data = await res.json();
    const blocks: any[] = Array.isArray(data?.content) ? data.content : [];
    const text = blocks.filter((c) => c.type === 'text').map((c) => String(c.text ?? '')).join('\n');
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) { why.v = `noparse ${data?.stop_reason ?? ''} ${blocks.map((c) => c.type).join('+')}`.trim(); return null; }
    return JSON.parse(match[0]);
  } catch (err) {
    console.error('Style test AI failed', err);
    why.v = 'exception';
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Tries once more when the first reply was the wrong shape or unreadable, if there is time left.
// A key or model problem (401, 404, 400, no key) is not retried.
export async function askWithRetry<T>(
  tryOnce: () => Promise<T | null>,
  why: { v: string },
  budgetMs: number,
): Promise<T | null> {
  const started = Date.now();
  for (let attempt = 0; attempt < 2; attempt++) {
    const out = await tryOnce();
    if (out) return out;
    if (!/^(short|long|shape|concept|claim|noparse|exception|429|5\d\d)/.test(why.v) || Date.now() - started > budgetMs) return null;
  }
  return null;
}
