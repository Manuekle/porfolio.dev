import { COPY, PROFILE, SOCIALS, type Lang } from "../data/portfolio";
import { BrandMark } from "./Mark";
import { ApplyCta, MailIcon } from "./Apply";
import { AvatarPop } from "./AvatarPop";
import { CvButton } from "./CvPreview";
import { Signature } from "./Signature";

function Glyph({ d, size = 12 }: { d: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      style={{ flex: "none", color: "var(--ink-4)" }}
    >
      <path d={d} />
    </svg>
  );
}

const PIN = "M8 14.5S13 10.4 13 6.6A5 5 0 0 0 3 6.6C3 10.4 8 14.5 8 14.5ZM8 8.2a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4Z";
const CLOCK = "M8 14.5A6.5 6.5 0 1 0 8 1.5a6.5 6.5 0 0 0 0 13ZM8 4.5V8l2.4 1.6";
const GLOBE = "M8 14.5A6.5 6.5 0 1 0 8 1.5a6.5 6.5 0 0 0 0 13ZM1.5 8h13M8 1.5c1.7 1.8 2.6 4 2.6 6.5S9.7 12.7 8 14.5C6.3 12.7 5.4 10.5 5.4 8S6.3 3.3 8 1.5Z";

export function Sidebar({ lang }: { lang: Lang }) {
  const c = COPY[lang];

  return (
    <aside className="aside">
      <div className="aside-grid">
        <div>
          <AvatarPop lang={lang} />

          <h1
            className="title"
            style={{ fontSize: 21, marginTop: 16, color: "var(--ink)" }}
          >
            {PROFILE.name}
          </h1>
          <div className="meta" style={{ marginTop: 3 }}>
            {PROFILE.role[lang]}
          </div>

          <p className="body" style={{ margin: "16px 0 0", fontSize: 12.5, lineHeight: 1.65 }}>
            {PROFILE.bio[lang]}
          </p>

          <Signature width={84} style={{ marginTop: 12, transform: "rotate(-3deg)" }} />
        </div>

        <div>
          <hr className="rule" style={{ margin: "22px 0 18px" }} />

          <div className="aside-meta">
            <div>
              <Glyph d={PIN} />
              <span>{PROFILE.location[lang]}</span>
            </div>
            <div>
              <Glyph d={CLOCK} />
              <span>{PROFILE.experience[lang]}</span>
            </div>
            <div>
              <Glyph d={GLOBE} />
              <span>{PROFILE.availability[lang]}</span>
            </div>
            <div>
              <span className="status-dot" />
              <span className="t-shimmer" data-text={c.hero.status}>
                {c.hero.status}
              </span>
            </div>
          </div>

          <hr className="rule" style={{ margin: "18px 0" }} />

          <div className="social-row">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target={s.url.startsWith("http") ? "_blank" : undefined}
                rel={s.url.startsWith("http") ? "noreferrer noopener" : undefined}
                aria-label={s.label}
                title={`${s.label} · ${s.handle}`}
              >
                <BrandMark slug={s.slug} size={14} />
              </a>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
            <CvButton lang={lang} style={{ flex: 1 }} />
            <a
              className="btn btn-ghost"
              href={`mailto:${PROFILE.email}`}
              aria-label={c.contactCta}
              title={c.contactCta}
              style={{ padding: "10px 12px" }}
            >
              <MailIcon size={14} />
            </a>
          </div>

          <ApplyCta lang={lang} variant="ghost" style={{ width: "100%", marginTop: 8 }} />
        </div>
      </div>
    </aside>
  );
}
