import { useState } from "react";
import { BRANDS } from "../../data/brands";
import { COPY, FEATURED_PROJECT_IDS, PROJECTS, type Lang } from "../../data/portfolio";
import { BrandMark } from "../Mark";
import { ProjectGallery } from "../ProjectGallery";
import { Section } from "../Section";

export function Projects({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const [expanded, setExpanded] = useState(false);
  const featured = FEATURED_PROJECT_IDS;
  const renderProject = (p: (typeof PROJECTS)[number]) => (

        <article key={p.id} className="entry project-entry">

          <div style={{ minWidth: 0 }}>
            <h3 className="entry-title">{p.name}</h3>
            <div className="entry-org">{p.tagline[lang]}</div>

            <div className={p.shots && p.shots.length > 0 ? "project-main" : undefined}>
              <div style={{ minWidth: 0 }}>
                <p className="entry-body" style={{ marginTop: 9 }}>{p.blurb[lang]}</p>
                {p.decision && <p className="entry-body" style={{ marginTop: 8 }}>{p.decision[lang]}</p>}
                {p.result && <p className="entry-body" style={{ marginTop: 8, color: "var(--ink)" }}>{p.result[lang]}</p>}

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

              {p.shots && p.shots.length > 0 && (
                <ProjectGallery shots={p.shots} name={p.name} lang={lang} />
              )}
            </div>
          </div>

          <div className="entry-date">{p.year}</div>
        </article>
  );
  return (
    <Section id="projects" title={c.sections.projects.title} sub={c.sections.projects.sub} idx="03">
      {featured.map((id) => PROJECTS.find((p) => p.id === id)!).map(renderProject)}
      <noscript>
        <div className="entry-body">
          <p>{lang === "es" ? "Otros proyectos" : "More projects"}</p>
          <ul>{PROJECTS.filter((p) => !featured.includes(p.id)).map((p) => <li key={p.id}><a href={p.liveUrl || p.sourceUrl}>{p.name}</a> — {p.blurb[lang]}</li>)}</ul>
        </div>
      </noscript>
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
