import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Lang, Project } from "../data/portfolio";
import { AsciiArt } from "./ascii";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 360, damping: 30, mass: 0.9, opacity: { duration: 0.2 } },
  },
  exit: { opacity: 0, y: 16, scale: 0.96, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] as const } },
};

export function ProjectDialog({
  project,
  lang,
  onClose,
}: {
  project: Project | null;
  lang: Lang;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(8, 8, 10, 0.62)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={project.name}
            style={{
              background: "var(--paper-3)",
              color: "var(--ink)",
              borderRadius: 28,
              boxShadow: "0 40px 80px -20px #00000060",
              width: "100%",
              maxWidth: 900,
              maxHeight: "86vh",
              overflowY: "auto",
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
                      fontFamily: "var(--display)",
                      fontSize: 56,
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    {project.name}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  style={{
                    background: "transparent",
                    border: "none",
                    fontFamily: "var(--mono)",
                    fontSize: 24,
                    lineHeight: 1,
                    color: "var(--ink-2)",
                    padding: 8,
                  }}
                >
                  ×
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
                  {(project.liveUrl || project.sourceUrl) && (
                    <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
                      {project.liveUrl && (
                        <a className="btn" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          {lang === "en" ? "Visit live" : "Ver en vivo"} <span className="arrow">↗</span>
                        </a>
                      )}
                      {project.sourceUrl && (
                        <a
                          className="btn btn-ghost"
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {lang === "en" ? "Source" : "Código"} <span className="arrow">→</span>
                        </a>
                      )}
                    </div>
                  )}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
