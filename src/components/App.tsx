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
import { ServicesPage } from "./sections/Services";

type Theme = "light" | "dark" | "blueprint";

const THEMES: Theme[] = ["light", "dark", "blueprint"];
const NEXT_THEME: Record<Theme, Theme> = { light: "dark", dark: "blueprint", blueprint: "light" };
const THEME_LABEL: Record<Theme, string> = { light: "Dark theme", dark: "Blueprint theme", blueprint: "Light theme" };

function BlueprintIcon({ size = 13 }: { size?: number }) {
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
      aria-hidden="true"
      style={{ flex: "none" }}
    >
      <path d="M12 2V22" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" />
      <path d="M12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9" />
      <path d="M11.9997 18.5C10.4912 18.5 9.10269 17.9861 7.99972 17.1238M11.9997 5.5C9.10768 5.5 6.65678 7.38874 5.81322 10M6.23193 15C5.91116 14.3845 5.68601 13.7113 5.57617 13" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 5.49906C13.6241 5.61507 16.1849 5.23044 17.052 3.36719M20.0683 6.09014C19.6281 6.50486 19.1018 6.84862 18.5 6.99906C16.5 7.49906 14.5 8.99906 16 10.9991C17.5 12.9991 19 14.4991 17.5 16.4991C16.7608 17.4846 16.2402 19.1441 18.2806 19.7811" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
      theme: THEMES.includes(p.theme) ? p.theme : DEFAULTS.theme,
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
  home,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  active: string;
  home: boolean;
}) {
  const c = COPY[lang];
  return (
    <div className="topbar">
      <a href={home ? "#top" : "/"} aria-label={PROFILE.name} style={{ display: "inline-flex" }}>
        <SiteLogo size={22} />
      </a>

      <nav className="nav-links">
        {NAV.map(([k, href]) => (
          <a
            key={k}
            href={home ? href : `/${href}`}
            className={home && active === href.slice(1) ? "active" : undefined}
          >
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
          onClick={() => setTheme(NEXT_THEME[theme])}
          aria-label={THEME_LABEL[theme]}
          title={THEME_LABEL[theme]}
        >
          {theme === "light" ? (
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
              <path d="M13.5 9.6A5.8 5.8 0 0 1 6.4 2.5a5.8 5.8 0 1 0 7.1 7.1Z" />
            </svg>
          ) : theme === "dark" ? (
            <BlueprintIcon size={13} />
          ) : (
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
              <circle cx="8" cy="8" r="3.1" />
              <path d="M8 1v1.6M8 13.4V15M1 8h1.6M13.4 8H15M3 3l1.2 1.2M11.8 11.8 13 13M13 3l-1.2 1.2M4.2 11.8 3 13" />
            </svg>
          )}
        </button>

        <a className="btn" href={`mailto:${PROFILE.email}`}>
          {c.contactMe}
        </a>
      </div>
    </div>
  );
}

export function App({ page = "home" }: { page?: "home" | "services" }) {
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
    const color = theme === "dark" ? "#131311" : theme === "blueprint" ? "#2e6fff" : "#e9e7de";
    document.querySelectorAll('meta[name="theme-color"]').forEach((el) => {
      el.setAttribute("content", color);
    });
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
        <TopBar
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
          active={active}
          home={page === "home"}
        />

        <div className="main-inner">
          {page === "services" ? (
            <ServicesPage lang={lang} />
          ) : (
            <>
              <Hero lang={lang} />
              <About lang={lang} />
              <Experience lang={lang} />
              <Projects lang={lang} />
              <Stack lang={lang} />
              <Hackathons lang={lang} />
              <Education lang={lang} />
              <Contact lang={lang} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
