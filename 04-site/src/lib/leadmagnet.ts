// Which lead magnet a newly confirmed subscriber gets. Pure logic, no API calls, so it can be tested on its own.
// 1. If the subscriber has their own metadata.source (every signup from the site forms does, for example style-test), that is the source.
// 2. If not, only ONE kind of signup is recognised: someone who joined through a Buttondown form (Buttondown's source is "organic",
//    or "embedded_form" for the same page posted another way) and arrived from the Instagram link (the referrer is l.instagram.com).
//    That is the reel welcome, until it ends. API signups are never matched: the site always gives them a metadata.source.
// Nothing else is guessed. A signup with no source that does not match gets no lead magnet.
import { reelWelcome } from '../config/email';

export function sourceFor(sub: any, now: number = Date.now()): string {
  const own = String(sub?.metadata?.source ?? '');
  if (own) return own;
  const viaButtondownForm = sub?.source === 'organic' || sub?.source === 'embedded_form';
  const fromInstagramLink = viaButtondownForm && String(sub?.referrer_url ?? '').startsWith('https://l.instagram.com/');
  return fromInstagramLink && now < Date.parse(reelWelcome.endsAt) ? reelWelcome.source : '';
}
