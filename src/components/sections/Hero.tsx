import { COPY, type Lang } from "../../data/portfolio";

export function Hero({ lang }: { lang: Lang }) {
  const t = COPY[lang].hero;
  return (
    <section id="top" className="section" style={{ padding: "68px 0 12px", textAlign: "center" }}>
      <span
        className="site-mark"
        aria-hidden="true"
        style={{ display: "block", width: 62, height: 58, margin: "0 auto 28px", color: "var(--ink)" }}
      />

      <h2 className="display" style={{ fontSize: "clamp(30px, 5.2vw, 40px)" }}>
        {t.title}
      </h2>

      <p
        className="body"
        style={{ maxWidth: 420, margin: "16px auto 0", fontSize: 13.5, color: "var(--ink-3)" }}
      >
        {t.sub}
      </p>

      <a className="btn btn-ghost" href="#experience" style={{ marginTop: 26 }}>
        {t.cta}
        <span aria-hidden="true">→</span>
      </a>

      <hr className="rule" style={{ marginTop: 52 }} />
    </section>
  );
}
