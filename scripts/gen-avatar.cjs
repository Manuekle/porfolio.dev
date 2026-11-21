// Crops the supplied Golden Gate portrait into the site's square avatar.
// Run: node scripts/gen-avatar.cjs /path/to/new-pic.jpg
const path = require("path");
const sharp = require(path.join(__dirname, "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp"));

const root = path.join(__dirname, "..");
const source = process.argv[2];
if (!source) {
  console.error("Usage: node scripts/gen-avatar.cjs /path/to/new-pic.jpg");
  process.exit(1);
}

(async () => {
  const portrait = await sharp(source)
    .rotate()
    .extract({ left: 115, top: 760, width: 570, height: 570 })
    .resize(480, 480)
    .png()
    .toBuffer();
  await sharp(portrait).png().toFile(path.join(root, "public/assets/avatar.png"));
  await sharp(portrait).webp({ quality: 88 }).toFile(path.join(root, "public/assets/avatar.webp"));
  console.log("avatar.png + avatar.webp: 480 × 480");
})().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
