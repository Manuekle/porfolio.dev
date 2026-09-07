import { useEffect, useState } from "react";
import { COPY, PROFILE, type Lang } from "../data/portfolio";
import { SiteLogo } from "./Mark";
import { Sidebar } from "./Sidebar";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Stack } from "./sections/Stack";
import { Hackathons } from "./sections/Hackathons";
import { Education } from "./sections/Education";
import { Contact } from "./sections/Contact";

type Theme = "light" | "dark";

const STORAGE_KEY = "portfolio.prefs";
const DEFAULTS = { lang: "es" as Lang, theme: "light" as Theme };

function loadPrefs(): { lang: Lang; theme: Theme } {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const p = JSON.parse(raw);
    return {
      lang: p.lang === "en" || p.lang === "es" ? p.lang : DEFAULTS.lang,
      theme: p.theme === "dark" || p.theme === "light" ? p.theme : DEFAULTS.theme,
    };
  } catch {
    return DEFAULTS;
  }
}

type NavKey = keyof (typeof COPY)["es"]["nav"];

const NAV: [key: NavKey, href: string][] = [
  ["about", "#about"],
  ["experience", "#experience"],
  ["projects", "#projects"],
  ["stack", "#stack"],
  ["education", "#education"],
];

function TopBar({
  lang,
  setLang,
  theme,
  setTheme,
  active,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  active: string;
}) {
  const c = COPY[lang];
  return (
    <div className="topbar">
      <a href="#top" aria-label={PROFILE.name} style={{ display: "inline-flex" }}>
        <SiteLogo size={22} />
      </a>

      <nav className="nav-links">
        {NAV.map(([k, href]) => (
          <a key={k} href={href} className={active === href.slice(1) ? "active" : undefined}>
            {c.nav[k]}
          </a>
        ))}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div className="toggle" role="group" aria-label="Language">
          {(["es", "en"] as Lang[]).map((L) => (
            <button key={L} onClick={() => setLang(L)} aria-pressed={lang === L}>
              {L}
            </button>
          ))}
        </div>

        <button
          className="btn btn-ghost"
          style={{ padding: "7px 9px" }}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label={theme === "light" ? "Dark theme" : "Light theme"}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
            {theme === "light" ? (
              <path d="M13.5 9.6A5.8 5.8 0 0 1 6.4 2.5a5.8 5.8 0 1 0 7.1 7.1Z" />
            ) : (
              <>
                <circle cx="8" cy="8" r="3.1" />
                <path d="M8 1v1.6M8 13.4V15M1 8h1.6M13.4 8H15M3 3l1.2 1.2M11.8 11.8 13 13M13 3l-1.2 1.2M4.2 11.8 3 13" />
              </>
            )}
          </svg>
        </button>

        <a className="btn" href={`mailto:${PROFILE.email}`}>
          {c.contactMe}
        </a>
      </div>
    </div>
  );
}

export function App() {
  const [lang, setLang] = useState<Lang>(DEFAULTS.lang);
  const [theme, setTheme] = useState<Theme>(DEFAULTS.theme);
  const [hydrated, setHydrated] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const p = loadPrefs();
    setLang(p.lang);
    setTheme(p.theme);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lang, theme }));
  }, [lang, theme, hydrated]);

  // Reveal on scroll
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const vh = window.innerHeight;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add("in");
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => {
      if (!el.classList.contains("in")) io.observe(el);
    });
    return () => io.disconnect();
  }, [lang]);

  // Scroll spy
  useEffect(() => {
    const ids = NAV.map(([, href]) => href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const onScroll = () => {
      let current = ids[0];
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= 140) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lang]);

  return (
    <div className="page">
      <Sidebar lang={lang} />

      <main className="main">
        <TopBar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} active={active} />

        <div className="main-inner">
          <Hero lang={lang} />
          <About lang={lang} />
          <Experience lang={lang} />
          <Projects lang={lang} />
          <Stack lang={lang} />
          <Hackathons lang={lang} />
          <Education lang={lang} />
          <Contact lang={lang} />
        </div>
      </main>
    </div>
  );
}
