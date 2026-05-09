import { COPY, type Lang } from "../../data/portfolio";
import { StatusPill } from "../ascii";

function NavBar({ lang }: { lang: Lang }) {
  const nav = COPY[lang].nav;
  const items: [keyof typeof nav, string][] = [
    ["work", "#experience"],
    ["projects", "#projects"],
    ["stack", "#stack"],
    ["services", "#services"],
    ["contact", "#contact"],
  ];
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: 28,
        fontFamily: "var(--mono)",
        fontSize: 12,
        letterSpacing: ".12em",
        textTransform: "uppercase",
      }}
    >
      {items.map(([k, h]) => (
        <a key={k} href={h} className="link" style={{ borderBottom: "none", color: "var(--ink-2)" }}>
          {nav[k]}
        </a>
      ))}
    </nav>
  );
}

export function Hero({ lang, onContact }: { lang: Lang; onContact: () => void }) {
  const t = COPY[lang].hero;
  return (
    <section style={{ paddingTop: 32, paddingBottom: 60 }} data-screen-label="00 Hero">
      <div className="container-x">
        <div
          className="hero-topbar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 24,
            marginBottom: 48,
            borderBottom: "1px dashed var(--rule)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".18em",
                textTransform: "uppercase",
              }}
            >
              MANUEL ／ ERAZO
            </div>
            <span style={{ fontFamily: "Noto Serif JP, serif", fontSize: 13, color: "var(--ink-3)" }}>
              マヌエル・エラソ
            </span>
          </div>
          <NavBar lang={lang} />
        </div>

        <div
          className="hero-grid"
          style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 56, alignItems: "stretch" }}
        >
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop: 12 }}>
            <div>
              <div className="label" style={{ marginBottom: 18 }}>
                ／ {t.hello.toUpperCase()} ／ ／ {lang === "en" ? "PORTFOLIO 2026" : "PORTAFOLIO 2026"}
              </div>

              <h1
                className="hero-name"
                style={{
                  fontFamily: "var(--serif)",
                  fontWeight: 700,
                  fontSize: "clamp(56px, 9vw, 132px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.045em",
                  margin: "0 0 32px",
                }}
              >
                Manuel
                <br />
                Erazo
                <span
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--mono)",
                    fontSize: ".25em",
                    verticalAlign: "top",
                    letterSpacing: 0,
                    marginLeft: 4,
                  }}
                >
                  ＊
                </span>
              </h1>

              <p
                className="hero-sub"
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 24,
                  lineHeight: 1.4,
                  margin: "0 0 28px",
                  color: "var(--ink-2)",
                  maxWidth: 540,
                }}
              >
                {t.role}.<br />
                <span style={{ color: "var(--ink-3)" }}>{t.sub}</span>
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
                <StatusPill>
                  {t.status} ／ {lang === "en" ? "remote" : "remoto"}
                </StatusPill>
                <span className="pill" style={{ background: "transparent", boxShadow: "inset 0 0 0 1px var(--rule)" }}>
                  {t.based}
                </span>
              </div>
            </div>

            <div className="hero-cta-row" style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
              <button className="btn" onClick={onContact}>
                {t.cta} <span className="arrow">→</span>
              </button>
              <a
                className="btn btn-ghost"
                href={`/assets/CV_Manuel_Erazo_${lang.toUpperCase()}.pdf`}
                download
                style={{ textDecoration: "none" }}
              >
                {lang === "en" ? "Download CV" : "Descargar CV"} <span className="arrow">↓</span>
              </a>
              <span className="cta-sub" style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-3)" }}>
                ─── {t.ctaSub}
              </span>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div
              className="card"
              style={{
                padding: 0,
                height: "100%",
                background: "var(--paper-3)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                minHeight: 480,
              }}
            >
              <div
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px dashed var(--rule)",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--ink-3)",
                  letterSpacing: ".15em",
                }}
              >
                <span>FILE ／ self_portrait.jpg</span>
                <span>2026 ／ NO.001</span>
              </div>
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  background: "radial-gradient(ellipse at 50% 30%, #fff8e8 0%, var(--paper-3) 70%)",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  overflow: "hidden",
                  paddingTop: 8,
                }}
              >
                <img
                  src="/assets/avatar.webp"
                  alt="Manuel illustration"
                  className="hero-avatar"
                  style={{
                    maxHeight: "92%",
                    maxWidth: "85%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 16px 24px #00000020)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    fontFamily: "var(--mono)",
                    fontSize: 14,
                    color: "var(--ink-4)",
                  }}
                >
                  ＋
                </span>
                <span
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    fontFamily: "var(--mono)",
                    fontSize: 14,
                    color: "var(--ink-4)",
                  }}
                >
                  ＋
                </span>
                <span
                  style={{
                    position: "absolute",
                    bottom: 14,
                    left: 14,
                    fontFamily: "var(--mono)",
                    fontSize: 14,
                    color: "var(--ink-4)",
                  }}
                >
                  ＋
                </span>
                <span
                  style={{
                    position: "absolute",
                    bottom: 14,
                    right: 14,
                    fontFamily: "var(--mono)",
                    fontSize: 14,
                    color: "var(--ink-4)",
                  }}
                >
                  ＋
                </span>

                <div
                  style={{
                    position: "absolute",
                    top: 24,
                    right: 28,
                    writingMode: "vertical-rl",
                    fontFamily: "Noto Serif JP, serif",
                    fontSize: 15,
                    color: "var(--ink-3)",
                    letterSpacing: "0.3em",
                  }}
                >
                  開発者・マヌエル
                </div>
              </div>
              <div
                style={{
                  padding: "14px 20px",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--ink-3)",
                  letterSpacing: ".1em",
                  borderTop: "1px dashed var(--rule)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>POPAYÁN ／ -2.4448° / -76.6147°</span>
                <span>EST. {t.since.replace(/\D/g, "")}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="hero-marquee"
          style={{
            marginTop: 64,
            padding: "18px 0",
            borderTop: "1px solid var(--rule)",
            borderBottom: "1px solid var(--rule)",
            display: "flex",
            gap: 56,
            alignItems: "center",
            fontFamily: "var(--serif)",
            fontSize: 22,
            fontWeight: 500,
            color: "var(--ink-2)",
            letterSpacing: "-0.01em",
            overflow: "hidden",
          }}
        >
          {(lang === "en"
            ? ["Web Apps", "AI Integrations", "SaaS Products", "Landing Pages", "Custom Tooling", "Developer Experience"]
            : ["Web Apps", "Integraciones IA", "SaaS", "Landing Pages", "Herramientas a medida", "Developer Experience"]
          ).map((w, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 56 }}>
              <span>{w}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 14, color: "var(--ink-4)" }}>／</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
