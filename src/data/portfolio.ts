export type Lang = "en" | "es";

export type Bilingual = { en: string; es: string };

export type SectionMeta = [title: string, idx: string, jp: string, sub: string];

export type CopyShape = {
  nav: { work: string; projects: string; stack: string; services: string; contact: string };
  hero: {
    hello: string;
    name: string;
    role: string;
    sub: string;
    status: string;
    cta: string;
    ctaSub: string;
    based: string;
    since: string;
  };
  sections: {
    about: SectionMeta;
    experience: SectionMeta;
    projects: SectionMeta;
    stack: SectionMeta;
    method: SectionMeta;
    services: SectionMeta;
    faq: SectionMeta;
    contact: SectionMeta;
  };
  aboutCopy: string;
  locationLabel: string;
  yearsLabel: string;
  shippedLabel: string;
  methodSteps: [title: string, body: string][];
  services: [title: string, price: string, time: string, items: string[], recommended?: boolean][];
  faqs: [q: string, a: string][];
  cta: { line1: string; line2: string; btn: string };
  footerNote: string;
};

export const COPY: Record<Lang, CopyShape> = {
  en: {
    nav: { work: "Work", projects: "Projects", stack: "Stack", services: "Services", contact: "Contact" },
    hero: {
      hello: "Hello, I'm",
      name: "Manuel Erazo",
      role: "Web & AI Developer",
      sub: "Building fast, beautiful, scalable products — focused on freelance & SaaS.",
      status: "Open to work",
      cta: "Get in touch",
      ctaSub: "Let's talk about your next project.",
      based: "Based in Popayán, Colombia",
      since: "Shipping since 2021",
    },
    sections: {
      about: ["About", "01", "", "A short introduction"],
      experience: ["Experience", "02", "", "What I've been doing"],
      projects: ["Projects", "03", "", "Things I've shipped"],
      stack: ["Stack", "04", "", "Tools I use"],
      method: ["Method", "05", "", "How I work"],
      services: ["Services", "06", "", "Freelance offerings"],
      faq: ["FAQ", "07", "", "Common questions"],
      contact: ["Contact", "08", "", "Let's build something"],
    },
    aboutCopy:
      "I design and build web products with a focus on speed, polish, and craft. I work mostly with React, Next.js and modern LLM tooling — from landing pages to full SaaS, with a soft spot for AI integrations that actually make a product better.",
    locationLabel: "Location",
    yearsLabel: "Years coding",
    shippedLabel: "Projects shipped",
    methodSteps: [
      ["Discovery call", "Goals, audience, constraints — what success looks like."],
      ["Proposal & plan", "Scope, timeline, deliverables. Clear, no surprises."],
      ["Design & build", "Iterating in the open with weekly demos."],
      ["Test & review", "QA across devices, copy review, accessibility pass."],
      ["Launch & support", "Go-live, monitoring, and ongoing improvements."],
    ],
    services: [
      ["Landing / MVP", "From $250", "1–2 weeks", ["Single-page site or thin MVP", "Copy + visual direction", "Performance & SEO basics", "Deploy on Vercel"]],
      ["Web App", "From $500", "3–6 weeks", ["Full Next.js app", "Auth, DB, billing", "Admin & analytics", "Deploy + handover"], true],
      ["Custom AI", "From $400", "2–4 weeks", ["LLM-powered feature in your product", "Provider-agnostic (OpenAI, Anthropic…)", "Eval harness + guardrails", "MCP tooling on request"]],
    ],
    faqs: [
      ["How long does a typical project take?", "Landing pages take 1–2 weeks, MVPs 2–4 weeks, full web apps 4–8 weeks. I'll give you a tight estimate after the discovery call."],
      ["Do you offer maintenance?", "Yes — monthly retainers cover hosting, small features, bugfixes and content updates. Cancel anytime."],
      ["What's actually delivered?", "Source code in a repo you own, a deployed live URL, a README, and a 30-minute handover call. Designs, if applicable, in Figma."],
      ["Do you work with existing teams?", "Frequently. I drop into existing codebases, follow your conventions, and ship the same way your team does."],
    ],
    cta: { line1: "Have something in mind?", line2: "Let's make it.", btn: "Start a project" },
    footerNote: "Built by hand. Shipped from Popayán.",
  },
  es: {
    nav: { work: "Trabajo", projects: "Proyectos", stack: "Stack", services: "Servicios", contact: "Contacto" },
    hero: {
      hello: "Hola, soy",
      name: "Manuel Erazo",
      role: "Desarrollador Web & IA",
      sub: "Construyo productos rápidos, atractivos y escalables — enfocado en freelance y SaaS.",
      status: "Disponible para trabajar",
      cta: "Contáctame",
      ctaSub: "Hablemos de tu próximo proyecto.",
      based: "Desde Popayán, Colombia",
      since: "Enviando desde 2021",
    },
    sections: {
      about: ["Sobre mí", "01", "", "Una breve presentación"],
      experience: ["Experiencia", "02", "", "Lo que he hecho"],
      projects: ["Proyectos", "03", "", "Cosas que he creado"],
      stack: ["Stack", "04", "", "Herramientas que uso"],
      method: ["Método", "05", "", "Cómo trabajo"],
      services: ["Servicios", "06", "", "Trabajos freelance"],
      faq: ["FAQ", "07", "", "Preguntas frecuentes"],
      contact: ["Contacto", "08", "", "Construyamos algo"],
    },
    aboutCopy:
      "Diseño y construyo productos web con foco en velocidad, detalle y oficio. Trabajo con React, Next.js y herramientas modernas de LLM — desde landings hasta SaaS completos, con una debilidad por integraciones de IA que realmente mejoran el producto.",
    locationLabel: "Ubicación",
    yearsLabel: "Años codeando",
    shippedLabel: "Proyectos lanzados",
    methodSteps: [
      ["Llamada de descubrimiento", "Objetivos, audiencia, restricciones — cómo se ve el éxito."],
      ["Propuesta y plan", "Alcance, cronograma, entregables. Claro, sin sorpresas."],
      ["Diseño y desarrollo", "Iterando con demos semanales."],
      ["Pruebas y revisión", "QA multidispositivo, revisión de copy, accesibilidad."],
      ["Lanzamiento y soporte", "Go-live, monitoreo y mejoras continuas."],
    ],
    services: [
      ["Landing / MVP", "Desde $250", "1–2 semanas", ["Sitio de una página o MVP ligero", "Copy + dirección visual", "Performance y SEO básico", "Deploy en Vercel"]],
      ["Web App", "Desde $500", "3–6 semanas", ["App completa en Next.js", "Auth, DB, pagos", "Admin y analítica", "Deploy + entrega"], true],
      ["IA a medida", "Desde $400", "2–4 semanas", ["Feature con LLM en tu producto", "Independiente de proveedor (OpenAI, Anthropic…)", "Sistema de evals + guardrails", "MCP a pedido"]],
    ],
    faqs: [
      ["¿Cuánto toma un proyecto típico?", "Landing pages 1–2 semanas, MVPs 2–4 semanas, web apps completas 4–8 semanas. Te doy un estimado preciso tras la llamada inicial."],
      ["¿Ofreces mantenimiento?", "Sí — los retainers mensuales cubren hosting, features pequeños, bugfixes y actualizaciones. Cancelable en cualquier momento."],
      ["¿Qué se entrega exactamente?", "Código fuente en un repo tuyo, URL en vivo desplegada, README, y una llamada de handover de 30 minutos. Diseños en Figma si aplica."],
      ["¿Trabajas con equipos existentes?", "Frecuentemente. Entro en bases de código existentes, sigo sus convenciones y entrego al ritmo del equipo."],
    ],
    cta: { line1: "¿Tienes algo en mente?", line2: "Hagámoslo.", btn: "Iniciar proyecto" },
    footerNote: "Hecho a mano. Enviado desde Popayán.",
  },
};

export type ExperienceEntry = {
  when: string;
  whenJp: string;
  role: Bilingual;
  org: string;
  note: Bilingual;
  highlight?: boolean;
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    when: "Apr 2026", whenJp: "",
    role: { en: "Participant", es: "Participante" },
    org: "Claude Code Hackathon 2026 · Anthropic",
    note: { en: "Built an autonomous coding agent in 48h. Top 20.", es: "Agente autónomo de código en 48h. Top 20." },
    highlight: true,
  },
  {
    when: "Feb 2026", whenJp: "",
    role: { en: "Participant", es: "Participante" },
    org: "Mistral Worldwide Hackathon",
    note: { en: "Multi-agent retrieval pipeline using Mistral models.", es: "Pipeline multi-agente con modelos Mistral." },
  },
  {
    when: "2026", whenJp: "",
    role: { en: "Participant", es: "Participante" },
    org: "Microsoft AI Agents Hackathon",
    note: {
      en: "Built forge on Azure AI Foundry — six AI agents debate, vote and generate PRDs, backlogs, architecture and roadmaps.",
      es: "Construí forge sobre Azure AI Foundry — seis agentes de IA debaten, votan y generan PRDs, backlogs, arquitectura y roadmaps.",
    },
  },
  {
    when: "Apr — Oct 2025", whenJp: "",
    role: { en: "Software Engineer · Intern", es: "Software Engineer · Pasantía" },
    org: "Gymshark · Remote (SF Bay Area)",
    note: {
      en: "Contributed to performance-, scalability- and UX-focused web apps for products used by thousands of users worldwide, working with cross-functional teams.",
      es: "Contribuí a apps web enfocadas en rendimiento, escalabilidad y UX para productos usados por miles de usuarios a nivel global, junto a equipos multidisciplinarios.",
    },
    highlight: true,
  },
  {
    when: "2025", whenJp: "",
    role: { en: "Participant", es: "Participante" },
    org: "Reto Hackatón 2025 · FUP",
    note: {
      en: "Inventory and sales analytics solution.",
      es: "Solución de análisis de inventario y ventas.",
    },
  },
  {
    when: "2025", whenJp: "",
    role: { en: "Web Developer", es: "Desarrollador Web" },
    org: "Smurfit Kappa Cartón Colombia",
    note: { en: "Internal tools and reporting dashboards.", es: "Herramientas internas y dashboards de reportes." },
  },
  {
    when: "2024 — now", whenJp: "",
    role: { en: "CEO & Founder", es: "CEO & Fundador" },
    org: "GymRat+ — SaaS for gyms",
    note: { en: "End-to-end product, billing, and onboarding.", es: "Producto, facturación y onboarding end-to-end." },
  },
  {
    when: "2023 — now", whenJp: "",
    role: { en: "Freelance Web Developer", es: "Desarrollador Web Freelance" },
    org: "Independent",
    note: { en: "Twelve client projects across LATAM and EU.", es: "Doce proyectos para clientes en LATAM y UE." },
  },
  {
    when: "2021 — 2026", whenJp: "",
    role: { en: "Systems Engineering", es: "Ingeniería de Sistemas" },
    org: "Fundación Universitaria de Popayán",
    note: { en: "B.Sc. — graduating 2026.", es: "Pregrado — graduación 2026." },
  },
];

export type ProjectArt = "gym" | "sira" | "qr" | "hino" | "med" | "butter" | "inv" | "forge";

export type Project = {
  id: string;
  name: string;
  year: string;
  type: Bilingual;
  blurb: Bilingual;
  stack: string[];
  big?: boolean;
  art: ProjectArt;
  liveUrl?: string;
  sourceUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "forge",
    name: "forge",
    year: "2026",
    type: { en: "Hackathon · Microsoft · AI Agents", es: "Hackatón · Microsoft · Agentes IA" },
    blurb: {
      en: "Six specialized AI agents debate, vote and generate PRDs, backlogs, architecture and roadmaps — just like a real product team. Built on Azure AI Foundry.",
      es: "Seis agentes de IA especializados debaten, votan y generan PRDs, backlogs, arquitectura y roadmaps — como un equipo de producto real. Construido sobre Azure AI Foundry.",
    },
    stack: ["Azure AI Foundry", "Next.js", "TypeScript", "Multi-agent"],
    big: true,
    art: "forge",
    liveUrl: "https://forgems.vercel.app/",
    sourceUrl: "https://github.com/Manuekle/Forge",
  },
  {
    id: "gymrat",
    name: "GymRat+",
    year: "2024 —",
    type: { en: "SaaS · Active", es: "SaaS · Activo" },
    blurb: { en: "Full SaaS for gyms — members, plans, payments.", es: "SaaS integral para gimnasios — miembros, planes, pagos." },
    stack: ["Next.js", "Prisma", "PostgreSQL", "MercadoPago"],
    art: "gym",
    liveUrl: "https://gymratplus.com/",
  },
  {
    id: "sira",
    name: "SIRA",
    year: "2024",
    type: { en: "University · QR Attendance", es: "Universidad · Asistencia QR" },
    blurb: { en: "Sistema Integrado de Registro de Asistencia — QR-based class attendance built for FUP.", es: "Sistema Integrado de Registro de Asistencia con códigos QR — desarrollado para la FUP." },
    stack: ["React", "Express", "PostgreSQL", "QR"],
    art: "qr",
    liveUrl: "https://sira-fup.online/",
    sourceUrl: "https://github.com/Manuekle/sira",
  },
  {
    id: "hinomaru",
    name: "hinomaru",
    year: "2024",
    type: { en: "Language · Japanese", es: "Idiomas · Japonés" },
    blurb: { en: "Japanese learning app — kana, vocabulary and SRS reviews.", es: "App para aprender japonés — kana, vocabulario y repaso espaciado." },
    stack: ["React Native", "TypeScript", "SQLite"],
    art: "hino",
    liveUrl: "https://hinomaru.vercel.app/",
    sourceUrl: "https://github.com/Manuekle/hinomaru",
  },
  {
    id: "heymed",
    name: "heyMed",
    year: "2023",
    type: { en: "Health · Telemedicine", es: "Salud · Telemedicina" },
    blurb: { en: "Digital platform for virtual medical consultations.", es: "Plataforma digital para consultas médicas virtuales." },
    stack: ["React", "Node.js", "MongoDB"],
    art: "med",
    liveUrl: "https://heymed.fun/",
    sourceUrl: "https://github.com/Manuekle/heyMed",
  },
  {
    id: "butterflyar",
    name: "ButterflyAR",
    year: "2023",
    type: { en: "Education · AR", es: "Educación · AR" },
    blurb: { en: "Augmented reality app teaching butterfly species.", es: "App de RA educativa sobre mariposas." },
    stack: ["Flutter", "AR Core"],
    art: "butter",
    sourceUrl: "https://github.com/Manuekle/butterflyar-mobile",
  },
  {
    id: "retohackaton2025fup",
    name: "Reto Hackatón 2025 FUP",
    year: "2025",
    type: { en: "Hackathon · Inventory & Sales", es: "Hackatón · Inventario y Ventas" },
    blurb: {
      en: "Inventory and sales analytics solution built for FUP's 2025 hackathon challenge.",
      es: "Solución de análisis de inventario y ventas construida para el reto hackatón 2025 de la FUP.",
    },
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Charts"],
    art: "inv",
    liveUrl: "https://retohackaton2025fup.vercel.app/",
    sourceUrl: "https://github.com/Manuekle/retohackaton2025fup",
  },
];

export type Testimonial = {
  quote: Bilingual;
  name: string;
  role: Bilingual;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: { en: "Manuel ships fast and his code is the cleanest I've reviewed in a long time. He treats the product like an owner.", es: "Manuel entrega rápido y su código es de los más limpios que he revisado. Trata el producto como dueño." },
    name: "Andrea Vélez",
    role: { en: "Product Lead, LATAM SaaS", es: "Product Lead, SaaS LATAM" },
  },
  {
    quote: { en: "He took our scrappy MVP and turned it into a stable platform handling thousands of users a week.", es: "Tomó nuestro MVP improvisado y lo convirtió en una plataforma estable con miles de usuarios por semana." },
    name: "Camilo Restrepo",
    role: { en: "Founder, Gym Network CO", es: "Fundador, Gym Network CO" },
  },
  {
    quote: { en: "Best AI integration work I've seen from an independent dev. Pragmatic, well-evaluated, no hype.", es: "El mejor trabajo de integración de IA que he visto de un dev independiente. Pragmático y bien evaluado." },
    name: "Lucía Marín",
    role: { en: "CTO, healthtech startup", es: "CTO, healthtech" },
  },
];

export const ACHIEVEMENTS = [
  { num: "22+", labelEn: "Projects shipped", labelEs: "Proyectos lanzados" },
  { num: "05", labelEn: "Years coding", labelEs: "Años codeando" },
  { num: "12", labelEn: "Freelance clients", labelEs: "Clientes freelance" },
  { num: "03", labelEn: "Hackathons '26", labelEs: "Hackathons '26" },
];

export const NOW: Record<Lang, string[]> = {
  en: [
    "Building GymRat+ v2 — multi-tenant billing",
    "Studying Japanese (N5 → N4)",
    "Reading: Designing Data-Intensive Apps",
  ],
  es: [
    "Construyendo GymRat+ v2 — billing multi-tenant",
    "Estudiando japonés (N5 → N4)",
    "Leyendo: Designing Data-Intensive Apps",
  ],
};

export type StackGroup = {
  id: string;
  label: Bilingual;
  jp: string;
  items: string[];
  highlight?: boolean;
};

export const STACK: StackGroup[] = [
  {
    id: "frontend",
    label: { en: "Frontend", es: "Frontend" }, jp: "",
    items: ["React", "Next.js", "Astro", "TypeScript", "JavaScript", "Tailwind CSS", "Flutter", "Motion"],
  },
  {
    id: "backend",
    label: { en: "Backend", es: "Backend" }, jp: "",
    items: ["Node.js", "Python", "Bun"],
  },
  {
    id: "database",
    label: { en: "Database", es: "Base de Datos" }, jp: "",
    items: ["PostgreSQL", "MySQL", "Prisma", "MongoDB"],
  },
  {
    id: "tools",
    label: { en: "Tools", es: "Herramientas" }, jp: "",
    items: ["Git", "Figma", "Docker", "Postman", "Vercel", "Redis", "MercadoPago", "GCP", "Meta Ads"],
  },
  {
    id: "ai",
    label: { en: "AI & LLMs", es: "IA & LLMs" }, jp: "",
    items: ["OpenAI", "Gemini", "Anthropic", "Mistral", "Claude", "Kimi", "MCP", "n8n", "Ollama"],
    highlight: true,
  },
];

export const SOCIALS = [
  { label: "GitHub", handle: "@Manuekle", url: "https://github.com/Manuekle" },
  { label: "LinkedIn", handle: "/in/manuekle", url: "https://linkedin.com/in/manuekle" },
  { label: "Instagram", handle: "@manudev.jsx", url: "https://instagram.com/manudev.jsx" },
  { label: "Email", handle: "meeerazo7@hotmail.com", url: "mailto:meeerazo7@hotmail.com" },
];
