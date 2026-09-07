// Builds the company and project marks under public/assets/logos/.
//
// Every mark is reduced to a single ink silhouette on a transparent field, so
// the page can tint it and none of them drag in a rounded plate or a brand
// colour that fights the paper. Run: node scripts/gen-marks.cjs
//
// Sources are the artwork in public/assets/experience/ wherever we have it, and
// the organisation's own published icon otherwise.
const fs = require("fs");
const path = require("path");
const sharp = require(path.join(__dirname, "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp"));

const root = path.join(__dirname, "..");
const src = (name) => path.join(root, "public/assets/experience", name);
const SIZE = 256;

// Each mark says which pixels are the glyph. `plate` is what the artwork sits
// on, so padding and transparency get keyed out rather than mistaken for art:
//   vMin/vMax      luminance window
//   satMin/satMax  saturation window — separates a white glyph from a colour plate
//   alphaMin       require real opacity, for art already on a transparent field
const MARKS = [
  // --- companies, schools, issuers -----------------------------------------
  { out: "orgs/gymrat.png", file: src("gymratplus.png"), plate: "dark", vMin: 170 },
  { out: "orgs/gymshark.png", file: src("gymshark.png"), plate: "light", vMax: 210 },
  { out: "orgs/smurfitkappa.png", file: src("smurtfit.jpeg"), plate: "dark", vMin: 95 },
  {
    // green disc with the figure and wordmark knocked out of it
    out: "orgs/sena.png",
    url: "https://www.sena.edu.co/sena.png",
    plate: "dark",
    vMin: 40,
    vMax: 205,
  },
  {
    out: "orgs/fup.png",
    url: "https://fup.edu.co/wp-content/uploads/cropped-FUP-removebg-preview-1-192x192.png",
    plate: "transparent",
    alphaMin: 90,
  },

  // --- projects -------------------------------------------------------------
  {
    // orange hexagon on a transparent field, eyes knocked out in white
    out: "projects/creagent.png",
    file: src("creagent.png"),
    plate: "transparent",
    alphaMin: 140,
    vMax: 215,
    smooth: true,
  },
  { out: "projects/steve.png", file: src("steve.svg"), plate: "light", vMax: 205 },
  {
    // the star is a soft gradient, so key off saturation rather than luminance
    out: "projects/forge.png",
    file: src("forge.png"),
    plate: "transparent",
    alphaMin: 200,
    satMax: 150,
    smooth: true,
  },
  { out: "projects/gymrat.png", file: src("gymratplus.png"), plate: "dark", vMin: 170 },
  {
    // experience/sira.png is the university crest, not SIRA's own — using it
    // here would print the same mark twice, so this is the app's own icon
    // (vendored from sira-fup.online, whose host is unreliable)
    out: "projects/sira.png",
    file: src("sira-app.png"),
    plate: "light",
    vMax: 205,
  },
  {
    // a hairline trace vanishes at 30px, so fatten it before it is scaled down
    // (vendored from heymed.fun, whose host is unreliable)
    out: "projects/heymed.png",
    file: src("heymed.png"),
    plate: "dark",
    vMin: 200,
    thicken: 3,
  },
  { out: "projects/hinomaru.png", file: src("hinomaru.png"), plate: "light", vMax: 205 },
  { out: "projects/butterflyar.png", file: src("butterfly.png"), plate: "transparent", alphaMin: 90 },
];

const PLATE = { dark: "#000000", light: "#ffffff", transparent: { r: 0, g: 0, b: 0, alpha: 0 } };

async function inkify(buf, mark) {
  const base = sharp(buf, { density: 384 }).resize(SIZE, SIZE, {
    fit: "contain",
    background: PLATE[mark.plate],
  });
  const { data } = await base.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const bg = mark.plate === "light" ? 255 : 0;
  const alpha = Buffer.alloc(SIZE * SIZE);

  for (let i = 0; i < SIZE * SIZE; i++) {
    const a = data[i * 4 + 3];
    if (a < (mark.alphaMin ?? 1)) continue;

    // composite onto the plate colour so semi-transparent pixels read correctly
    const mix = (c) => Math.round((c * a + bg * (255 - a)) / 255);
    const r = mix(data[i * 4]);
    const g = mix(data[i * 4 + 1]);
    const b = mix(data[i * 4 + 2]);
    const v = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    const sat = Math.max(r, g, b) - Math.min(r, g, b);

    if (v < (mark.vMin ?? 0) || v > (mark.vMax ?? 255)) continue;
    if (sat < (mark.satMin ?? 0) || sat > (mark.satMax ?? 255)) continue;
    alpha[i] = 255;
  }

  const rethreshold = async (radius, cut) => {
    const rgba = Buffer.alloc(SIZE * SIZE * 4);
    for (let i = 0; i < SIZE * SIZE; i++) rgba[i * 4 + 3] = alpha[i];
    const out = await sharp(rgba, { raw: { width: SIZE, height: SIZE, channels: 4 } })
      .blur(radius)
      .ensureAlpha()
      .raw()
      .toBuffer();
    for (let i = 0; i < SIZE * SIZE; i++) alpha[i] = out[i * 4 + 3] >= cut ? 255 : 0;
  };

  // Hairline artwork needs weight before it is scaled down to tile size.
  if (mark.thicken) await rethreshold(mark.thicken, 28);
  // Halftoned sources leave speckled edges; blur then re-threshold to settle them.
  if (mark.smooth) await rethreshold(2.2, 128);

  // Crop to the ink itself so every mark ends up optically the same weight.
  let minX = SIZE, minY = SIZE, maxX = -1, maxY = -1;
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (alpha[y * SIZE + x] > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) throw new Error(`${mark.out}: mark came out blank`);

  const rgba = Buffer.alloc(SIZE * SIZE * 4);
  for (let i = 0; i < SIZE * SIZE; i++) rgba[i * 4 + 3] = alpha[i];

  return sharp(rgba, { raw: { width: SIZE, height: SIZE, channels: 4 } })
    .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
    .resize(SIZE, SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

(async () => {
  for (const mark of MARKS) {
    let buf;
    if (mark.file) {
      buf = fs.readFileSync(mark.file);
    } else {
      // A remote source can be down; keep the mark already on disk rather than
      // failing the whole run.
      try {
        const res = await fetch(mark.url, { headers: { "user-agent": "Mozilla/5.0" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        buf = Buffer.from(await res.arrayBuffer());
      } catch (err) {
        console.error("SKIP", mark.out, "-", err.message);
        continue;
      }
    }

    const png = await inkify(buf, mark);
    const dest = path.join(root, "public/assets/logos", mark.out);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, png);
    console.log(mark.out, mark.file ? "(local)" : "(fetched)");
  }
})();
