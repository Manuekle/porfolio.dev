import { useEffect, useState } from "react";
import type { Lang, Project } from "../data/portfolio";
import { ProjectDialog } from "./ProjectDialog";
import { Hero } from "./sections/Hero";
import { NowStrip } from "./sections/NowStrip";
import { AboutBento } from "./sections/AboutBento";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Stack } from "./sections/Stack";
import { Method } from "./sections/Method";
import { Testimonials } from "./sections/Testimonials";
import { Services } from "./sections/Services";
import { FAQ } from "./sections/FAQ";
import { Contact } from "./sections/Contact";

type PaperTone = "warm" | "cool" | "ink";

const STORAGE_KEY = "portfolio.tweaks";
const DEFAULTS = { lang: "es" as Lang, paperTone: "ink" as PaperTone };

function loadTweaks(): { lang: Lang; paperTone: PaperTone } {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    return {
      lang: parsed.lang === "en" || parsed.lang === "es" ? parsed.lang : DEFAULTS.lang,
      paperTone:
        parsed.paperTone === "warm" || parsed.paperTone === "cool" || parsed.paperTone === "ink"
          ? parsed.paperTone
          : DEFAULTS.paperTone,
    };
  } catch {
    return DEFAULTS;
  }
}

export function App() {
  const [lang, setLang] = useState<Lang>(DEFAULTS.lang);
  const [paperTone, setPaperTone] = useState<PaperTone>(DEFAULTS.paperTone);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const t = loadTweaks();
    setLang(t.lang);
    setPaperTone(t.paperTone);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.dataset.paper = paperTone;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lang, paperTone }));
  }, [lang, paperTone, hydrated]);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(
      ".section-head, .bento > .card, .stack-row, .services-grid > .card, .testi-grid > .card, .projects-grid > button, .exp-row, .now-strip, .method-card",
    );
    const vh = window.innerHeight;
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const aboveFold = rect.top < vh && rect.bottom > 0;
      el.classList.add("reveal");
      if (aboveFold) el.classList.add("in");
    });
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => {
      if (!el.classList.contains("in")) io.observe(el);
    });
    return () => io.disconnect();
  }, [lang]);

  const onContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  const cyclePaper = () => {
    const order: PaperTone[] = ["warm", "cool", "ink"];
    setPaperTone(order[(order.indexOf(paperTone) + 1) % order.length]);
  };

  return (
    <>
      <div
        className="lang-toggle"
        style={{
          position: "fixed",
          top: 18,
          right: 24,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <button
          onClick={cyclePaper}
          aria-label="Toggle theme"
          title={paperTone}
          style={{
            background: "var(--paper-3)",
            color: "var(--ink-2)",
            border: "none",
            padding: "7px 12px",
            borderRadius: 999,
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: ".15em",
            textTransform: "uppercase",
            boxShadow: "0 1px 2px #00000010, inset 0 0 0 1px var(--rule)",
            cursor: "pointer",
          }}
        >
          {paperTone === "warm" ? "☀" : paperTone === "cool" ? "◐" : "☾"}
        </button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: ".15em",
            background: "var(--paper-3)",
            padding: "6px 10px",
            borderRadius: 999,
            boxShadow: "0 1px 2px #00000010, inset 0 0 0 1px var(--rule)",
          }}
        >
          {(["en", "es"] as Lang[]).map((L) => (
            <button
              key={L}
              onClick={() => setLang(L)}
              style={{
                background: lang === L ? "var(--ink)" : "transparent",
                color: lang === L ? "var(--paper)" : "var(--ink-2)",
                border: "none",
                padding: "5px 10px",
                borderRadius: 999,
                cursor: "pointer",
                font: "inherit",
                letterSpacing: ".15em",
              }}
            >
              {L.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <Hero lang={lang} onContact={onContact} />
      <NowStrip lang={lang} />
      <AboutBento lang={lang} />
      <Experience lang={lang} />
      <Projects lang={lang} onOpen={setActiveProject} />
      <Stack lang={lang} />
      <Method lang={lang} />
      <Testimonials lang={lang} />
      <Services lang={lang} />
      <FAQ lang={lang} />
      <Contact lang={lang} />

      <ProjectDialog project={activeProject} lang={lang} onClose={() => setActiveProject(null)} />
    </>
  );
}
