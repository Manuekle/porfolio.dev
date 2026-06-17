import { TESTIMONIALS, type Lang } from "../../data/portfolio";
import { SectionHead } from "../ascii";

export function Testimonials({ lang }: { lang: Lang }) {
  const items = TESTIMONIALS;
  return (
    <section style={{ padding: "0 0 40px" }}>
      <div className="container-x">
        <SectionHead
          idx="—"
          title={lang === "en" ? "Words" : "Palabras"}
          jp=""
          sub={lang === "en" ? "What clients have said" : "Lo que han dicho clientes"}
        />
        <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {items.map((t, i) => (
            <div
              key={i}
              className="card"
              style={{ padding: 28, display: "flex", flexDirection: "column", gap: 22, minHeight: 240 }}
            >
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 60,
                  lineHeight: 0.6,
                  color: "var(--ink-4)",
                  height: 24,
                }}
              >
                「
              </div>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--serif)",
                  fontSize: 19,
                  lineHeight: 1.45,
                  color: "var(--ink)",
                  flex: 1,
                }}
              >
                {t.quote[lang]}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px dashed var(--rule)",
                  paddingTop: 16,
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>{t.role[lang]}</div>
                </div>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-4)" }}>
                  0{i + 1}／0{items.length}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
