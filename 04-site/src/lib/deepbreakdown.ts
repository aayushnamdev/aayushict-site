// The deep breakdown behind the trading style test email.
// /api/subscribe calls this once a signup carries a valid signed result. Claude writes the sections from the person's
// real answers. If Claude fails, or breaks a rule below, the fixed text for their style is used, so nobody gets an empty email.
// The parts are saved on the Buttondown subscriber (st_head, st_chart, st_work, st_question) and the transactional email
// template turns them into short sections. Server only.
import { askJson, askWithRetry, cleanText, wordCount } from './claude';
import { questions, styleTitle, type Style } from './styletest';
import type { TokenPayload } from './styletoken';

export interface Deep {
  head: string[]; // What's happening in your head
  chart: string[]; // How it shows up on your chart
  work: string[]; // How to work on it (3 points)
  question: string; // A question for you
}

const flagText: Record<string, string> = {
  revenge: 'After losing days they feel they must win it back (revenge trading risk).',
  rulehop: 'After 3 losses they change their target or stop right away (they keep rewriting their system).',
  boredom: 'When down and bored they start seeing setups that are not there (forcing trades).',
};

// Only these concepts are allowed. Each has its school or person, so the email never invents one.
const CONCEPTS = ['uncertainty', 'cognitive closure', 'closure', 'loss aversion', 'gratification', 'sensation seeking', 'frustration tolerance'];

const system = `You write the "deep breakdown" email for a trading style test made by Aayush (@aayush_ict), a funded Nasdaq futures scalper with a Master's in Psychology. The reader just finished the test and gave their email to get it.
Readers are retail traders, mostly India and Africa, many trade gold on MT5, many are not native English speakers.

The code has ALREADY decided their style. Never change it.

Voice: Aayush talking to a friend. Speak to "you". Simple words, short sentences of about 9 to 13 words. Warm, direct, never preachy.
Write in SHORT BLOCKS. Each block is 1 or 2 short sentences. No long paragraphs.
No em dashes, no hyphens as connectors, no emoji, no hashtags, no markdown, no lists inside a block. No trade calls, no promises of profit.
Never diagnose. Never invent a study, a statistic, a percentage, a number of people or a quote.

PSYCHOLOGY. Name 1 or 2 concepts, only from this list. Say the school or person each comes from, then explain it in everyday words. Choose the ones their answers really show:
- intolerance of uncertainty (cognitive behavioural psychology): discomfort when the outcome is not known yet. Shows in: anger or itch when a trade does not move, forcing trades when bored, checking the phone at night.
- need for cognitive closure (social psychology, Arie Kruglanski): the urge to settle an open question fast. Shows in: closing a trade to sleep, wanting it all back today, replaying a trade.
- loss aversion (behavioural economics, Daniel Kahneman and Amos Tversky): a loss hurts more than an equal gain feels good. Shows in: giving back a 1R profit hurts, chasing losses, changing rules after losses.
- delay of gratification (developmental psychology, Walter Mischel): choosing a bigger reward later over a smaller one now. Shows in: waiting for the setup, few trades, calm with open trades.
- sensation seeking (personality psychology, Marvin Zuckerman): the wish for fast, intense experiences. Shows in: feeling alive when price moves fast, needing daily action.
- frustration tolerance (cognitive behavioural therapy, Albert Ellis): how well you handle things not going your way. Shows in: stress after losses, rewriting rules, tilt.
Do not use any other concept, school or name.

Return ONLY JSON: {"head": [string], "chart": [string], "work": [string, string, string], "question": string}
"head": 2 to 4 blocks. What is happening in their head. Name the concept(s) with the school, explain in everyday words.
"chart": 2 or 3 blocks. How it shows up on their chart. Tie it to 2 of their real answers. Do not quote the questions. If they trade a different style now, one block shows how that mismatch shows up.
"work": exactly 3 short points, each under 18 words. Practical things to work on, matched to their style and answers.
"question": one question for them to reply to, under 25 words, about their own habit. It ends with "Reply and tell me."
About 220 to 300 words in all.`;

function validate(o: any, why: { v: string }): Deep | null {
  const list = (a: unknown) => (Array.isArray(a) ? a.map(cleanText).filter(Boolean) : []);
  const head = list(o?.head), chart = list(o?.chart), work = list(o?.work);
  const question = cleanText(o?.question);
  const all = [...head, ...chart, ...work, question].join(' ');
  if (head.length < 2 || head.length > 4 || chart.length < 2 || chart.length > 3 || work.length !== 3 || !question) { why.v = 'shape'; return null; }
  if ([...head, ...chart].some((b) => wordCount(b) > 40) || work.some((w) => wordCount(w) > 20) || wordCount(question) > 30) { why.v = 'shape'; return null; }
  const total = wordCount(all);
  if (total < 150) { why.v = 'short'; return null; }
  if (total > 340) { why.v = 'long'; return null; }
  if (!CONCEPTS.some((c) => head.join(' ').toLowerCase().includes(c))) { why.v = 'concept'; return null; }
  // No invented science: no percentages, studies or surveys.
  if (/%|\bpercent\b|\bstud(y|ies)\b|\bsurveys?\b|\bresearch(ers)? (show|found|says|suggests)\b/i.test(all)) { why.v = 'claim'; return null; }
  return { head, chart, work, question };
}

async function tryOnce(p: TokenPayload, why: { v: string }): Promise<Deep | null> {
  const r = p;
  const user = [
    p.name ? `Name: ${p.name}` : 'Name: not given',
    `Main style (decided): ${styleTitle[r.style]}${r.lean ? `, close second: ${styleTitle[r.lean]}` : ''}`,
    `Scores: Scalping ${r.percent.S}%, Intraday ${r.percent.I}%, Swing ${r.percent.W}%`,
    `Trades now: ${r.current ? styleTitle[r.current] : 'not sure yet'} (${p.labels[0] ?? ''})${r.mismatch ? ' (MISMATCH with their result)' : ''}`,
    'Their answers (the voice in their head):',
    ...questions.map((q, i) => `- ${q.scene}. ${q.text} -> ${p.labels[i + 1] ?? ''}`),
    'Warning signs: ' + (r.flags.length ? r.flags.map((f) => flagText[f]).join(' ') : 'none'),
  ].join('\n');
  const out = await askJson(system, user, why, 14000, 1800);
  return out ? validate(out, why) : null;
}

// Fixed breakdowns, one per style. Used when the AI is not available or breaks a rule.
export const deepFallback: Record<Style, Deep> = {
  S: {
    head: [
      'Your answers show a mind that wants things settled fast.',
      'Psychologists call this need for cognitive closure, an idea from social psychology (Arie Kruglanski). It is the urge to end an open question quickly, even with a rough answer.',
      'It pairs with sensation seeking, from personality psychology (Marvin Zuckerman). You like fast, intense moments, and that is a real strength for scalping.',
    ],
    chart: [
      'A trade left open feels heavy to you. That is why short trades with small targets suit you.',
      'When price does not move, the wait feels like a threat. That is the moment forced trades show up.',
    ],
    work: [
      'Pick one short window to trade. Close the chart when it ends.',
      'Set a daily loss limit before the open. Stop when you hit it.',
      'After two losses, write one line about what you feel before the next trade.',
    ],
    question: 'After how many losses in a row do you start to change what you do? Reply and tell me.',
  },
  I: {
    head: [
      'You can wait, but not forever. That puts you in the middle.',
      'Psychologists call the discomfort of not knowing intolerance of uncertainty, an idea from cognitive behavioural psychology. A session gives you an answer by the end of the day, and that is why it works for you.',
      'How well you handle things not going your way is called frustration tolerance, from Albert Ellis and cognitive behavioural therapy. A fixed session gives that a clear limit.',
    ],
    chart: [
      'You can hold a trade through a session. Overnight, you start checking your phone.',
      'Your edge is a clear start and a clear end to each day.',
    ],
    work: [
      'Trade one session only. Decide the end time before you start.',
      'Set a fixed daily loss limit before the open.',
      'Keep your rules for a full month before you change them.',
    ],
    question: 'What time of day do you trade best, and when do you start to drift? Reply and tell me.',
  },
  W: {
    head: [
      'You are comfortable with waiting. That is a real skill.',
      'It is called delay of gratification, an idea from developmental psychology (Walter Mischel). It means choosing a bigger reward later over a smaller one now.',
      'Your calm after losses also fits frustration tolerance, from Albert Ellis and cognitive behavioural therapy. It is how well you handle things not going your way.',
    ],
    chart: [
      'A quiet week does not bother you. No setup means no trade.',
      'Fast candles stress you, which is why a few checks a day suit you better than screen time.',
    ],
    work: [
      'Write your entry and stop rules before each week begins.',
      'Check charts at fixed times only.',
      'Size small enough that you can sleep with the trade open.',
    ],
    question: 'What is the longest you have held a trade, and how did you feel? Reply and tell me.',
  },
};

// Asks Claude (one retry), and falls back to the fixed text. `ai` says which one you got, `why` is the failure reason if any.
export async function deepBreakdown(p: TokenPayload): Promise<{ deep: Deep; ai: boolean; why: string }> {
  const why = { v: '' };
  const out = await askWithRetry(() => tryOnce(p, why), why, 14000);
  return out ? { deep: out, ai: true, why: '' } : { deep: deepFallback[p.style], ai: false, why: why.v };
}
