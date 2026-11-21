import type { Lang } from "./portfolio";

/* The CV, written for applicant tracking systems: one column, standard
   section names, plain text, the stack named in every entry. Facts match
   portfolio.ts; the wording is tighter and keyword-first. Rendered by
   src/pages/cv/[lang].astro and printed to public/assets/CV_Manuel_Erazo_*.pdf. */

export type CvEntry = { title: string; meta?: string; when?: string; link?: { label: string; href: string }; bullets: string[] };
export type Cv = {
  name: string;
  headline: string;
  contact: { label: string; href?: string }[];
  sections: {
    summary: string;
    experience: string;
    projects: string;
    openSource: string;
    skills: string;
    education: string;
    certifications: string;
  };
  summary: string;
  experience: CvEntry[];
  projects: CvEntry[];
  openSource: CvEntry[];
  skills: { label: string; items: string }[];
  education: CvEntry[];
  certifications: string[];
};

const contact = () => [
  { label: "Bogotá, Colombia" },
  { label: "meerazo7@hotmail.com", href: "mailto:meerazo7@hotmail.com" },
  { label: "+57 311 271 1242", href: "tel:+573112711242" },
  { label: "manudev.vercel.app", href: "https://manudev.vercel.app" },
  { label: "github.com/Manuekle", href: "https://github.com/Manuekle" },
  { label: "linkedin.com/in/manuekle", href: "https://linkedin.com/in/manuekle" },
];

export const CV: Record<Lang, Cv> = {
  en: {
    name: "Manuel Esteban Erazo Medina",
    headline: "AI Engineer · Full Stack Developer | Python, TypeScript, Next.js, PostgreSQL, AWS | AI Agents and RAG",
    contact: contact(),
    sections: {
      summary: "Summary",
      experience: "Experience",
      projects: "Projects",
      openSource: "Open Source",
      skills: "Technical Skills",
      education: "Education",
      certifications: "Certifications",
    },
    summary:
      "AI engineer and full stack developer who builds SaaS products end to end: interfaces, REST APIs, PostgreSQL data models and deployment. Focused on AI agents and retrieval-augmented generation (RAG): support and sales agents for WhatsApp and Instagram, a multimodal RAG platform with citations, and a computer-use agent.",
    experience: [
      {
        title: "Blindem",
        meta: "AI Engineer | Colombia",
        when: "Oct 2026 – Present",
        bullets: [
          "Build the local LLM assistant (Ollama) of Blindem Liquidaciones, which explains each settlement figure and answers labor-law questions citing the law.",
          "The app calculates Colombian contract settlements (severance, bonus, vacation, indemnity, contributions) with each year's legal parameters; Laravel 12, PHP 8.3, PostgreSQL 16, Docker, 101 PHPUnit tests.",
        ],
      },
      {
        title: "GymRat+",
        meta: "Founder and Full Stack Developer | Remote",
        when: "Jan 2024 – Present",
        bullets: [
          "Founded a fitness and coaching platform with 60 users, built with Next.js, TypeScript, PostgreSQL and Drizzle: training plans, nutrition, coach management, authentication, memberships and payments.",
        ],
      },
      {
        title: "Independent",
        meta: "Full Stack Developer | Remote",
        when: "Jan 2023 – Present",
        bullets: [
          "Build web applications, REST APIs and AI integrations with React, Next.js, TypeScript and SQL/NoSQL databases.",
        ],
      },
      {
        title: "Smurfit Kappa Cartón Colombia",
        meta: "Mobile Application Developer | Remote, part-time",
        when: "Aug 2025 – Nov 2025",
        bullets: [
          "Developed ButterflyAR with Flutter and Dart: augmented reality content for a printed educational book.",
        ],
      },
      {
        title: "Servicio Nacional de Aprendizaje (SENA)",
        meta: "Software Developer | Remote",
        when: "Mar 2021 – Nov 2022",
        bullets: [
          "Built backend logic and administrative features for an internal system as part of a development team.",
        ],
      },
    ],
    projects: [
      {
        title: "Oruka",
        meta: "Next.js, TypeScript, PostgreSQL, Docker",
        link: { label: "oruka.si/en", href: "https://www.oruka.si/en" },
        bullets: [
          "AI agents for customer support and sales on WhatsApp and Instagram, with a unified inbox, deals and workflow automation; isolated per-customer deployments. Private beta.",
        ],
      },
      {
        title: "Ragis",
        meta: "Python, Next.js, PostgreSQL, AWS, Terraform",
        link: { label: "ragis.app", href: "https://ragis.app/" },
        bullets: [
          "Multimodal RAG platform that answers from documents, slides and recordings with verifiable citations; full-text, vector and graph retrieval in PostgreSQL with document-level permissions.",
        ],
      },
      {
        title: "Frontier Lab10",
        meta: "TypeScript, Node.js, SQLite",
        link: { label: "github.com/Manuekle/lab10-hack", href: "https://github.com/Manuekle/lab10-hack" },
        bullets: [
          "Supervised computer-use agent that operates a remote desktop over VNC; completed 45 of 56 hidden evaluation tasks.",
        ],
      },
      {
        title: "creagent",
        meta: "Next.js, TypeScript, MCP",
        link: { label: "creagent.fun", href: "https://creagent.fun/demo" },
        bullets: [
          "Visual AI agent composer with reusable skills and exports for Claude Code, Codex and Cursor; MCP server published on npm.",
        ],
      },
    ],
    openSource: [
      {
        title: "nxnative",
        meta: "Swift, Python",
        link: { label: "github.com/Manuekle/nxnative", href: "https://github.com/Manuekle/nxnative" },
        bullets: [
          "Built NX Packer (macOS app that packages games as native Mac and iPhone apps) and NX Pad (iPhone Wi-Fi controller) on a fork of nxnative, an open-source project with 16.3k GitHub stars.",
          "22 merged pull requests in repositories owned by other accounts.",
        ],
      },
    ],
    skills: [
      { label: "Programming", items: "TypeScript, JavaScript, Python, PHP, SQL, Swift, Dart, HTML, CSS" },
      { label: "Frameworks", items: "React, Next.js, Node.js, Laravel, Astro, Tailwind CSS, SwiftUI, Flutter" },
      { label: "Data", items: "PostgreSQL, MongoDB, SQLite, Drizzle, Prisma, REST APIs" },
      { label: "AI", items: "AI agents, LLM integration, RAG, MCP, Claude API, Ollama, Azure AI Foundry" },
      { label: "Cloud and tools", items: "AWS, Terraform, Docker, Vercel, Git, Linux" },
      { label: "Languages", items: "Spanish (native), English (B1, intermediate)" },
    ],
    education: [
      {
        title: "Fundación Universitaria de Popayán",
        meta: "Systems Engineering",
        when: "Graduated June 2026",
        bullets: [],
      },
    ],
    certifications: [
      "Building with the Claude API (Anthropic)",
      "Agents League: Reasoning Agents (Global AI Community)",
      "Google UX Design Specialization (Coursera, Google)",
    ],
  },
  es: {
    name: "Manuel Esteban Erazo Medina",
    headline: "Ingeniero de IA · Full Stack | Python, TypeScript, Next.js, PostgreSQL, AWS | Agentes de IA y RAG",
    contact: contact(),
    sections: {
      summary: "Perfil",
      experience: "Experiencia",
      projects: "Proyectos",
      openSource: "Código abierto",
      skills: "Habilidades técnicas",
      education: "Educación",
      certifications: "Certificaciones",
    },
    summary:
      "Ingeniero de IA y desarrollador full stack que construye productos SaaS completos: interfaces, APIs REST, modelos de datos en PostgreSQL y despliegue. Enfocado en agentes de IA y generación aumentada por recuperación (RAG): agentes de soporte y ventas para WhatsApp e Instagram, una plataforma RAG multimodal con citas y un agente de uso del computador.",
    experience: [
      {
        title: "Blindem",
        meta: "Ingeniero de Inteligencia Artificial | Colombia",
        when: "Oct 2026 – Presente",
        bullets: [
          "Construyo el asistente LLM local (Ollama) de Blindem Liquidaciones, que explica cada cifra de la liquidación y responde preguntas laborales citando la norma.",
          "La app calcula liquidaciones de contratos en Colombia (cesantías, prima, vacaciones, indemnización, aportes) con la vigencia legal de cada año; Laravel 12, PHP 8.3, PostgreSQL 16, Docker, 101 pruebas PHPUnit.",
        ],
      },
      {
        title: "GymRat+",
        meta: "Fundador y Desarrollador Full Stack | Remoto",
        when: "Ene 2024 – Presente",
        bullets: [
          "Fundé una plataforma de entrenamiento y coaching con 60 usuarios, hecha con Next.js, TypeScript, PostgreSQL y Drizzle: planes, nutrición, gestión de entrenadores, autenticación, membresías y pagos.",
        ],
      },
      {
        title: "Independiente",
        meta: "Desarrollador Full Stack | Remoto",
        when: "Ene 2023 – Presente",
        bullets: [
          "Construyo aplicaciones web, APIs REST e integraciones de IA con React, Next.js, TypeScript y bases de datos SQL/NoSQL.",
        ],
      },
      {
        title: "Smurfit Kappa Cartón Colombia",
        meta: "Desarrollador de Aplicaciones Móviles | Remoto, medio tiempo",
        when: "Ago 2025 – Nov 2025",
        bullets: [
          "Desarrollé ButterflyAR con Flutter y Dart: realidad aumentada para un libro educativo impreso.",
        ],
      },
      {
        title: "Servicio Nacional de Aprendizaje (SENA)",
        meta: "Desarrollador de Software | Remoto",
        when: "Mar 2021 – Nov 2022",
        bullets: [
          "Construí lógica de backend y funciones administrativas de un sistema interno en un equipo de desarrollo.",
        ],
      },
    ],
    projects: [
      {
        title: "Oruka",
        meta: "Next.js, TypeScript, PostgreSQL, Docker",
        link: { label: "oruka.si/en", href: "https://www.oruka.si/en" },
        bullets: [
          "Agentes de IA para soporte y ventas en WhatsApp e Instagram, con bandeja unificada, oportunidades y automatización de flujos; despliegues aislados por cliente. Beta privada.",
        ],
      },
      {
        title: "Ragis",
        meta: "Python, Next.js, PostgreSQL, AWS, Terraform",
        link: { label: "ragis.app", href: "https://ragis.app/" },
        bullets: [
          "Plataforma RAG multimodal que responde desde documentos, presentaciones y grabaciones con citas verificables; búsqueda de texto, vectores y grafos en PostgreSQL con permisos por documento.",
        ],
      },
      {
        title: "Frontier Lab10",
        meta: "TypeScript, Node.js, SQLite",
        link: { label: "github.com/Manuekle/lab10-hack", href: "https://github.com/Manuekle/lab10-hack" },
        bullets: [
          "Agente supervisado que opera un escritorio remoto por VNC; completó 45 de 56 tareas de evaluación oculta.",
        ],
      },
      {
        title: "creagent",
        meta: "Next.js, TypeScript, MCP",
        link: { label: "creagent.fun", href: "https://creagent.fun/demo" },
        bullets: [
          "Composer visual de agentes de IA con skills reutilizables y exportación para Claude Code, Codex y Cursor; servidor MCP publicado en npm.",
        ],
      },
    ],
    openSource: [
      {
        title: "nxnative",
        meta: "Swift, Python",
        link: { label: "github.com/Manuekle/nxnative", href: "https://github.com/Manuekle/nxnative" },
        bullets: [
          "Construí NX Packer (app de macOS que empaqueta juegos como apps de Mac y iPhone) y NX Pad (control Wi-Fi para iPhone) sobre un fork de nxnative, proyecto open source con 16.3k estrellas.",
          "22 pull requests fusionados en repositorios de otras cuentas.",
        ],
      },
    ],
    skills: [
      { label: "Programación", items: "TypeScript, JavaScript, Python, PHP, SQL, Swift, Dart, HTML, CSS" },
      { label: "Frameworks", items: "React, Next.js, Node.js, Laravel, Astro, Tailwind CSS, SwiftUI, Flutter" },
      { label: "Datos", items: "PostgreSQL, MongoDB, SQLite, Drizzle, Prisma, APIs REST" },
      { label: "IA", items: "Agentes de IA, integración de LLM, RAG, MCP, Claude API, Ollama, Azure AI Foundry" },
      { label: "Nube y herramientas", items: "AWS, Terraform, Docker, Vercel, Git, Linux" },
      { label: "Idiomas", items: "Español (nativo), inglés (B1, intermedio)" },
    ],
    education: [
      {
        title: "Fundación Universitaria de Popayán",
        meta: "Ingeniería de Sistemas",
        when: "Graduado en junio de 2026",
        bullets: [],
      },
    ],
    certifications: [
      "Building with the Claude API (Anthropic)",
      "Agents League: Reasoning Agents (Global AI Community)",
      "Google UX Design, especialización (Coursera, Google)",
    ],
  },
};
