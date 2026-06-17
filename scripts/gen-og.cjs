// Generates public/og-banner.png (1200x630) — brand card with the M icon + name.
// Run: node scripts/gen-og.cjs
const fs = require("fs");
const path = require("path");

const sharp = require(path.join(__dirname, "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp"));

const root = path.join(__dirname, "..");

// Icon: strip <svg> wrapper, recolor black -> light for the dark card.
let icon = fs.readFileSync(path.join(root, "public/favicon.svg"), "utf8");
icon = icon
  .replace(/<\?xml[\s\S]*?\?>/g, "")
  .replace(/<svg[^>]*>/, "")
  .replace(/<\/svg>/, "")
  .replace(/#000000/gi, "#efe9dc");

const W = 1200;
const H = 630;
const ink = "#13141a";
const light = "#efe9dc";
const muted = "#8a857a";
const accent = "#a82914";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${ink}"/>
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" rx="28" fill="none" stroke="rgba(239,233,220,0.14)" stroke-width="2"/>
  <g transform="translate(96,165) scale(0.42)" fill="${light}">${icon}</g>
  <text x="470" y="250" font-family="monospace" font-size="20" letter-spacing="6" fill="${accent}">/ PORTFOLIO 2026</text>
  <text x="468" y="356" font-family="Racleys" font-weight="800" font-size="92" letter-spacing="-3" fill="${light}">Manuel</text>
  <text x="468" y="448" font-family="Racleys" font-weight="800" font-size="92" letter-spacing="-3" fill="${light}">Erazo</text>
  <text x="472" y="510" font-family="Racleys" font-weight="500" font-size="32" fill="${muted}">Web &amp; AI Developer</text>
  <line x1="472" y1="544" x2="1130" y2="544" stroke="rgba(239,233,220,0.14)" stroke-width="1"/>
  <text x="472" y="582" font-family="monospace" font-size="18" letter-spacing="3" fill="${muted}">POPAYÁN, CO · SHIPPING SINCE 2021</text>
</svg>`;

sharp(Buffer.from(svg))
  .png()
  .toFile(path.join(root, "public/og-banner.png"))
  .then((info) => console.log("og-banner.png", info.width + "x" + info.height, info.size + "b"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
