import { useEffect, useRef } from "react";
import type { Lang, Project } from "../data/portfolio";
import { AsciiArt } from "./ascii";

export function ProjectDialog({
  project,
  lang,
  onClose,
}: {
  project: Project | null;
  lang: Lang;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project) {
      if (!d.open) d.showModal();
    } else if (d.open) d.close();
  }, [project]);

  if (!project) return null;
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
    >
      <div className="dialog-pad" style={{ padding: "32px 40px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 24 }}>
          <div>
            <div className="label" style={{ marginBottom: 12 }}>
              {project.year} ／ {project.type[lang]}
            </div>
            <h2
              className="dialog-title"
              style={{
                margin: 0,
                fontFamily: "var(--serif)",
                fontSize: 56,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              {project.name}
            </h2>
          </div>
          <button
            onClick={() => ref.current?.close()}
            aria-label="Close"
            style={{
              background: "transparent",
              border: "none",
              fontFamily: "var(--mono)",
              fontSize: 18,
              color: "var(--ink-2)",
              padding: 8,
            }}
          >
            ×  {lang === "en" ? "close" : "cerrar"}
          </button>
        </div>

        <div
          className="dialog-grid"
          style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 36 }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--serif)",
                fontSize: 22,
                lineHeight: 1.45,
                margin: "0 0 24px",
                color: "var(--ink-2)",
              }}
            >
              {project.blurb[lang]}
            </p>
            <div className="label" style={{ marginBottom: 10 }}>
              Stack
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {project.stack.map((t) => (
                <span key={t} className="pill">
                  {t}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 28, display: "flex", gap: 12 }}>
              <button className="btn">
                {lang === "en" ? "Visit live" : "Ver en vivo"} <span className="arrow">↗</span>
              </button>
              <button className="btn btn-ghost">
                {lang === "en" ? "Source" : "Código"} <span className="arrow">→</span>
              </button>
            </div>
          </div>
          <div
            style={{
              background: "var(--paper-2)",
              borderRadius: 20,
              padding: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 220,
            }}
          >
            <AsciiArt kind={project.art} />
          </div>
        </div>
      </div>
    </dialog>
  );
}
