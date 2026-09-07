import { BRANDS } from "../data/brands";

/** A brand logo drawn from the generated Simple Icons path set. */
export function BrandMark({
  slug,
  size = 14,
  color = "currentColor",
  title,
}: {
  slug: string;
  size?: number;
  color?: string;
  title?: string;
}) {
  const brand = BRANDS[slug];
  if (!brand) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      role="img"
      aria-label={title ?? brand.title}
      focusable="false"
    >
      <path d={brand.d} />
    </svg>
  );
}

/** Serif initial used when a company or project has no logo file yet. */
export function Monogram({ text, size = 30 }: { text: string; size?: number }) {
  return (
    <span className="mark-mono" style={{ fontSize: Math.round(size * 0.44) }} aria-hidden="true">
      {text.slice(0, 1)}
    </span>
  );
}

/**
 * Square logo tile. Renders, in order of preference: a mark file, a brand mark,
 * or a serif monogram — all at the same optical size so a column of tiles reads
 * as one set.
 */
export function LogoTile({
  size = 30,
  file,
  slug,
  name,
  plain = false,
}: {
  size?: number;
  file?: string;
  slug?: string | null;
  name: string;
  plain?: boolean;
}) {
  const hasBrand = slug ? Boolean(BRANDS[slug]) : false;
  return (
    <span
      className={"mark" + (plain ? " mark-plain" : "")}
      style={{ width: size, height: size }}
      title={name}
    >
      {file ? (
        <img className="mark-img" src={file} alt={name} loading="lazy" />
      ) : hasBrand ? (
        <BrandMark slug={slug as string} size={Math.round(size * 0.6)} title={name} />
      ) : (
        <Monogram text={name} size={size} />
      )}
    </span>
  );
}

/** Portfolio identity mark — masked so it follows the current ink colour. */
export function SiteLogo({ size = 22, color = "var(--ink)" }: { size?: number; color?: string }) {
  return (
    <span
      className="site-mark"
      role="img"
      aria-label="Manuel Erazo"
      style={{ width: size, height: Math.round(size * 0.93), color }}
    />
  );
}
