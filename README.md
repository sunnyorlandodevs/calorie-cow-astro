# caloriecownter.com

Marketing landing site for **Calorie Cownter** (codebase name: CaloriePanda), a
warm, private calorie- and macro-tracking app for iPhone. Pure static
[Astro 5](https://astro.build) site, deployed to GitHub Pages on the custom
domain `caloriecownter.com`.

This repo is **only** the marketing site. It does not touch the iOS app or the
`caloriepanda-api` backend.

## Commands

```bash
npm install        # once
npm run dev        # dev server at http://localhost:4321
npm run build      # static build to dist/
npm run preview    # serve the built dist/ locally
```

There is no test suite — this is a static content site. "Verifying a change"
means `npm run build` succeeds and the pages look right in `npm run preview`.

## Structure

```
AppIcon.icon/        app-icon source art (Icon Composer; the SVG + background gradient)
Icon Exports/        composed 1024px PNG exports of the app icon (all iOS variants)
scripts/
  generate-icons.mjs regenerates the public/ icon assets from AppIcon.icon
public/
  CNAME              custom domain for GitHub Pages (caloriecownter.com)
  favicon.svg        real app icon (generated — don't hand-edit)
  favicon-96.png     PNG favicon fallback (generated)
  apple-touch-icon.png  180px home-screen icon (generated)
  og-default.png     social-preview card (generated)
src/
  config.ts          site name, description, email, APP_STORE_URL, PRO (price seam)
  styles/global.css  design tokens mirrored from the app's palette
  components/        Wordmark, Nav, Footer, PhoneShot
  layouts/           BaseLayout (head/meta + Nav + Footer)
  assets/
    screenshots/     real device captures (today, summary, widgets)
  pages/
    index.astro      landing page (hero / features / a look inside / privacy / how / FAQ)
    privacy.astro    Privacy Policy (stable URL for the App Store listing)
    terms.astro      Terms & Conditions
```

The landing page markup was ported from the Claude Design project
["Calorie app color system"](https://claude.ai/design/p/5c9fee3e-7dd5-446f-ad5b-0333dce14079)
(`Landing Page.dc.html`). The site renders in one deliberate light palette; the
dark privacy band, hero CTA, and footer bands are part of the design, so there is
no dark-mode flip.

### Screenshots

`src/assets/screenshots/*.png` are **real device captures**, rendered through
`components/PhoneShot.astro` (a bezel + Astro `<Image>`, which downscales them to
webp at build time — a ~700 kB PNG ships as ~25 kB). To refresh one, drop a new
capture over the same filename and rebuild; nothing else changes.

They must be re-shot whenever the app's visual design changes, or the site
markets a version that no longer exists. Capture rules that keep them usable:
mid-day state with real meals logged (an empty day hides the design), light mode,
and a full-height screenshot — `PhoneShot` adds the bezel, so don't include a
frame in the capture.

All three are current as of 2026-08-07 (`widgets.png` shows the shipping
full-bleed brown "Tinted" widgets).

The palette in `src/styles/global.css` is taken straight from the app's
`Assets.xcassets` colorsets (warm brown `action`, coral `aiAccent` for the AI
feature, dark warm-brown `#1D1B17` hero surface) so the site reads like the same
product.

## NOTES — manual steps before launch

The repo lives at `sunnyorlandodevs/calorie-cow-astro` and deploys via GitHub
Pages (Actions) on every push to `main` — currently served at
<https://sunnyorlandodevs.github.io/calorie-cow-astro/>. The deploy workflow
builds against whatever URL Pages reports, so it will switch to the custom
domain automatically once that's configured. Remaining steps for Marco:

1. **Custom domain + DNS**: add `caloriecownter.com` as the custom domain in the
   Pages settings (the `public/CNAME` file is already in place), then point DNS
   at GitHub Pages (A/AAAA records for the apex, or a CNAME for `www`).
2. **Swap in the real App Store URL**: set `APP_STORE_URL` in `src/config.ts`.
   The hero badge automatically turns into a working link; until then it shows a
   non-clickable "Coming soon" badge.
3. **Replace the remaining stubs** (see below).
4. **Legal review + dates**: fill the `[DATE PLACEHOLDER]` on `/privacy` and
   `/terms`, and the `[JURISDICTION PLACEHOLDER]` in `/terms`. Both pages carry a
   visible "Draft — pending legal review" banner until then.

## Stubs / placeholders to replace before launch

| What | Where | Notes |
|---|---|---|
| App Store URL | `src/config.ts` → `APP_STORE_URL` | Currently `null` → "Coming soon" badge (hero + footer) and a "Launching soon on iOS" note. |
| Pro price | `src/config.ts` → `PRO.price` | `null` → the site describes Calorie Cow Pro without quoting a number. Set it (e.g. `'$4.99/month'`) once the App Store product is final and the trial line appears too. |
| Legal dates / jurisdiction | `src/pages/{privacy,terms}.astro` | `[DATE PLACEHOLDER]`, `[JURISDICTION PLACEHOLDER]`. |
