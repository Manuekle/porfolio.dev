// Regenerates raster app icons from public/favicon.svg (white circle + black logo).
// Run: node scripts/gen-icons.cjs
const path = require("path");
const sharp = require(path.join(__dirname, "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp"));

const root = path.join(__dirname, "..");
const src = path.join(root, "public/favicon.svg");

const targets = [
  ["android-chrome-192x192.png", 192],
  ["android-chrome-512x512.png", 512],
  ["apple-touch-icon.png", 180],
  ["favicon-32x32.png", 32],
  ["favicon-16x16.png", 16],
];

(async () => {
  for (const [name, size] of targets) {
    await sharp(src, { density: 384 })
      .resize(size, size)
      .png()
      .toFile(path.join(root, "public", name));
    console.log(name, size + "px");
  }
})();
