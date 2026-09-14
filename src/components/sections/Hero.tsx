import { useEffect, useRef } from "react";
import { COPY, HACKATHONS, type Lang } from "../../data/portfolio";
import { ApplyCta } from "../Apply";
import { Reel } from "../Reel";

export function Hero({ lang }: { lang: Lang }) {
  const t = COPY[lang].hero;
  const staggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        staggerRef.current?.classList.add("is-shown");
      });
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="top" className="section" style={{ padding: "68px 0 12px", textAlign: "center" }}>
      <span
        className="site-mark"
        aria-hidden="true"
        style={{ display: "block", width: 62, height: 58, margin: "0 auto 28px", color: "var(--ink)" }}
      />

      <div ref={staggerRef} className="t-stagger">
        <h2
          className="display t-stagger-line t-stagger-line--1"
          style={{ fontSize: "clamp(30px, 5.2vw, 40px)" }}
        >
          {t.title}
        </h2>

        <p
          className="body t-stagger-line t-stagger-line--2"
          style={{ maxWidth: 420, margin: "16px auto 0", fontSize: 13.5, color: "var(--ink-3)" }}
        >
          {t.sub}
        </p>

        <div
          className="t-stagger-line t-stagger-line--3"
          style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 26 }}
        >
          <a className="btn btn-ghost" href="#experience">
            {t.cta}
            <span aria-hidden="true">→</span>
          </a>
          <ApplyCta lang={lang} variant="primary" />
        </div>
      </div>

      <div className="hero-stats">
        <Reel value={5} suffix="+" label={t.stats.years} />
        <Reel value={12} suffix="+" label={t.stats.projects} />
        <Reel value={HACKATHONS.length} label={t.stats.hackathons} />
      </div>

      <hr className="rule" style={{ marginTop: 52 }} />
    </section>
  );
}
