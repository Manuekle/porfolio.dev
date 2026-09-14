import { COPY, PROFILE, SOCIALS, type Lang } from "../../data/portfolio";
import { BrandMark } from "../Mark";
import { ApplyCta } from "../Apply";
import { Section } from "../Section";

export function Contact({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <Section id="contact" title={c.sections.contact.title} sub={c.sections.contact.sub} idx="08">
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <a className="title link-underline" style={{ fontSize: 22, alignSelf: "flex-start" }} href={`mailto:${PROFILE.email}`}>
          {PROFILE.email}
        </a>
        <a className="meta link-underline" style={{ alignSelf: "flex-start" }} href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}>
          {PROFILE.phone}
        </a>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 20 }}>
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            className="chip"
            href={s.url}
            target={s.url.startsWith("http") ? "_blank" : undefined}
            rel={s.url.startsWith("http") ? "noreferrer noopener" : undefined}
          >
            <span style={{ display: "inline-flex", color: "var(--ink-3)" }}>
              <BrandMark slug={s.slug} size={12} />
            </span>
            {s.handle}
          </a>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
        <ApplyCta lang={lang} variant="primary" />
        <a
          className="btn btn-ghost"
          href={`/assets/CV_Manuel_Erazo_${lang.toUpperCase()}.pdf`}
          download
        >
          {c.downloadCv}
        </a>
      </div>

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
        <span className="meta">{c.footer}</span>
        <a className="meta link-underline" href="/services">
          {c.hireServices}
        </a>
        <span className="meta">© {new Date().getFullYear()}</span>
      </footer>
    </Section>
  );
}
