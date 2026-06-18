// Generates public/og-banner.png (1200x630) — brand card with the M icon + name.
// Run: node scripts/gen-og.cjs
const fs = require("fs");
const path = require("path");

const sharp = require(path.join(__dirname, "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp"));

const root = path.join(__dirname, "..");

// Icon: strip <svg> wrapper, recolor -> black for the white card.
let icon = fs.readFileSync(path.join(root, "public/favicon.svg"), "utf8");
icon = icon
  .replace(/<\?xml[\s\S]*?\?>/g, "")
  .replace(/<svg[^>]*>/, "")
  .replace(/<\/svg>/, "")
  .replace(/#000000|#ffffff/gi, "#0a0a0a");

const W = 1200;
const H = 630;
const bg = "#ffffff";
const black = "#0a0a0a";
const muted = "#555555";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${bg}"/>
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" rx="28" fill="none" stroke="rgba(10,10,10,0.12)" stroke-width="2"/>
  <g transform="translate(96,150) scale(0.42)" fill="${black}">${icon}</g>
  <text x="470" y="234" font-family="monospace" font-size="20" letter-spacing="4" fill="${muted}">/ portfolio 2026</text>
  <text x="468" y="338" font-family="Racleys" font-weight="800" font-size="92" letter-spacing="-3" fill="${black}">Manuel</text>
  <text x="468" y="430" font-family="Racleys" font-weight="800" font-size="92" letter-spacing="-3" fill="${black}">Erazo</text>
  <text x="472" y="492" font-family="Racleys" font-weight="500" font-size="32" fill="${muted}">Web &amp; AI Developer</text>
  <!-- CTA -->
  <rect x="470" y="528" width="306" height="62" rx="31" fill="${black}"/>
  <text x="503" y="567" font-family="Racleys" font-weight="600" font-size="26" fill="${bg}">view portfolio</text>
  <text x="726" y="567" font-family="Racleys" font-weight="600" font-size="26" fill="${bg}">&#8594;</text>
  <text x="804" y="567" font-family="monospace" font-size="18" letter-spacing="1" fill="${muted}">manudev.vercel.app</text>
</svg>`;

sharp(Buffer.from(svg))
  .png()
  .toFile(path.join(root, "public/og-banner.png"))
  .then((info) => console.log("og-banner.png", info.width + "x" + info.height, info.size + "b"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
