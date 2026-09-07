export type Lang = "es" | "en";
export type Bilingual = { es: string; en: string };

/* ---------------------------------------------------------------- profile */

export const PROFILE = {
  name: "Manuel Erazo",
  fullName: "Manuel Esteban Erazo Medina",
  role: { es: "Desarrollador Full-Stack & IA", en: "Full-Stack & AI Developer" } as Bilingual,
  location: { es: "Bogotá, Colombia", en: "Bogotá, Colombia" } as Bilingual,
  availability: {
    es: "Disponible remoto y presencial",
    en: "Open to remote and on-site work",
  } as Bilingual,
  experience: { es: "5+ años construyendo producto", en: "5+ years shipping product" } as Bilingual,
  email: "meerazo7@hotmail.com",
  phone: "+57 311 271 1242",
  site: "manudev.vercel.app",
  bio: {
    es: "Construyo experiencias web simples, rápidas y bien diseñadas. Llevo productos de la idea a producción con Next.js, TypeScript y modelos de lenguaje.",
    en: "I build web experiences that are simple, fast and carefully designed. I take products from idea to production with Next.js, TypeScript and language models.",
  } as Bilingual,
};

export const SOCIALS: { label: string; handle: string; url: string; slug: string }[] = [
  { label: "GitHub", handle: "@manuekle", url: "https://github.com/manuekle", slug: "github" },
  { label: "LinkedIn", handle: "/in/manuekle", url: "https://linkedin.com/in/manuekle", slug: "linkedin" },
  { label: "Instagram", handle: "@manudev.jsx", url: "https://instagram.com/manudev.jsx", slug: "instagram" },
  { label: "Email", handle: PROFILE.email, url: `mailto:${PROFILE.email}`, slug: "gmail" },
];

/* ------------------------------------------------------------------- copy */

export type CopyShape = {
  nav: { about: string; experience: string; projects: string; stack: string; education: string };
  hero: { title: string; sub: string; cta: string; status: string };
  sections: Record<
    "about" | "experience" | "projects" | "stack" | "hackathons" | "education" | "certifications" | "contact",
    { title: string; sub: string }
  >;
  about: string;
  skillsLabel: string;
  contactCta: string;
  downloadCv: string;
  contactMe: string;
  live: string;
  source: string;
  footer: string;
  present: string;
};

export const COPY: Record<Lang, CopyShape> = {
  es: {
    nav: {
      about: "Sobre mí",
      experience: "Experiencia",
      projects: "Proyectos",
      stack: "Stack",
      education: "Educación",
    },
    hero: {
      title: "Desarrollador Full-Stack & IA",
      sub: "Construyo productos web con arquitectura escalable, herramientas modernas y una experiencia de usuario cuidada.",
      cta: "Ver experiencia",
      status: "Disponible para proyectos",
    },
    sections: {
      about: { title: "Sobre mí", sub: "Una breve presentación" },
      experience: { title: "Experiencia", sub: "Dónde he trabajado" },
      projects: { title: "Proyectos", sub: "Cosas que he construido" },
      stack: { title: "Herramientas", sub: "Con lo que trabajo" },
      hackathons: { title: "Hackathones", sub: "Competencias y retos" },
      education: { title: "Educación", sub: "Formación académica" },
      certifications: { title: "Certificaciones", sub: "Cursos y programas" },
      contact: { title: "Contacto", sub: "Hablemos de tu próximo proyecto" },
    },
    about:
      "Desarrollador Full-Stack & IA con mentalidad de founder. Llevo productos de la idea a producción con Next.js, TypeScript y Node.js, integrando modelos de lenguaje en flujos de trabajo reales. Fundador de GymRat+, un SaaS multi-tenant para gestión de gimnasios, con experiencia en hackathones internacionales, ingeniería frontend y ciberseguridad. Actualmente enfocado en desarrollo frontend y diseño de producto centrado en el usuario.",
    skillsLabel: "Habilidades clave",
    contactCta: "Escríbeme",
    downloadCv: "Descargar CV",
    contactMe: "Contáctame",
    live: "Sitio",
    source: "Código",
    footer: "Diseñado y construido por Manuel Erazo",
    present: "Presente",
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      stack: "Stack",
      education: "Education",
    },
    hero: {
      title: "Full-Stack & AI Developer",
      sub: "I build web products with scalable architecture, modern tooling and a thoughtful user experience.",
      cta: "View experience",
      status: "Available for projects",
    },
    sections: {
      about: { title: "About", sub: "A short introduction" },
      experience: { title: "Experience", sub: "Where I have worked" },
      projects: { title: "Projects", sub: "Things I have built" },
      stack: { title: "Tools", sub: "What I work with" },
      hackathons: { title: "Hackathons", sub: "Competitions and challenges" },
      education: { title: "Education", sub: "Academic background" },
      certifications: { title: "Certifications", sub: "Courses and programs" },
      contact: { title: "Contact", sub: "Let's talk about your next project" },
    },
    about:
      "Full-Stack & AI developer with a founder mindset. I take products from idea to production with Next.js, TypeScript and Node.js, wiring language models into real workflows. Founder of GymRat+, a multi-tenant SaaS for gym management, with experience in international hackathons, frontend engineering and cybersecurity. Currently focused on frontend development and user-centred product design.",
    skillsLabel: "Key skills",
    contactCta: "Get in touch",
    downloadCv: "Download CV",
    contactMe: "Contact me",
    live: "Live",
    source: "Source",
    footer: "Designed and built by Manuel Erazo",
    present: "Present",
  },
};

export const KEY_SKILLS: Record<Lang, string[]> = {
  es: [
    "React y Next.js",
    "TypeScript",
    "Node.js y APIs",
    "Integración de LLMs",
    "Arquitectura backend",
    "Bases de datos",
    "Diseño de interfaces",
    "Optimización de rendimiento",
  ],
  en: [
    "React and Next.js",
    "TypeScript",
    "Node.js and APIs",
    "LLM integration",
    "Backend architecture",
    "Databases",
    "Interface design",
    "Performance optimization",
  ],
};

/* ------------------------------------------------------------- experience */

export type Experience = {
  id: string;
  role: Bilingual;
  org: string;
  /** Simple Icons slug from src/data/brands.ts, or null for a monogram mark. */
  logo: string | null;
  /** Real logo file under public/, preferred over the slug when present. */
  logoFile?: string;
  kind: Bilingual;
  where: Bilingual;
  period: Bilingual;
  summary: Bilingual;
  bullets: Bilingual[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: "gymrat",
    role: { es: "Founder & Full-Stack Developer", en: "Founder & Full-Stack Developer" },
    org: "GymRat+",
    logo: null,
    logoFile: "/assets/logos/orgs/gymrat.png",
    kind: { es: "Tiempo completo", en: "Full-time" },
    where: { es: "Bogotá, Colombia · Remoto", en: "Bogotá, Colombia · Remote" },
    period: { es: "2024 — Presente", en: "2024 — Present" },
    summary: {
      es: "SaaS de gestión de gimnasios construido desde cero.",
      en: "Gym management SaaS built from scratch.",
    },
    bullets: [
      {
        es: "Fundé y construí un SaaS multi-tenant para gimnasios, liderando arquitectura full-stack, estrategia de producto y visión de negocio.",
        en: "Founded and built a multi-tenant SaaS for gyms, leading full-stack architecture, product strategy and business vision.",
      },
      {
        es: "Implementé facturación multi-tenant, pagos con MercadoPago, autenticación, onboarding end-to-end y panel de administración.",
        en: "Shipped multi-tenant billing, MercadoPago payments, authentication, end-to-end onboarding and a full admin panel.",
      },
      {
        es: "Stack: Next.js, TypeScript, Node.js, PostgreSQL, Prisma.",
        en: "Stack: Next.js, TypeScript, Node.js, PostgreSQL, Prisma.",
      },
    ],
  },
  {
    id: "smurfit",
    role: { es: "Mobile & Web Developer", en: "Mobile & Web Developer" },
    org: "Smurfit Kappa Cartón Colombia",
    logo: null,
    logoFile: "/assets/logos/orgs/smurfitkappa.png",
    kind: { es: "Contrato", en: "Contract" },
    where: { es: "Colombia · Remoto", en: "Colombia · Remote" },
    period: { es: "Ago — Nov 2025", en: "Aug — Nov 2025" },
    summary: {
      es: "Realidad aumentada educativa y herramientas internas.",
      en: "Educational augmented reality and internal tooling.",
    },
    bullets: [
      {
        es: "Desarrollé una aplicación móvil de realidad aumentada para un libro educativo sobre mariposas, con una experiencia de aprendizaje interactiva.",
        en: "Built an augmented reality mobile app for an educational book about butterflies, delivering an interactive learning experience.",
      },
      {
        es: "Construí herramientas internas, dashboards de reportes y soluciones web empresariales, modernizando sistemas existentes.",
        en: "Built internal tools, reporting dashboards and enterprise web solutions, modernizing existing systems.",
      },
    ],
  },
  {
    id: "gymshark",
    role: { es: "Software Engineer", en: "Software Engineer" },
    org: "Gymshark",
    logo: null,
    logoFile: "/assets/logos/orgs/gymshark.png",
    kind: { es: "Pasantía", en: "Internship" },
    where: { es: "Remoto · San Francisco Bay Area", en: "Remote · San Francisco Bay Area" },
    period: { es: "Abr — Oct 2025", en: "Apr — Oct 2025" },
    summary: {
      es: "Aplicaciones web para productos usados por miles de personas.",
      en: "Web applications for products used by thousands of people.",
    },
    bullets: [
      {
        es: "Contribuí al desarrollo de aplicaciones web enfocadas en rendimiento, escalabilidad y experiencia de usuario, junto a equipos multidisciplinarios.",
        en: "Contributed to web applications focused on performance, scalability and user experience, alongside cross-functional teams.",
      },
      {
        es: "Diseñé, implementé y optimicé funcionalidades para productos usados por miles de usuarios en todo el mundo.",
        en: "Designed, implemented and optimized features for products used by thousands of users worldwide.",
      },
    ],
  },
  {
    id: "freelance",
    role: { es: "Full-Stack Developer", en: "Full-Stack Developer" },
    org: "Freelance",
    logo: null,
    logoFile: "/assets/mark.png",
    kind: { es: "Independiente", en: "Independent" },
    where: { es: "Clientes en LATAM y Europa", en: "Clients across LATAM and Europe" },
    period: { es: "2023 — Presente", en: "2023 — Present" },
    summary: {
      es: "Más de 12 proyectos entregados en distintas industrias.",
      en: "More than 12 projects delivered across industries.",
    },
    bullets: [
      {
        es: "Entregué más de 12 proyectos en distintas industrias, priorizando calidad y tiempos de entrega cortos.",
        en: "Delivered more than 12 projects across industries, prioritizing quality and short delivery cycles.",
      },
      {
        es: "Construí soluciones completas de frontend y backend con Next.js, React, Node.js y bases de datos SQL/NoSQL.",
        en: "Built complete frontend and backend solutions with Next.js, React, Node.js and SQL/NoSQL databases.",
      },
    ],
  },
  {
    id: "sena",
    role: { es: "Software Developer", en: "Software Developer" },
    org: "Servicio Nacional de Aprendizaje (SENA)",
    logo: null,
    logoFile: "/assets/logos/orgs/sena.png",
    kind: { es: "Tiempo completo", en: "Full-time" },
    where: { es: "Colombia · Remoto", en: "Colombia · Remote" },
    period: { es: "Mar 2021 — Nov 2022", en: "Mar 2021 — Nov 2022" },
    summary: {
      es: "Sistema digital interno para la institución.",
      en: "Internal digital system for the institution.",
    },
    bullets: [
      {
        es: "Colaboré en un equipo de desarrollo para construir y mantener un sistema digital interno, aportando lógica de backend y funcionalidades administrativas.",
        en: "Worked within a development team to build and maintain an internal digital system, contributing backend logic and admin features.",
      },
    ],
  },
];

/* ------------------------------------------------------------- hackathons */

export type Hackathon = {
  id: string;
  name: string;
  org: string;
  logo: string | null;
  logoFile?: string;
  date: Bilingual;
  result?: Bilingual;
  note: Bilingual;
};

export const HACKATHONS: Hackathon[] = [
  {
    id: "claude-code",
    name: "Claude Code Hackathon 2026",
    org: "Anthropic",
    logo: "anthropic",
    date: { es: "Abril 2026", en: "April 2026" },
    result: { es: "Top 20", en: "Top 20" },
    note: {
      es: "Agente de código autónomo construido en 48 horas, con razonamiento multi-paso y ejecución autónoma de tareas.",
      en: "Autonomous coding agent built in 48 hours, with multi-step reasoning and autonomous task execution.",
    },
  },
  {
    id: "mistral",
    name: "Mistral Worldwide Hackathon",
    org: "Mistral AI × Weights & Biases × NVIDIA",
    logo: "mistralai",
    date: { es: "Febrero 2026", en: "February 2026" },
    note: {
      es: "Pipeline multi-agente con modelos de Mistral en un entorno competitivo global.",
      en: "Multi-agent pipeline using Mistral models in a global competitive environment.",
    },
  },
  {
    id: "microsoft",
    name: "Microsoft AI Agents Hackathon",
    org: "Microsoft",
    logo: "microsoftazure",
    date: { es: "2026", en: "2026" },
    note: {
      es: "Forge sobre Azure AI Foundry — seis agentes de IA que debaten, votan y generan PRDs, backlogs, arquitectura y roadmaps.",
      en: "Forge on Azure AI Foundry — six AI agents that debate, vote and generate PRDs, backlogs, architecture and roadmaps.",
    },
  },
  {
    id: "fup",
    name: "Hackathon Challenge 2025",
    org: "Fundación Universitaria de Popayán",
    logo: null,
    logoFile: "/assets/logos/orgs/fup.png",
    date: { es: "2025", en: "2025" },
    note: {
      es: "Solución de inventario y análisis de ventas para la competencia interna de la universidad.",
      en: "Inventory and sales analytics solution for the university's internal competition.",
    },
  },
];

/* --------------------------------------------------------------- projects */

export type Project = {
  id: string;
  name: string;
  year: string;
  /** Optional path to a real logo file, e.g. "/assets/logos/projects/steve.svg". */
  logo?: string;
  tagline: Bilingual;
  blurb: Bilingual;
  stack: string[];
  liveUrl?: string;
  sourceUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "creagent",
    name: "creagent",
    year: "2026",
    logo: "/assets/logos/projects/creagent.png",
    tagline: { es: "Plataforma open-source de agentes", en: "Open-source agent platform" },
    blurb: {
      es: "Compone agentes de IA a partir de un catálogo de skills reutilizables y los exporta a Claude Code, Cursor, Codex o Gemini CLI, o los sirve directo vía MCP.",
      en: "Composes AI agents from a catalog of reusable skills and exports them to Claude Code, Cursor, Codex or Gemini CLI, or serves them straight over MCP.",
    },
    stack: ["nextdotjs", "typescript", "modelcontextprotocol", "anthropic"],
    liveUrl: "https://creagent.fun",
  },
  {
    id: "steve",
    name: "steve",
    year: "2026",
    logo: "/assets/logos/projects/steve.png",
    tagline: { es: "Atención al cliente con IA", en: "AI customer support" },
    blurb: {
      es: "Unifica WhatsApp, Instagram y Meta Ads en una sola bandeja. Agentes de IA responden desde bases de conocimiento propias, agendan citas y procesan pagos.",
      en: "Unifies WhatsApp, Instagram and Meta Ads in a single inbox. AI agents answer from your own knowledge bases, book appointments and take payments.",
    },
    stack: ["nextdotjs", "postgresql", "docker", "stripe", "whatsapp"],
    liveUrl: "https://steve-manudev.vercel.app",
  },
  {
    id: "forge",
    name: "forge",
    year: "2026",
    logo: "/assets/logos/projects/forge.png",
    tagline: { es: "Estrategia de producto multi-agente", en: "Multi-agent product strategy" },
    blurb: {
      es: "Seis agentes de IA sobre Azure AI Foundry debaten, votan y generan PRDs, backlogs, arquitectura y roadmaps como un equipo de producto real.",
      en: "Six AI agents on Azure AI Foundry debate, vote and generate PRDs, backlogs, architecture and roadmaps like a real product team.",
    },
    stack: ["microsoftazure", "nextdotjs", "typescript"],
    liveUrl: "https://forgems.vercel.app",
    sourceUrl: "https://github.com/Manuekle/Forge",
  },
  {
    id: "gymrat",
    name: "GymRat+",
    year: "2024 —",
    logo: "/assets/logos/projects/gymrat.png",
    tagline: { es: "SaaS de gestión de gimnasios", en: "Gym management SaaS" },
    blurb: {
      es: "SaaS multi-tenant para gestión integral de gimnasios: miembros, planes, facturación con MercadoPago, onboarding y panel de administración.",
      en: "Multi-tenant SaaS for end-to-end gym management: members, plans, MercadoPago billing, onboarding and an admin panel.",
    },
    stack: ["nextdotjs", "postgresql", "prisma", "mercadopago"],
    liveUrl: "https://gymratplus.com",
  },
  {
    id: "sira",
    name: "SIRA",
    year: "2024",
    logo: "/assets/logos/projects/sira.png",
    tagline: { es: "Registro de asistencia por QR", en: "QR attendance system" },
    blurb: {
      es: "Sistema de registro de asistencia por QR para la Fundación Universitaria de Popayán, con backend en Node.js y consultas en tiempo real.",
      en: "QR-based attendance system for Fundación Universitaria de Popayán, with a Node.js backend and real-time queries.",
    },
    stack: ["react", "nodedotjs", "postgresql"],
    liveUrl: "https://sira-fup.online",
    sourceUrl: "https://github.com/Manuekle/sira",
  },
  {
    id: "heymed",
    name: "heyMed",
    year: "2023",
    logo: "/assets/logos/projects/heymed.png",
    tagline: { es: "Consulta médica virtual", en: "Virtual medical consultation" },
    blurb: {
      es: "Plataforma de consulta médica virtual con integración de IA, automatización de flujos clínicos e historiales de pacientes.",
      en: "Virtual medical consultation platform with AI integration, clinical workflow automation and patient records.",
    },
    stack: ["react", "nodedotjs", "mongodb", "openai"],
    liveUrl: "https://heymed-manudev.vercel.app",
    sourceUrl: "https://github.com/Manuekle/heyMed",
  },
  {
    id: "hinomaru",
    name: "hinomaru",
    year: "2024",
    logo: "/assets/logos/projects/hinomaru.png",
    tagline: { es: "Aprender japonés", en: "Learn Japanese" },
    blurb: {
      es: "Aplicación para aprender japonés con kana, vocabulario y repetición espaciada.",
      en: "App for learning Japanese with kana, vocabulary and spaced repetition.",
    },
    stack: ["react", "typescript", "expo"],
    liveUrl: "https://hinomaru.vercel.app",
    sourceUrl: "https://github.com/Manuekle/hinomaru",
  },
  {
    id: "butterflyar",
    name: "ButterflyAR",
    year: "2023",
    logo: "/assets/logos/projects/butterflyar.png",
    tagline: { es: "Realidad aumentada educativa", en: "Educational augmented reality" },
    blurb: {
      es: "Aplicación educativa de realidad aumentada sobre mariposas, construida para un libro impreso.",
      en: "Educational augmented reality app about butterflies, built to accompany a printed book.",
    },
    stack: ["flutter"],
    sourceUrl: "https://github.com/Manuekle/butterflyar-mobile",
  },
];

/* ------------------------------------------------------------------ stack */

export type StackItem = { name: string; slug: string };
export type StackGroup = { id: string; label: Bilingual; items: StackItem[] };

export const STACK: StackGroup[] = [
  {
    id: "frontend",
    label: { es: "Frontend", en: "Frontend" },
    items: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Astro", slug: "astro" },
      { name: "TypeScript", slug: "typescript" },
      { name: "JavaScript", slug: "javascript" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "Flutter", slug: "flutter" },
      { name: "Motion", slug: "framer" },
    ],
  },
  {
    id: "backend",
    label: { es: "Backend", en: "Backend" },
    items: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Python", slug: "python" },
      { name: "Bun", slug: "bun" },
    ],
  },
  {
    id: "data",
    label: { es: "Bases de datos", en: "Databases" },
    items: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "MySQL", slug: "mysql" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "Redis", slug: "redis" },
      { name: "Prisma", slug: "prisma" },
    ],
  },
  {
    id: "ai",
    label: { es: "IA y LLMs", en: "AI and LLMs" },
    items: [
      { name: "OpenAI", slug: "openai" },
      { name: "Anthropic", slug: "anthropic" },
      { name: "Claude", slug: "claude" },
      { name: "Mistral", slug: "mistralai" },
      { name: "Gemini", slug: "googlegemini" },
      { name: "Ollama", slug: "ollama" },
      { name: "MCP", slug: "modelcontextprotocol" },
      { name: "n8n", slug: "n8n" },
    ],
  },
  {
    id: "infra",
    label: { es: "DevOps e infraestructura", en: "DevOps and infrastructure" },
    items: [
      { name: "Docker", slug: "docker" },
      { name: "Linux", slug: "linux" },
      { name: "Git", slug: "git" },
      { name: "Vercel", slug: "vercel" },
      { name: "Google Cloud", slug: "googlecloud" },
      { name: "Azure", slug: "microsoftazure" },
    ],
  },
  {
    id: "tools",
    label: { es: "Diseño y herramientas", en: "Design and tools" },
    items: [
      { name: "Figma", slug: "figma" },
      { name: "Postman", slug: "postman" },
      { name: "MercadoPago", slug: "mercadopago" },
      { name: "Meta Ads", slug: "meta" },
      { name: "Stripe", slug: "stripe" },
    ],
  },
];

/* -------------------------------------------------- education & schooling */

export type Education = {
  school: string;
  logoFile?: string;
  degree: Bilingual;
  period: string;
  note?: Bilingual;
};

export const EDUCATION: Education[] = [
  {
    school: "Fundación Universitaria de Popayán",
    logoFile: "/assets/logos/orgs/fup.png",
    degree: { es: "Ingeniería de Sistemas", en: "Systems Engineering" },
    period: "2021 — 2026",
    note: { es: "Énfasis en ingeniería de software", en: "Software engineering focus" },
  },
];

export type Certification = { name: Bilingual; issuer: string; logo: string | null; logoFile?: string };

export const CERTIFICATIONS: Certification[] = [
  {
    name: { es: "Building with the Claude API", en: "Building with the Claude API" },
    issuer: "Anthropic",
    logo: "anthropic",
  },
  {
    name: { es: "Agents League — Reasoning Agents", en: "Agents League — Reasoning Agents" },
    issuer: "Global AI Community",
    logo: null,
  },
  {
    name: {
      es: "Fundamentos, iniciación y planificación de la gestión de proyectos",
      en: "Project management foundations, initiation and planning",
    },
    issuer: "Coursera · SkillUp EdTech",
    logo: "coursera",
  },
  {
    name: {
      es: "Cómo resolver problemas y tomar decisiones con eficacia",
      en: "Effective problem solving and decision making",
    },
    issuer: "University of California, Irvine",
    logo: null,
  },
  {
    name: { es: "Google UX Design (especialización)", en: "Google UX Design (specialization)" },
    issuer: "Coursera · Google",
    logo: "google",
  },
];
