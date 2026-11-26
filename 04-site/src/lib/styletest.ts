// Trading style test (/test). Questions, scoring and the fixed text for each style.
// Built 26 Nov 2026 from Aayush's own experience across swing, intraday and scalping.
// The code decides the style. The AI note (api/style-test.ts) only explains it and can never change it.

export type Style = 'S' | 'I' | 'W';
export type Flag = 'revenge' | 'rulehop' | 'boredom';

export interface Option {
  label: string;
  score: Partial<Record<Style, number>>;
  flag?: Flag;
}
export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export const styleName: Record<Style, string> = { S: 'Scalper', I: 'Intraday', W: 'Swing' };

// Question 0 is not scored. It is what they trade now, for the mismatch line.
export const current: Question = {
  id: 'current',
  text: 'First, what style do you trade right now?',
  options: [
    { label: 'Scalping (1 minute, trades last minutes)', score: {} },
    { label: 'Intraday (5 or 15 minute, closed the same day)', score: {} },
    { label: 'Swing (1 hour or 4 hour, held for days)', score: {} },
    { label: 'Still figuring it out', score: {} },
  ],
};
export const currentStyle: (Style | null)[] = ['S', 'I', 'W', null];

export const questions: Question[] = [
  {
    id: 'tilt',
    text: 'After how many losses in a row do you start hunting for trades, sizing up, or wanting it all back in one trade?',
    options: [
      { label: '1 or 2 losses', score: { S: 2 } },
      { label: '3 losses', score: { I: 2 } },
      { label: '4 or more, I stay calm', score: { W: 2 } },
    ],
  },
  {
    id: 'days',
    text: 'You had two losing days in a row. Day three feels like:',
    options: [
      { label: 'I need to win it back today', score: { S: 2 }, flag: 'revenge' },
      { label: 'Tense, but I follow my plan', score: { I: 2 } },
      { label: 'Normal, losing days happen', score: { W: 2 } },
    ],
  },
  {
    id: 'sleep',
    text: 'Your trade is in profit, but the target is still far. You have to sleep. You:',
    options: [
      { label: 'Close it now', score: { S: 2 } },
      { label: 'Keep checking my phone', score: { I: 2 } },
      { label: 'Set my stop and sleep fine', score: { W: 2 } },
    ],
  },
  {
    id: 'ambiguity',
    text: 'Perfect setup. But price does nothing for 40 minutes, while a similar pair moves. You feel:',
    options: [
      { label: 'Angry, it should have worked', score: { S: 2 } },
      { label: 'Annoyed, but I wait', score: { I: 2 } },
      { label: 'Fine, trades need time', score: { W: 2 } },
    ],
  },
  {
    id: 'missed',
    text: 'You looked away for 2 minutes. Your setup triggered without you. Then:',
    options: [
      { label: 'It stays in my head all session', score: { S: 2 } },
      { label: 'I am annoyed for a bit', score: { I: 2 } },
      { label: 'Another one will come', score: { W: 2 } },
    ],
  },
  {
    id: 'focus',
    text: 'What kind of focus feels natural to you?',
    options: [
      { label: '30 minutes of full focus, then done', score: { S: 2 } },
      { label: '2 to 3 hours of steady watching', score: { I: 2 } },
      { label: 'A few quick checks a day', score: { W: 2 } },
    ],
  },
  {
    id: 'time',
    text: 'How much live chart time do you really have on a weekday?',
    options: [
      { label: 'Under 1 hour', score: { S: 1, W: 1 } },
      { label: '1 to 3 hours in one session', score: { I: 2 } },
      { label: 'Only a few minutes, a few times a day', score: { W: 2 } },
    ],
  },
  {
    id: 'triangle',
    text: 'If you could pick only one, which would you choose?',
    options: [
      { label: 'Win 7 of 10 trades, small wins', score: { S: 2 } },
      { label: 'Win 5 of 10, wins are 2 times the losses', score: { I: 2 } },
      { label: 'Win 4 of 10, wins are 3 to 4 times the losses, few trades a month', score: { W: 2 } },
    ],
  },
  {
    id: 'frequency',
    text: 'Taking only 2 or 3 trades a week sounds:',
    options: [
      { label: 'Impossible, I need daily action', score: { S: 2 } },
      { label: 'Too slow, I want one a day', score: { I: 2 } },
      { label: 'Perfect', score: { W: 2 } },
    ],
  },
  {
    id: 'giveback',
    text: 'Your trade reached 1R in profit, then came back to break even. You think:',
    options: [
      { label: 'I should have closed, I will take profit faster', score: { S: 2 } },
      { label: 'Part of the game', score: { I: 2 } },
      { label: 'Normal, trades need room', score: { W: 2 } },
    ],
  },
  {
    id: 'rules',
    text: 'Three losses in a row with your system. You:',
    options: [
      { label: 'Change my target or stop size right away', score: {}, flag: 'rulehop' },
      { label: 'Check my journal, but keep the rules', score: { I: 2 } },
      { label: 'Keep going, 3 losses is nothing', score: { W: 2 } },
    ],
  },
  {
    id: 'boredom',
    text: 'You are down today, and no setup has come for 45 minutes. You:',
    options: [
      { label: 'Start seeing setups that are not really there', score: { S: 2 }, flag: 'boredom' },
      { label: 'Wait, but feel itchy', score: { I: 2 } },
      { label: 'Close the chart, tomorrow is fine', score: { W: 2 } },
    ],
  },
  {
    id: 'speed',
    text: 'When price moves really fast, big candles in seconds, you:',
    options: [
      { label: 'Feel alive and decide fast', score: { S: 2 } },
      { label: 'Manage, but I prefer slower', score: { I: 2 } },
      { label: 'Get stressed and make mistakes', score: { W: 2 } },
    ],
  },
  {
    id: 'evening',
    text: 'The evening after a losing trade:',
    options: [
      { label: 'I replay it all night', score: { S: 2 } },
      { label: 'It bothers me for an hour', score: { I: 2 } },
      { label: 'Forgotten by dinner', score: { W: 2 } },
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

// Fixed text. Used on the share card, and as the full note if the AI is not available.
export const styleCopy: Record<Style, { line: string; note: string; tips: string[] }> = {
  S: {
    line: 'Short, sharp focus. Small targets. In and out.',
    note:
      'Your mind works best in short bursts. Losses hit you hard and fast, so you need a model that wins often. That means small targets, quick exits, and very little waiting. In psychology this is called your tilt threshold. Simply, how many losses you can take before your decisions change. Yours is low, and that is fine. You just need a style built around it.',
    tips: ['Set one short trading window and close the chart after it.', 'Stop for the day after your second loss, no exceptions.', 'Take profit at the first area of resistance.'],
  },
  I: {
    line: 'Steady focus for one session. Trades closed the same day.',
    note:
      'You can sit with a trade for an hour or two, but you want it done by the end of the day. Losses bother you, but they do not break your plan. You handle some waiting, as long as the session gives you a clear answer. Your edge is patience inside one session, not across days.',
    tips: ['Pick one session and trade only that.', 'Keep a fixed daily loss limit, decided before the open.', 'Do not change your rules after one bad day.'],
  },
  W: {
    line: 'Calm with waiting. Bigger moves, fewer trades.',
    note:
      'You do not need action to feel okay. You can hold a trade, sleep, and let the plan work. Losing streaks do not shake you much, and that is exactly what swing trading needs. Your edge is patience across days. Too many trades would only turn that edge into noise.',
    tips: ['Check your charts at fixed times, not all day.', 'Plan for losing streaks before they come.', 'Size small enough to sleep with the trade open.'],
  },
};
