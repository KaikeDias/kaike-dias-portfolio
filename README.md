<h1 align="center">Portfólio · Kaike Dias Miranda</h1>

<p align="center">
	Portfólio pessoal de página única de Kaike Dias Miranda, desenvolvedor Full Stack, com experiência, projetos, formação, tecnologias e contato.
</p>

<p align="center">
	<a href="#visao-geral">Visão geral</a> •
	<a href="#funcionalidades">Funcionalidades</a> •
	<a href="#tecnologias">Tecnologias</a> •
	<a href="#arquitetura">Arquitetura</a> •
	<a href="#estrutura-de-pastas">Pastas</a> •
	<a href="#instalacao">Instalação</a> •
	<a href="#scripts-disponiveis">Scripts</a> •
	<a href="#conteudo">Conteúdo</a> •
	<a href="#build-e-deploy">Build</a>
</p>

<p align="center">
	<!-- Sugestões de badges:
	<img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
	<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
	<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
	<img src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
	-->
</p>

---

<h2 id="visao-geral">📌 Visão Geral</h2>

Este é o meu portfólio pessoal, pensado para apresentar de forma direta quem sou como desenvolvedor Full Stack: onde trabalhei, o que construí e com quais tecnologias. Backend (Java, Spring Boot) e frontend (Angular, React, Next.js, TypeScript) aparecem com o mesmo peso.

O site é uma página única com estética editorial: muito espaço em branco, grid de 12 colunas com composições assimétricas e divisores finos. Ele é gerado como **exportação estática** (`output: 'export'`), então pode ser hospedado em qualquer servidor de arquivos estáticos.

Todo o texto vem de um único arquivo tipado (`data/content.ts`). Para adicionar um projeto ou uma experiência, basta incluir um item na lista.

---

<h2 id="funcionalidades">✨ Funcionalidades</h2>

- Seções na ordem: Hero, Experiência, Projetos, Sobre, Tecnologias, Contato e Footer.
- Header fixo com navegação por âncoras e botão para baixar o currículo.
- Seletor de idioma (Português / English) na navbar. O idioma inicial segue o navegador, e a escolha manual fica salva no `localStorage`.
- Menu hambúrguer no mobile, com `aria-expanded`, fechamento ao escolher um item e com a tecla `Esc` (o foco volta para o botão).
- Linha do tempo de experiências, com destaque para a posição atual.
- Projetos em composições alternadas, com categoria, descrição, papel, status, stack, link de demonstração e link do código-fonte.
- Placeholders identificados (texto entre colchetes) para dados e imagens ainda não fornecidos.
- Download do currículo em PDF.
- Layout responsivo de 390px a 1440px+, sem rolagem horizontal.
- Acessibilidade: HTML semântico, um único `h1`, link "Pular para o conteúdo", foco visível, alvos de toque de pelo menos 44px e contraste mínimo de 4.5:1.
- Animação de entrada no hero, desativada com `prefers-reduced-motion`.
- Metadados e Open Graph em português (o HTML estático é gerado em português e o idioma é trocado no cliente).

---

<h2 id="tecnologias">🧰 Tecnologias</h2>

### Base da aplicação

- Next.js 16 (App Router)
- React 19
- TypeScript

### UI e estilização

- Tailwind CSS v4
- Lucide React
- Manrope (via `next/font/google`)

### Qualidade

- ESLint (`eslint-config-next`)
- Vitest + Testing Library (jsdom)

---

<h2 id="arquitetura">🏗️ Arquitetura Frontend</h2>

### Visão geral

A aplicação tem uma única rota (`app/page.tsx`), que compõe um componente por seção dentro do `LanguageProvider`. As seções são Client Components porque leem os textos do idioma ativo pelo hook `useLanguage()`. O HTML continua sendo gerado no build (em português) e o idioma detectado ou salvo é aplicado no carregamento do cliente.

### Idiomas

- `components/LanguageProvider.tsx`: guarda o idioma ativo, expõe `useLanguage()` (`locale`, `t`, `setLocale`) e atualiza `<html lang>`.
- `lib/locale.ts`: `detectLocale()` (escolha salva válida → idioma do navegador → inglês) e a chave do `localStorage`.
- `components/LanguageSwitcher.tsx`: dropdown da navbar, que fecha com `Esc` ou com clique fora.

A especificação da funcionalidade está em `specs/selecao-idioma/`.

### Conteúdo

`data/content.ts` concentra todos os textos e links dos dois idiomas (`content.pt` e `content.en`), com tipos para experiências (`Experience`), projetos (`Project`) e grupos de tecnologias (`TechGroup`). Os valores que não se traduzem (empresas, tecnologias, URLs, imagens) ficam em constantes compartilhadas pelos dois idiomas. Os componentes só leem esses dados, sem texto fixo no JSX.

Dados ainda não fornecidos são marcados com `pending("...")` (tipo `Pending`). Os componentes verificam com `isPending`, exibem o texto entre colchetes com destaque visual e, no caso de links, não renderizam `<a>`.

Regra de organização: `data/` guarda o conteúdo, seus tipos e helpers sobre o conteúdo (`Locale`, `locales`, `isPending`); `lib/` guarda a lógica que depende do navegador (`detectLocale`, chave do `localStorage`).

### Design tokens

Cores, fonte e animação são definidas como tokens no `@theme` do Tailwind, em `app/globals.css`:

| Token | Valor | Uso |
| --- | --- | --- |
| `canvas` | `#F7F6F2` | Fundo |
| `ink` | `#242725` | Texto, contato e footer |
| `olive` | `#657C68` | Destaque (ponto do logo, linha do tempo) |
| `olive-strong` | `#4E6251` | Texto e hover em verde (contraste) |
| `surface` | `#D9DED6` | Seção Sobre e placeholders |
| `line` | `#C7CEC3` | Bordas e divisores |
| `muted` | `#555955` | Rótulos e textos secundários |

Também existem as utilities `shell` (container com gutters responsivos) e `placeholder` (destaque dos dados pendentes).

### Imagens

As imagens dos projetos usam `next/image` com `images.unoptimized`, já que a exportação estática não tem servidor de otimização. Enquanto um projeto não tiver screenshot, aparece um placeholder com o rótulo da imagem.

---

<h2 id="estrutura-de-pastas">📁 Estrutura de Pastas</h2>

```text
app/
	globals.css            # Tokens do tema, utilities e estilos globais
	layout.tsx             # Fonte, metadados e <html lang> inicial
	page.tsx               # Composição das seções
components/
	LanguageProvider.tsx   # Contexto do idioma ativo e hook useLanguage()
	LanguageSwitcher.tsx   # Dropdown de idioma da navbar
	Header.tsx             # Header fixo, menu mobile e link "Pular para o conteúdo"
	Hero.tsx               # Apresentação e especialidades
	Experience.tsx         # Linha do tempo de experiências
	Projects.tsx           # Projetos, imagens e placeholders
	About.tsx              # Sobre e formação
	Technologies.tsx       # Grupos de tecnologias
	Contact.tsx            # Links de contato e currículo
	ExternalLink.tsx       # Link em nova aba com aviso para leitores de tela
	Footer.tsx             # Rodapé
data/
	content.ts             # Conteúdo tipado do site (pt e en)
lib/
	locale.ts              # Detecção do idioma inicial
docs/
	portfolio-kaike-dias.md  # Fonte original do conteúdo
public/
	curriculo_kaike_dias_miranda.pdf
	projetos/              # Screenshots dos projetos
specs/                   # Especificações e tarefas por funcionalidade (SDD)
tests/                   # Testes automatizados (Vitest)
```

---

<h2 id="instalacao">⚙️ Instalação</h2>

### Pré-requisitos

- Node.js instalado
- `pnpm` recomendado

### Instalar dependências

```bash
pnpm install
```

O projeto usa `pnpm` (definido em `packageManager` no `package.json`) e tem o `pnpm-lock.yaml` versionado.

---

<h2 id="configuracao">🔧 Configuração</h2>

Não existe arquivo `.env`.

Pontos importantes de configuração:

- `output: 'export'` e `images.unoptimized` no `next.config.ts`;
- `cacheComponents` e `partialPrefetching` desativados, porque o PPR não é compatível com a exportação estática;
- Tailwind CSS v4 carregado via `@tailwindcss/turbopack` e configurado em `app/globals.css`;
- alias `@/*` apontando para a raiz do projeto.

---

<h2 id="execucao-local">🚀 Execução Local</h2>

```bash
pnpm dev
```

Depois, é só abrir a URL mostrada no terminal (por padrão, `http://localhost:3000`).

---

<h2 id="scripts-disponiveis">📜 Scripts Disponíveis</h2>

| Script | Descrição |
| --- | --- |
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Gera a exportação estática na pasta `out/` |
| `pnpm lint` | Executa o ESLint no projeto |
| `pnpm test` | Executa os testes com Vitest |
| `pnpm test:coverage` | Executa os testes com relatório de cobertura |

> Com `output: 'export'`, não existe `pnpm start`. Para conferir a build, sirva a pasta `out/` com qualquer servidor estático.

---

<h2 id="conteudo">📝 Atualizando o Conteúdo</h2>

Todo o conteúdo fica em `data/content.ts`.

### Adicionar um projeto

1. Inclua um item em `projects` nos dois idiomas (`pt` e `en`), com nome, categoria, descrição, papel, status, tecnologias e links. Valores que não se traduzem podem ir em uma constante compartilhada.
2. Coloque o screenshot em `public/projetos/` e informe o caminho em `images[0].src`.
3. Se houver uma segunda imagem, adicione-a em `images`. Ela aparece nos projetos com layout alternado.

Os projetos alternam automaticamente entre as duas composições: imagem grande à esquerda e texto à direita, e o inverso.

### Adicionar uma experiência

Inclua um item em `experiences` nos dois idiomas. Use `current: true` na posição atual para destacá-la na linha do tempo.

### Placeholders

Campos ainda sem valor usam `pending("seu papel")` e aparecem como `[seu papel]` no site. Basta substituir pelo valor real (uma string).

---

<h2 id="testes">🧪 Testes</h2>

Os testes ficam em `tests/` e cobrem a detecção de idioma, a troca de idioma na página e a equivalência do conteúdo entre `pt` e `en`.

```bash
pnpm test
pnpm test:coverage
pnpm lint
pnpm build
```

---

<h2 id="build-e-deploy">📦 Build e Deploy</h2>

### Build

```bash
pnpm build
```

Gera o site estático na pasta `out/`, com `index.html`, assets e os arquivos de `public/`.

### Deploy

O deploy é feito na Vercel, que detecta o Next.js, roda `pnpm build` e publica a exportação estática gerada em `out/`.

### Hosting

- plataforma de deploy: Vercel.

---
