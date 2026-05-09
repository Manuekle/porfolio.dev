import type { ProjectArt } from "../data/portfolio";

export const ASCII_ART: Record<ProjectArt, string[]> = {
  gym: [
    "  ┌─────────────┐  ",
    "  │ ●●  GymRat+ │  ",
    "  │             │  ",
    "  │  ▮▮▮ ─── ▮  │  ",
    "  │  ▮▮▮ ─── ▮  │  ",
    "  └─────────────┘  ",
    "    ╲╱       ╲╱    ",
  ],
  sira: [
    "                    ",
    "    ╭───────────╮  ",
    "    │  ◯ ◯ ◯    │  ",
    "    │           │  ",
    "    │  hi.      │  ",
    "    ╰─────╲ ────╯  ",
    "          ╲        ",
    "           ●       ",
  ],
  hino: [
    "                    ",
    "    ░░░░░░░░░░     ",
    "    ░  ●●●●  ░     ",
    "    ░  ●●●●  ░     ",
    "    ░░░░░░░░░░     ",
    "    │ │ │ │ │      ",
    "                    ",
  ],
  med: [
    "                    ",
    "       ╱─╲          ",
    "      │ + │         ",
    "       ╲─╱          ",
    "    ─────────       ",
    "    ─ ─ ─ ─ ─       ",
    "                    ",
  ],
  butter: [
    "                    ",
    "   ╱╲       ╱╲     ",
    "  ╱  ╲ ─◯─ ╱  ╲    ",
    "  ╲  ╱     ╲  ╱    ",
    "   ╲╱       ╲╱     ",
    "    │               ",
    "                    ",
  ],
  qr: [
    "  ▓▓▓ ▓ ▓▓▓▓▓ ▓▓▓  ",
    "  ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓  ",
    "  ▓▓▓ ▓ ▓ ▓ ▓ ▓▓▓  ",
    "  ▓ ▓▓▓▓▓ ▓ ▓ ▓ ▓  ",
    "  ▓▓▓ ▓ ▓ ▓ ▓ ▓▓▓  ",
    "                    ",
  ],
  inv: [
    "                    ",
    "  ▮         ▮▮      ",
    "  ▮     ▮   ▮▮      ",
    "  ▮  ▮  ▮▮  ▮▮      ",
    "  ▮  ▮  ▮▮  ▮▮  ▮   ",
    "  ▮  ▮  ▮▮  ▮▮  ▮   ",
    "  ────────────────  ",
    "  Q1  Q2  Q3  Q4    ",
  ],
};

export function AsciiArt({ kind, dim = false }: { kind: ProjectArt; dim?: boolean }) {
  const lines = ASCII_ART[kind] || ASCII_ART.qr;
  return (
    <pre
      style={{
        margin: 0,
        fontFamily: "var(--mono)",
        fontSize: 12,
        lineHeight: 1.2,
        color: dim ? "var(--ink-4)" : "var(--ink-2)",
        letterSpacing: 0,
      }}
    >
      {lines.join("\n")}
    </pre>
  );
}

export function SectionHead({ idx, title, jp, sub }: { idx: string; title: string; jp: string; sub?: string }) {
  return (
    <div className="section-head" data-screen-label={`${idx} ${title}`}>
      <div>
        <div className="num">／ {idx}</div>
      </div>
      <div>
        <h2>{title}</h2>
        {sub && (
          <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-3)", marginTop: 8 }}>{sub}</div>
        )}
      </div>
      <div className="jp-tag">{jp}</div>
    </div>
  );
}

export function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="pill">
      <span className="dot"></span>
      <span>{children}</span>
    </span>
  );
}
