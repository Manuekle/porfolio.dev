# manudev — portfolio

Personal portfolio of Manuel Erazo. One quiet column: intro, three project cards that
stack while you scroll, categorized work, contributions, experience, activity and links. Bilingual (English at
`/`, Spanish at `/es/`), always in light mode.

Built with [Astro](https://astro.build) as plain `.astro` components: no UI
framework or CSS framework. Small scripts handle the canvas background, video
reduced-motion guard and services quote calculator.

## Pages

| Route | What it is |
| :---- | :--------- |
| `/`, `/es/` | Home: intro, selected projects, UI/UX, mobile, hackathons, contributions, experience, activity, links |
| `/services/`, `/es/services/` | What I build, pricing and the instant quote |
| `/banner` | Hidden preview and downloads for the generated English/Spanish OG assets (noindex) |

## Design

- **Type:** Myriad Pro for everything, regular weight (`400`), with light (`300`) for the role. The bundled regular, light, semibold and bold weights are self-hosted in
  `public/fonts/myriad-pro/`, converted from the user-supplied OTF files.
- **Colour:** blue and white light surfaces as CSS custom properties in
  `src/styles/home.css`, independent of the system theme.
- **Background:** an original animated WebGL canvas inspired by the flowing
  bands in [Melt](https://feralui.dev/gradients/melt), with a light reading area.
  It renders at up to 30 fps, pauses in hidden tabs, holds still for reduced
  motion and falls back to a CSS gradient when WebGL is unavailable.
- **Shape:** large outer corners (`--radius: 28px`) and 3px gaps between joined
  pieces (contact buttons, link pills, rows, tiles). Corners morph on press.
- **Motion:** state layers on hover and press, a short fade on the intro and
  the sticky card stack. Everything respects `prefers-reduced-motion`.

## Works

The three selected cards are **Oruka, Ragis and GymRat+**, in that order.
The card list is `WORK_CARDS` in `src/data/home.ts`; project facts come from
`PROJECTS` in `src/data/portfolio.ts`. `WORK_GROUPS` organizes the existing compact
rows into UI/UX, mobile apps and hackathon projects. `CONTRIBUTIONS` lists public
forks and merged pull requests separately, with links to their evidence.

A compact SVGL tool row sits below the profile header, matching the GitHub
README and using light-theme assets consistently. Oruka keeps its
live Instagram preview; Ragis uses a capture of its public landing page and
GymRat+ uses artwork from its own landing assets in the same media slot.
The other app scene components remain available for future content.

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
├── fonts/                Myriad Pro, Inter subset
├── new-icon.png          the "M" monogram (source for every icon)
└── assets/
    ├── works/            card media and app icons
    ├── logos/            org and project marks used in data
    ├── font/             legacy fonts; social assets use the main Myriad Pro font
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
node scripts/gen-icons.cjs      # (after gen-mark) favicons + apple-touch + android-chrome
uv run scripts/gen-mark.py       # Myriad "M" mark: new-icon.png + assets/mark.png
uv run scripts/gen-social.py    # English/Spanish OG + LinkedIn banner, using Myriad Pro
node scripts/gen-avatar.cjs     # public/assets/avatar.png
```

## Deploy

Static output. Drop `dist/` on Vercel, Netlify or Cloudflare Pages.

Social artwork is generated from the bundled portfolio font. Versioned English and
Spanish OG URLs keep share previews current; `public/og-banner.png` remains an
English compatibility copy. The LinkedIn banner is exported to
`output/linkedin/manuel-erazo-linkedin-banner.png` (1584 × 396).
