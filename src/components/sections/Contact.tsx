import { COPY, SOCIALS, type Lang } from "../../data/portfolio";

export function Contact({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <section id="contact" style={{ padding: "60px 0 40px" }}>
      <div className="container-x">
        <div
          className="contact-card card"
          style={{
            padding: "72px 56px",
            textAlign: "center",
            background: "var(--ink)",
            color: "var(--paper)",
            borderRadius: 32,
          }}
        >
          <div className="label" style={{ color: "var(--on-contrast-2)", marginBottom: 24 }}>
            ／ {c.sections.contact[2]} ／ LET'S TALK ／
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--display)",
              fontWeight: 800,
              fontSize: "clamp(48px, 7vw, 96px)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {c.cta.line1}
            <br />
            <span style={{ color: "var(--on-contrast-3)", fontStyle: "italic", fontWeight: 400 }}>{c.cta.line2}</span>
          </h2>
          <div
            className="ctas"
            style={{
              marginTop: 36,
              display: "flex",
              justifyContent: "center",
              gap: 14,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <a
              href="mailto:meeerazo7@hotmail.com"
              className="btn"
              style={{ background: "var(--paper)", color: "var(--ink)", textDecoration: "none" }}
            >
              {c.cta.btn} <span className="arrow">→</span>
            </a>
            <a
              href={`/assets/CV_Manuel_Erazo_${lang.toUpperCase()}.pdf`}
              download
              className="btn btn-ghost"
              style={{
                color: "var(--on-contrast)",
                boxShadow: "inset 0 0 0 1px var(--on-contrast-line)",
                textDecoration: "none",
              }}
            >
              {lang === "en" ? "Download CV" : "Descargar CV"} <span className="arrow">↓</span>
            </a>
            <a
              href="mailto:meeerazo7@hotmail.com"
              className="btn btn-ghost"
              style={{
                color: "var(--on-contrast)",
                boxShadow: "inset 0 0 0 1px var(--on-contrast-line)",
                textDecoration: "none",
              }}
            >
              meeerazo7@hotmail.com
            </a>
          </div>
        </div>

        <footer style={{ marginTop: 56, paddingBottom: 56 }}>
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 3fr",
              gap: 48,
              paddingBottom: 32,
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em" }}>
                Manuel Erazo
              </div>
              <p style={{ marginTop: 16, color: "var(--ink-3)", fontSize: 14, maxWidth: 320 }}>{c.footerNote}</p>
            </div>
            <div className="socials" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    padding: "18px 0",
                    borderTop: "1px solid var(--rule)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
                >
                  <span className="label">／ {s.label}</span>
                  <span style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 500 }}>{s.handle} ↗</span>
                </a>
              ))}
            </div>
          </div>
          <div
            className="footer-meta"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 24,
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--ink-4)",
              letterSpacing: ".1em",
              textTransform: "uppercase",
            }}
          >
            <span>
              {lang === "en"
                ? "© Manuel Erazo, 2026 ／ All rights reserved"
                : "© Manuel Erazo, 2026 ／ Todos los derechos reservados"}
            </span>
            <span>
              {lang === "en" ? "Hand-coded ／ no template ／ ver. 2.0" : "Hecho a mano ／ sin plantilla ／ ver. 2.0"}
            </span>
            <span>
              {lang === "en" ? "BUILT IN POPAYÁN" : "HECHO EN POPAYÁN"}
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}
