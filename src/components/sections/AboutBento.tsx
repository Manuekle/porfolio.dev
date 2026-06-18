import { COPY, type Lang } from "../../data/portfolio";
import { SectionHead } from "../ascii";

export function AboutBento({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <section style={{ padding: "0 0 40px" }}>
      <div className="container-x">
        <SectionHead
          idx={c.sections.about[1]}
          title={c.sections.about[0]}
          jp={c.sections.about[2]}
          sub={c.sections.about[3]}
        />

        <div
          className="bento"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridAutoRows: "minmax(140px, auto)",
            gap: 18,
          }}
        >
          <div
            className="card"
            style={{
              gridColumn: "span 7",
              gridRow: "span 2",
              padding: 36,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="label">／ about</div>
            <p
              style={{
                fontFamily: "var(--serif)",
                fontSize: 28,
                lineHeight: 1.35,
                margin: "20px 0 0",
                color: "var(--ink)",
              }}
            >
              {c.aboutCopy}
            </p>
            <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 28, flexWrap: "wrap" }}>
              {["React", "Next.js", "TypeScript", "LLMs"].map((t) => (
                <span key={t} className="pill">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div
            className="card"
            style={{ gridColumn: "span 5", padding: 28, display: "flex", flexDirection: "column" }}
          >
            <div className="label">／ {c.locationLabel.toLowerCase()}</div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <pre
                style={{
                  margin: "12px 0",
                  fontFamily: "var(--mono-art)",
                  fontSize: 13,
                  lineHeight: 1.25,
                  color: "var(--ink-2)",
                }}
              >
{`          .─.
        ╱     ╲___
      ╱   ●       ╲
     │             │
      ╲___________╱
         ╲╲  ╱╱       `}
              </pre>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 12,
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--ink-3)",
              }}
            >
              <span>popayán, co</span>
              <span>{lang === "en" ? "age 24" : "edad 24"}</span>
              <span>utc−5</span>
            </div>
          </div>

          <div
            className="card"
            style={{
              gridColumn: "span 5",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="label">／ {c.yearsLabel.toLowerCase()}</div>
            <div
              className="stat-num"
              style={{ fontFamily: "var(--serif)", fontSize: 96, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.04em" }}
            >
              05
              <span style={{ fontSize: 24, color: "var(--ink-3)", marginLeft: 8, fontFamily: "var(--mono)" }}>yrs</span>
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)" }}>
              {lang === "en" ? "since 2021 ─ ─ ─" : "desde 2021 ─ ─ ─"}
            </div>
          </div>

          <div
            className="card dark about-shipped"
            style={{
              gridColumn: "span 12",
              padding: "28px 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
            }}
          >
            <div className="label">／ {c.shippedLabel.toLowerCase()}</div>
            <div
              className="stat-num"
              style={{ fontFamily: "var(--serif)", fontSize: 72, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.04em" }}
            >
              22
              <span style={{ fontSize: 24, color: "var(--on-contrast-3)", marginLeft: 8, fontFamily: "var(--mono)" }}>+</span>
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--on-contrast-2)" }}>
              {lang === "en" ? "shipped ─ ─ ─" : "lanzados ─ ─ ─"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
