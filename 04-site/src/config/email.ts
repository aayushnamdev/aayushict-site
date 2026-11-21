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

// Reel lead magnets. A signup with this source gets this Buttondown email the moment they confirm.
// Buttondown calls /api/buttondown-hook on every confirm (webhook set up 21 Nov 2026). That route checks the
// subscriber's metadata.source and sends the matching email once. Email ids are not secret.
// Free plan note: Buttondown blocks new tags and automations on the free plan, so this is how we do it for free.
// Buttondown tag added when the lead magnet is sent (Basic plan, from 21 Nov 2026). Tag names: the API reads and writes names.
export const leadMagnetTags: Record<string, string> = {
  'gold-bounce': 'gold-reel', // tag id sub_tag_2n828bxfwg8bqrt0qxh4m1dsgm
};
export const leadMagnets: Record<string, string> = {
  'gold-bounce': 'em_113gn291vc908tar1c5cqqzrm8', // Gold bounce checklist, 21 Nov 2026 reel
};

// Upgrade alert. When confirmed subscribers reach this count, /api/buttondown-hook emails Aayush once
// (his own subscriber record, so no address is written here). Sent flag: metadata.alert_<threshold> on that record.
export const upgradeAlert = {
  threshold: 90,
  emailId: 'em_5x12fm1q3t8zm8adkpj9c01de7', // "Heads up: 90 confirmed subscribers"
  ownerSubscriberId: 'sub_5d6m8bq0rw840a4sybv35h40fg',
};
