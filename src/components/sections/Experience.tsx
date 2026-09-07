import { COPY, EXPERIENCE, type Lang } from "../../data/portfolio";
import { LogoTile } from "../Mark";
import { Section } from "../Section";

export function Experience({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <Section id="experience" title={c.sections.experience.title} sub={c.sections.experience.sub} idx="02">
      {EXPERIENCE.map((e) => (
        <article key={e.id} className="entry">
          <LogoTile size={30} file={e.logoFile} slug={e.logo} name={e.org} />

          <div style={{ minWidth: 0 }}>
            <h3 className="entry-title">{e.role[lang]}</h3>
            <div className="entry-org">{e.org}</div>
            <div className="entry-sub">
              {e.kind[lang]} · {e.where[lang]}
            </div>

            <ul className="entry-bullets">
              {e.bullets.map((b, i) => (
                <li key={i}>{b[lang]}</li>
              ))}
            </ul>
          </div>

          <div className="entry-date">{e.period[lang]}</div>
        </article>
      ))}
    </Section>
  );
}
