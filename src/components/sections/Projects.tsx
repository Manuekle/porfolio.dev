import { BRANDS } from "../../data/brands";
import { COPY, PROJECTS, type Lang } from "../../data/portfolio";
import { BrandMark, LogoTile } from "../Mark";
import { Section } from "../Section";

export function Projects({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <Section id="projects" title={c.sections.projects.title} sub={c.sections.projects.sub} idx="03">
      {PROJECTS.map((p) => (
        <article key={p.id} className="entry">
          <LogoTile size={30} file={p.logo} name={p.name} />

          <div style={{ minWidth: 0 }}>
            <h3 className="entry-title">{p.name}</h3>
            <div className="entry-org">{p.tagline[lang]}</div>

            <p className="entry-body">{p.blurb[lang]}</p>

            <div className="entry-stack">
              {p.stack
                .filter((slug) => BRANDS[slug])
                .map((slug) => (
                  <span key={slug} title={BRANDS[slug].title}>
                    <BrandMark slug={slug} size={14} />
                  </span>
                ))}
            </div>

            {(p.liveUrl || p.sourceUrl) && (
              <div className="project-links">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer noopener">
                    {c.live}
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
                {p.sourceUrl && (
                  <a href={p.sourceUrl} target="_blank" rel="noreferrer noopener">
                    {c.source}
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="entry-date">{p.year}</div>
        </article>
      ))}
    </Section>
  );
}
