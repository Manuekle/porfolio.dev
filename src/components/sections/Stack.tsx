import { COPY, STACK, type Lang } from "../../data/portfolio";
import { BrandMark } from "../Mark";
import { Section } from "../Section";

export function Stack({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <Section id="stack" title={c.sections.stack.title} sub={c.sections.stack.sub} idx="04">
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {STACK.map((g) => (
          <div key={g.id}>
            <div className="meta" style={{ marginBottom: 9 }}>
              {g.label[lang]}
            </div>
            <div className="tool-grid">
              {g.items.map((it) => (
                <span key={it.slug} className="tool">
                  <span style={{ display: "inline-flex", color: "var(--ink-3)" }}>
                    <BrandMark slug={it.slug} size={14} title={it.name} />
                  </span>
                  {it.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
