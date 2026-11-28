// Which lead magnet a newly confirmed subscriber gets. Pure logic, no API calls, so it can be tested on its own.
// One rule, as simple as the gold reel was:
//   - metadata.source is "style-test"  ->  the style test result email (unchanged, whatever the date).
//   - everyone else who confirms        ->  the reel welcome email, until it ends (reelWelcome.endsAt in config/email.ts).
// No referrer check, no Instagram check, no label check. After the end time everyone else gets nothing.
import { reelWelcome } from '../config/email';

export function sourceFor(sub: any, now: number = Date.now()): string {
  if (String(sub?.metadata?.source ?? '') === 'style-test') return 'style-test';
  return now < Date.parse(reelWelcome.endsAt) ? reelWelcome.source : '';
}
