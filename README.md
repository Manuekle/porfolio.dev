# manuelerazo.dev — portfolio

Personal portfolio of Manuel Erazo. Anime / ASCII / Japanese-minimal aesthetic. Bilingual (EN / ES). Three paper themes (warm cream, cool gray, ink dark — default ink).

Built with [Astro](https://astro.build) + React islands + TypeScript + Tailwind v4.

## Stack

- **Astro 6** — static output, near-zero JS for non-interactive sections.
- **React 19** — interactive shell (lang/theme toggles, project modal, FAQ accordion, method stepper).
- **Tailwind v4** + custom CSS tokens for warm-paper / sumi-red palette + paper-grain layer.
- Fonts via Google Fonts: Shippori Mincho, Noto Serif JP, Inter, JetBrains Mono.

## Commands

| Command         | Action                                           |
| :-------------- | :----------------------------------------------- |
| `pnpm install`  | Install dependencies                             |
| `pnpm dev`      | Dev server at `localhost:4321`                   |
| `pnpm build`    | Build to `./dist/`                               |
| `pnpm preview`  | Preview prod build locally                       |
| `pnpm astro check` | TypeScript + Astro diagnostics                |

## Structure

```
src/
├── components/         React islands
│   ├── App.tsx         root state (lang, paper tone, project modal)
│   ├── ascii.tsx       AsciiArt, SectionHead, StatusPill
│   ├── ProjectDialog.tsx
│   └── sections/       Hero, NowStrip, AboutBento, Experience, Projects, Stack, Method, Services, FAQ, Testimonials, Contact
├── data/portfolio.ts   bilingual copy + projects + experience + testimonials + stack
├── layouts/Layout.astro
├── pages/index.astro
└── styles/global.css   tokens, paper grain, reveal anims, responsive
public/assets/          avatar.jpg + CV PDFs (EN/ES)
```

## Theme + lang

Persisted in `localStorage` under `portfolio.tweaks`. Theme toggle cycles `warm → cool → ink` on the floating top-right button. Lang toggle is the EN/ES pill next to it.

## Deploy

Static output. Drop `dist/` on Vercel / Netlify / Cloudflare Pages.
