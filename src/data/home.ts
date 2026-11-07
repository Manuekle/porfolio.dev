import { EDUCATION, EXPERIENCE, PROFILE, PROJECTS, type Bilingual, type Lang } from "./portfolio";

/* Content for the single-column home page. Project facts come from PROJECTS;
   this file only picks, orders and phrases them for the cards. */

export const T = {
  hello: { en: "Hi, I'm Manuel.", es: "Hola, soy Manuel." },
  role: { en: "Full stack developer", es: "Desarrollador full stack" },
  works: { en: "Works", es: "Proyectos" },
  more: { en: "More", es: "Más" },
  experience: { en: "Experience", es: "Experiencia" },
  activity: { en: "Activity", es: "Actividad" },
  links: { en: "Links", es: "Enlaces" },
  contact: { en: "Contact", es: "Contacto" },
  cv: { en: "Resume", es: "CV" },
  skip: { en: "Skip to content", es: "Saltar al contenido" },
  langs: { en: "Language", es: "Idioma" },
  now: { en: "Now", es: "Hoy" },
} satisfies Record<string, Bilingual>;

/** Bio paragraphs. `{oruka}`-style tokens become inline project links. */
export const BIO: Record<Lang, string[]> = {
  en: [
    "Hi, I'm Manuel.",
    "I'm a full stack developer in Bogotá, Colombia. I build SaaS products with TypeScript, React, Next.js and PostgreSQL, from the interface down to the database and the deploy.",
    "I founded {gymrat}, a training and coaching platform with 60 users, and I'm building {oruka}, AI agents for customer support and sales on WhatsApp and Instagram.",
    "I'm open to international remote roles, and I take on freelance work too: see my {services}.",
  ],
  es: [
    "Hola, soy Manuel.",
    "Soy desarrollador full stack en Bogotá, Colombia. Construyo productos SaaS con TypeScript, React, Next.js y PostgreSQL, desde la interfaz hasta la base de datos y el despliegue.",
    "Fundé {gymrat}, una plataforma de entrenamiento y coaching con 60 usuarios, y estoy construyendo {oruka}, agentes de IA para atención al cliente y ventas en WhatsApp e Instagram.",
    "Busco empleo remoto internacional y también tomo proyectos freelance: mira mis {services}.",
  ],
};

export type WorkCard = {
  id: string;
  name: string;
  logo?: string;
  href: string;
  desc: Bilingual;
  /** Short facts shown as a row under the description. */
  facts: Bilingual[];
  /** The card's ground, taken from the app's own brand surfaces. */
  bg: string;
  /** Ink for the copy on that ground. */
  tone: "light" | "dark";
  /** Which live part of the app fills the card (components/home/apps). */
  layout: "phone" | "mac" | "demo" | "film";
};


export const WORK_CARDS: WorkCard[] = [
  {
    id: "oruka",
    tone: "dark" as const,
    bg: "radial-gradient(60% 42% at 50% -6%, rgb(255 255 255 / 0.3), transparent 72%), radial-gradient(46% 30% at 50% 88%, rgb(150 190 255 / 0.32), transparent 75%), radial-gradient(55% 55% at 0% 100%, rgb(18 40 205 / 0.85), transparent 70%), radial-gradient(55% 55% at 100% 100%, rgb(18 40 205 / 0.85), transparent 70%), linear-gradient(180deg, #3b68ff 0%, #325cfe 40%, #2a4ff2 72%, #2145e6 100%)",
    layout: "phone" as const,
    desc: {
      en: "AI agents that answer customers and close sales on WhatsApp and Instagram, with one inbox, contacts and deals.",
      es: "Agentes de IA que atienden clientes y cierran ventas en WhatsApp e Instagram, con una bandeja, contactos y oportunidades.",
    },
    facts: [{ en: "Private beta", es: "Beta privada" }, { en: "Web · SaaS", es: "Web · SaaS" }],
  },
  {
    id: "cue",
    tone: "dark" as const,
    bg: "radial-gradient(28% 55% at 0% 34%, rgba(120,214,255,.38), rgba(120,214,255,0) 70%), radial-gradient(24% 46% at 100% 20%, rgba(120,214,255,.32), rgba(120,214,255,0) 70%), radial-gradient(60% 42% at 50% 64%, rgba(0,70,210,.55), rgba(0,70,210,0) 72%), linear-gradient(180deg, #00a3ff 0%, #0a8aff 28%, #0a7cff 60%, #0066ee 100%)",
    layout: "mac" as const,
    desc: {
      en: "A teleprompter that lives under the MacBook notch, starts when the camera turns on and stays hidden when you share your screen.",
      es: "Un teleprompter que vive bajo el notch del MacBook, arranca cuando se enciende la cámara y no aparece al compartir pantalla.",
    },
    facts: [{ en: "macOS · iOS", es: "macOS · iOS" }, { en: "Swift", es: "Swift" }],
  },
  {
    id: "focus",
    tone: "dark" as const,
    bg: "radial-gradient(55% 45% at 72% 78%, rgb(40 83 233 / 0.32), transparent 72%), radial-gradient(60% 40% at 50% 0%, rgb(255 255 255 / 0.06), transparent 70%), linear-gradient(180deg, #1c1c1c 0%, #181818 55%, #121212 100%)",
    layout: "demo" as const,
    desc: {
      en: "Describe an edit in one sentence. Focus finds the subject, tracks it frame by frame and renders the video.",
      es: "Describe una edición en una frase. Focus encuentra al sujeto, lo sigue cuadro a cuadro y renderiza el video.",
    },
    facts: [{ en: "Meta AI hackathon", es: "Hackathon de Meta" }, { en: "Web · AI video", es: "Web · Video IA" }],
  },
  {
    id: "kanago",
    tone: "light" as const,
    bg: "radial-gradient(60% 45% at 50% 100%, rgb(255 111 156 / 0.14), transparent 72%), linear-gradient(180deg, #ffffff 0%, #fbf8fa 100%)",
    layout: "film" as const,
    desc: {
      en: "Japanese from kana to JLPT on iPhone, with handwriting feedback, spaced review and widgets.",
      es: "Japonés desde kana hasta JLPT en iPhone, con corrección de escritura, repaso espaciado y widgets.",
    },
    facts: [{ en: "iOS 17+", es: "iOS 17+" }, { en: "SwiftUI", es: "SwiftUI" }],
  },
].map((c) => {
  const p = PROJECTS.find((x) => x.id === c.id)!;
  return { ...c, name: p.name, logo: p.logo, href: p.liveUrl ?? p.sourceUrl ?? "#" };
});

/** Projects that are not cards, as compact rows. */
export const MORE_WORK = ["shift", "blindem", "gymrat", "cetamed", "lab10", "creagent", "forge", "blank", "sira", "butterflyar"]
  .map((id) => PROJECTS.find((p) => p.id === id)!)
  .filter(Boolean);

export type TimelineItem = { when: Bilingual; what: Bilingual; sub?: Bilingual };

export const EXPERIENCE_ITEMS: TimelineItem[] = [
  ...EXPERIENCE.map((e) => ({
    when: e.period,
    what: { en: `${e.role.en}, ${e.org}`, es: `${e.role.es}, ${e.org}` },
    sub: e.summary,
  })),
  ...EDUCATION.map((e) => ({
    when: { en: e.period, es: e.period },
    what: { en: `${e.degree.en}, ${e.school}`, es: `${e.degree.es}, ${e.school}` },
    sub: e.note,
  })),
];

/** Hackathons, newest first. Short on purpose; details live in the CV. */
export const ACTIVITY: TimelineItem[] = [
  {
    when: { en: "2026 Oct", es: "2026 Oct" },
    what: {
      en: "Meta Global AI Developer Hackathon: built Focus, an AI video editor on Muse Spark and SAM 3.1.",
      es: "Meta Global AI Developer Hackathon: construí Focus, un editor de video con IA sobre Muse Spark y SAM 3.1.",
    },
  },
  {
    when: { en: "2026 Oct", es: "2026 Oct" },
    what: {
      en: "Frontier Lab10: my computer-use agent completed 45 of 56 hidden tasks.",
      es: "Frontier Lab10: mi agente de uso del computador completó 45 de 56 tareas ocultas.",
    },
  },
  {
    when: { en: "2026 Sep", es: "2026 Sep" },
    what: {
      en: "Presented Cetamed at the FUP hospital hackathon.",
      es: "Presenté Cetamed en el hackathon hospitalario de la FUP.",
    },
  },
  {
    when: { en: "2026 Apr", es: "2026 Abr" },
    what: {
      en: "Claude Code Hackathon: an autonomous coding agent built in 48 hours.",
      es: "Claude Code Hackathon: un agente de código autónomo construido en 48 horas.",
    },
  },
  {
    when: { en: "2026 Feb", es: "2026 Feb" },
    what: {
      en: "Mistral Worldwide Hackathon: a multi-agent pipeline with Mistral models.",
      es: "Mistral Worldwide Hackathon: un pipeline multiagente con modelos de Mistral.",
    },
  },
];

export { PROFILE };
