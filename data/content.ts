export type Locale = "pt" | "en";

export type Experience = {
  role: string;
  company: string;
  period: string;
  current: boolean;
  responsibilities: string[];
  technologies: string[];
};

export type Project = {
  name: string;
  category: string;
  description: string;
  role: MaybePending;
  status: MaybePending;
  technologies: string[];
  demoUrl?: MaybePending;
  sourceUrl?: MaybePending;
  images: [Screenshot, Screenshot?] | [Screenshot, Screenshot, Screenshot];
};

export type Screenshot = { label: string; src?: string };

export type TechGroup = { label: string; items: string[] };

// Content not provided yet; rendered as a visible "[...]" marker (spec RN06).
export type Pending = { pending: string };
export type MaybePending = string | Pending;
const pending = (label: string): Pending => ({ pending: label });
export const isPending = (value: MaybePending): value is Pending => typeof value === "object";

type UiText = {
  skipToContent: string;
  backToTop: string;
  mainNav: string;
  footerNav: string;
  downloadResume: string;
  viewResume: string;
  openMenu: string;
  closeMenu: string;
  changeLanguage: string;
  exploreProjects: string;
  specialties: string;
  experienceTitle: string;
  currentAt: (company: string) => string;
  responsibilities: string;
  technologies: string;
  projectsTitle: string;
  projectRole: string;
  projectStatus: string;
  projectStack: string;
  demo: string;
  source: string;
  opensNewTab: string;
  imagePlaceholder: string;
  replaceImage: string;
  replaceImageOf: (project: string) => string;
  aboutTitle: string;
  technologiesTitle: string;
};

export type Content = {
  htmlLang: string;
  site: { name: string; shortName: string; role: string; location: string; year: number; resumeUrl: string; description: string };
  ui: UiText;
  hero: { headline: string; intro: string; specialties: string[] };
  navLinks: { href: string; label: string }[];
  experiences: Experience[];
  projectsIntro: string;
  projects: Project[];
  about: { statement: string; paragraphs: string[]; education: { label: string; value: string }[] };
  techGroups: TechGroup[];
  contact: { heading: string; links: { label: string; value: string; href: string }[] };
};

export const locales: { code: Locale; label: string }[] = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
];

const name = "Kaike Dias Miranda";
const shortName = "Kaike Dias";
const resumeUrl = "/curriculo_kaike_dias_miranda.pdf";
const resumeUrlEn = "/kaike-dias-miranda-resume.pdf";
const email = "kaikedias98@gmail.com";

const emailLink = { value: email, href: `mailto:${email}` };
const linkedinLink = { label: "LinkedIn", value: "linkedin.com/in/kaike-dias", href: "https://www.linkedin.com/in/kaike-dias/" };
const githubLink = { label: "GitHub", value: "github.com/KaikeDias", href: "https://github.com/KaikeDias" };

const etipi = {
  company: "ETIPI",
  current: true,
  technologies: ["Java", "Spring Boot", "Quarkus", "React.js", "Next.js", "RabbitMQ", "Keycloak", "Spring Security", "Docker", "Kubernetes", "OpenShift"],
};
const hiperdigi = { company: "Hiperdigi", current: false };
const fapepi = { company: "FAPEPI", current: false, technologies: ["Flutter", "Dart"] };

const doceria = {
  name: "Doceria da Mary",
  technologies: ["Angular", "TypeScript", "Supabase"],
  demoUrl: "https://doceriadamary.vercel.app/",
  sourceUrl: "https://github.com/KaikeDias/doceria-da-mary",
};
const nutriplan = {
  name: "NutriPlan",
  technologies: ["React", "TypeScript", "Vite"],
  demoUrl: "https://nutri-plan-sand-two.vercel.app/",
  sourceUrl: "https://github.com/KaikeDias/NutriPlan",
};
const vagaLivre = { name: "Vaga Livre", technologies: ["Flutter", "Dart", "Supabase", "OpenStreetMap"] };
const doceriaShot = "/projetos/doceria-da-mary.png";
const nutriplanShot = "/projetos/nutriplan.png";
const vagaLivreShots = ["login", "home", "park-details"].map((screen) => `/projetos/vaga-livre-${screen}.png`);

const frontendItems = ["React", "Next.js", "Angular", "Vue.js", "TypeScript", "JavaScript", "HTML", "CSS"];
const devopsItems = ["Docker", "Kubernetes", "OpenShift", "CI/CD", "AWS", "Maven", "Jenkins"];

const pt: Content = {
  htmlLang: "pt-BR",
  site: {
    name,
    shortName,
    role: "Desenvolvedor Full Stack",
    location: "Teresina, Piauí. Brasil",
    year: 2026,
    resumeUrl,
    description:
      "Desenvolvedor Full Stack com mais de 3 anos de experiência em Java, Spring Boot, React, Next.js e Angular, da construção de interfaces à implementação de APIs, integrações e regras de negócio.",
  },
  ui: {
    skipToContent: "Pular para o conteúdo",
    backToTop: `${name}, voltar ao início`,
    mainNav: "Principal",
    footerNav: "Rodapé",
    downloadResume: "Baixar currículo",
    viewResume: "Ver currículo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    changeLanguage: "Alterar idioma",
    exploreProjects: "Explorar projetos",
    specialties: "Especialidades",
    experienceTitle: "Experiência",
    currentAt: (company) => `${company}, posição atual`,
    responsibilities: "Responsabilidades",
    technologies: "Tecnologias",
    projectsTitle: "Projetos em destaque",
    projectRole: "Papel",
    projectStatus: "Status",
    projectStack: "Stack",
    demo: "Demonstração",
    source: "Código-fonte",
    opensNewTab: ", abre em nova aba",
    imagePlaceholder: "Espaço reservado",
    replaceImage: "Substituir pela imagem real",
    replaceImageOf: (project) => `Substituir pela imagem real do ${project}`,
    aboutTitle: "Sobre",
    technologiesTitle: "Tecnologias",
  },
  hero: {
    headline: "Desenvolver é muito mais do que implementar",
    intro:
      "Desenvolvedor Full Stack com mais de 3 anos de experiência, da construção de interfaces à implementação de APIs, integrações e regras de negócio, com Java, Spring Boot, React, Next.js e Angular.",
    specialties: [
      "Frontend com Angular, React e Next.js",
      "Backend com Java e Spring Boot",
      "Microsserviços, integrações e mensageria",
    ],
  },
  navLinks: [
    { href: "#experiencia", label: "Experiência" },
    { href: "#projetos", label: "Projetos" },
    { href: "#sobre", label: "Sobre" },
    { href: "#contato", label: "Contato" },
  ],
  experiences: [
    {
      ...etipi,
      role: "Desenvolvedor de Software",
      period: "Junho de 2025 – Presente",
      responsibilities: [
        "Atuo como Desenvolvedor Full Stack criando microsserviços em Java com Spring Boot e micro frontends utilizando React.js e Next.js para integração entre sistemas da plataforma Gov.PI Cidadão, responsável por centralizar mais de 600 serviços digitais.",
        "Implementei arquiteturas assíncronas com RabbitMQ, filas e eventos para comunicação entre microsserviços, reduzindo o tempo de resposta de operações críticas em até 80%.",
        "Desenvolvi o backend do novo sistema do HEMOPI, contribuindo para a digitalização de agendamentos, integração entre sistemas e migração de dados legados.",
        "Implementei autenticação centralizada com Keycloak, Spring Security e controle de acesso baseado em RBAC.",
        "Desenvolvi micro frontends com React.js e Next.js, integrados a APIs REST, com foco em performance, responsividade e experiência do usuário.",
        "Atuo em ambiente ágil, participando de cerimônias Scrum, refinamentos técnicos, priorização de demandas e entregas contínuas em colaboração com o time.",
        "Implementei pipelines de CI/CD e deploys em ambientes containerizados utilizando Docker, Kubernetes e OpenShift.",
        "Utilizo Inteligência Artificial aplicada ao desenvolvimento de software, estruturando fluxos com SDD, agentes especializados e automações ao longo do ciclo de entrega.",
        "Integro MCPs e ferramentas de contexto aos agentes de IA para apoiar implementação, revisão e aderência aos padrões técnicos, arquiteturais e de design da empresa.",
      ],
    },
    {
      ...hiperdigi,
      role: "Desenvolvedor Full Stack",
      period: "Junho de 2024 – Maio de 2025",
      responsibilities: [
        "Atuei na manutenção e evolução de um sistema legado em Java 8, analisando código existente, corrigindo problemas e implementando novas regras de negócio com Spring Boot, JPA/Hibernate e APIs REST.",
        "Desenvolvi novas funcionalidades de ponta a ponta, desde a modelagem e persistência dos dados no backend até a integração com as interfaces do sistema, realizando também consultas e ajustes em SQL.",
        "Desenvolvi um sistema de gestão para uma lavanderia utilizando Vue.js, Bootstrap e Spring Boot, contemplando o controle de estoque, cadastro e movimentação de peças.",
        "Implementei o fluxo de geração e impressão de etiquetas para identificação e rastreamento das peças, integrando a etiquetagem aos registros e movimentações realizadas no sistema.",
        "Realizei correções e melhorias em funcionalidades existentes, investigando comportamentos no código legado e adaptando implementações sem comprometer os fluxos já utilizados pelos usuários.",
      ],
      technologies: ["Java 8", "Spring Boot", "JPA/Hibernate", "APIs REST", "SQL", "Vue.js", "Bootstrap"],
    },
    {
      ...fapepi,
      role: "Desenvolvedor Mobile Flutter",
      period: "Abril de 2023 – Março de 2024",
      responsibilities: [
        "Desenvolvi um aplicativo mobile multiplataforma em Flutter para a Coordenação da Juventude do Piauí, participando da implementação e evolução das funcionalidades da aplicação.",
        "Implementei a integração do aplicativo com APIs REST, realizando o consumo, tratamento e apresentação dos dados recebidos do backend nas interfaces mobile.",
        "Desenvolvi e mantive telas e componentes reutilizáveis em Flutter/Dart, trabalhando com navegação, formulários, validações e gerenciamento dos dados utilizados pela aplicação.",
        "Investiguei e corrigi problemas em funcionalidades existentes, realizando ajustes na interface e nos fluxos do aplicativo para melhorar sua estabilidade e usabilidade.",
      ],
      technologies: [...fapepi.technologies, "APIs REST"],
    },
  ],
  projectsIntro: "Aplicações construídas para necessidades concretas, da interface à gestão do conteúdo.",
  projects: [
    {
      ...doceria,
      category: "Site e painel administrativo",
      description:
        "Plataforma digital para uma doceria artesanal, composta por um site responsivo com cardápio digital e um painel administrativo. Os clientes exploram os produtos e fazem pedidos diretamente pelo WhatsApp, enquanto a doceria gerencia produtos, categorias e informações do site de forma independente.",
      role: "Desenvolvedor Full Stack - Projeto pessoal",
      status: "Completo",
      images: [{ label: "Página inicial do site", src: doceriaShot }],
    },
    {
      ...nutriplan,
      category: "Aplicação web",
      description:
        "Aplicação para nutricionistas que facilita a criação e organização de planos alimentares, com fluxo guiado para cadastro do profissional e do paciente, montagem de refeições e alimentos, pré-visualização e exportação dos planos em PDF. Conta com persistência local dos dados, validação de formulários e interface adaptável a diferentes dispositivos.",
      role: "Desenvolvedor Full Stack - Projeto pessoal",
      status: "Completo",
      images: [{ label: "Etapa de perfil profissional do fluxo guiado", src: nutriplanShot }],
    },
    {
      ...vagaLivre,
      category: "Aplicativo mobile",
      description:
        "Aplicativo mobile em Flutter para localização e reserva remota de vagas de estacionamento. Integrado ao OpenStreetMap, permite visualizar estacionamentos disponíveis no mapa, consultar opções de vagas, realizar reservas e efetuar o pagamento diretamente pela plataforma.",
      role: "Desenvolvedor Mobile - Projeto acadêmico",
      status: "Completo",
      sourceUrl: "https://github.com/Vaga-Livre/vaga-livre-app",
      images: [
        { label: "Tela de login", src: vagaLivreShots[0] },
        { label: "Mapa de estacionamentos", src: vagaLivreShots[1] },
        { label: "Detalhes do estacionamento", src: vagaLivreShots[2] },
      ],
    },
  ],
  about: {
    statement:
      "Da arquitetura à implementação, sempre buscando construir algo melhor.",
    paragraphs: [
      "Sou desenvolvedor de software há mais de 3 anos, trabalhando tanto no backend quanto no frontend. Tenho uma afinidade maior com o ecossistema Java e Spring Boot, mas também gosto de explorar o desenvolvimento de interfaces com React, Next.js e Angular.",
      "Nesse período, tive a oportunidade de trabalhar em diferentes projetos, desde sistemas internos até plataformas utilizadas por milhares de pessoas. No dia a dia, lido com APIs, integrações entre serviços, mensageria e regras de negócio, buscando entender não apenas como implementar uma funcionalidade, mas também as decisões envolvidas na construção de um sistema.",
      "Também incorporei ferramentas de inteligência artificial de forma estruturada ao meu processo de desenvolvimento. Utilizo fluxos de trabalho que envolvem especificação de requisitos, planejamento técnico, implementação e revisão de código, combinando diferentes ferramentas e agentes conforme a necessidade de cada etapa. Mais do que acelerar tarefas, busco utilizá-las para melhorar a qualidade das soluções e tornar o processo de desenvolvimento mais consistente."
    ],
    education: [
      { label: "Graduação", value: "Análise e Desenvolvimento de Sistemas, Instituto Federal do Piauí" },
      { label: "Pós-graduação", value: "Cloud Computing, UNINTER" },
    ],
  },
  techGroups: [
    { label: "Frontend", items: frontendItems },
    {
      label: "Backend",
      items: ["Java 8+", "Spring Boot", "Spring MVC", "Spring Security", "JPA/Hibernate", "Microsserviços", "APIs RESTful", "JUnit", "RabbitMQ", "Kafka", "Keycloak"],
    },
    { label: "Banco de dados", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Modelagem de dados", "Consultas SQL"] },
    { label: "DevOps e Cloud", items: devopsItems },
    {
      label: "Qualidade e boas práticas",
      items: ["POO", "SOLID", "Design Patterns", "Testes unitários", "Testes de integração", "Code Review", "Git"],
    },
  ],
  contact: {
    heading: "Vamos construir algo interessante?",
    links: [
      { label: "E-mail", ...emailLink },
      linkedinLink,
      githubLink,
    ],
  },
};

const en: Content = {
  htmlLang: "en",
  site: {
    ...pt.site,
    resumeUrl: resumeUrlEn,
    role: "Full Stack Developer",
    location: "Teresina, Piauí. Brazil",
    description:
      "Full Stack Developer with over 3 years of experience in Java, Spring Boot, React, Next.js and Angular, from building interfaces to implementing APIs, integrations and business rules.",
  },
  ui: {
    skipToContent: "Skip to content",
    backToTop: `${name}, back to top`,
    mainNav: "Main",
    footerNav: "Footer",
    downloadResume: "Download resume",
    viewResume: "View resume",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    changeLanguage: "Change language",
    exploreProjects: "Explore projects",
    specialties: "Specialties",
    experienceTitle: "Experience",
    currentAt: (company) => `${company}, current position`,
    responsibilities: "Responsibilities",
    technologies: "Technologies",
    projectsTitle: "Featured projects",
    projectRole: "Role",
    projectStatus: "Status",
    projectStack: "Stack",
    demo: "Live demo",
    source: "Source code",
    opensNewTab: ", opens in a new tab",
    imagePlaceholder: "Placeholder",
    replaceImage: "Replace with the real image",
    replaceImageOf: (project) => `Replace with the real image of ${project}`,
    aboutTitle: "About",
    technologiesTitle: "Technologies",
  },
  hero: {
    headline: "Development is much more than implementation",
    intro:
      "Full Stack Developer with over 3 years of experience, from building interfaces to implementing APIs, integrations and business rules, with Java, Spring Boot, React, Next.js and Angular.",
    specialties: [
      "Frontend with Angular, React and Next.js",
      "Backend with Java and Spring Boot",
      "Microservices, integrations and messaging",
    ],
  },
  navLinks: [
    { href: "#experiencia", label: "Experience" },
    { href: "#projetos", label: "Projects" },
    { href: "#sobre", label: "About" },
    { href: "#contato", label: "Contact" },
  ],
  experiences: [
    {
      ...etipi,
      role: "Software Developer",
      period: "June 2025 – Present",
      responsibilities: [
        "I work as a Full Stack Developer building Java microservices with Spring Boot and micro frontends with React.js and Next.js to integrate systems within the Gov.PI Cidadão platform, which centralizes more than 600 digital public services.",
        "Implemented asynchronous architectures with RabbitMQ, queues and events for communication between microservices, reducing the response time of critical operations by up to 80%.",
        "Developed the backend of HEMOPI's new system, contributing to the digitalization of appointment scheduling, system integration and legacy data migration.",
        "Implemented centralized authentication with Keycloak, Spring Security and role-based access control (RBAC).",
        "Developed micro frontends with React.js and Next.js, integrated with REST APIs, focusing on performance, responsiveness and user experience.",
        "I work in an agile environment, taking part in Scrum ceremonies, technical refinements, backlog prioritization and continuous delivery in collaboration with the team.",
        "Implemented CI/CD pipelines and deployments to containerized environments using Docker, Kubernetes and OpenShift.",
        "I apply Artificial Intelligence to software development, structuring workflows with SDD (Spec-Driven Development), specialized agents and automations throughout the delivery cycle.",
        "I integrate MCPs and context tools into AI agents to support implementation, code review and adherence to the company's technical, architectural and design standards.",
      ],
    },
    {
      ...hiperdigi,
      role: "Full Stack Developer",
      period: "June 2024 – May 2025",
      responsibilities: [
        "Maintained and evolved a legacy Java 8 system, analyzing existing code, fixing issues and implementing new business rules with Spring Boot, JPA/Hibernate and REST APIs.",
        "Developed new features end to end, from data modeling and persistence in the backend to integration with the system's interfaces, including SQL queries and adjustments.",
        "Developed a management system for a laundry using Vue.js, Bootstrap and Spring Boot, covering inventory control, item registration and item tracking.",
        "Implemented the label generation and printing flow for identifying and tracking items, linking labeling to the records and movements in the system.",
        "Delivered fixes and improvements to existing features, investigating behavior in legacy code and adapting implementations without disrupting the workflows users already relied on.",
      ],
      technologies: ["Java 8", "Spring Boot", "JPA/Hibernate", "REST APIs", "SQL", "Vue.js", "Bootstrap"],
    },
    {
      ...fapepi,
      role: "Flutter Mobile Developer",
      period: "April 2023 – March 2024",
      responsibilities: [
        "Developed a cross-platform mobile app in Flutter for the Piauí Youth Coordination office, taking part in implementing and evolving the app's features.",
        "Implemented the app's integration with REST APIs, consuming, handling and presenting backend data in the mobile interfaces.",
        "Built and maintained reusable screens and components in Flutter/Dart, working with navigation, forms, validation and management of the app's data.",
        "Investigated and fixed issues in existing features, adjusting the interface and app flows to improve stability and usability.",
      ],
      technologies: [...fapepi.technologies, "REST APIs"],
    },
  ],
  projectsIntro: "Applications built for real needs, from the interface to content management.",
  projects: [
    {
      ...doceria,
      category: "Website and admin panel",
      description:
        "Digital platform for an artisanal bakery, made up of a responsive website with a digital menu and an admin panel. Customers browse products and order directly through WhatsApp, while the bakery manages products, categories and site information on its own.",
      role: "Full Stack Developer - Personal project",
      status: "Completed",
      images: [{ label: "Website home page", src: doceriaShot }],
    },
    {
      ...nutriplan,
      category: "Web application",
      description:
        "Application for nutritionists that makes it easier to create and organize meal plans, with a guided flow for registering the professional and the patient, building meals and foods, and previewing and exporting plans as PDF. It includes local data persistence, form validation and an interface that adapts to different devices.",
      role: "Full Stack Developer - Personal project",
      status: "Completed",
      images: [{ label: "Professional profile step of the guided flow", src: nutriplanShot }],
    },
    {
      ...vagaLivre,
      category: "Mobile app",
      description:
        "Flutter mobile app for finding and remotely booking parking spots. Integrated with OpenStreetMap, it shows available parking lots on a map, lists spot options, and lets users book and pay directly in the app.",
      role: "Mobile Developer - Academic project",
      status: "Completed",
      sourceUrl: "https://github.com/Vaga-Livre/vaga-livre-app",
      images: [
        { label: "Login screen", src: vagaLivreShots[0] },
        { label: "Parking lot map", src: vagaLivreShots[1] },
        { label: "Parking lot details", src: vagaLivreShots[2] },
      ],
    },
  ],
  about: {
    statement:
      "From architecture to implementation, always aiming to build something better.",
    paragraphs: [
      "I have been a software developer for over 3 years, working on both backend and frontend. I have a stronger affinity with the Java and Spring Boot ecosystem, but I also enjoy exploring interface development with React, Next.js and Angular.",
      "During this time, I have worked on a variety of projects, from internal systems to platforms used by thousands of people. Day to day, I deal with APIs, service integrations, messaging and business rules, aiming to understand not only how to implement a feature, but also the decisions involved in building a system.",
      "I have also incorporated artificial intelligence tools into my development process in a structured way. I use workflows that cover requirements specification, technical planning, implementation and code review, combining different tools and agents according to the needs of each stage. More than speeding up tasks, I use them to improve the quality of solutions and make the development process more consistent.",
    ],
    education: [
      { label: "Bachelor's degree", value: "Systems Analysis and Development, Federal Institute of Piauí" },
      { label: "Postgraduate degree", value: "Cloud Computing, UNINTER" },
    ],
  },
  techGroups: [
    { label: "Frontend", items: frontendItems },
    {
      label: "Backend",
      items: ["Java 8+", "Spring Boot", "Spring MVC", "Spring Security", "JPA/Hibernate", "Microservices", "RESTful APIs", "JUnit", "RabbitMQ", "Kafka", "Keycloak"],
    },
    { label: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Data modeling", "SQL queries"] },
    { label: "DevOps & Cloud", items: devopsItems },
    {
      label: "Quality & best practices",
      items: ["OOP", "SOLID", "Design Patterns", "Unit testing", "Integration testing", "Code Review", "Git"],
    },
  ],
  contact: {
    heading: "Shall we build something interesting?",
    links: [{ label: "Email", ...emailLink }, linkedinLink, githubLink],
  },
};

export const content: Record<Locale, Content> = { pt, en };
