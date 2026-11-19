import { EDUCATION, EXPERIENCE, PROFILE, PROJECTS, type Bilingual, type Lang } from "./portfolio";

/* Content for the single-column home page. Project facts come from PROJECTS;
   this file only picks, orders and phrases them for the cards. */

export const T = {
  hello: { en: "Hi, I'm Manuel.", es: "Hola, soy Manuel." },
  role: { en: "Full stack developer", es: "Desarrollador full stack" },
  tools: { en: "Tools I work with", es: "Herramientas con las que trabajo" },
  works: { en: "Selected projects", es: "Proyectos destacados" },
  contributions: { en: "Contributions", es: "Contribuciones" },
  experience: { en: "Experience", es: "Experiencia" },
  activity: { en: "Hackathon activity", es: "Participación en hackathons" },
  links: { en: "Links", es: "Enlaces" },
  contact: { en: "Contact", es: "Contacto" },
  cv: { en: "Resume", es: "CV" },
  skip: { en: "Skip to content", es: "Saltar al contenido" },
  langs: { en: "Language", es: "Idioma" },
  now: { en: "Now", es: "Hoy" },
} satisfies Record<string, Bilingual>;

/** The same curated SVGL icons used in the GitHub profile README. */
export const TOOLS = [
  { name: "TypeScript", icon: "typescript" },
  { name: "React", icon: "react", darkIcon: "react-dark" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Python", icon: "python" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Docker", icon: "docker" },
  { name: "AWS", icon: "aws", darkIcon: "aws-dark" },
  { name: "Terraform", icon: "terraform" },
];

/** Bio paragraphs. `{oruka}`-style tokens become inline project links. */
export const BIO: Record<Lang, string[]> = {
  en: [
    "Hi, I'm Manuel.",
    "I'm a full stack developer in Bogotá, Colombia. I build SaaS products with TypeScript, React, Next.js, Python and PostgreSQL, from the interface to the API, the data and the deployment.",
    "My main projects are {oruka}, AI agents for customer support and sales; {ragis}, answers grounded in company documents; and {gymrat}, a platform for training, nutrition and coaching.",
    "I also work on UI/UX redesigns, native mobile apps and hackathon experiments. I'm open to remote roles and freelance work: see my {services}.",
  ],
  es: [
    "Hola, soy Manuel.",
    "Soy desarrollador full stack en Bogotá, Colombia. Construyo productos SaaS con TypeScript, React, Next.js, Python y PostgreSQL, desde la interfaz hasta las APIs, los datos y el despliegue.",
    "Mis proyectos principales son {oruka}, agentes de IA para atención al cliente y ventas; {ragis}, respuestas basadas en documentos empresariales; y {gymrat}, una plataforma de entrenamiento, nutrición y coaching.",
    "También trabajo en rediseños de UI/UX, apps móviles nativas y experimentos de hackathon. Busco empleo remoto y tomo proyectos freelance: mira mis {services}.",
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
  /** Product media rendered in the existing scene slot. */
  preview?: string;
};


export const WORK_CARDS: WorkCard[] = [
  {
    "id": "oruka",
    "tone": "dark" as const,
    "bg": "radial-gradient(60% 42% at 50% -6%, rgb(255 255 255 / 0.3), transparent 72%), radial-gradient(46% 30% at 50% 88%, rgb(150 190 255 / 0.32), transparent 75%), radial-gradient(55% 55% at 0% 100%, rgb(18 40 205 / 0.85), transparent 70%), radial-gradient(55% 55% at 100% 100%, rgb(18 40 205 / 0.85), transparent 70%), linear-gradient(180deg, #3b68ff 0%, #325cfe 40%, #2a4ff2 72%, #2145e6 100%)",
    "layout": "phone" as const,
    "desc": {
      "en": "Built AI agents for customer support and sales on WhatsApp and Instagram, with a unified inbox, contacts, deals and workflow automation.",
      "es": "Construí agentes de IA para atención al cliente y ventas en WhatsApp e Instagram, con una bandeja unificada, contactos, oportunidades y automatización de flujos."
    },
    "facts": [
      {
        "en": "Private beta",
        "es": "Beta privada"
      },
      {
        "en": "Next.js · TypeScript · PostgreSQL",
        "es": "Next.js · TypeScript · PostgreSQL"
      }
    ]
  },
  {
    "id": "ragis",
    "tone": "dark" as const,
    "bg": "radial-gradient(28% 55% at 0% 34%, rgba(120,214,255,.38), rgba(120,214,255,0) 70%), radial-gradient(24% 46% at 100% 20%, rgba(120,214,255,.32), rgba(120,214,255,0) 70%), radial-gradient(60% 42% at 50% 64%, rgba(0,70,210,.55), rgba(0,70,210,0) 72%), linear-gradient(180deg, #00a3ff 0%, #0a8aff 28%, #0a7cff 60%, #0066ee 100%)",
    "layout": "demo" as const,
    "preview": "/assets/works/ragis/landing.jpg",
    "desc": {
      "en": "Built a multimodal RAG platform that answers from company documents with verifiable citations and document-level permissions.",
      "es": "Construí una plataforma RAG multimodal que responde desde documentos empresariales, con citas verificables y permisos por documento."
    },
    "facts": [
      {
        "en": "Text · Vectors · Graphs",
        "es": "Texto · Vectores · Grafos"
      },
      {
        "en": "Python · PostgreSQL · AWS",
        "es": "Python · PostgreSQL · AWS"
      }
    ]
  },
  {
    "id": "gymrat",
    "tone": "dark" as const,
    "bg": "radial-gradient(55% 45% at 72% 78%, rgb(40 83 233 / 0.32), transparent 72%), radial-gradient(60% 40% at 50% 0%, rgb(255 255 255 / 0.06), transparent 70%), linear-gradient(180deg, #1c1c1c 0%, #181818 55%, #121212 100%)",
    "layout": "demo" as const,
    "preview": "/assets/works/gymrat/landing.webp",
    "desc": {
      "en": "Founded and built a fitness platform for training plans, nutrition, athlete progress and coach management, including memberships and payments.",
      "es": "Fundé y construí una plataforma de fitness para planes de entrenamiento, nutrición, progreso de atletas y gestión de entrenadores, con membresías y pagos."
    },
    "facts": [
      {
        "en": "Training · Nutrition · Coaching",
        "es": "Entrenamiento · Nutrición · Coaching"
      },
      {
        "en": "Next.js · PostgreSQL · Drizzle",
        "es": "Next.js · PostgreSQL · Drizzle"
      }
    ]
  }
].map((c) => {
  const p = PROJECTS.find((x) => x.id === c.id)!;
  return { ...c, name: p.name, logo: p.logo, href: p.liveUrl ?? p.sourceUrl ?? "#" };
});

/** Categories reuse the existing compact project rows. */
export const WORK_GROUPS = [
  { id: "ui-ux", title: { en: "UI/UX", es: "UI/UX" }, ids: ["redesign-trii", "redesign-dapta"] },
  { id: "mobile", title: { en: "Mobile apps", es: "Apps móviles" }, ids: ["kanago", "cue", "butterflyar"] },
  { id: "hackathons", title: { en: "Hackathon projects", es: "Proyectos de hackathon" }, ids: ["focus", "lab10", "cetamed", "forge"] },
].map(({ ids, ...group }) => ({
  ...group,
  projects: ids.map((id) => {
    const p = PROJECTS.find((project) => project.id === id)!;
    // Link the public repository instead of Lab10's token-gated observatory.
    return { ...p, href: p.liveLabel ? p.sourceUrl : p.liveUrl ?? p.sourceUrl };
  }),
}));

/** Verified against GitHub on November 19, 2026. Forks are not merged contributions. */
export const CONTRIBUTIONS = [
  {
    name: { en: "33 forks", es: "33 forks" },
    href: "https://github.com/Manuekle?tab=repositories&type=fork",
    desc: { en: "Forked repositories · Verified November 19, 2026", es: "Repositorios derivados · Verificado el 19 de noviembre de 2026" },
  },
  {
    name: { en: "22 merged PRs", es: "22 PRs fusionados" },
    href: "https://github.com/search?q=author%3AManuekle+is%3Apr+is%3Amerged+-user%3AManuekle&type=pullrequests",
    desc: { en: "Merged in repositories owned by other accounts", es: "Fusionados en repositorios de otras cuentas" },
  },
  {
    name: { en: "fincaagricola-app", es: "fincaagricola-app" },
    href: "https://github.com/IverArley/fincaagricola-app/pulls?q=is%3Apr+author%3AManuekle+is%3Amerged",
    desc: { en: "19 merged PRs · Data classes and administrative forms", es: "19 PRs fusionados · Clases de datos y formularios administrativos" },
  },
  {
    name: { en: "first-contributions", es: "first-contributions" },
    href: "https://github.com/firstcontributions/first-contributions/pull/51004",
    desc: { en: "Contributor entry · Pull request #51004 merged", es: "Registro de colaborador · Pull request #51004 fusionado" },
  },
] satisfies { name: Bilingual; href: string; desc: Bilingual }[];

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
