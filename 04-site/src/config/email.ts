// Email list: Buttondown (newsletter username "aayushict"). Double opt-in is on, so every new reader
// gets a confirmation email first. The signup form posts straight to Buttondown's public form address.
// No API key is needed here and none must ever be added to the site. The key lives in .env and
// in Vercel's private settings only.
export const email = {
  action: 'https://buttondown.com/api/emails/embed-subscribe/aayushict' as string | null,
  prompt: 'Get the week ahead every Sunday. One email, plus big release briefings.',
  footerPrompt: 'The week ahead, every Sunday.',
  thanks: 'Check your inbox and tap the link to confirm.',
  error: 'That did not go through. Please try again in a moment.',
};
