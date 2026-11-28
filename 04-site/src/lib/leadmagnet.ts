// Which lead magnet a newly confirmed subscriber gets. Pure logic, no API calls, so it can be tested on its own.
// 1. If the subscriber has their own metadata.source (every signup from the site forms does, for example style-test), that is the source.
// 2. If not, only ONE kind of signup is recognised: someone who joined on Buttondown's own page (Buttondown's source is "organic")
//    and arrived from the Instagram link (the referrer is l.instagram.com). That is the reel welcome, until it ends.
// Nothing else is guessed. A signup with no source that does not match gets no lead magnet.
import { reelWelcome } from '../config/email';

export function sourceFor(sub: any, now: number = Date.now()): string {
  const own = String(sub?.metadata?.source ?? '');
  if (own) return own;
  const fromInstagramLink = sub?.source === 'organic' && String(sub?.referrer_url ?? '').startsWith('https://l.instagram.com/');
  return fromInstagramLink && now < Date.parse(reelWelcome.endsAt) ? reelWelcome.source : '';
}
