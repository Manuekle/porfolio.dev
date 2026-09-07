import { COPY, KEY_SKILLS, type Lang } from "../../data/portfolio";
import { Section } from "../Section";

export function About({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <Section id="about" title={c.sections.about.title} sub={c.sections.about.sub} idx="01">
      <p className="body" style={{ margin: 0 }}>
        {c.about}
      </p>

      <div className="meta" style={{ marginTop: 24, marginBottom: 10 }}>
        {c.skillsLabel}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {KEY_SKILLS[lang].map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>
    </Section>
  );
}
