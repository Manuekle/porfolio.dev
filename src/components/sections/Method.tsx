import { useState } from "react";
import { COPY, type Lang } from "../../data/portfolio";
import { SectionHead } from "../ascii";

export function Method({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const [active, setActive] = useState(0);
  const steps = c.methodSteps;
  return (
    <section style={{ padding: "0 0 40px" }}>
      <div className="container-x">
        <SectionHead
          idx={c.sections.method[1]}
          title={c.sections.method[0]}
          jp={c.sections.method[2]}
          sub={c.sections.method[3]}
        />

        <div
          className="method-steps"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
            gap: 12,
            marginBottom: 28,
          }}
        >
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={i === active ? "active" : ""}
              style={{
                background: "transparent",
                border: "none",
                textAlign: "left",
                padding: "14px 0",
                borderTop: `2px solid ${i === active ? "var(--ink)" : "var(--rule)"}`,
                cursor: "pointer",
                transition: "border-color .25s",
              }}
            >
              <div
                style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: ".15em" }}
              >
                ／ {String(i + 1).padStart(2, "0")}
              </div>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 18,
                  fontWeight: 600,
                  marginTop: 6,
                  color: i === active ? "var(--ink)" : "var(--ink-3)",
                }}
              >
                {s[0]}
              </div>
            </button>
          ))}
        </div>

        <div
          className="method-card card"
          style={{
            padding: "44px 48px",
            minHeight: 200,
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div>
            <div
              className="step-big"
              style={{
                fontFamily: "var(--serif)",
                fontSize: 120,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.05em",
                color: "var(--ink)",
              }}
            >
              {String(active + 1).padStart(2, "0")}
            </div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-4)", marginTop: 8, letterSpacing: ".15em" }}>
              {`phase ${String(active + 1).padStart(2, "0")} / ${String(steps.length).padStart(2, "0")}`}
            </div>
          </div>
          <div>
            <h3
              style={{ margin: 0, fontFamily: "var(--serif)", fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              {steps[active][0]}
            </h3>
            <p style={{ marginTop: 14, fontSize: 18, lineHeight: 1.5, color: "var(--ink-2)" }}>{steps[active][1]}</p>
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              <button
                className="btn btn-ghost"
                onClick={() => setActive(Math.max(0, active - 1))}
                disabled={active === 0}
                style={{ opacity: active === 0 ? 0.4 : 1 }}
              >
                <span className="arrow">←</span> {lang === "en" ? "Prev" : "Anterior"}
              </button>
              <button
                className="btn"
                onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
                disabled={active === steps.length - 1}
                style={{ opacity: active === steps.length - 1 ? 0.4 : 1 }}
              >
                {lang === "en" ? "Next" : "Siguiente"} <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
