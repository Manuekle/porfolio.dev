// Regenerates the app icons from public/new-icon.png (the portfolio mark).
// Run: node scripts/gen-icons.cjs
const path = require("path");
const sharp = require(path.join(__dirname, "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp"));

const root = path.join(__dirname, "..");
const src = path.join(root, "public/new-icon.png");

// [file, size, rounded]. apple-touch stays square: iOS applies its own mask.
const RADIUS = 0.225;
const targets = [
  ["android-chrome-192x192.png", 192, true],
  ["android-chrome-512x512.png", 512, true],
  ["apple-touch-icon.png", 180, false],
  ["favicon-32x32.png", 32, true],
  ["favicon-16x16.png", 16, true],
];

(async () => {
  for (const [name, size, rounded] of targets) {
    let img = sharp(src).resize(size, size, { fit: "cover" });
    if (rounded) {
      const r = size * RADIUS;
      const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="#fff"/></svg>`);
      img = img.composite([{ input: mask, blend: "dest-in" }]);
    }
    await img.png().toFile(path.join(root, "public", name));
    console.log(name, size + "px");
  }
})();
