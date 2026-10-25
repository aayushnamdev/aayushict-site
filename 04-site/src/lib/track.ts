// Click and signup events. Vercel Analytics is on (astro.config.mjs). Custom events only record on a Vercel plan
// that includes them. On other plans the call is harmless and nothing is stored.
type Va = (kind: 'event', data: { name: string; data?: Record<string, string> }) => void;

const send = (name: string, label: string) => {
  try {
    (window as unknown as { va?: Va }).va?.('event', { name, data: { label } });
  } catch {
    /* analytics must never break the page */
  }
};

export const trackCta = (label: string) => send('cta_click', label);
export const trackSignup = (source: string) => send('email_signup', source);
