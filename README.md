# manudev — portfolio

Personal portfolio of Manuel Erazo. One quiet column: intro, project cards that
stack while you scroll, experience, activity and links. Bilingual (English at
`/`, Spanish at `/es/`), light and dark from the system setting.

Built with [Astro](https://astro.build) as plain `.astro` components: no UI
framework, no CSS framework, and only two small inline scripts (the video
reduced-motion guard and the services quote calculator).

## Pages

| Route | What it is |
| :---- | :--------- |
| `/`, `/es/` | Home: intro, works, more work, experience, activity, links |
| `/services/`, `/es/services/` | What I build, pricing and the instant quote |
| `/banner` | Hidden stage for rendering `public/og-banner.png` (noindex) |

## Design

- **Type:** Natadecoco for everything, one weight (`400`). It only covers ASCII,
  so accents, `ñ`, `¿ ¡` and dashes fall back to the Inter subset through
  `unicode-range`. Both live in `public/fonts/`.
- **Colour:** warm Material 3 surfaces as CSS custom properties in
  `src/styles/home.css`, swapped under `prefers-color-scheme: dark`.
- **Shape:** large outer corners (`--radius: 28px`) and 3px gaps between joined
  pieces (contact buttons, link pills, rows, tiles). Corners morph on press.
- **Motion:** state layers on hover and press, a short fade on the intro and
  the sticky card stack. Everything respects `prefers-reduced-motion`.

## Works

The card list is `WORK_CARDS` in `src/data/home.ts`; project facts (name, logo,
links) come from `PROJECTS` in `src/data/portfolio.ts`. Every other project is a
text row under "More" (`MORE_WORK`).

Each card shows a live part of its app, ported from that app's own source, in
`src/components/home/apps/`:

| Card | Component | Ported from |
| :--- | :-------- | :---------- |
| Oruka | `OrukaPhone.astro` | the Instagram comment-automation preview (comment sheet, then DM) in the iPhone 17 frame |
| Cue | `CueMac.astro` | the hero of Cue's site: MacBook, Meet call and the notch prompter with its 3-2-1 loop |
| Focus | `FocusDemo.astro` | the Rotoscope demo (character, reference video, result) |
| KanaGO! | `KanaFilm.astro` | the tour on KanaGO!'s site: real app screens, kanji and Kana-chan |

Their media and app icons live in `public/assets/works/<project>/`. Focus's
Rotoscope media (Reze, *Chainsaw Man*) and the Porkys font are used with
permission for non-commercial demonstration only.

## Structure

```
src/
├── components/home/
│   ├── Home.astro        home page
│   ├── Scene.astro       picks a card's live app part
│   ├── Services.astro    services page and quote calculator
│   └── apps/             OrukaPhone, CueMac, FocusDemo, KanaFilm
├── data/
│   ├── home.ts           home copy, work cards, timelines
│   ├── portfolio.ts      profile, projects, experience, services and pricing
│   └── brands.ts         generated Simple Icons paths (CC0-1.0)
├── layouts/HomeLayout.astro   head, SEO, Open Graph, JSON-LD
├── pages/                index, services, es/*, banner
├── scripts/og-download.ts     PNG export for /banner
└── styles/home.css
public/
├── fonts/                Natadecoco, Inter subset
├── new-icon.png          the portfolio mark (source for every icon)
└── assets/
    ├── works/            card media and app icons
    ├── logos/            org and project marks used in data
    ├── font/             Cooper and Inter, used only by /banner
    └── CV_Manuel_Erazo_{ES,EN}.pdf
```

## Commands

| Command            | Action                         |
| :----------------- | :----------------------------- |
| `pnpm install`     | Install dependencies           |
| `pnpm dev`         | Dev server at `localhost:4321` |
| `pnpm build`       | Build to `./dist/`             |
| `pnpm preview`     | Preview prod build locally     |
| `pnpm astro check` | TypeScript + Astro diagnostics |

## Assets

```bash
node scripts/gen-logos.mjs      # src/data/brands.ts from Simple Icons
node scripts/gen-icons.cjs      # favicons + apple-touch + android-chrome
node scripts/gen-site-mark.cjs  # public/assets/mark.png
node scripts/gen-og.cjs         # public/og-banner.png from the mark
node scripts/gen-avatar.cjs     # public/assets/avatar.png
```

## Deploy

Static output. Drop `dist/` on Vercel, Netlify or Cloudflare Pages.
