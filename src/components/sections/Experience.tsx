import { COPY, EXPERIENCE, type Lang } from "../../data/portfolio";
import { SectionHead } from "../ascii";

export function Experience({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <section id="experience" style={{ padding: "0 0 40px" }}>
      <div className="container-x">
        <SectionHead
          idx={c.sections.experience[1]}
          title={c.sections.experience[0]}
          jp={c.sections.experience[2]}
          sub={c.sections.experience[3]}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {EXPERIENCE.map((e, i) => (
            <div
              key={i}
              className="exp-row"
              style={{
                display: "grid",
                gridTemplateColumns: "180px 32px 1fr auto",
                gap: 24,
                padding: "22px 0",
                borderTop: i === 0 ? "1px solid var(--rule)" : "none",
                borderBottom: "1px solid var(--rule)",
                alignItems: "center",
                position: "relative",
                background: e.highlight
                  ? "linear-gradient(90deg, transparent, #ffffff60 30%, #ffffff60 70%, transparent)"
                  : "transparent",
              }}
            >
              <div className="exp-when">
                <div style={{ fontFamily: "var(--mono)", fontSize: 13, fontWeight: 500, color: "var(--ink-2)" }}>
                  {e.when}
                </div>
                {e.whenJp && (
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      color: "var(--ink-4)",
                      letterSpacing: ".15em",
                    }}
                  >
                    {e.whenJp}
                  </div>
                )}
              </div>
              <div
                className="exp-marker"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 14,
                  color: e.highlight ? "var(--accent)" : "var(--ink-4)",
                  textAlign: "center",
                }}
              >
                {e.highlight ? "＊" : "○"}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                  <span
                    style={{ fontFamily: "var(--display)", fontSize: 24, fontWeight: 700, letterSpacing: "-0.01em" }}
                  >
                    {e.role[lang]}
                  </span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink-3)" }}>／</span>
                  <span style={{ fontSize: 16, color: "var(--ink-2)" }}>{e.org}</span>
                  {e.highlight && (
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 10,
                        padding: "3px 8px",
                        background: "var(--accent)",
                        color: "var(--paper)",
                        borderRadius: 999,
                        letterSpacing: ".15em",
                      }}
                    >
                      {lang === "en" ? "FEATURED" : "DESTACADO"}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 14, color: "var(--ink-3)", marginTop: 4 }}>{e.note[lang]}</div>
              </div>
              <div className="exp-counter" style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-4)" }}>
                {String(i + 1).padStart(2, "0")} ／ {String(EXPERIENCE.length).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
