import { COPY, PROJECTS, type Lang, type Project } from "../../data/portfolio";
import { AsciiArt, SectionHead } from "../ascii";

export function Projects({ lang, onOpen }: { lang: Lang; onOpen: (p: Project) => void }) {
  const c = COPY[lang];
  return (
    <section id="projects" style={{ padding: "0 0 40px" }}>
      <div className="container-x">
        <SectionHead
          idx={c.sections.projects[1]}
          title={c.sections.projects[0]}
          jp={c.sections.projects[2]}
          sub={c.sections.projects[3]}
        />

        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }}>
          {PROJECTS.map((p, i) => {
            const colSpan = p.big ? 7 : i === 1 ? 5 : 6;
            return (
              <button
                key={p.id}
                onClick={() => onOpen(p)}
                className="card"
                style={{
                  gridColumn: `span ${colSpan}`,
                  padding: 0,
                  textAlign: "left",
                  cursor: "pointer",
                  border: "none",
                  font: "inherit",
                  color: "inherit",
                  overflow: "hidden",
                  transition: "transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s",
                  minHeight: p.big ? 360 : 280,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 22px",
                    borderBottom: "1px dashed var(--rule)",
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--ink-3)",
                    letterSpacing: ".15em",
                  }}
                >
                  <span>NO.{String(i + 1).padStart(3, "0")}</span>
                  <span>
                    {p.year} ／ {p.type[lang]}
                  </span>
                </div>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--paper-2)",
                    padding: "30px 24px",
                  }}
                >
                  <AsciiArt kind={p.art} />
                </div>

                <div style={{ padding: "20px 24px 22px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: 12,
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: "var(--serif)",
                        fontSize: p.big ? 40 : 30,
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      {p.name}
                    </h3>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-3)" }}>
                      {lang === "en" ? "open" : "abrir"} →
                    </span>
                  </div>
                  <p style={{ margin: "10px 0 0", fontSize: 14, color: "var(--ink-3)", lineHeight: 1.5 }}>
                    {p.blurb[lang]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
