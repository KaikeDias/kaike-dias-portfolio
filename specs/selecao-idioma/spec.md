# Seleção de Idioma (Português / Inglês)

## Objetivo

Permitir que o visitante veja o portfólio em português ou em inglês. A troca é feita por um seletor de idioma na navbar, e o idioma inicial é escolhido automaticamente conforme a região/idioma do visitante.

## Contexto

- Hoje o site está todo em português (`pt-BR`).
- Os textos ficam em `data/content.ts`, e alguns rótulos estão fixos nos componentes (`Header`, `Hero`, `Experience`, `Projects`, `Contact`, `Footer`, `app/layout.tsx`).
- O site é publicado como exportação estática (`output: "export"` em `next.config.ts`). Por isso não há servidor para detectar a localização por IP. A região do visitante é inferida pelo navegador, a partir das preferências de idioma (`navigator.languages`, ex.: `pt-BR`, `en-US`).
- Recrutadores e empresas de fora do Brasil fazem parte do público do portfólio.

## Regras de Negócio

- **RN01** – Os idiomas suportados são Português (`pt`) e Inglês (`en`).
- **RN02** – Idioma padrão na primeira visita:
  - se o primeiro idioma de `navigator.languages` (ou `navigator.language`, quando o primeiro não existir) começar com `pt` (ex.: `pt-BR`, `pt-PT`), o site abre em **Português**;
  - em qualquer outro caso, o site abre em **Inglês**.
- **RN03** – Quando o visitante escolhe um idioma manualmente, essa escolha passa a valer em vez da detecção automática, também nas visitas seguintes no mesmo navegador.
- **RN04** – Com o Inglês selecionado, **todo** texto visível do site deve aparecer em inglês: navegação, hero, experiências, projetos, sobre, tecnologias, contato, rodapé, rótulos de acessibilidade (`aria-label`, textos `sr-only`) e o link "Pular para o conteúdo".
- **RN05** – Não são traduzidos nomes próprios, nomes de empresas, nomes de projetos, nomes de tecnologias, e-mail nem URLs.
- **RN06** – Valores de placeholder (entre colchetes, ex.: `[seu papel]`) continuam funcionando como placeholder nos dois idiomas, com texto equivalente em inglês (ex.: `[your role]`).
- **RN07** – O atributo `lang` do elemento `<html>` acompanha o idioma ativo (`pt-BR` ou `en`).

## Requisitos Funcionais

- **RF01** – A navbar deve ter um botão de idioma, visível tanto no desktop quanto no mobile.
- **RF02** – Ao clicar no botão, abre um dropdown com duas opções: "Português" e "English".
- **RF03** – O dropdown indica qual idioma está ativo.
- **RF04** – Ao escolher uma opção, o site inteiro muda para o idioma escolhido sem recarregar a página, e o dropdown fecha.
- **RF05** – O dropdown fecha ao pressionar `Escape`, ao clicar fora dele ou ao escolher uma opção.
- **RF06** – A escolha manual é salva no navegador (`localStorage`) e restaurada nas visitas seguintes (RN03).
- **RF07** – Sem escolha salva, o idioma inicial segue a RN02.
- **RF08** – Todo o conteúdo de `data/content.ts` e os textos fixos dos componentes passam a ter versões em `pt` e `en`.

## Requisitos Não Funcionais

- **RNF01** – Acessibilidade: o botão deve ter nome acessível (ex.: "Alterar idioma" / "Change language"), `aria-expanded` e `aria-controls`. As opções devem ser acessíveis por teclado (Tab/Enter/Espaço) e ter alvo de toque de pelo menos 44px, como os demais controles do header.
- **RNF02** – Visual consistente com o header atual (tipografia, cores e tokens de `globals.css`, ícones de `lucide-react`).
- **RNF03** – Não adicionar biblioteca de i18n. A solução deve usar React e o que o projeto já tem, e continuar compatível com a exportação estática.
- **RNF04** – Se o `localStorage` não estiver disponível (navegação privada, bloqueio), o site não pode quebrar e deve seguir a RN02.
- **RNF05** – O HTML estático é gerado em português. A troca para o idioma detectado ou salvo ocorre no carregamento do cliente. Uma breve exibição inicial em português é aceitável, mas não pode haver erro de hidratação.
- **RNF06** – Os textos dos dois idiomas devem ter a mesma estrutura, de modo que não falte nenhuma chave em nenhum idioma (verificado pelo TypeScript).

## Critérios de Aceitação

- **CA01** – Dado um navegador com idioma `pt-BR` e nenhuma escolha salva, ao abrir o site, o conteúdo aparece em Português.
- **CA02** – Dado um navegador com idioma `en-US` (ou qualquer idioma que não comece com `pt`) e nenhuma escolha salva, ao abrir o site, o conteúdo aparece em Inglês.
- **CA03** – Ao clicar no botão de idioma da navbar, um dropdown abre com as opções "Português" e "English", e a opção ativa fica indicada.
- **CA04** – Ao selecionar "English", todos os textos visíveis e rótulos de acessibilidade do site passam para inglês, e `<html lang>` passa a ser `en`.
- **CA05** – Ao selecionar "Português", todos os textos voltam para português, e `<html lang>` passa a ser `pt-BR`.
- **CA06** – Depois de escolher um idioma e recarregar a página, o idioma escolhido é mantido, mesmo que seja diferente do idioma do navegador.
- **CA07** – O dropdown fecha com `Escape`, ao clicar fora dele e ao escolher uma opção.
- **CA08** – O botão de idioma está disponível e funciona no layout mobile (< 768px) e no desktop.
- **CA09** – Nomes de empresas, projetos, tecnologias, e-mail e URLs ficam iguais nos dois idiomas.
- **CA10** – Com `localStorage` indisponível, o site carrega sem erros no idioma da RN02.

## Casos de Erro

- **CE01** – `localStorage` lança exceção ao ler ou gravar: ignorar o erro e usar a detecção da RN02. A troca de idioma continua funcionando durante a sessão.
- **CE02** – Valor salvo inválido (diferente de `pt` ou `en`): desconsiderar e usar a RN02.
- **CE03** – `navigator.languages` vazio ou indisponível: usar `navigator.language`; se este também não existir, usar Inglês.

## Fora de Escopo

- Idiomas além de Português e Inglês.
- Rotas por idioma (ex.: `/en`, `/pt`) e páginas estáticas separadas por idioma.
- Detecção de localização por IP/geolocalização (incompatível com a exportação estática).
- Tradução de metadados de SEO/Open Graph (`metadata` em `app/layout.tsx` continua em português).
- Versão em inglês do currículo em PDF. O mesmo arquivo é usado nos dois idiomas.
- Tradução automática (APIs de tradução). Os textos em inglês são escritos manualmente.
