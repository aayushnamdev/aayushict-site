// Trading style test (/test). Questions, scoring and the fixed text for each style.
// Built 26 Nov 2026 from Aayush's own experience across swing, intraday and scalping.
// Redesigned 27 Nov 2026 as a story: a scene line, a question, and answers written as the voice in the trader's head.
// The code decides the style. The AI note (api/style-test.ts) only explains it and can never change it.
// Question ids and scores are fixed. Only the text and the order change. answers[0] is "current", answers[1..] follow questions[].

export type Style = 'S' | 'I' | 'W';
export type Flag = 'revenge' | 'rulehop' | 'boredom';

export interface Option {
  label: string;
  score: Partial<Record<Style, number>>;
  flag?: Flag;
}
export interface Question {
  id: string;
  scene: string; // small line above the question
  text: string;
  voice: boolean; // true: options are the voice in their head, shown in quotes
  options: Option[];
}
// A short screen before a part of the quiz. It shows before the question with id `before`.
export interface Chapter {
  title: string;
  line: string;
  before: string;
}

export const styleName: Record<Style, string> = { S: 'Scalper', I: 'Intraday', W: 'Swing' };
// How the style reads in a sentence: "Your mind fits Scalping."
export const styleTitle: Record<Style, string> = { S: 'Scalping', I: 'Intraday', W: 'Swing' };
// Where each style sits on the trade length strip (percent from the left, SECONDS to DAYS).
export const stripAt: Record<Style, number> = { S: 9, I: 50, W: 91 };

// Question 0 is not scored. It is what they trade now, for the mismatch line.
export const current: Question = {
  id: 'current',
  scene: 'BEFORE WE START',
  text: 'How do you trade right now?',
  voice: false,
  options: [
    { label: 'Quick trades on the 1 minute, out in minutes', score: {} },
    { label: '5 or 15 minute charts, closed the same day', score: {} },
    { label: '1 hour or 4 hour charts, held for days', score: {} },
    { label: 'Still figuring it out', score: {} },
  ],
};
export const currentStyle: (Style | null)[] = ['S', 'I', 'W', null];

export const chapters: Chapter[] = [
  { title: 'Chapter 1: Losses', line: 'Every trader loses. What matters is what happens inside you after.', before: 'tilt' },
  { title: 'Chapter 2: Waiting', line: 'Trading is mostly waiting. How you wait says a lot about you.', before: 'sleep' },
  { title: 'Chapter 3: Focus and speed', line: 'Last part. How your attention really works.', before: 'focus' },
];

export const questions: Question[] = [
  // Chapter 1: losses
  {
    id: 'tilt',
    scene: 'TWO LOSSES IN A ROW',
    text: 'Gold is moving again, and your finger is on the buy button. What is the voice in your head saying?',
    voice: true,
    options: [
      { label: 'Get it back. Now.', score: { S: 2 } },
      { label: 'One more is okay. A third loss and I stop.', score: { I: 2 } },
      { label: 'Two losses is nothing. Next setup, same size.', score: { W: 2 } },
    ],
  },
  {
    id: 'days',
    scene: 'TWO RED DAYS',
    text: 'Day three. You open MT5. What do you tell yourself?',
    voice: true,
    options: [
      { label: 'Today I win it all back.', score: { S: 2 }, flag: 'revenge' },
      { label: "Tense, but I'll follow my plan.", score: { I: 2 } },
      { label: 'Losing days happen. Normal day.', score: { W: 2 } },
    ],
  },
  {
    id: 'evening',
    scene: '9 PM, A LOSING TRADE',
    text: "Now it's dinner time. Where is your mind?",
    voice: true,
    options: [
      { label: 'Still replaying that trade.', score: { S: 2 } },
      { label: "It bugs me for an hour, then it's gone.", score: { I: 2 } },
      { label: 'Already forgotten.', score: { W: 2 } },
    ],
  },
  {
    id: 'rules',
    scene: 'THREE LOSSES IN A ROW',
    text: 'Same system that worked last month. What do you think?',
    voice: true,
    options: [
      { label: 'Maybe my targets are wrong. Let me change them.', score: {}, flag: 'rulehop' },
      { label: 'Let me check my journal first.', score: { I: 2 } },
      { label: 'Three losses is nothing. Keep going.', score: { W: 2 } },
    ],
  },
  // Chapter 2: waiting
  {
    id: 'sleep',
    scene: '11 PM',
    text: 'Your gold buy is 80 pips in profit, but your target is 200 away. You need to sleep.',
    voice: true,
    options: [
      { label: "Close it. I can't sleep with this open.", score: { S: 2 } },
      { label: "Keep it, but I'll check my phone at night.", score: { I: 2 } },
      { label: 'Stop is set. Good night.', score: { W: 2 } },
    ],
  },
  {
    id: 'ambiguity',
    scene: '40 MINUTES IN',
    text: "Perfect setup on gold, and you're in. Nothing is happening. Meanwhile silver is flying in your direction.",
    voice: true,
    options: [
      { label: 'Why is MY trade not moving?', score: { S: 2 } },
      { label: "Annoying. I'll give it time.", score: { I: 2 } },
      { label: 'Fine. Gold moves when it moves.', score: { W: 2 } },
    ],
  },
  {
    id: 'missed',
    scene: 'YOU LOOKED AWAY FOR 2 MINUTES',
    text: 'Your setup triggered and ran 50 pips without you.',
    voice: true,
    options: [
      { label: 'This will stay in my head all session.', score: { S: 2 } },
      { label: 'Ugh. Okay, moving on.', score: { I: 2 } },
      { label: 'Another one will come.', score: { W: 2 } },
    ],
  },
  {
    id: 'boredom',
    scene: 'DOWN TODAY, 45 MINUTES, NO SETUP',
    text: 'The chart is moving, just not in your model.',
    voice: true,
    options: [
      { label: "Wait... that's close enough to a setup.", score: { S: 2 }, flag: 'boredom' },
      { label: "I'll wait. But I'm getting itchy.", score: { I: 2 } },
      { label: 'Closing the chart. Tomorrow is fine.', score: { W: 2 } },
    ],
  },
  {
    id: 'frequency',
    scene: 'ZERO TRADES THIS WEEK',
    text: 'Gold has been stuck in one range all week. What is the voice in your head saying?',
    voice: true,
    options: [
      { label: 'Just take one. Anything.', score: { S: 2 } },
      { label: 'Waiting... but this is killing me.', score: { I: 2 } },
      { label: 'Good. No setup, no trade.', score: { W: 2 } },
    ],
  },
  {
    id: 'giveback',
    scene: '1R IN PROFIT',
    text: 'Then price slowly came all the way back to your entry.',
    voice: true,
    options: [
      { label: 'I should have closed. Next time I take profit faster.', score: { S: 2 } },
      { label: 'Part of the game.', score: { I: 2 } },
      { label: 'Normal. Good trades need room.', score: { W: 2 } },
    ],
  },
  // Chapter 3: focus and speed
  {
    id: 'focus',
    scene: 'MARKET OPEN',
    text: 'Which one sounds like you?',
    voice: true,
    options: [
      { label: "30 minutes of full focus. Then I'm done.", score: { S: 2 } },
      { label: '2 or 3 hours of steady watching.', score: { I: 2 } },
      { label: 'A quick look a few times a day.', score: { W: 2 } },
    ],
  },
  {
    id: 'time',
    scene: 'BE HONEST',
    text: 'On a normal weekday, how much live chart time do you really have?',
    voice: true,
    options: [
      { label: 'Under an hour', score: { S: 1, W: 1 } },
      { label: '1 to 3 hours in one session', score: { I: 2 } },
      { label: 'A few minutes, a few times a day', score: { W: 2 } },
    ],
  },
  {
    id: 'speed',
    scene: 'NEWS JUST DROPPED',
    text: 'Gold moves 100 pips in 2 minutes. Big candles everywhere.',
    voice: true,
    options: [
      { label: 'This is where I feel alive.', score: { S: 2 } },
      { label: 'I can handle it, but I prefer slower.', score: { I: 2 } },
      { label: 'Too fast. I get stressed and make mistakes.', score: { W: 2 } },
    ],
  },
  {
    id: 'triangle',
    scene: 'LAST ONE',
    text: 'If you could have only one of these accounts, which one?',
    voice: false,
    options: [
      { label: 'Wins 7 of 10 trades. Small wins.', score: { S: 2 } },
      { label: 'Wins 5 of 10. Wins are 2 times the losses.', score: { I: 2 } },
      { label: 'Wins 4 of 10. Wins are 3 to 4 times the losses. Few trades a month.', score: { W: 2 } },
    ],
  },
];

export interface Result {
  style: Style;
  lean: Style | null; // second style when it is close
  percent: Record<Style, number>;
  current: Style | null;
  mismatch: boolean;
  flags: Flag[];
}

// answers[0] is the current style, answers[1..] match questions[].
export function score(answers: number[]): Result | null {
  if (!Array.isArray(answers) || answers.length !== questions.length + 1) return null;
  if (!answers.every((a) => Number.isInteger(a))) return null;
  const [cur, ...rest] = answers;
  if (cur < 0 || cur >= current.options.length) return null;
  const points: Record<Style, number> = { S: 0, I: 0, W: 0 };
  const flags: Flag[] = [];
  for (let i = 0; i < questions.length; i++) {
    const opt = questions[i].options[rest[i]];
    if (!opt) return null;
    for (const k of Object.keys(opt.score) as Style[]) points[k] += opt.score[k] ?? 0;
    if (opt.flag && !flags.includes(opt.flag)) flags.push(opt.flag);
  }
  const total = points.S + points.I + points.W || 1;
  // Ties go to Intraday, the middle style, then Scalper.
  const order: Style[] = (['I', 'S', 'W'] as Style[]).sort((a, b) => points[b] - points[a]);
  const style = order[0];
  const second = order[1];
  const lean = points[style] - points[second] <= 3 && points[second] > 0 ? second : null;
  const raw = { S: (points.S / total) * 100, I: (points.I / total) * 100, W: (points.W / total) * 100 };
  // Whole numbers that still add up to 100.
  const percent = { S: Math.round(raw.S), I: Math.round(raw.I), W: 0 } as Record<Style, number>;
  percent.W = 100 - percent.S - percent.I;
  const c = currentStyle[cur];
  return { style, lean, percent, current: c, mismatch: c !== null && c !== style, flags };
}

// Fixed text, used when the AI is not available (and for the "On a gold chart" box, which is never AI).
// line: not used on the card any more. blocks: short blocks shown instead of the AI blocks. gold: the fixed chart scene.
// bulb: the one line on the share card when there is no mismatch.
export const styleCopy: Record<Style, { blocks: string[]; gold: string; bulb: string }> = {
  S: {
    blocks: [
      'You think and move fast. Short, sharp focus is your strength.',
      'Losses hit you quickly, so you need a model that wins often. That means small targets and quick exits.',
      'Your answers point the same way. You want a trade settled soon, and long waiting wears you down.',
      'In psychology this is your tilt threshold, simply how many losses you can take before your decisions change. Yours is low, and that is fine.',
    ],
    gold: 'Gold taps your order block and bounces 30 pips. Then it chops for two hours. A scalper is already out with the 30. Everyone else is watching it come back.',
    bulb: "My edge isn't patience. It's short, sharp focus.",
  },
  I: {
    blocks: [
      'You can sit with a trade for a session. You want it done before the day ends.',
      'Losses bother you, but they do not break your plan.',
      'Your answers show steady focus for a few hours, and some patience when the session gives you a clear answer.',
      'Your edge is patience inside one session, not across days.',
    ],
    gold: 'London pushes gold up. New York decides if it holds. An intraday trader rides the session and closes before bed.',
    bulb: 'I can sit through one session. Not through the night.',
  },
  W: {
    blocks: [
      'You do not need action to feel okay. You can hold a trade, sleep, and let the plan work.',
      'Losing streaks do not shake you much, and that is what swing trading needs.',
      'Your answers show calm with waiting, and a few quick checks a day are enough for you.',
      'Too many trades would turn that calm into noise.',
    ],
    gold: 'Gold sweeps a weekly low and wicks into a big order block. It holds. A swing trader buys it and lets the week do the work.',
    bulb: 'Fewer trades, bigger moves. My calm is my edge.',
  },
};

// The line on the share card, written as the person talking to their own followers.
export function cardLine(style: Style, cur: Style | null, mismatch: boolean): string {
  if (mismatch && cur) return `I've been trading ${styleTitle[cur].toLowerCase()}. My mind is built for ${styleTitle[style].toLowerCase()}. That explains a lot.`;
  return styleCopy[style].bulb;
}

// Blocks to show when the AI note is not available. Adds a short mismatch block when they trade another style now.
export function fallbackBlocks(style: Style, cur: Style | null, mismatch: boolean): string[] {
  const blocks = [...styleCopy[style].blocks];
  if (mismatch && cur) blocks.push(`You trade ${styleTitle[cur].toLowerCase()} now, but your answers fit ${styleTitle[style].toLowerCase()}. That mismatch can make trading feel harder than it should.`);
  return blocks;
}
