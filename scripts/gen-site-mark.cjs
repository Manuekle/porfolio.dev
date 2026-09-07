// Builds public/assets/mark.png — the portfolio mark with a transparent
// background, used as a CSS mask so it takes the current ink colour.
// Run: node scripts/gen-site-mark.cjs
const path = require("path");
const sharp = require(path.join(__dirname, "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp"));

const root = path.join(__dirname, "..");
const SIZE = 512;

(async () => {
  const src = sharp(path.join(root, "public/new-icon.png")).resize(SIZE, SIZE, { fit: "cover" });

  // The mark is dark on cream: invert luminance to get the alpha channel.
  const alpha = await src.clone().greyscale().negate().linear(1.6, -60).toColorspace("b-w").raw().toBuffer();

  const rgba = Buffer.alloc(SIZE * SIZE * 4);
  for (let i = 0; i < SIZE * SIZE; i++) {
    rgba[i * 4] = 0;
    rgba[i * 4 + 1] = 0;
    rgba[i * 4 + 2] = 0;
    rgba[i * 4 + 3] = alpha[i];
  }

  await sharp(rgba, { raw: { width: SIZE, height: SIZE, channels: 4 } })
    .trim({ threshold: 1 })
    .png()
    .toFile(path.join(root, "public/assets/mark.png"));

  console.log("mark.png", SIZE + "px");
})();
