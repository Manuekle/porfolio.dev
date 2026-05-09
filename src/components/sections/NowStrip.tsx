import { Fragment } from "react";
import { NOW, type Lang } from "../../data/portfolio";

export function NowStrip({ lang }: { lang: Lang }) {
  const items = NOW[lang];
  const updated = new Date()
    .toLocaleDateString(lang === "en" ? "en-US" : "es-CO", { month: "short", year: "numeric" })
    .toUpperCase();
  return (
    <section style={{ padding: "0 0 24px" }}>
      <div className="container-x">
        <div
          className="now-strip card"
          style={{
            padding: "20px 28px",
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: 28,
            alignItems: "center",
            background: "var(--paper-2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--accent)",
                boxShadow: "0 0 0 4px var(--accent-soft)",
              }}
            ></span>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "var(--ink-2)",
                fontWeight: 600,
              }}
            >
              {lang === "en" ? "NOW ／ 現在" : "AHORA ／ 現在"}
            </span>
          </div>
          <div style={{ display: "flex", gap: 0, flexWrap: "wrap", alignItems: "center" }}>
            {items.map((it, i) => (
              <Fragment key={i}>
                <span style={{ fontFamily: "var(--serif)", fontSize: 16, color: "var(--ink-2)" }}>{it}</span>
                {i < items.length - 1 && (
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-4)", margin: "0 14px" }}>
                    ／
                  </span>
                )}
              </Fragment>
            ))}
          </div>
          <span
            style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: ".15em" }}
          >
            UPD. {updated}
          </span>
        </div>
      </div>
    </section>
  );
}
