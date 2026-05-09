import { COPY, type Lang } from "../../data/portfolio";
import { SectionHead } from "../ascii";

export function Services({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <section id="services" style={{ padding: "0 0 40px" }}>
      <div className="container-x">
        <SectionHead
          idx={c.sections.services[1]}
          title={c.sections.services[0]}
          jp={c.sections.services[2]}
          sub={c.sections.services[3]}
        />

        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {c.services.map(([title, price, time, items, recommended], i) => (
            <div
              key={title}
              className={"card " + (recommended ? "dark" : "")}
              style={{ padding: 28, display: "flex", flexDirection: "column", gap: 18, position: "relative" }}
            >
              {recommended && (
                <div
                  style={{
                    position: "absolute",
                    top: 18,
                    right: 18,
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    padding: "4px 9px",
                    background: "var(--accent)",
                    color: "var(--paper)",
                    borderRadius: 999,
                    letterSpacing: ".15em",
                  }}
                >
                  {lang === "en" ? "RECOMMENDED" : "RECOMENDADO"}
                </div>
              )}
              <div>
                <div className="label" style={{ color: recommended ? "var(--on-contrast-2)" : "var(--ink-3)" }}>
                  ／ {String(i + 1).padStart(2, "0")} ／ {time}
                </div>
                <h3
                  style={{
                    margin: "10px 0 0",
                    fontFamily: "var(--serif)",
                    fontSize: 32,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {title}
                </h3>
              </div>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 44,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                {price}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((it, j) => (
                  <div
                    key={j}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "20px 1fr",
                      gap: 10,
                      fontSize: 14,
                      lineHeight: 1.4,
                      color: recommended ? "var(--on-contrast-2)" : "var(--ink-2)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        color: recommended ? "var(--on-contrast-3)" : "var(--ink-4)",
                      }}
                    >
                      —
                    </span>
                    <span>{it}</span>
                  </div>
                ))}
              </div>
              <a
                className="btn"
                href={`mailto:meeerazo7@hotmail.com?subject=${encodeURIComponent(
                  (lang === "en" ? "Brief: " : "Brief: ") + title,
                )}&body=${encodeURIComponent(
                  lang === "en"
                    ? `Hi Manuel,\n\nI'd like to start a brief for: ${title} (${time}, ${price}).\n\nProject context:\n\nGoals:\n\nTimeline:\n\nThanks!`
                    : `Hola Manuel,\n\nMe gustaría iniciar un brief para: ${title} (${time}, ${price}).\n\nContexto del proyecto:\n\nObjetivos:\n\nCronograma:\n\nGracias!`,
                )}`}
                style={{
                  marginTop: "auto",
                  background: recommended ? "var(--paper)" : "var(--ink)",
                  color: recommended ? "var(--ink)" : "var(--paper)",
                  textDecoration: "none",
                }}
              >
                {lang === "en" ? "Start brief" : "Iniciar brief"} <span className="arrow">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
