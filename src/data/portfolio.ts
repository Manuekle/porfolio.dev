export type Lang = "es" | "en";
export type Bilingual = { es: string; en: string };

/* ---------------------------------------------------------------- profile */

export const PROFILE = {
  name: "Manuel Erazo",
  fullName: "Manuel Esteban Erazo Medina",
  role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" } as Bilingual,
  location: { es: "Bogotá, Colombia", en: "Bogotá, Colombia" } as Bilingual,
  availability: {
    es: "Busco empleo remoto internacional",
    en: "Open to international remote roles",
  } as Bilingual,
  experience: { es: "Ingeniero de Sistemas · 2026", en: "Systems Engineering graduate · 2026" } as Bilingual,
  email: "meerazo7@hotmail.com",
  phone: "+57 311 271 1242",
  site: "manudev.vercel.app",
  bio: {
    es: "Desarrollo productos SaaS con TypeScript, React, Next.js y PostgreSQL. Interfaces, APIs, datos e integración de IA.",
    en: "I build SaaS products with TypeScript, React, Next.js and PostgreSQL, across interfaces, APIs, data and AI integrations.",
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
  hero: {
    title: string;
    sub: string;
    cta: string;
    status: string;
    stats: { years: string; projects: string; hackathons: string };
  };
  sections: Record<
    "about" | "experience" | "projects" | "stack" | "hackathons" | "education" | "certifications" | "contact",
    { title: string; sub: string }
  >;
  about: string;
  skillsLabel: string;
  contactCta: string;
  downloadCv: string;
  viewCv: string;
  contactMe: string;
  apply: {
    button: string;
    title: string;
    sub: string;
    toLabel: string;
    toPlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    positionLabel: string;
    positionPlaceholder: string;
    previewLabel: string;
    openMail: string;
    copy: string;
    copied: string;
    attachCv: string;
    cvHint: string;
    close: string;
  };
  live: string;
  source: string;
  footer: string;
  present: string;
  avatarPop: { open: string; close: string };
  quote: {
    title: string;
    sub: string;
    step1: string;
    step2: string;
    step3: string;
    base: string;
    priorityFee: string;
    total: string;
    time: string;
    send: string;
    restart: string;
    note: string;
  };
  hireServices: string;
  services: {
    title: string;
    sub: string;
    intro: string;
    offerTitle: string;
    offerSub: string;
    priceTitle: string;
    priceSub: string;
    note: string;
    back: string;
    cta: string;
  };
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
      title: "Desarrollador Full Stack",
      sub: "Productos SaaS, APIs e integración de IA con TypeScript, React, Next.js y PostgreSQL. En Bogotá, buscando empleo remoto internacional.",
      cta: "Ver proyectos",
      status: "Disponible para empleo remoto",
      stats: {
        years: "Usuarios de GymRat+",
        projects: "Tareas Lab10 completadas",
        hackathons: "Casos destacados",
      },
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
      "Soy desarrollador Full Stack en Bogotá, Colombia. Construyo productos SaaS con TypeScript, React, Next.js y PostgreSQL. Mis proyectos incluyen GymRat+, una plataforma de entrenamiento y coaching con 60 usuarios, y Oruka, una plataforma en etapa inicial para atención al cliente y ventas asistidas por IA. Trabajo en interfaces, APIs, modelos de datos y despliegue; mis proyectos recientes incluyen orquestación de agentes, herramientas MCP y automatización supervisada del uso del computador.",
    skillsLabel: "Habilidades clave",
    contactCta: "Escríbeme",
    downloadCv: "Descargar CV",
    viewCv: "Ver CV",
    contactMe: "Contáctame",
    apply: {
      button: "Redactar postulación",
      title: "Postularme a un trabajo",
      sub: "Llena 3 campos y abre tu correo con el mensaje listo. Solo adjunta tu CV.",
      toLabel: "Correo destino (opcional)",
      toPlaceholder: "empleos@empresa.com",
      companyLabel: "Empresa",
      companyPlaceholder: "Ej. Empresa",
      positionLabel: "Puesto",
      positionPlaceholder: "Ej. Full Stack Developer",
      previewLabel: "Vista previa",
      openMail: "Abrir en mi correo",
      copy: "Copiar texto",
      copied: "¡Copiado!",
      attachCv: "Descargar CV para adjuntar",
      cvHint: "El correo no puede adjuntar el CV solo. Descárgalo y adjúntalo antes de enviar.",
      close: "Cerrar",
    },
    live: "Sitio",
    source: "Código",
    footer: "Diseñado y construido por Manuel Erazo",
    present: "Presente",
    avatarPop: { open: "Ver foto en grande", close: "Cerrar" },
    quote: {
      title: "Cotizador instantáneo",
      sub: "Elige, suma y recibe tu estimado al momento",
      step1: "Tipo de proyecto",
      step2: "Extras",
      step3: "Ritmo",
      base: "Base",
      priorityFee: "Prioritario",
      total: "Tu estimado",
      time: "Tiempo estimado",
      send: "Enviar esta cotización",
      restart: "Empezar de nuevo",
      note: "USD · estimado automático según tu selección. La cifra final se confirma por correo.",
    },
    hireServices: "Contratar mis servicios",
    services: {
      title: "Servicios",
      sub: "Qué puedo construir para ti",
      intro:
        "Diseño y desarrollo productos web de la idea a producción. Next.js, TypeScript, Node.js e integración de LLMs — con una interfaz cuidada y arquitectura que escala.",
      offerTitle: "Qué desarrollo",
      offerSub: "El tipo de trabajo que tomo",
      priceTitle: "Precios",
      priceSub: "Montos de partida en USD. El alcance define la cifra final.",
      note: "Los precios son desde, en dólares estadounidenses. Incluyen diseño, desarrollo y puesta en producción. No incluyen copywriting extenso ni anuncios pagos. Un proyecto a medida se cotiza aparte.",
      back: "Volver al portafolio",
      cta: "Pedir una cotización",
    },
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
      title: "Full Stack Developer",
      sub: "SaaS products, APIs and AI integrations with TypeScript, React, Next.js and PostgreSQL. Based in Bogotá and open to international remote roles.",
      cta: "View projects",
      status: "Open to remote opportunities",
      stats: {
        years: "GymRat+ users",
        projects: "Lab10 tasks completed",
        hackathons: "Featured projects",
      },
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
      "I am a Full Stack Developer based in Bogotá, Colombia, building SaaS products with TypeScript, React, Next.js and PostgreSQL. My work includes GymRat+, a fitness and coaching platform with 60 users, and Oruka, an early-stage platform for AI-assisted customer support and sales. I work across interfaces, APIs, data models and deployment, with recent projects in agent orchestration, MCP tooling and supervised computer-use automation.",
    skillsLabel: "Key skills",
    contactCta: "Get in touch",
    downloadCv: "Download CV",
    viewCv: "View CV",
    contactMe: "Contact me",
    apply: {
      button: "Draft application",
      title: "Apply for a job",
      sub: "Fill 3 fields and open your mail app with the message ready. Just attach your CV.",
      toLabel: "Recipient email (optional)",
      toPlaceholder: "jobs@company.com",
      companyLabel: "Company",
      companyPlaceholder: "E.g. Gymshark",
      positionLabel: "Position",
      positionPlaceholder: "E.g. Frontend Developer",
      previewLabel: "Preview",
      openMail: "Open in my mail app",
      copy: "Copy text",
      copied: "Copied!",
      attachCv: "Download CV to attach",
      cvHint: "Email can't attach the CV by itself. Download it and attach it before sending.",
      close: "Close",
    },
    live: "Live",
    source: "Source",
    footer: "Designed and built by Manuel Erazo",
    present: "Present",
    avatarPop: { open: "View large photo", close: "Close" },
    quote: {
      title: "Instant quote",
      sub: "Pick, add up and get your estimate right away",
      step1: "Project type",
      step2: "Add-ons",
      step3: "Pace",
      base: "Base",
      priorityFee: "Priority",
      total: "Your estimate",
      time: "Estimated time",
      send: "Send this quote",
      restart: "Start over",
      note: "USD · automatic estimate from your selection. Final figure confirmed by email.",
    },
    hireServices: "Hire my services",
    services: {
      title: "Services",
      sub: "What I can build for you",
      intro:
        "I design and ship web products from idea to production. Next.js, TypeScript, Node.js and LLM integration — with a careful interface and architecture that scales.",
      offerTitle: "What I build",
      offerSub: "The kind of work I take on",
      priceTitle: "Pricing",
      priceSub: "Starting amounts in USD. Scope sets the final figure.",
      note: "Prices are starting amounts, in US dollars. They cover design, development and launch. They don't cover extensive copywriting or paid ads. Custom work is quoted separately.",
      back: "Back to the portfolio",
      cta: "Request a quote",
    },
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
    "id": "gymrat",
    "role": {
      "en": "Founder and Full Stack Developer",
      "es": "Fundador y desarrollador Full Stack"
    },
    "org": "GymRat+",
    "logo": null,
    "logoFile": "/assets/logos/orgs/gymrat.png",
    "kind": {
      "en": "Self-employed",
      "es": "Independiente"
    },
    "where": {
      "en": "Bogotá, Colombia · Remote",
      "es": "Bogotá, Colombia · Remoto"
    },
    "period": {
      "en": "2024 — Present",
      "es": "2024 — Presente"
    },
    "summary": {
      "en": "Fitness and coaching platform with 60 users.",
      "es": "Plataforma de entrenamiento y coaching con 60 usuarios."
    },
    "bullets": [
      {
        "en": "Built training, nutrition and progress workflows, coach management, authentication, memberships and payments.",
        "es": "Construí flujos de entrenamiento, nutrición y progreso, gestión de entrenadores, autenticación, membresías y pagos."
      },
      {
        "en": "Own the web product from interface and API development to PostgreSQL data models and deployment.",
        "es": "Desarrollo el producto web desde interfaces y APIs hasta modelos de datos en PostgreSQL y despliegue."
      }
    ]
  },
  {
    "id": "freelance",
    "role": {
      "en": "Full Stack Developer",
      "es": "Desarrollador Full Stack"
    },
    "org": "Independent",
    "logo": null,
    "logoFile": "/assets/mark.png",
    "kind": {
      "en": "Self-employed",
      "es": "Independiente"
    },
    "where": {
      "en": "Colombia · Remote",
      "es": "Colombia · Remoto"
    },
    "period": {
      "en": "2023 — Present",
      "es": "2023 — Presente"
    },
    "summary": {
      "en": "Web applications, APIs and AI integrations.",
      "es": "Aplicaciones web, APIs e integración de IA."
    },
    "bullets": [
      {
        "en": "Build products with React, Next.js, TypeScript and SQL/NoSQL databases, including identity, dashboards and deployment.",
        "es": "Construyo productos con React, Next.js, TypeScript y bases de datos SQL/NoSQL, con identidad, dashboards y despliegue."
      },
      {
        "en": "Recent work includes Oruka and its customer provisioning tooling, agent orchestration and MCP integrations.",
        "es": "Mi trabajo reciente incluye Oruka y sus herramientas de aprovisionamiento por cliente, orquestación de agentes e integración MCP."
      }
    ]
  },
  {
    "id": "smurfit",
    "role": {
      "en": "Mobile Application Developer",
      "es": "Desarrollador de aplicaciones móviles"
    },
    "org": "Smurfit Kappa Cartón Colombia",
    "logo": null,
    "logoFile": "/assets/logos/orgs/smurfitkappa.png",
    "kind": {
      "en": "Part-time",
      "es": "Tiempo parcial"
    },
    "where": {
      "en": "Colombia · Remote",
      "es": "Colombia · Remoto"
    },
    "period": {
      "en": "Aug — Nov 2025",
      "es": "Ago — Nov 2025"
    },
    "summary": {
      "en": "Educational augmented reality application.",
      "es": "Aplicación educativa de realidad aumentada."
    },
    "bullets": [
      {
        "en": "Developed ButterflyAR in Flutter and Dart to connect a printed butterfly book with interactive mobile augmented reality content.",
        "es": "Desarrollé ButterflyAR en Flutter y Dart para conectar un libro impreso sobre mariposas con contenido móvil interactivo de realidad aumentada."
      }
    ]
  },
  {
    "id": "sena",
    "role": {
      "en": "Software Developer",
      "es": "Desarrollador de software"
    },
    "org": "Servicio Nacional de Aprendizaje (SENA)",
    "logo": null,
    "logoFile": "/assets/logos/orgs/sena.png",
    "kind": {
      "en": "Temporary contract",
      "es": "Contrato temporal"
    },
    "where": {
      "en": "Colombia · Remote",
      "es": "Colombia · Remoto"
    },
    "period": {
      "en": "Mar 2021 — Nov 2022",
      "es": "Mar 2021 — Nov 2022"
    },
    "summary": {
      "en": "Internal digital system.",
      "es": "Sistema digital interno."
    },
    "bullets": [
      {
        "en": "Worked in a development team to build and maintain an internal system, contributing backend logic and administrative features.",
        "es": "Colaboré en un equipo de desarrollo para construir y mantener un sistema interno, aportando lógica de backend y funcionalidades administrativas."
      }
    ]
  }
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
    id: "frontier-lab10",
    name: "Frontier Lab10",
    org: "Frontier",
    logo: null,
    date: { es: "Octubre 2026", en: "October 2026" },
    result: { es: "45 de 56 tareas", en: "45 of 56 tasks" },
    note: { es: "Agente supervisado de uso del computador. Resultado de evaluación oculta al 11 de octubre; puntuación detallada pendiente.", en: "Supervised computer-use agent. Hidden evaluation result as of 11 October; detailed scoring pending." },
  },
  {
    id: "cetamed-fup",
    name: "Hackathon FUP 2026",
    org: "Fundación Universitaria de Popayán",
    logo: null,
    date: { es: "Septiembre 2026", en: "September 2026" },
    note: { es: "Cetamed: prototipo de consultas de operaciones hospitalarias por texto y voz sobre datos sintéticos.", en: "Cetamed: hospital operations query prototype using text, voice and synthetic data." },
  },
  {
    id: "claude-code",
    name: "Claude Code Hackathon 2026",
    org: "Anthropic",
    logo: "anthropic",
    date: { es: "Abril 2026", en: "April 2026" },
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
    name: "Agents League at AI Summit 2026 — Reasoning Agents",
    org: "Microsoft",
    logo: "microsoftazure",
    date: { es: "2026", en: "2026" },
    note: {
      es: "Forge sobre Azure AI Foundry — seis agentes de IA que debaten, votan y generan PRDs, backlogs, arquitectura y roadmaps.",
      en: "Forge on Azure AI Foundry — six AI agents that debate, vote and generate PRDs, backlogs, architecture and roadmaps.",
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
  /** Exactly 3 screenshots for the fan gallery, e.g. "/assets/shots/gymrat-1.jpg". */
  shots?: string[];
  tagline: Bilingual;
  blurb: Bilingual;
  decision?: Bilingual;
  result?: Bilingual;
  stack: string[];
  liveUrl?: string;
  sourceUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    "id": "oruka",
    "name": "Oruka",
    "year": "2026",
    "logo": "/assets/logos/projects/oruka.svg",
    "tagline": {
      "en": "AI customer support and sales · Private beta",
      "es": "Atención al cliente y ventas con IA · Beta privada"
    },
    "blurb": {
      "en": "Built a unified WhatsApp and Instagram inbox with contacts, deals, knowledge-grounded AI agents and workflow automation. Previously named Steve and Senka.",
      "es": "Construí una bandeja unificada de WhatsApp e Instagram con contactos, oportunidades, agentes de IA basados en conocimiento y automatización de flujos. Antes se llamó Steve y Senka."
    },
    "decision": {
      "en": "Designed isolated customer deployments with PostgreSQL, resumable provisioning and staged releases in Oruka Fleet.",
      "es": "Diseñé despliegues aislados por cliente con PostgreSQL, aprovisionamiento reanudable y releases por etapas en Oruka Fleet."
    },
    "result": {
      "en": "Working private beta and provisioning tooling. Early stage, with no users yet.",
      "es": "Beta privada funcional y herramientas de aprovisionamiento. Etapa inicial, todavía sin usuarios."
    },
    "stack": [
      "nextdotjs",
      "typescript",
      "postgresql",
      "docker",
      "whatsapp"
    ],
    "liveUrl": "https://www.oruka.si/en"
  },
  {
    "id": "gymrat",
    "name": "GymRat+",
    "year": "2024 —",
    "logo": "/assets/logos/projects/gymrat.png",
    "shots": [
      "/assets/screenshots/gym01.webp",
      "/assets/screenshots/gym02.webp",
      "/assets/screenshots/gym03.webp"
    ],
    "tagline": {
      "en": "Fitness and coaching platform · 60 users",
      "es": "Plataforma de entrenamiento y coaching · 60 usuarios"
    },
    "blurb": {
      "en": "Founded and built a platform for training plans, nutrition, athlete progress and coach management, including authentication, memberships and payments.",
      "es": "Fundé y construí una plataforma de rutinas, nutrición, progreso de atletas y gestión de entrenadores, con autenticación, membresías y pagos."
    },
    "decision": {
      "en": "Implemented the web application with Next.js, TypeScript, PostgreSQL and Drizzle; native mobile clients are in development.",
      "es": "Implementé la aplicación web con Next.js, TypeScript, PostgreSQL y Drizzle; los clientes móviles nativos están en desarrollo."
    },
    "result": {
      "en": "Launched at gymratplus.com with 60 users, as confirmed in October 2026.",
      "es": "Publicado en gymratplus.com con 60 usuarios, confirmados en octubre de 2026."
    },
    "stack": [
      "nextdotjs",
      "typescript",
      "postgresql",
      "mercadopago"
    ],
    "liveUrl": "https://gymratplus.com"
  },
  {
    "id": "lab10",
    "name": "Frontier Lab10",
    "year": "2026",
    "tagline": {
      "en": "Supervised computer-use agent · 45 of 56 tasks",
      "es": "Agente supervisado de uso del computador · 45 de 56 tareas"
    },
    "blurb": {
      "en": "Built a TypeScript agent that observes a remote desktop over VNC, plans actions with a multimodal model and executes them under a supervisor.",
      "es": "Construí un agente en TypeScript que observa un escritorio remoto por VNC, planifica acciones con un modelo multimodal y las ejecuta con supervisión."
    },
    "decision": {
      "en": "Added action budgets, timeout controls and SQLite traces so runs can be inspected and ambiguous actions can stop safely.",
      "es": "Añadí presupuestos de acciones, límites de tiempo y trazas en SQLite para revisar ejecuciones y detener acciones ambiguas."
    },
    "result": {
      "en": "Completed 45 of 56 hidden evaluation tasks in the Frontier panel on 11 October 2026. Detailed scoring pending.",
      "es": "Completó 45 de 56 tareas de evaluación oculta en el panel de Frontier el 11 de octubre de 2026. Puntuación detallada pendiente."
    },
    "stack": [
      "typescript",
      "nodedotjs",
      "sqlite"
    ],
    "liveUrl": "https://manuekle.github.io/lab10-hack/",
    "sourceUrl": "https://github.com/Manuekle/lab10-hack"
  },
  {
    "id": "creagent",
    "name": "creagent",
    "year": "2026",
    "logo": "/assets/logos/projects/creagent.png",
    "shots": [
      "/assets/screenshots/agent01.webp",
      "/assets/screenshots/agent02.webp",
      "/assets/screenshots/agent03.webp"
    ],
    "tagline": {
      "en": "Agent composer and MCP tooling",
      "es": "Composer de agentes y herramientas MCP"
    },
    "blurb": {
      "en": "Built a visual composer for AI agents with reusable skills and exports for Claude Code, Codex, Cursor and Gemini CLI.",
      "es": "Construí un composer visual de agentes de IA con skills reutilizables y exportaciones para Claude Code, Codex, Cursor y Gemini CLI."
    },
    "decision": {
      "en": "Separated agent specifications from clients and published an MCP server as @manudev.jsx/creagent.",
      "es": "Separé las especificaciones de agentes de los clientes y publiqué un servidor MCP como @manudev.jsx/creagent."
    },
    "result": {
      "en": "Public demo and npm package. The application is source-available under FSL-1.1-MIT; the MCP server uses MIT.",
      "es": "Demo pública y paquete npm. La aplicación usa FSL-1.1-MIT con código disponible; el servidor MCP usa MIT."
    },
    "stack": [
      "nextdotjs",
      "typescript",
      "modelcontextprotocol",
      "anthropic"
    ],
    "liveUrl": "https://creagent.fun/demo",
    "sourceUrl": "https://github.com/Manuekle/creagent"
  },
  {
    "id": "cetamed",
    "name": "Cetamed",
    "year": "2026",
    "tagline": {
      "en": "Hospital operations prototype",
      "es": "Prototipo de operaciones hospitalarias"
    },
    "blurb": {
      "en": "Hackathon prototype for querying synthetic hospital operations data through text and voice, with reports and role-based access.",
      "es": "Prototipo de hackathon para consultar datos sintéticos de operaciones hospitalarias por texto y voz, con reportes y acceso por roles."
    },
    "decision": {
      "en": "Mapped requests to 19 allowed intents and parameterized SQL with Turso/libSQL. Added access auditing and PDF reports.",
      "es": "Mapeé solicitudes a 19 intenciones permitidas y SQL parametrizado con Turso/libSQL. Añadí auditoría de acceso y reportes PDF."
    },
    "result": {
      "en": "MVP demonstrated for the FUP hospital hackathon. Uses synthetic data; no clinical deployment.",
      "es": "MVP presentado en el hackathon hospitalario de la FUP. Usa datos sintéticos; sin despliegue clínico."
    },
    "stack": [
      "nextdotjs",
      "typescript",
      "sqlite",
      "openai"
    ],
    "liveUrl": "https://cetamed.vercel.app"
  },
  {
    "id": "forge",
    "name": "Forge",
    "year": "2026",
    "logo": "/assets/logos/projects/forge.png",
    "tagline": {
      "en": "Multi-agent product planning",
      "es": "Planificación de producto con múltiples agentes"
    },
    "blurb": {
      "en": "Six specialist agents and an orchestrator critique and vote on a product brief, producing versioned PRDs, architecture, backlogs and roadmaps.",
      "es": "Seis agentes especialistas y un orquestador revisan y votan sobre un brief para generar PRDs, arquitectura, backlogs y roadmaps versionados."
    },
    "decision": {
      "en": "Built with Next.js, PostgreSQL, Drizzle and Azure AI Foundry, with a deterministic demo fallback.",
      "es": "Construido con Next.js, PostgreSQL, Drizzle y Azure AI Foundry, con un modo de demostración determinista."
    },
    "result": {
      "en": "Public project and demo for Agents League at AI Summit 2026, Reasoning Agents.",
      "es": "Proyecto y demo públicos para Agents League en AI Summit 2026, Reasoning Agents."
    },
    "stack": [
      "microsoftazure",
      "nextdotjs",
      "typescript",
      "postgresql"
    ],
    "liveUrl": "https://forgems.vercel.app",
    "sourceUrl": "https://github.com/Manuekle/Forge"
  },
  {
    "id": "sira",
    "name": "SIRA",
    "year": "2025 — 2026",
    "logo": "/assets/logos/projects/sira.png",
    "tagline": {
      "en": "QR attendance and academic reporting",
      "es": "Asistencia por QR y reportes académicos"
    },
    "blurb": {
      "en": "Built QR attendance workflows, dynamic roles and PDF reporting for an academic application at Fundación Universitaria de Popayán.",
      "es": "Construí flujos de asistencia por QR, roles dinámicos y reportes PDF para una aplicación académica de la Fundación Universitaria de Popayán."
    },
    "decision": {
      "en": "Next.js, TypeScript, MongoDB, Prisma and NextAuth for identity and data access.",
      "es": "Next.js, TypeScript, MongoDB, Prisma y NextAuth para identidad y acceso a datos."
    },
    "result": {
      "en": "Public repository and deployed application.",
      "es": "Repositorio público y aplicación desplegada."
    },
    "stack": [
      "nextdotjs",
      "typescript",
      "mongodb",
      "prisma"
    ],
    "liveUrl": "https://sira-fup.online",
    "sourceUrl": "https://github.com/Manuekle/sira"
  },
  {
    "id": "hinomaru",
    "name": "Hinomaru",
    "year": "2026",
    "logo": "/assets/logos/projects/hinomaru.png",
    "tagline": {
      "en": "Japanese learning with spaced repetition",
      "es": "Aprendizaje de japonés con repetición espaciada"
    },
    "blurb": {
      "en": "Built kana and vocabulary practice with SM-2 spaced repetition and voice features using SvelteKit, Supabase and a FastAPI/VOICEVOX service.",
      "es": "Construí práctica de kana y vocabulario con repetición espaciada SM-2 y voz con SvelteKit, Supabase y un servicio FastAPI/VOICEVOX."
    },
    "stack": [
      "typescript",
      "python",
      "docker"
    ],
    "liveUrl": "https://hinomaru.vercel.app",
    "sourceUrl": "https://github.com/Manuekle/hinomaru"
  },
  {
    "id": "butterflyar",
    "name": "ButterflyAR",
    "year": "2025",
    "logo": "/assets/logos/projects/butterflyar.png",
    "tagline": {
      "en": "Educational augmented reality",
      "es": "Realidad aumentada educativa"
    },
    "blurb": {
      "en": "Developed a Flutter and Dart mobile application that adds interactive augmented reality content to a printed educational book about butterflies.",
      "es": "Desarrollé una aplicación móvil con Flutter y Dart que añade contenido interactivo de realidad aumentada a un libro educativo impreso sobre mariposas."
    },
    "stack": [
      "flutter"
    ],
    "sourceUrl": "https://github.com/Manuekle/butterflyar-mobile"
  }
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
    period: "2026",
    note: { es: "Graduado el 26 de junio de 2026", en: "Graduated 26 June 2026" },
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
    logoFile: "/assets/logos/orgs/microsoft.svg",
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
    logoFile: "/assets/logos/orgs/google.svg",
  },
];

/* ----------------------------------------------------------------- services */

export type Capability = { title: Bilingual; blurb: Bilingual };

export const CAPABILITIES: Capability[] = [
  {
    title: { es: "Productos web", en: "Web products" },
    blurb: {
      es: "Sitios y aplicaciones con Next.js, TypeScript y una interfaz precisa. De la landing al producto en producción.",
      en: "Sites and apps with Next.js, TypeScript and a precise interface. From a landing to a product in production.",
    },
  },
  {
    title: { es: "SaaS multi-tenant", en: "Multi-tenant SaaS" },
    blurb: {
      es: "Plataformas con auth, billing, onboarding y panel de admin. El mismo tipo de sistema detrás de GymRat+.",
      en: "Platforms with auth, billing, onboarding and an admin panel. The same kind of system behind GymRat+.",
    },
  },
  {
    title: { es: "Agentes IA y LLMs", en: "AI agents and LLMs" },
    blurb: {
      es: "Agentes, MCP, RAG y flujos de trabajo con modelos, con validación y controles de ejecución.",
      en: "Agents, MCP, RAG and model workflows with validation and execution controls.",
    },
  },
  {
    title: { es: "Pagos e integraciones", en: "Payments and integrations" },
    blurb: {
      es: "Stripe, MercadoPago, WhatsApp, APIs y automatización. El producto conectado al negocio.",
      en: "Stripe, MercadoPago, WhatsApp, APIs and automation. The product wired into the business.",
    },
  },
  {
    title: { es: "Diseño de interfaz", en: "Interface design" },
    blurb: {
      es: "UI clara, tipografía y motion contenidos. Diseño y frontend en la misma mano, sin handoff roto.",
      en: "Clear UI, type and contained motion. Design and frontend in the same hands, no broken handoff.",
    },
  },
  {
    title: { es: "Móvil y AR", en: "Mobile and AR" },
    blurb: {
      es: "Apps en Flutter o React Native, y experiencias de realidad aumentada cuando el proyecto lo pide.",
      en: "Flutter or React Native apps, and augmented reality when the project calls for it.",
    },
  },
];

export type Addon = { id: string; label: Bilingual; usd: number };

export const ADDONS: Addon[] = [
  { id: "lang", label: { es: "Segundo idioma", en: "Second language" }, usd: 450 },
  { id: "cms", label: { es: "Blog / CMS", en: "Blog / CMS" }, usd: 600 },
  { id: "pay", label: { es: "Pagos online", en: "Online payments" }, usd: 700 },
  { id: "ai", label: { es: "Chatbot con IA", en: "AI chatbot" }, usd: 1200 },
  { id: "wa", label: { es: "Integración WhatsApp", en: "WhatsApp integration" }, usd: 450 },
  { id: "motion", label: { es: "Motion premium", en: "Premium motion" }, usd: 500 },
  { id: "seo", label: { es: "SEO avanzado", en: "Advanced SEO" }, usd: 400 },
  { id: "care", label: { es: "Mes extra de soporte", en: "Extra support month" }, usd: 600 },
];

export type Speed = { id: string; label: Bilingual; note: Bilingual; mult: number };

export const SPEEDS: Speed[] = [
  {
    id: "std",
    label: { es: "Estándar", en: "Standard" },
    note: { es: "Ritmo normal", en: "Normal pace" },
    mult: 1,
  },
  {
    id: "fast",
    label: { es: "Prioritario", en: "Priority" },
    note: { es: "Salto la fila", en: "Skip the line" },
    mult: 1.25,
  },
];

export type ServicePackage = {
  id: string;
  name: Bilingual;
  from: string;
  cadence?: Bilingual;
  time: Bilingual;
  includes: Bilingual[];
};

export const PACKAGES: ServicePackage[] = [
  {
    id: "landing",
    name: { es: "Landing o sitio", en: "Landing or site" },
    from: "1,800",
    time: { es: "1–2 semanas", en: "1–2 weeks" },
    includes: [
      { es: "Diseño y frontend", en: "Design and frontend" },
      { es: "Hasta 5 secciones", en: "Up to 5 sections" },
      { es: "Responsive y SEO básico", en: "Responsive and basic SEO" },
      { es: "Deploy en Vercel", en: "Deploy on Vercel" },
    ],
  },
  {
    id: "mvp",
    name: { es: "Producto web / MVP", en: "Web product / MVP" },
    from: "4,500",
    time: { es: "3–6 semanas", en: "3–6 weeks" },
    includes: [
      { es: "Auth, dashboard y CRUD", en: "Auth, dashboard and CRUD" },
      { es: "API y base de datos", en: "API and database" },
      { es: "UI completa", en: "Full UI" },
      { es: "Puesta en producción", en: "Launch to production" },
    ],
  },
  {
    id: "saas",
    name: { es: "SaaS / plataforma", en: "SaaS / platform" },
    from: "8,500",
    time: { es: "6–12 semanas", en: "6–12 weeks" },
    includes: [
      { es: "Multi-tenant y billing", en: "Multi-tenant and billing" },
      { es: "Onboarding y admin", en: "Onboarding and admin" },
      { es: "Arquitectura lista para crecer", en: "Architecture ready to grow" },
      { es: "Pagos (Stripe o MercadoPago)", en: "Payments (Stripe or MercadoPago)" },
    ],
  },
  {
    id: "ai",
    name: { es: "Agente IA / LLM", en: "AI agent / LLM" },
    from: "2,800",
    time: { es: "2–4 semanas", en: "2–4 weeks" },
    includes: [
      { es: "Diseño del flujo y el prompt", en: "Flow and prompt design" },
      { es: "Integración con APIs de modelos", en: "Model API integration" },
      { es: "Interfaz para usarlo", en: "An interface to use it" },
      { es: "Evaluación básica de calidad", en: "Basic quality evaluation" },
    ],
  },
  {
    id: "retainer",
    name: { es: "Acompañamiento", en: "Retainer" },
    from: "1,200",
    cadence: { es: "/ mes", en: "/ month" },
    time: { es: "Mensual, renovable", en: "Monthly, renewable" },
    includes: [
      { es: "Mejoras y features", en: "Improvements and features" },
      { es: "Soporte de producto", en: "Product support" },
      { es: "Prioridad en el calendario", en: "Calendar priority" },
    ],
  },
];
