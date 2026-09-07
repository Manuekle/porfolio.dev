// Generates public/og-banner.png (1200x630) from the portfolio mark.
// Run: node scripts/gen-og.cjs
const path = require("path");
const sharp = require(path.join(__dirname, "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp"));

const root = path.join(__dirname, "..");

const W = 1200;
const H = 630;
const PAPER = "#e9e7de";
const INK = "#1a1917";
const MUTED = "#78746a";
const RULE = "rgba(26,25,23,0.14)";

const text = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <line x1="80" y1="470" x2="${W - 80}" y2="470" stroke="${RULE}" stroke-width="1"/>
  <text x="80" y="410" font-family="Georgia, 'Times New Roman', serif" font-size="72" font-weight="400"
        letter-spacing="-3.6" fill="${INK}">Manuel Erazo</text>
  <text x="80" y="518" font-family="Helvetica, Arial, sans-serif" font-size="28" font-weight="400"
        fill="${MUTED}">Desarrollador Full-Stack &amp; IA · Next.js · TypeScript · LLMs</text>
  <text x="${W - 80}" y="518" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="24"
        fill="${MUTED}">manudev.vercel.app</text>
</svg>`;

(async () => {
  const mark = await sharp(path.join(root, "public/new-icon.png"))
    .resize(180, 180, { fit: "cover" })
    .png()
    .toBuffer();

  await sharp(Buffer.from(text))
    .composite([{ input: mark, top: 120, left: 80 }])
    .png()
    .toFile(path.join(root, "public/og-banner.png"));

  console.log("og-banner.png", `${W}x${H}`);
})();
