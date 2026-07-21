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
public/
  CNAME              custom domain for GitHub Pages (caloriecownter.com)
  favicon.svg        STUB favicon (placeholder cow)
src/
  config.ts          site name, nav, email, APP_STORE_URL (null until launch)
  styles/global.css  design tokens mirrored from the app's palette
  assets/icon.svg    STUB app icon (placeholder cow) — swappable
  components/        Wordmark, Nav, Footer, PhoneMockup
  layouts/           BaseLayout (head/meta + Nav + Footer)
  pages/
    index.astro      the landing page (hero / features / privacy / contact)
    privacy.astro    Privacy Policy (stable URL for the App Store listing)
    terms.astro      Terms & Conditions
```

The palette in `src/styles/global.css` is taken straight from the app's
`Assets.xcassets` colorsets (warm brown `action`, coral `aiAccent` for the AI
feature, dark warm-brown `#1D1B17` hero surface) so the site reads like the same
product.

## NOTES — manual steps before launch

This repo is committed locally but **not** pushed or wired to GitHub Pages yet.
Remaining steps for Marco:

1. **Create the GitHub repo** and push `main` (no repo exists yet — nothing was
   pushed).
2. **Enable GitHub Pages**: repo Settings → Pages → Source = **GitHub Actions**.
   The workflow in `.github/workflows/deploy.yml` deploys on every push to `main`.
3. **Custom domain + DNS**: add `caloriecownter.com` as the custom domain in the
   Pages settings (the `public/CNAME` file is already in place), then point DNS
   at GitHub Pages (A/AAAA records for the apex, or a CNAME for `www`).
4. **Swap in the real App Store URL**: set `APP_STORE_URL` in `src/config.ts`.
   The hero badge automatically turns into a working link; until then it shows a
   non-clickable "Coming soon" badge.
5. **Replace the stub assets** (see below).
6. **Legal review + dates**: fill the `[DATE PLACEHOLDER]` on `/privacy` and
   `/terms`, and the `[JURISDICTION PLACEHOLDER]` in `/terms`. Both pages carry a
   visible "Draft — pending legal review" banner until then.

## Stubs / placeholders to replace before launch

| What | Where | Notes |
|---|---|---|
| App icon | `src/assets/icon.svg` | Placeholder cow. Keep it square; the Wordmark + favicon reference it. |
| Favicon | `public/favicon.svg` | Placeholder cow. |
| Screenshot: Day view | `src/components/PhoneMockup.astro` (`variant="day"`) | Real screenshot of the logged-meals day view. |
| Screenshot: AI scan | `PhoneMockup.astro` (`variant="ai"`) | Real AI meal-scan result screen. |
| Screenshot: Apple Health | `PhoneMockup.astro` (`variant="health"`) | Real Health connection screen. |
| App Store URL | `src/config.ts` → `APP_STORE_URL` | Currently `null` → "Coming soon" badge. |
| Legal dates / jurisdiction | `src/pages/{privacy,terms}.astro` | `[DATE PLACEHOLDER]`, `[JURISDICTION PLACEHOLDER]`. |
| OG image | referenced as `/og-default.png` in `BaseLayout.astro` | Optional social-share image; not committed yet. |

Each `PhoneMockup` has a `TODO(launch)` comment showing exactly how to drop a
real screenshot in place of the stubbed screen.
