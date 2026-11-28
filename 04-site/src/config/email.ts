// Email list: Buttondown (newsletter username "aayushict"). Double opt-in is on, so every new reader
// gets a confirmation email first. The form posts to our own /api/subscribe route (src/pages/api/subscribe.ts),
// which talks to Buttondown with the private API key. The key lives in .env and in Vercel's
// environment settings only. It must never be written in the site code.
export const email = {
  action: '/api/subscribe' as string | null,
  prompt: 'Get the week ahead every Sunday. One email, plus big release briefings.',
  footerPrompt: 'The week ahead, every Sunday.',
  fine: 'One email on Sunday. Unsubscribe anytime.',
  thanks: 'Check your inbox and tap the link to confirm.',
  error: 'That did not go through. Please try again in a moment.',
};

// Lead magnets. A signup with this source gets this Buttondown email the moment they confirm.
// Buttondown calls /api/buttondown-hook on every confirm (webhook set up 21 Nov 2026). That route reads the
// subscriber's metadata.source and sends the matching email once. Email ids are not secret.
// The gold bounce checklist (source gold-bounce) was retired on 26 Nov 2026. It must never be sent again,
// so it is gone from here and the hook never guesses a source. Existing subscribers keep their gold-reel tag.
// A lead magnet that needs data saved on the subscriber (metadata key) is only sent when that key is there.
// style-test: the result email is built from the saved result, so no result means no email.
export const leadMagnetNeeds: Record<string, string> = {
  'style-test': 'st_style',
};
// The reel welcome email (Instagram bio link, Nov 2026). Those people sign up on Buttondown's own page, so they have no
// metadata.source. The hook (src/lib/leadmagnet.ts) treats a signup on that page that came from the Instagram link as this source.
// endsAt: the jobs number drops Fri 4 Dec 2026, 7 PM IST (13:30 UTC). After that the email is out of date, so it stops sending by itself.
export const reelWelcome = {
  source: 'reel-welcome',
  emailId: 'em_56apz81w708qa950qgrvh38sa6', // "Your jobs number breakdown is coming", status transactional
  endsAt: '2026-12-04T13:30:00Z',
};
export const leadMagnets: Record<string, string> = {
  [reelWelcome.source]: reelWelcome.emailId,
  'style-test': 'em_03tmhza14r94k8vc7tc90189sp', // Your trading style result. Built from the metadata the test saves (st_title, st_concepts, st_said, ...).
};

// Upgrade alert. When confirmed subscribers reach this count, /api/buttondown-hook emails Aayush once
// (his own subscriber record, so no address is written here). Sent flag: metadata.alert_<threshold> on that record.
export const upgradeAlert = {
  threshold: 90,
  emailId: 'em_5x12fm1q3t8zm8adkpj9c01de7', // "Heads up: 90 confirmed subscribers"
  ownerSubscriberId: 'sub_5d6m8bq0rw840a4sybv35h40fg',
};
