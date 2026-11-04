// Fonte: portfolio-kaike-dias.md. Valores entre colchetes são placeholders a substituir.

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
  role: string;
  status: string;
  technologies: string[];
  demoUrl: string;
  sourceUrl?: string;
  /** Primeira imagem é a principal; a segunda (opcional) aparece só no layout alternado. */
  images: { label: string; src?: string }[];
};

export type TechGroup = { label: string; items: string[] };

export const isPlaceholder = (value: string) => value.startsWith("[");

export const site = {
  name: "Kaike Dias Miranda",
  role: "Desenvolvedor Full Stack",
  location: "Brasil",
  year: 2026,
  resumeUrl: "/curriculo_kaike_dias_miranda.pdf",
  description:
    "Desenvolvedor Full Stack com mais de 3 anos de experiência em Java, Spring Boot, React, Next.js e Angular, da construção de interfaces à implementação de APIs, integrações e regras de negócio.",
};

export const hero = {
  headline: "Transformando ideias em soluções digitais",
  intro:
    "Desenvolvedor Full Stack com mais de 3 anos de experiência, da construção de interfaces à implementação de APIs, integrações e regras de negócio, com Java, Spring Boot, React, Next.js e Angular.",
  specialties: [
    "Frontend com Angular, React e Next.js",
    "Backend com Java e Spring Boot",
    "Microsserviços, integrações e mensageria",
  ],
};

export const navLinks = [
  { href: "#experiencia", label: "Experiência" },
  { href: "#projetos", label: "Projetos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export const experiences: Experience[] = [
  {
    role: "Desenvolvedor de Software",
    company: "ETIPI",
    period: "Junho de 2025 – Presente",
    current: true,
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
    technologies: [
      "Java",
      "Spring Boot",
      "React.js",
      "Next.js",
      "RabbitMQ",
      "Keycloak",
      "Spring Security",
      "Docker",
      "Kubernetes",
      "OpenShift",
    ],
  },
  {
    role: "Desenvolvedor Full Stack",
    company: "Hiperdigi",
    period: "Junho de 2024 – Maio de 2025",
    current: false,
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
    role: "Desenvolvedor Mobile Flutter",
    company: "FAPEPI",
    period: "Abril de 2023 – Março de 2024",
    current: false,
    responsibilities: [
      "Desenvolvi um aplicativo mobile multiplataforma em Flutter para a Coordenação da Juventude do Piauí, participando da implementação e evolução das funcionalidades da aplicação.",
      "Implementei a integração do aplicativo com APIs REST, realizando o consumo, tratamento e apresentação dos dados recebidos do backend nas interfaces mobile.",
      "Desenvolvi e mantive telas e componentes reutilizáveis em Flutter/Dart, trabalhando com navegação, formulários, validações e gerenciamento dos dados utilizados pela aplicação.",
      "Investiguei e corrigi problemas em funcionalidades existentes, realizando ajustes na interface e nos fluxos do aplicativo para melhorar sua estabilidade e usabilidade.",
    ],
    technologies: ["Flutter", "Dart", "APIs REST"],
  },
];

export const projectsIntro =
  "Aplicações construídas para necessidades concretas, da interface à gestão do conteúdo.";

export const projects: Project[] = [
  {
    name: "Doceria da Mary",
    category: "Site e painel administrativo",
    description:
      "Plataforma digital para uma doceria artesanal, composta por um site responsivo com cardápio digital e um painel administrativo. Os clientes exploram os produtos e fazem pedidos diretamente pelo WhatsApp, enquanto a doceria gerencia produtos, categorias e informações do site de forma independente.",
    role: "[seu papel]",
    status: "[completo ou em andamento]",
    technologies: ["Angular", "TypeScript", "Supabase"],
    demoUrl: "https://doceriadamary.vercel.app/",
    sourceUrl: "https://github.com/KaikeDias/doceria-da-mary",
    images: [{ label: "Página inicial do site", src: "/projetos/doceria-da-mary.png" }],
  },
  {
    name: "NutriPlan",
    category: "Aplicação web",
    description:
      "Aplicação para nutricionistas que facilita a criação e organização de planos alimentares, com fluxo guiado para cadastro do profissional e do paciente, montagem de refeições e alimentos, pré-visualização e exportação dos planos em PDF. Conta com persistência local dos dados, validação de formulários e interface adaptável a diferentes dispositivos.",
    role: "[seu papel]",
    status: "[completo ou em andamento]",
    technologies: ["React", "TypeScript", "Vite"],
    demoUrl: "https://nutri-plan-sand-two.vercel.app/",
    sourceUrl: "https://github.com/KaikeDias/NutriPlan",
    images: [{ label: "Etapa de perfil profissional do fluxo guiado", src: "/projetos/nutriplan.png" }],
  },
  {
    name: "Vaga Livre",
    category: "Aplicativo mobile",
    description:
      "Aplicativo mobile em Flutter para localização e reserva remota de vagas de estacionamento. Integrado ao OpenStreetMap, permite visualizar estacionamentos disponíveis no mapa, consultar opções de vagas, realizar reservas e efetuar o pagamento diretamente pela plataforma.",
    role: "[seu papel]",
    status: "[completo ou em andamento]",
    technologies: ["Flutter", "Dart", "Supabase", "OpenStreetMap"],
    demoUrl: "[link de demonstração]",
    sourceUrl: "[link do código-fonte]",
    images: [{ label: "Screenshot do mapa de estacionamentos" }],
  },
  {
    name: "NutriPlus",
    category: "Plataforma web e mobile · TCC",
    description:
      "Plataforma de acompanhamento nutricional desenvolvida como TCC, composta por uma aplicação web para nutricionistas e um aplicativo mobile para pacientes, integrados à mesma API REST. Permite gerenciar pacientes, criar e acompanhar dietas, disponibilizar cardápios e orientações, consultar documentos e registrar refeições.",
    role: "[seu papel]",
    status: "[completo ou em andamento]",
    technologies: ["Java", "Spring Boot", "Vue.js", "Flutter"],
    demoUrl: "[link de demonstração]",
    sourceUrl: "[link do código-fonte]",
    images: [{ label: "Screenshot da aplicação web" }, { label: "Aplicativo do paciente" }],
  },
];

export const about = {
  statement:
    "Atuo como desenvolvedor Full Stack, do frontend ao backend, com interesse em arquitetura e engenharia de software.",
  paragraphs: [
    "Sou desenvolvedor de software com mais de 3 anos de experiência em desenvolvimento Full Stack, atuando desde a construção de interfaces até a implementação de APIs, integrações e regras de negócio. Tenho foco principal no ecossistema Java e Spring Boot no backend, além de experiência com React, Next.js e Angular no frontend.",
    "Ao longo da minha trajetória, participei do desenvolvimento e da evolução de sistemas, trabalhando com integrações entre serviços, processamento assíncrono e mensageria, além de contribuir para a qualidade e organização das aplicações. Também incorporo ferramentas de Inteligência Artificial ao meu fluxo de desenvolvimento, utilizando-as como apoio à análise, implementação, revisão e aprimoramento de soluções.",
    "Sou pós-graduado em Cloud Computing e tenho interesse crescente em arquitetura de software, engenharia de sistemas e desenvolvimento de soluções escaláveis, buscando aliar boas práticas de engenharia, tecnologias modernas e decisões técnicas alinhadas às necessidades do negócio.",
  ],
  education: [
    { label: "Graduação", value: "Análise e Desenvolvimento de Sistemas" },
    { label: "Pós-graduação", value: "Cloud Computing" },
  ],
};

export const techGroups: TechGroup[] = [
  { label: "Frontend", items: ["React", "Next.js", "Angular", "Vue.js", "TypeScript", "JavaScript", "HTML", "CSS"] },
  {
    label: "Backend",
    items: ["Java 8+", "Spring Boot", "Spring MVC", "Spring Security", "JPA/Hibernate", "Microsserviços", "APIs RESTful", "JUnit", "RabbitMQ", "Kafka", "Keycloak"],
  },
  { label: "Banco de dados", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Modelagem de dados", "Consultas SQL"] },
  { label: "DevOps e Cloud", items: ["Docker", "Kubernetes", "OpenShift", "CI/CD", "AWS", "Maven", "Jenkins"] },
  {
    label: "Qualidade e boas práticas",
    items: ["POO", "SOLID", "Design Patterns", "Testes unitários", "Testes de integração", "Code Review", "Git"],
  },
];

export const contact = {
  heading: "Vamos construir algo interessante?",
  links: [
    { label: "E-mail", value: "kaikedias98@gmail.com", href: "mailto:kaikedias98@gmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/kaike-dias", href: "https://www.linkedin.com/in/kaike-dias/" },
    { label: "GitHub", value: "github.com/KaikeDias", href: "https://github.com/KaikeDias" },
  ],
};
