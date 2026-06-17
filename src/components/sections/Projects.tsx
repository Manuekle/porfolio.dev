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

        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 16 }}>
          {PROJECTS.map((p, i) => {
            const colSpan = p.big ? 7 : i === 1 ? 5 : 6;
            return (
              <button
                key={p.id}
                onClick={() => onOpen(p)}
                className="card flat project-card"
                style={{
                  gridColumn: `span ${colSpan}`,
                  padding: "24px 26px 22px",
                  textAlign: "left",
                  cursor: "pointer",
                  border: "none",
                  font: "inherit",
                  color: "inherit",
                  overflow: "hidden",
                  transition: "transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s",
                  minHeight: p.big ? 320 : 260,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--ink-4)",
                    letterSpacing: ".14em",
                  }}
                >
                  <span>NO.{String(i + 1).padStart(3, "0")}</span>
                  <span>{p.year}</span>
                </div>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "18px 0",
                  }}
                >
                  <AsciiArt kind={p.art} dim />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: "var(--display)",
                        fontSize: p.big ? 38 : 28,
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      {p.name}
                    </h3>
                    <span className="project-open" style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-3)" }}>
                      {lang === "en" ? "open" : "abrir"} →
                    </span>
                  </div>
                  <p style={{ margin: "8px 0 0", fontSize: 12.5, color: "var(--ink-4)", letterSpacing: ".02em" }}>
                    {p.type[lang]}
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
