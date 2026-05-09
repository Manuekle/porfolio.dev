import { useState } from "react";
import { COPY, type Lang } from "../../data/portfolio";
import { SectionHead } from "../ascii";

export function FAQ({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const [open, setOpen] = useState(0);
  return (
    <section style={{ padding: "0 0 40px" }}>
      <div className="container-x">
        <SectionHead
          idx={c.sections.faq[1]}
          title={c.sections.faq[0]}
          jp={c.sections.faq[2]}
          sub={c.sections.faq[3]}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          {c.faqs.map(([q, a], i) => (
            <button
              key={i}
              className="faq-row"
              onClick={() => setOpen(open === i ? -1 : i)}
              style={{
                background: "transparent",
                border: "none",
                textAlign: "left",
                padding: "24px 4px",
                borderTop: "1px solid var(--rule)",
                borderBottom: i === c.faqs.length - 1 ? "1px solid var(--rule)" : "none",
                cursor: "pointer",
                color: "inherit",
                font: "inherit",
                display: "grid",
                gridTemplateColumns: "32px 1fr 32px",
                gap: 18,
                alignItems: "start",
              }}
            >
              <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-4)", paddingTop: 4 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <div
                  style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" }}
                >
                  {q}
                </div>
                <div
                  style={{
                    maxHeight: open === i ? 200 : 0,
                    overflow: "hidden",
                    transition: "max-height .4s cubic-bezier(.2,.7,.2,1), margin-top .3s",
                    marginTop: open === i ? 12 : 0,
                    fontSize: 16,
                    lineHeight: 1.55,
                    color: "var(--ink-3)",
                    maxWidth: 720,
                  }}
                >
                  {a}
                </div>
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 18, color: "var(--ink-3)", textAlign: "right" }}>
                {open === i ? "−" : "+"}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
