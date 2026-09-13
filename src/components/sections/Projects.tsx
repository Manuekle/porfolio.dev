import { useState } from "react";
import { BRANDS } from "../../data/brands";
import { COPY, PROJECTS, type Lang } from "../../data/portfolio";
import { BrandMark } from "../Mark";
import { Section } from "../Section";

export function Projects({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const [expanded, setExpanded] = useState(false);
  const featured = ["gymrat", "senka", "creagent"];
  const renderProject = (p: (typeof PROJECTS)[number]) => (

        <article key={p.id} className="entry project-entry">

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
  );
  return (
    <Section id="projects" title={c.sections.projects.title} sub={c.sections.projects.sub} idx="03">
      {featured.map((id) => PROJECTS.find((p) => p.id === id)!).map(renderProject)}
      <button
        className="btn btn-ghost projects-toggle"
        aria-expanded={expanded}
        aria-controls="more-projects"
        onClick={() => setExpanded(!expanded)}
      >
        {lang === "es" ? (expanded ? "Ver menos" : "Ver más") : (expanded ? "Show less" : "Show more")}
        <span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>
      <div id="more-projects" className="projects-more" data-open={expanded} inert={!expanded} aria-hidden={!expanded}>
        <div className="projects-more-inner">
          {PROJECTS.filter((p) => !featured.includes(p.id)).map(renderProject)}
        </div>
      </div>
    </Section>
  );
}
