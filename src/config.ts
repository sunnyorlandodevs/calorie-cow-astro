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
    'A warm, private calorie and macro tracker for iPhone. Start logging in seconds — no account, no ads, and your food diary stays in your own iCloud.',
  email: 'marco@sunnyorlando.dev',
};

// TODO(launch): drop the real App Store URL here once the app is live. The
// hero badge reads this — a real link is a one-line swap. Leaving it null
// keeps the badge non-clickable ("Coming soon") on purpose.
export const APP_STORE_URL: string | null = null;
