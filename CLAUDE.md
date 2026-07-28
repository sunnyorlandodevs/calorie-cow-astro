# CLAUDE.md

Guidance for Claude Code working in this repo. It is the marketing website for
**Calorie Cownter** (the iOS app whose codebase name is CaloriePanda). Read this
before editing.

## What this is / what it is NOT

- A **pure static [Astro 5](https://astro.build) marketing site** for
  `caloriecownter.com`, deployed to GitHub Pages. Three pages: a landing page,
  `/privacy`, and `/terms`.
- It is **only** the website. It does **not** contain, import, or touch the iOS
  app (`../CaloriePanda`) or the backend (`../caloriepanda-api`). Never change
  those from here. You may *read* them to keep facts accurate (see below).
- No CMS, no React, no blog/RSS, no server routes, no adapter. Keep it static.
  (The reference project `../marcoledesma/marcoledesma-site` uses Keystatic +
  React — do **not** copy that here.)

## Commands

```bash
npm install        # once
npm run dev        # dev server at http://localhost:4321
npm run build      # static build to dist/
npm run preview    # serve the built dist/ locally
```

There is no test suite — this is a static content site. "Verifying a change"
means `npm run build` succeeds and the page looks right in `npm run preview`
(check all three routes return 200).

## Architecture

- `src/layouts/BaseLayout.astro` — the HTML shell: `<head>`/SEO/OG + Google
  Fonts, then `<Nav />`, `<main><slot/></main>`, `<Footer />`. Every page uses it.
- `src/components/` — `Wordmark` (🐄 badge lockup), `Nav` (top bar, links are
  root-anchored `/#features` so they work from the legal pages), `Footer` (dark
  "Ready to start cownting?" CTA band + bottom strip). Nav and Footer are
  **site-wide** — they render on the legal pages too.
- `src/pages/` — `index.astro` (hero / features / how it works / FAQ),
  `privacy.astro`, `terms.astro`.
- `src/config.ts` — `SITE` (name, url, description, email) and `APP_STORE_URL`.
- `src/styles/global.css` — design tokens + shared primitives (`.prose`,
  `.draft-note`, buttons). Legal pages lean on `.prose`.

The landing page was ported from the Claude Design project **"Calorie app color
system"** (`Landing Page.dc.html`,
https://claude.ai/design/p/5c9fee3e-7dd5-446f-ad5b-0333dce14079). To re-sync
from that project, use the **DesignSync** MCP tool (read `Landing Page.dc.html`,
then re-port) — the design file uses proprietary `<x-dc>` / `sc-if` / `sc-for`
directives that must be translated to Astro + native HTML by hand.

## Conventions & gotchas

- **Palette mirrors the app.** Tokens in `global.css` come straight from the
  app's `Assets.xcassets` colorsets (warm brown `action` `#664428`, coral
  `aiAccent` `#DA8868` for the AI feature only, dark warm-brown `#1D1B17`).
  Short aliases (`--soft`, `--ink2`, `--deep`, `--tan`, `--aisoft`, `--dark`)
  map 1:1 to the design's token names so ported inline styles resolve. Change a
  color once here.
- **Light-only, on purpose.** There is no dark-mode flip. The design is a
  deliberate light composition with baked-in dark hero-CTA and footer bands.
  Don't reintroduce `prefers-color-scheme` overrides.
- **FAQ is CSS-only.** The accordion uses native `<details name="faq">` (one
  open at a time, first item `open`) with a `[open]` icon swap. No JavaScript —
  keep it that way.
- **App Store seam.** `APP_STORE_URL` in `config.ts` is `null` until launch,
  which renders a non-clickable "Coming soon" badge in both the hero and the
  footer. Setting it to the real URL turns both into working links — a one-line
  swap. Do not add a price or a buy/subscribe button (there is no working
  purchase yet; subscription is a soft "coming soon" only).
- **Fonts:** Nunito (up to weight 900 for headings) + JetBrains Mono (mono
  labels/kickers), loaded via the `@import` in `global.css`.

## CRITICAL: legal pages must match real data flows

`privacy.astro` and `terms.astro` describe how the app actually handles data.
Do **not** overstate privacy or invent claims. When editing them (or any privacy
copy on the landing page / FAQ), keep them true to the verified flows:

- **Account is optional**, only Sign in with Apple, only for AI features. The
  backend stores the Apple stable id, plus email (may be an Apple relay) and
  name if Apple provides them. No password.
- **AI meal scanning**: the photo or text description goes to the backend, which
  forwards it to **Anthropic (Claude)** to estimate nutrition. The image is
  processed transiently and **not stored** server-side.
- **Barcodes** → backend → **Open Food Facts** lookup. No account, no AI.
- **Subscriptions** handled by Apple/StoreKit via **RevenueCat**; the backend
  only mirrors entitlement status. No card details reach us.
- **Usage ledger**: per-scan counts/model/tokens/cost/timing only — NOT the food
  diary, NOT the image.
- **Stays on device / in the user's own iCloud**: the entire food diary
  (SwiftData + CloudKit private DB) and all Apple Health data (only a local
  "connected" flag exists).
- **No ads, no third-party analytics/tracking** in the app or on this site.

Both legal pages carry a visible "Draft — pending legal review" banner and
`[DATE PLACEHOLDER]` / `[JURISDICTION PLACEHOLDER]` markers until Marco fills
them. Leave the banner until he says legal review is done.

## Branches & deploy

`main` is **production** — pushing to it publishes the live site. There is no QA
branch here yet (unlike `../CaloriePanda` and `../caloriepanda-api`, where
`develop` = QA and `main` = production). Until one exists, do feature work on a
short-lived branch and merge to `main` only when it's ready to be public.

GitHub Pages via `.github/workflows/deploy.yml` (Node 22, `npm ci`, `astro
build`, upload `dist/`) on push to `main`. Custom domain: `public/CNAME`
(`caloriecownter.com`) + `site:` in `astro.config.mjs`. See the README's
"NOTES — manual steps before launch" for the remaining manual setup (create repo,
enable Pages, DNS, swap stubs, legal dates).

## Writing voice

Marketing and legal copy follow Marco's clarity rules: plain English,
benefit-first, a little playful (cow motif) but not silly; no corporate jargon,
no filler. Never use the word "honest"/"honestly".
