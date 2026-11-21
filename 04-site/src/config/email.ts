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
export const leadMagnets: Record<string, string> = {
  'gold-bounce': 'em_113gn291vc908tar1c5cqqzrm8', // Gold bounce checklist, 21 Nov 2026 reel
};
