import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { COPY, PROFILE, type Lang } from "../data/portfolio";

export function MailIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flex: "none" }}
    >
      <path
        d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"
        strokeLinecap="round"
      />
      <path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" />
    </svg>
  );
}

export function CloseIcon({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      aria-hidden="true"
      style={{ flex: "none" }}
    >
      <path d="M4 4l12 12M16 4L4 16" />
    </svg>
  );
}

function buildSubject(lang: Lang, company: string, position: string): string {
  const c = company.trim();
  const p = position.trim();
  if (lang === "es") {
    if (p && c) return `Postulación – ${p} en ${c} | Manuel Erazo`;
    if (p) return `Postulación al puesto de ${p} — Manuel Erazo`;
    return "Postulación — Manuel Erazo | Desarrollador Full-Stack & IA";
  }
  if (p && c) return `Application – ${p} at ${c} | Manuel Erazo`;
  if (p) return `Application for ${p} — Manuel Erazo`;
  return "Application — Manuel Erazo | Full-Stack & AI Developer";
}

function buildBody(lang: Lang, company: string, position: string): string {
  const c = company.trim();
  const p = position.trim();
  if (lang === "es") {
    return [
      `Hola${c ? ` equipo de ${c}` : ""}:`,
      "",
      `Me postulo al puesto de ${p || "___"}. Soy Manuel Erazo, Desarrollador Full-Stack & IA con 5+ años construyendo producto con Next.js, TypeScript, Node.js e integración de LLMs.`,
      "",
      "Adjunto mi CV en PDF a este correo.",
      "",
      `Portafolio: https://${PROFILE.site}`,
      `GitHub: https://github.com/manuekle`,
      "",
      "Gracias por su tiempo. Quedo atento a cualquier siguiente paso.",
      "",
      "Saludos,",
      "Manuel Erazo",
      `${PROFILE.email} · ${PROFILE.phone}`,
      "Bogotá, Colombia — Disponible remoto y presencial",
    ].join("\n");
  }
  return [
    `Hi${c ? ` ${c} team` : ""},`,
    "",
    `I'm applying for the ${p || "___"} role. I'm Manuel Erazo, a Full-Stack & AI Developer with 5+ years shipping product with Next.js, TypeScript, Node.js and LLM integration.`,
    "",
    "I've attached my CV (PDF) to this email.",
    "",
    `Portfolio: https://${PROFILE.site}`,
    `GitHub: https://github.com/manuekle`,
    "",
    "Thanks for your time. Happy to share more or jump on a call.",
    "",
    "Best,",
    "Manuel Erazo",
    `${PROFILE.email} · ${PROFILE.phone}`,
    "Bogotá, Colombia — Open to remote and on-site work",
  ].join("\n");
}

export function ApplyCta({
  lang,
  variant = "primary",
  style,
}: {
  lang: Lang;
  variant?: "primary" | "ghost";
  style?: CSSProperties;
}) {
  const t = COPY[lang].apply;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [to, setTo] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [copied, setCopied] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const subject = buildSubject(lang, company, position);
  const body = buildBody(lang, company, position);
  const cvHref = `/assets/CV_Manuel_Erazo_${lang.toUpperCase()}.pdf`;
  const mailto = `mailto:${to.trim()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const open = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
  };

  const close = () => {
    setVisible(false);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMounted(false), 160);
  };

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  useEffect(() => {
    if (mounted && visible) {
      const id = window.setTimeout(() => firstFieldRef.current?.focus(), 260);
      return () => window.clearTimeout(id);
    }
  }, [mounted, visible]);

  useEffect(() => {
    if (!mounted) setCopied(false);
  }, [mounted]);

  useEffect(
    () => () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    },
    [],
  );

  const copyText = async () => {
    const full = `${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = full;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
      } catch {
        /* noop */
      }
      document.body.removeChild(ta);
    }
    window.setTimeout(() => setCopied(false), 1800);
  };

  const overlayClass = `apply-overlay${visible ? " is-open" : " is-closing"}`;
  const cardClass = `apply-card t-modal${visible ? " is-open" : " is-closing"}`;

  return (
    <>
      <button
        type="button"
        className={variant === "ghost" ? "btn btn-ghost" : "btn"}
        onClick={open}
        style={style}
      >
        <MailIcon size={14} />
        {t.button}
      </button>

      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div className={overlayClass} onClick={close} role="presentation">
            <div
              className={cardClass}
              role="dialog"
              aria-modal="true"
              aria-label={t.title}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="apply-head">
                <div className="apply-head-text">
                  <h3 className="title apply-title">{t.title}</h3>
                  <p className="meta apply-sub">{t.sub}</p>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost apply-close"
                  onClick={close}
                  aria-label={t.close}
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="apply-field">
                <label htmlFor={`apply-to-${uid}`}>{t.toLabel}</label>
                <input
                  ref={firstFieldRef}
                  id={`apply-to-${uid}`}
                  type="email"
                  autoComplete="off"
                  placeholder={t.toPlaceholder}
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>

              <div className="apply-grid">
                <div className="apply-field">
                  <label htmlFor={`apply-company-${uid}`}>{t.companyLabel}</label>
                  <input
                    id={`apply-company-${uid}`}
                    type="text"
                    autoComplete="off"
                    placeholder={t.companyPlaceholder}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className="apply-field">
                  <label htmlFor={`apply-position-${uid}`}>{t.positionLabel}</label>
                  <input
                    id={`apply-position-${uid}`}
                    type="text"
                    autoComplete="off"
                    placeholder={t.positionPlaceholder}
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>
              </div>

              <div className="meta apply-preview-label">{t.previewLabel}</div>
              <div className="apply-preview" aria-live="polite">
                <div className="apply-preview-subject">{subject}</div>
                <div className="apply-preview-body">{body}</div>
              </div>

              <div className="apply-actions">
                <a className="btn" href={mailto}>
                  <MailIcon size={14} />
                  {t.openMail}
                </a>
                <button type="button" className="btn btn-ghost" onClick={copyText}>
                  {copied ? t.copied : t.copy}
                </button>
              </div>

              <a className="btn btn-ghost apply-cv" href={cvHref} download>
                {t.attachCv}
              </a>
              <p className="meta apply-hint">{t.cvHint}</p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
