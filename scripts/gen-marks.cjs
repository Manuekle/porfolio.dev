// Builds the company and project marks under public/assets/logos/.
//
// Every mark is reduced to a single ink silhouette on a transparent field, so
// the page can tint it and none of them drag in a rounded plate or a brand
// colour that fights the paper. Run: node scripts/gen-marks.cjs
const fs = require("fs");
const path = require("path");
const sharp = require(path.join(__dirname, "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp"));

const root = path.join(__dirname, "..");
const SIZE = 256;

// mode:
//   alpha         source is already a shape on a transparent field
//   light-on-dark keep the light glyph sitting on a dark plate
//   dark-on-light keep the dark glyph sitting on a light plate
//   band          keep a mid tone, dropping both the plate and a lighter knockout
//   white-glyph   keep the unsaturated glyph knocked out of a colour plate
const MARKS = [
  // --- companies, schools, issuers -----------------------------------------
  {
    out: "orgs/gymrat.png",
    url: "https://gymratplus.com/icons/safari-pinned-tab.svg",
    mode: "alpha",
  },
  {
    out: "orgs/gymshark.png",
    url: "https://www.gymshark.com/images/safari-pinned-tab.svg",
    mode: "alpha",
  },
  {
    out: "orgs/smurfitkappa.png",
    url: "https://www.smurfitkappa.com/-/m/Images/Shared%20Assets/SW_LOGO_2COL.svg",
    mode: "alpha",
    // drop the navy wordmark group, keep the symbol
    svg: (s) => s.slice(0, s.indexOf('<g fill="#00205b">')) + "</svg>",
  },
  {
    out: "orgs/sena.png",
    url: "https://www.sena.edu.co/sena.png",
    mode: "band",
    lo: 40,
    hi: 205,
  },
  {
    out: "orgs/fup.png",
    url: "https://fup.edu.co/wp-content/uploads/cropped-FUP-removebg-preview-1-192x192.png",
    mode: "alpha",
  },

  // --- projects -------------------------------------------------------------
  {
    out: "projects/creagent.png",
    url: "https://creagent.fun/apple-icon.png",
    mode: "band",
    lo: 64,
    hi: 200,
    smooth: true,
  },
  {
    out: "projects/steve.png",
    url: "https://steve-manudev.vercel.app/icon.svg",
    mode: "light-on-dark",
    hi: 150,
  },
  {
    out: "projects/forge.png",
    // the star is a soft gradient, so key off saturation rather than luminance
    url: "https://forgems.vercel.app/logo.png",
    mode: "white-glyph",
    satMax: 150,
    smooth: true,
  },
  {
    out: "projects/gymrat.png",
    url: "https://gymratplus.com/icons/safari-pinned-tab.svg",
    mode: "alpha",
  },
  {
    out: "projects/sira.png",
    url: "https://sira-fup.online/icons/apple-touch-icon.png",
    mode: "dark-on-light",
    lo: 205,
  },
  {
    out: "projects/heymed.png",
    url: "https://heymed.fun/icons/favicon-180x180.png",
    mode: "light-on-dark",
    hi: 200,
    // a hairline trace vanishes at 30px, so fatten it before it is scaled down
    thicken: 3,
  },
  {
    out: "projects/hinomaru.png",
    url: "https://hinomaru.vercel.app/apple-touch-icon.png",
    mode: "dark-on-light",
    lo: 205,
  },
  {
    out: "projects/butterflyar.png",
    url: "https://raw.githubusercontent.com/Manuekle/butterflyar-mobile/HEAD/assets/icon/favicon.png",
    mode: "alpha",
  },
];

async function inkify(buf, mark) {
  // Padding added by `contain` must not be mistaken for artwork: transparent for
  // alpha marks, and the plate's own colour for the thresholded ones.
  const pad =
    mark.mode === "alpha"
      ? { r: 0, g: 0, b: 0, alpha: 0 }
      : mark.mode === "dark-on-light"
        ? "#ffffff"
        : "#000000";
  const base = sharp(buf, { density: 384 }).resize(SIZE, SIZE, { fit: "contain", background: pad });

  const { data } = await base.clone().ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  let alpha = Buffer.alloc(SIZE * SIZE);
  for (let i = 0; i < SIZE * SIZE; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const a = data[i * 4 + 3];

    if (mark.mode === "alpha") {
      alpha[i] = a;
      continue;
    }

    // composite onto the plate colour so transparent pixels read as background
    const bg = mark.mode === "dark-on-light" ? 255 : 0;
    const mix = (c) => Math.round((c * a + bg * (255 - a)) / 255);
    const cr = mix(r);
    const cg = mix(g);
    const cb = mix(b);
    const v = Math.round(0.299 * cr + 0.587 * cg + 0.114 * cb);
    const sat = Math.max(cr, cg, cb) - Math.min(cr, cg, cb);

    let keep;
    if (mark.mode === "light-on-dark") keep = v >= mark.hi;
    else if (mark.mode === "dark-on-light") keep = v <= mark.lo;
    else if (mark.mode === "white-glyph") keep = a > 200 && sat <= (mark.satMax ?? 26) && v >= (mark.hi ?? 0);
    else keep = v >= mark.lo && v <= mark.hi;
    alpha[i] = keep ? 255 : 0;
  }

  // Hairline artwork needs weight before it is scaled down to tile size.
  if (mark.thicken) {
    const rgbaThin = Buffer.alloc(SIZE * SIZE * 4);
    for (let i = 0; i < SIZE * SIZE; i++) rgbaThin[i * 4 + 3] = alpha[i];
    const fat = await sharp(rgbaThin, { raw: { width: SIZE, height: SIZE, channels: 4 } })
      .blur(mark.thicken)
      .ensureAlpha()
      .raw()
      .toBuffer();
    for (let i = 0; i < SIZE * SIZE; i++) alpha[i] = fat[i * 4 + 3] >= 28 ? 255 : 0;
  }

  // Halftoned sources leave speckled edges; blur then re-threshold to settle them.
  if (mark.smooth) {
    const rgbaSoft = Buffer.alloc(SIZE * SIZE * 4);
    for (let i = 0; i < SIZE * SIZE; i++) rgbaSoft[i * 4 + 3] = alpha[i];
    const soft = await sharp(rgbaSoft, { raw: { width: SIZE, height: SIZE, channels: 4 } })
      .blur(2.2)
      .ensureAlpha()
      .raw()
      .toBuffer();
    for (let i = 0; i < SIZE * SIZE; i++) alpha[i] = soft[i * 4 + 3] >= 128 ? 255 : 0;
  }

  const rgba = Buffer.alloc(SIZE * SIZE * 4);
  for (let i = 0; i < SIZE * SIZE; i++) rgba[i * 4 + 3] = alpha[i];

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
  if (maxX < 0) throw new Error("mark came out blank");

  const flat = sharp(rgba, { raw: { width: SIZE, height: SIZE, channels: 4 } }).extract({
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  });

  return flat
    .resize(SIZE, SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

(async () => {
  for (const mark of MARKS) {
    const res = await fetch(mark.url, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!res.ok) {
      console.error("FAIL", mark.out, res.status);
      continue;
    }
    let buf = Buffer.from(await res.arrayBuffer());
    if (mark.svg) buf = Buffer.from(mark.svg(buf.toString("utf8")));

    const png = await inkify(buf, mark);
    const dest = path.join(root, "public/assets/logos", mark.out);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, png);
    console.log(mark.out);
  }
})();
