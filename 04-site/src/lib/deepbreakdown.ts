// The deep breakdown behind the trading style test email.
// /api/subscribe calls this once a signup carries a valid signed result. Claude picks the concepts and writes short lines from
// the person's real answers. If Claude fails, or breaks a rule below, the fixed text for their style is used, so nobody gets an empty email.
// Built to be scanned, not read: one idea per line, concept cards, and "You said" lines that quote their own answers.
//   - The concept school and person come from the fixed table below, never from the AI, so a school can't be invented.
//   - The "You said" quotes are copied from their real answers by the code. The AI only picks which two and says what they mean.
// The parts are saved on the Buttondown subscriber (st_concepts, st_said, st_work, st_question) and the transactional email
// template turns them into sections. Server only.
import { askJson, askWithRetry, cleanText, wordCount } from './claude';
import { questions, styleTitle, type Style } from './styletest';
import type { TokenPayload } from './styletoken';

export interface Concept { name: string; school: string; plain: string; inyou: string }
export interface Said { quote: string; means: string }
export interface Deep {
  concepts: Concept[]; // What's happening in your head (1 or 2 cards)
  said: Said[]; // How it shows up on your chart ("You said" and what it means)
  work: string[]; // How to work on it (3 points)
  question: string; // A question for you
}

const flagText: Record<string, string> = {
  revenge: 'After losing days they feel they must win it back (revenge trading risk).',
  rulehop: 'After 3 losses they change their target or stop right away (they keep rewriting their system).',
  boredom: 'When down and bored they start seeing setups that are not there (forcing trades).',
};

// The only concepts allowed, with their school or person. The AI picks a key. The code writes the name and school.
export const CONCEPTS: Record<string, { name: string; school: string }> = {
  uncertainty: { name: 'Intolerance of uncertainty', school: 'Cognitive behavioural psychology' },
  closure: { name: 'Need for cognitive closure', school: 'Social psychology (Arie Kruglanski)' },
  loss_aversion: { name: 'Loss aversion', school: 'Behavioural economics (Daniel Kahneman and Amos Tversky)' },
  gratification: { name: 'Delay of gratification', school: 'Developmental psychology (Walter Mischel)' },
  sensation_seeking: { name: 'Sensation seeking', school: 'Personality psychology (Marvin Zuckerman)' },
  frustration: { name: 'Frustration tolerance', school: 'Cognitive behavioural therapy (Albert Ellis)' },
};

const system = `You write the "deep breakdown" email for a trading style test made by Aayush (@aayush_ict), a funded Nasdaq futures scalper with a Master's in Psychology. The reader just finished the test and gave their email to get it.
Readers are retail traders, mostly India and Africa, many trade gold on MT5, many are not native English speakers.

The code has ALREADY decided their style. Never change it.

The email is SCANNED, not read. Every field is one short line with one idea. Never write a paragraph.
Voice: Aayush talking to a friend. Speak to "you". Simple words, short sentences. Warm, direct, never preachy.
No em dashes, no hyphens in words, no emoji, no hashtags, no markdown. Write "stop loss" with no hyphen. No trade calls, no promises of profit.
Start with the point. No filler opening such as "Let me tell you what I see". Do not repeat the same answer twice.
Only say what their answers show. Do not guess feelings, body reactions or habits they did not pick. Never diagnose.
Never invent a study, a statistic, a percentage, a number of people or a quote.

CONCEPTS. Choose 1 or 2 keys that their answers really show:
- uncertainty: discomfort when the outcome is not known yet. Shows in: anger or itch when a trade does not move, forcing trades when bored, checking the phone at night.
- closure: the urge to settle an open question fast. Shows in: closing a trade to sleep, wanting it all back today, replaying a trade.
- loss_aversion: a loss hurts more than an equal gain feels good. Shows in: giving back a 1R profit hurts, chasing losses, changing rules after losses.
- gratification: choosing a bigger reward later over a smaller one now. Shows in: waiting for the setup, few trades, calm with open trades.
- sensation_seeking: the wish for fast, intense experiences. Shows in: feeling alive when price moves fast, needing daily action.
- frustration: how well you handle things not going your way. Shows in: stress after losses, rewriting rules, tilt.
Do not use any other concept, school or name.

Return ONLY JSON:
{"concepts":[{"key":"closure","plain":"...","inyou":"..."}],"said":[{"q":"sleep","means":"..."},{"q":"boredom","means":"..."}],"work":["...","...","..."],"question":"..."}
"concepts": 1 or 2 items. "key" is one key from the list. "plain": what it is in everyday words, under 14 words. "inyou": how it shows in THIS person, tied to their answers, under 16 words.
"said": exactly 2 items. "q" is the id in brackets of one of their answers that best shows the point. "means": what that answer tells us about them, under 16 words. If they trade a different style now, one of them can show how that mismatch appears.
"work": exactly 3 items. Each under 12 words, an instruction, practical, matched to their style and answers.
"question": one question for them to reply to, under 22 words, about their own habit. It ends with "Reply and tell me."
About 110 to 160 words in all.`;

// Questions whose answers can be quoted ("the voice in their head").
const voiceIds = new Set(questions.filter((q) => q.voice).map((q) => q.id));
const labelOf = (p: TokenPayload, id: string) => {
  const i = questions.findIndex((q) => q.id === id);
  return i >= 0 ? p.labels[i + 1] : undefined;
};

function validate(o: any, p: TokenPayload, why: { v: string }): Deep | null {
  const text = (s: unknown) => cleanText(s);
  const rawConcepts: any[] = Array.isArray(o?.concepts) ? o.concepts : [];
  const rawSaid: any[] = Array.isArray(o?.said) ? o.said : [];
  const work = (Array.isArray(o?.work) ? o.work : []).map(text).filter(Boolean);
  const question = text(o?.question);

  if (rawConcepts.length < 1 || rawConcepts.length > 2) { why.v = `shape concepts${rawConcepts.length}`; return null; }
  if (rawSaid.length < 2 || rawSaid.length > 3) { why.v = `shape said${rawSaid.length}`; return null; }
  if (work.length < 3 || work.length > 4) { why.v = `shape work${work.length}`; return null; }
  if (!question) { why.v = 'shape question'; return null; }

  const concepts: Concept[] = [];
  for (const c of rawConcepts) {
    const def = CONCEPTS[String(c?.key)];
    if (!def) { why.v = 'concept key'; return null; }
    const plain = text(c?.plain), inyou = text(c?.inyou);
    if (!plain || !inyou) { why.v = 'shape concepttext'; return null; }
    if (wordCount(plain) > 18 || wordCount(inyou) > 20) { why.v = 'shape conceptwords'; return null; }
    if (!concepts.some((x) => x.name === def.name)) concepts.push({ ...def, plain, inyou });
  }

  const said: Said[] = [];
  for (const s of rawSaid) {
    const id = String(s?.q);
    const quote = voiceIds.has(id) ? labelOf(p, id) : undefined;
    const means = text(s?.means);
    if (!quote || !means) { why.v = 'shape saidq'; return null; }
    if (wordCount(means) > 20) { why.v = 'shape saidwords'; return null; }
    if (!said.some((x) => x.quote === quote)) said.push({ quote, means });
  }
  if (said.length < 2) { why.v = 'shape saidrepeat'; return null; }
  if (work.some((w: string) => wordCount(w) > 14) || wordCount(question) > 28) { why.v = 'shape workwords'; return null; }

  // The AI's own words only (the quotes are the person's). About 110 to 160 words, with room either side.
  const own = [...concepts.flatMap((c) => [c.plain, c.inyou]), ...said.map((s) => s.means), ...work, question].join(' ');
  const total = wordCount(own);
  if (total < 80) { why.v = 'short'; return null; }
  if (total > 200) { why.v = 'long'; return null; }
  // No invented science: no percentages, studies or surveys.
  if (/%|\bpercent\b|\bstud(y|ies)\b|\bsurveys?\b|\bresearch(ers)? (show|found|says|suggests)\b/i.test(own)) { why.v = 'claim'; return null; }
  return { concepts, said: said.slice(0, 2), work: work.slice(0, 3), question };
}

async function tryOnce(p: TokenPayload, why: { v: string }): Promise<Deep | null> {
  const r = p;
  const user = [
    p.name ? `Name: ${p.name}` : 'Name: not given',
    `Main style (decided): ${styleTitle[r.style]}${r.lean ? `, close second: ${styleTitle[r.lean]}` : ''}`,
    `Scores: Scalping ${r.percent.S}%, Intraday ${r.percent.I}%, Swing ${r.percent.W}%`,
    `Trades now: ${r.current ? styleTitle[r.current] : 'not sure yet'} (${p.labels[0] ?? ''})${r.mismatch ? ' (MISMATCH with their result)' : ''}`,
    'Their answers (the voice in their head). The id in brackets is what you use in "q":',
    ...questions.map((q, i) => `- [${q.id}] ${q.scene}. ${q.text} -> ${p.labels[i + 1] ?? ''}`),
    'Warning signs: ' + (r.flags.length ? r.flags.map((f) => flagText[f]).join(' ') : 'none'),
  ].join('\n');
  const out = await askJson(system, user, why, 14000, 1500);
  return out ? validate(out, p, why) : null;
}

// Fixed breakdowns, one per style. Used when the AI is not available or breaks a rule.
// The "You said" lines for the fixed version are chosen below, only from answers that really point to their style.
interface Fixed { concepts: Concept[]; work: string[]; question: string; said: Record<string, string> }
const fixed: Record<Style, Fixed> = {
  S: {
    concepts: [
      { ...CONCEPTS.closure, plain: 'The urge to settle an open question fast, even with a rough answer.', inyou: 'You want trades finished, and long waiting wears you down.' },
      { ...CONCEPTS.sensation_seeking, plain: 'The wish for fast, intense moments.', inyou: 'Quick, sharp trades suit you, and that is a real strength.' },
    ],
    work: ['Pick one short window to trade. Close the chart after.', 'Set a daily loss limit. Stop when you hit it.', 'After two losses, write one line before the next trade.'],
    question: 'After how many losses in a row do you start to change what you do? Reply and tell me.',
    said: {
      sleep: 'You want the trade settled now, not later.',
      boredom: 'When nothing moves, you start to force trades.',
      days: 'A red day makes you want it all back today.',
      tilt: 'Your tilt point comes early, after one or two losses.',
    },
  },
  I: {
    concepts: [
      { ...CONCEPTS.uncertainty, plain: 'The discomfort of not knowing how a trade will end.', inyou: 'You can wait, but the open question starts to pull at you.' },
      { ...CONCEPTS.frustration, plain: 'How well you handle things not going your way.', inyou: 'A fixed session gives that a clear start and a clear end.' },
    ],
    work: ['Trade one session only. Pick the end time first.', 'Set a fixed daily loss limit before the open.', 'Keep your rules for a full month before changing them.'],
    question: 'What time of day do you trade best, and when do you start to drift? Reply and tell me.',
    said: {
      sleep: 'An open trade at night keeps pulling at you.',
      frequency: 'You can wait, but you want a clear answer soon.',
      evening: 'A loss bothers you for a while, then you let it go.',
      focus: 'A few hours of steady focus is your range.',
    },
  },
  W: {
    concepts: [
      { ...CONCEPTS.gratification, plain: 'Choosing a bigger reward later over a smaller one now.', inyou: 'You can hold a trade and let the plan work.' },
      { ...CONCEPTS.frustration, plain: 'How well you handle things not going your way.', inyou: 'Losing days do not shake you much.' },
    ],
    work: ['Write your entry and stop rules before each week.', 'Check charts at fixed times only.', 'Size small enough to sleep with the trade open.'],
    question: 'What is the longest you have held a trade, and how did you feel? Reply and tell me.',
    said: {
      sleep: 'You can let a trade run while you sleep.',
      frequency: 'A quiet week does not bother you.',
      ambiguity: 'You let a trade take the time it needs.',
      giveback: 'You see a give back as part of the game.',
    },
  },
};

// Picks up to 2 answers that really point to their style, so the fixed "You said" lines are always true for this person.
export function fixedDeep(p: TokenPayload): Deep {
  const f = fixed[p.style];
  const said: Said[] = [];
  for (const id of Object.keys(f.said)) {
    if (said.length === 2) break;
    const qi = questions.findIndex((q) => q.id === id);
    if (qi < 0) continue;
    const opt = questions[qi].options.find((o) => o.label === p.labels[qi + 1]);
    if (opt && (opt.score[p.style] ?? 0) > 0) said.push({ quote: opt.label, means: f.said[id] });
  }
  return { concepts: f.concepts, said, work: f.work, question: f.question };
}

// Asks Claude (one retry), and falls back to the fixed text. `ai` says which one you got, `why` is the failure reason if any.
export async function deepBreakdown(p: TokenPayload): Promise<{ deep: Deep; ai: boolean; why: string }> {
  const why = { v: '' };
  const out = await askWithRetry(() => tryOnce(p, why), why, 14000);
  if (out) return { deep: out, ai: true, why: '' };
  return { deep: fixedDeep(p), ai: false, why: why.v };
}
