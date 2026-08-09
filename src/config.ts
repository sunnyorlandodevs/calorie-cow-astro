// Until the custom domain is live, GitHub Pages serves the site under
// /calorie-cow-astro (the deploy workflow passes --base), so internal links
// and public/ assets must be prefixed with Astro's base to resolve.
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}

export const SITE = {
  name: 'Calorie Cownter',
  url: 'https://caloriecownter.com',
  description:
    'A warm, private calorie and macro tracker for iPhone and iPad. Type a meal, scan a barcode, or snap a photo and let AI do the math — no account, no ads, and your food diary stays in your own iCloud.',
  email: 'marco@sunnyorlando.dev',
};

// TODO(launch): drop the real App Store URL here once the app is live. The
// hero + footer badges read this — a real link is a one-line swap. Leaving it
// null keeps both badges non-clickable ("Coming soon") on purpose.
export const APP_STORE_URL: string | null = null;

// The waitlist is the site's only real call to action until the app ships, so
// it is the primary button in the hero and footer while APP_STORE_URL is null.
// Setting APP_STORE_URL hides the waitlist automatically — the two never show
// together, because "download it" beats "wait for it". Set this to null to drop
// the waitlist without waiting for launch.
export const WAITLIST_URL: string | null = 'https://forms.gle/4v8sgMYHDQ2J4smc7';

// Calorie Cow Pro — the optional subscription for unlimited AI photo scans.
// Everything else in the app is free. `price` stays null until the App Store
// Connect product is final; while it is null the site describes Pro without
// quoting a number, so we can never show a price that disagrees with Apple's.
// See ../CaloriePanda/docs/app-store/03-subscription.md.
export const PRO = {
  name: 'Calorie Cow Pro',
  freeScansPerDay: 3,
  price: null as string | null, // e.g. '$4.99/month'
  trialDays: 7,
};
