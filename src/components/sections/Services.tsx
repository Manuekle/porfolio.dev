import { CAPABILITIES, COPY, PACKAGES, PROFILE, type Lang } from "../../data/portfolio";
import { QuoteWizard } from "../QuoteWizard";
import { Section } from "../Section";

export function ServicesPage({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const s = c.services;
  const quote = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    lang === "es" ? "Cotización de servicios" : "Services quote",
  )}`;

  return (
    <>
      <section id="top" className="section" style={{ padding: "68px 0 12px" }}>
        <h2 className="display" style={{ fontSize: "clamp(30px, 5.2vw, 40px)" }}>
          {s.title}
        </h2>
        <p className="body" style={{ maxWidth: 460, margin: "16px 0 0", color: "var(--ink-3)" }}>
          {s.intro}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 26 }}>
          <a className="btn" href={quote}>
            {s.cta}
          </a>
          <a className="btn btn-ghost" href="/">
            {s.back}
          </a>
        </div>
        <hr className="rule" style={{ marginTop: 52 }} />
      </section>

      <Section id="offer" title={s.offerTitle} sub={s.offerSub} idx="01">
        <div className="offer-grid">
          {CAPABILITIES.map((item) => (
            <article key={item.title.en} className="offer-card">
              <h3 className="entry-title">{item.title[lang]}</h3>
              <p className="entry-body" style={{ marginTop: 8 }}>
                {item.blurb[lang]}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="pricing" title={s.priceTitle} sub={s.priceSub} idx="02">
        {PACKAGES.map((pkg) => (
          <article key={pkg.id} className="price-row">
            <div style={{ minWidth: 0 }}>
              <h3 className="entry-title">{pkg.name[lang]}</h3>
              <div className="entry-sub">{pkg.time[lang]}</div>
              <ul className="entry-bullets">
                {pkg.includes.map((line) => (
                  <li key={line.en}>{line[lang]}</li>
                ))}
              </ul>
            </div>
            <div className="price-tag">
              <span className="meta">{lang === "es" ? "Desde" : "From"}</span>
              <span className="price-usd">
                ${pkg.from}
                {pkg.cadence ? <span className="price-cadence">{pkg.cadence[lang]}</span> : null}
              </span>
              <span className="meta">USD</span>
            </div>
          </article>
        ))}
        <p className="meta" style={{ marginTop: 22 }}>
          {s.note}
        </p>
        <a className="btn" href={quote} style={{ marginTop: 18 }}>
          {s.cta}
        </a>
      </Section>

      <Section id="quote" title={c.quote.title} sub={c.quote.sub} idx="03">
        <QuoteWizard lang={lang} />
      </Section>

      <footer
        style={{
          marginTop: 44,
          paddingTop: 18,
          borderTop: "1px solid var(--rule)",
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <a className="meta link-underline" href="/">
          {s.back}
        </a>
        <span className="meta">© {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}
