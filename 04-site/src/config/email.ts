// Email list: Buttondown (newsletter username "aayushict"). Double opt-in is on, so every new reader
// gets a confirmation email first. The form posts to our own /api/subscribe route (src/pages/api/subscribe.ts),
// which talks to Buttondown with the private API key. The key lives in .env and in Vercel's
// environment settings only. It must never be written in the site code.
export const email = {
  action: '/api/subscribe' as string | null,
  prompt: 'Get the week ahead every Sunday. One email, plus big release briefings.',
  footerPrompt: 'The week ahead, every Sunday.',
  thanks: 'Check your inbox and tap the link to confirm.',
  error: 'That did not go through. Please try again in a moment.',
};
