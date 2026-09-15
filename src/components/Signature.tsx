type SignatureProps = {
  width?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Firma manuscrita de Manuel Erazo.
 * El SVG original es trazo negro sobre fondo transparente, así que se
 * invierte con CSS en los temas oscuros (ver `.signature` en global.css).
 */
export function Signature({ width = 170, className = "", style }: SignatureProps) {
  return (
    <img
      src="/assets/sign/sign.svg"
      alt="Firma de Manuel Erazo"
      width={width}
      height={Math.round((width * 287) / 760)}
      loading="lazy"
      decoding="async"
      className={`signature ${className}`.trim()}
      style={style}
      aria-hidden="false"
    />
  );
}
