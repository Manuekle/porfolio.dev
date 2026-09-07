import { COPY, HACKATHONS, type Lang } from "../../data/portfolio";
import { LogoTile } from "../Mark";
import { Section } from "../Section";

export function Hackathons({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <Section id="hackathons" title={c.sections.hackathons.title} sub={c.sections.hackathons.sub} idx="05">
      {HACKATHONS.map((h) => (
        <article key={h.id} className="entry">
          <LogoTile size={30} file={h.logoFile} slug={h.logo} name={h.org} />

          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
              <h3 className="entry-title">{h.name}</h3>
              {h.result && (
                <span className="meta" style={{ color: "var(--accent)" }}>
                  {h.result[lang]}
                </span>
              )}
            </div>
            <div className="entry-org">{h.org}</div>
            <p className="entry-body">
              {h.note[lang]}
            </p>
          </div>

          <div className="entry-date">{h.date[lang]}</div>
        </article>
      ))}
    </Section>
  );
}
