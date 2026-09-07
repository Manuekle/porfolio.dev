import { CERTIFICATIONS, COPY, EDUCATION, type Lang } from "../../data/portfolio";
import { LogoTile } from "../Mark";
import { Section } from "../Section";

export function Education({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <>
      <Section id="education" title={c.sections.education.title} sub={c.sections.education.sub} idx="06">
        {EDUCATION.map((e) => (
          <article key={e.school} className="entry">
            <LogoTile size={30} file={e.logoFile} name={e.school} />
            <div style={{ minWidth: 0 }}>
              <h3 className="entry-title">{e.degree[lang]}</h3>
              <div className="entry-org">{e.school}</div>
              {e.note && <div className="entry-sub">{e.note[lang]}</div>}
            </div>
            <div className="entry-date">{e.period}</div>
          </article>
        ))}
      </Section>

      <Section
        id="certifications"
        title={c.sections.certifications.title}
        sub={c.sections.certifications.sub}
        idx="07"
      >
        {CERTIFICATIONS.map((cert) => (
          <article key={cert.name[lang]} className="entry" style={{ padding: "13px 0" }}>
            <LogoTile size={30} file={cert.logoFile} slug={cert.logo} name={cert.issuer} />
            <div style={{ minWidth: 0 }}>
              <h3 className="entry-title" style={{ fontSize: 15 }}>
                {cert.name[lang]}
              </h3>
              <div className="entry-sub">{cert.issuer}</div>
            </div>
            <div />
          </article>
        ))}
      </Section>
    </>
  );
}
