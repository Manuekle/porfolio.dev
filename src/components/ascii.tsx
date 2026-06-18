import { useEffect, useState } from "react";
import type { ProjectArt } from "../data/portfolio";

// Cute, premium kaomoji creatures — no text.
export const ASCII_ART: Record<ProjectArt, string[]> = {
  // forge — owl
  forge: [
    "   ,___,   ",
    "   {o,o}   ",
    "   /)_)    ",
  ],
  // gym — bear
  gym: [
    "  ∩   ∩   ",
    " ( ●ᴥ● )  ",
    "  ╲___╱   ",
  ],
  // sira — dog
  sira: [
    "  ╭╮ ╭╮   ",
    " ( ◕ᴥ◕ )  ",
    "  ╰─ᴥ╯    ",
  ],
  // hino — fox
  hino: [
    "  ╱╲ ╱╲   ",
    " ( ◜ᴥ◝ )  ",
    "   ╲╱     ",
  ],
  // med — rabbit
  med: [
    "  (\\_/)   ",
    "  (•ᴥ•)   ",
    "  (   )   ",
  ],
  // qr — cat
  qr: [
    "   ╱|、     ",
    "  (˚ˎ 。7   ",
    "   |、˜〵   ",
    "   じしˍ,)ノ",
  ],
  // inv — penguin
  inv: [
    "   ▟▙     ",
    "  (•ᴥ•)   ",
    "  ╱| |╲   ",
  ],
  // butter — bird
  butter: [
    "   ╭╮     ",
    "  (•ω•)>  ",
    "   ╰╯     ",
  ],
};

// Blink frames — same art, eyes closed. Eyes line gets swapped briefly.
const BLINK_LINE: Partial<Record<ProjectArt, [number, string]>> = {
  forge: [1, "   {-.-}   "],
  gym: [1, " ( -ᴥ- )  "],
  sira: [1, " ( -ᴥ- )  "],
  hino: [1, " ( -ᴥ- )  "],
  med: [1, "  (-ᴥ-)   "],
  inv: [1, "  (-ᴥ-)   "],
  butter: [1, "  (-ω-)>  "],
};

export function AsciiArt({ kind, dim = false }: { kind: ProjectArt; dim?: boolean }) {
  const base = ASCII_ART[kind] || ASCII_ART.qr;
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (!BLINK_LINE[kind]) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      setBlink(true);
      t = setTimeout(() => {
        setBlink(false);
        t = setTimeout(loop, 2600 + Math.random() * 2600);
      }, 150);
    };
    t = setTimeout(loop, 1200 + Math.random() * 2000);
    return () => clearTimeout(t);
  }, [kind]);

  let lines = base;
  const swap = BLINK_LINE[kind];
  if (blink && swap) {
    lines = base.slice();
    lines[swap[0]] = swap[1];
  }

  return (
    <pre
      className="ascii-bob"
      style={{
        margin: 0,
        fontFamily: "var(--mono-art)",
        fontSize: 16,
        lineHeight: 1.4,
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
      {jp && <div className="jp-tag">{jp}</div>}
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
