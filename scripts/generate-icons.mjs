// Generates the site's icon assets from the app-icon source art:
//   AppIcon.icon/Assets/AppIcon 4.svg  (cow art, background lives in icon.json)
// Outputs (all in public/):
//   favicon.svg          — vector icon, rounded square + gradient background
//   favicon-96.png       — PNG fallback for browsers without SVG favicon support
//   apple-touch-icon.png — 180×180 full-bleed square (iOS applies its own mask)
// Run from the repo root: node scripts/generate-icons.mjs
//
// NOT generated: public/og-cover.png, the 1200×630 social-share card. That one
// is hand-made art (the cow next to a real screenshot) and is checked in as-is.
// This script used to build a plain icon-on-a-dark-band card; it doesn't
// anymore, so re-running it can't overwrite the good one.
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const ART_PATH = new URL('../AppIcon.icon/Assets/AppIcon 4.svg', import.meta.url);

// Background gradient from AppIcon.icon/icon.json (display-p3 values used as
// sRGB — close enough for these dark browns).
const GRADIENT_TOP = '#3B1F0E';
const GRADIENT_BOTTOM = '#1A0F08';
// iOS-style corner radius (~22.37% of the edge).
const CORNER = 229;

const artFile = await readFile(ART_PATH, 'utf8');
// Keep only the path data; the outer <svg> wrapper is replaced below.
const art = artFile.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

const defs = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1024" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${GRADIENT_TOP}"/>
      <stop offset="1" stop-color="${GRADIENT_BOTTOM}"/>
    </linearGradient>
  </defs>`;

// The art's viewBox is 1024×1026; nudge it up 1px so it centers in 1024².
const artGroup = `<g transform="translate(0,-1)">${art}</g>`;

const icon = (rx) => `<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
${defs}
  <rect width="1024" height="1024" rx="${rx}" fill="url(#bg)"/>
  ${artGroup}
</svg>`;

const roundedIcon = icon(CORNER);
const squareIcon = icon(0);

const out = (name) => new URL(`../public/${name}`, import.meta.url).pathname;

await writeFile(out('favicon.svg'), roundedIcon);
await sharp(Buffer.from(roundedIcon)).resize(96, 96).png().toFile(out('favicon-96.png'));
await sharp(Buffer.from(squareIcon)).resize(180, 180).png().toFile(out('apple-touch-icon.png'));

console.log('Wrote favicon.svg, favicon-96.png, apple-touch-icon.png');
