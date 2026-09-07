// Crops public/assets/pic.PNG into a square portrait for the sidebar.
// Run: node scripts/gen-avatar.cjs
const path = require("path");
const sharp = require(path.join(__dirname, "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp"));

const root = path.join(__dirname, "..");

(async () => {
  await sharp(path.join(root, "public/assets/pic.PNG"))
    .extract({ left: 300, top: 190, width: 660, height: 660 })
    .resize(480, 480)
    .png({ quality: 90 })
    .toFile(path.join(root, "public/assets/avatar.png"));
  console.log("avatar.png 480px");
})();
