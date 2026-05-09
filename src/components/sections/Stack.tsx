import { COPY, STACK, type Lang } from "../../data/portfolio";
import { SectionHead } from "../ascii";

export function Stack({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <section id="stack" style={{ padding: "0 0 40px" }}>
      <div className="container-x">
        <SectionHead
          idx={c.sections.stack[1]}
          title={c.sections.stack[0]}
          jp={c.sections.stack[2]}
          sub={c.sections.stack[3]}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {STACK.map((g) => (
            <div
              key={g.id}
              className={"stack-row card " + (g.highlight ? "dark" : "")}
              style={{
                padding: "24px 28px",
                display: "grid",
                gridTemplateColumns: "240px 1fr",
                gap: 28,
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 700, letterSpacing: "-0.01em" }}>
                  {g.label[lang]}
                </div>
                <div
                  style={{
                    fontFamily: "Noto Serif JP, serif",
                    fontSize: 13,
                    color: g.highlight ? "var(--on-contrast-2)" : "var(--ink-3)",
                    letterSpacing: ".25em",
                    marginTop: 4,
                  }}
                >
                  {g.jp}
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {g.items.map((t) => (
                  <span
                    key={t}
                    className="pill"
                    style={{
                      background: g.highlight ? "var(--on-contrast-fill)" : "var(--paper-2)",
                      color: g.highlight ? "var(--on-contrast)" : "var(--ink-2)",
                      padding: "8px 14px",
                      fontSize: 13,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
