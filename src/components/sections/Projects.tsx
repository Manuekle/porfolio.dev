import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { COPY, PROJECTS, type Lang, type Project } from "../../data/portfolio";
import { AsciiArt, SectionHead } from "../ascii";

// One filler tile keeps the square grid full (7 projects + 1 filler = 4×2, no gaps).
const SLOTS = PROJECTS.length + 1; // 8
const FILLER = SLOTS - 1; // index used to mark the filler tile

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const spring = { type: "spring" as const, stiffness: 240, damping: 28, mass: 0.9 };

export function Projects({ lang, onOpen }: { lang: Lang; onOpen: (p: Project) => void }) {
  const c = COPY[lang];
  // order = list of tile ids (0..6 = projects, 7 = filler) in their current positions
  const initial = useMemo(() => Array.from({ length: SLOTS }, (_, i) => i), []);
  const [order, setOrder] = useState<number[]>(initial);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      setOrder((prev) => {
        let next = shuffle(prev);
        // avoid a no-op shuffle
        if (next.every((v, i) => v === prev[i])) next = shuffle(prev);
        return next;
      });
    }, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="projects" style={{ padding: "0 0 40px" }}>
      <div className="container-x">
        <SectionHead
          idx={c.sections.projects[1]}
          title={c.sections.projects[0]}
          jp={c.sections.projects[2]}
          sub={c.sections.projects[3]}
        />

        <div className="projects-grid">
          {order.map((id) => {
            if (id === FILLER) {
              return (
                <motion.div
                  key="filler"
                  layout
                  transition={spring}
                  className="card flat project-tile filler-tile"
                  aria-hidden="true"
                >
                  <AsciiArt kind="qr" dim />
                  <span className="filler-note">{lang === "en" ? "more soon" : "más pronto"}</span>
                </motion.div>
              );
            }
            const p = PROJECTS[id];
            return (
              <motion.button
                key={p.id}
                layout
                transition={spring}
                whileHover={{ y: -3 }}
                onClick={() => onOpen(p)}
                className="card flat project-tile project-card"
              >
                <div className="tile-meta">
                  <span>no.{String(id + 1).padStart(3, "0")}</span>
                  <span>{p.year}</span>
                </div>

                <div className="tile-art">
                  <AsciiArt kind={p.art} dim />
                </div>

                <div className="tile-foot">
                  <h3>{p.name}</h3>
                  <span className="project-open">{lang === "en" ? "open" : "abrir"} →</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
