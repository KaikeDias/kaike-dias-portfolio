# Tarefas – Seleção de Idioma

Especificação: `/specs/selecao-idioma/spec.md`

## Tarefas de Implementação

- [x] **T01** – Reestruturar `data/content.ts` para exportar o conteúdo por idioma (`pt` e `en`) com a mesma estrutura tipada. Traduzir manualmente o conteúdo para inglês, mantendo nomes próprios, tecnologias e URLs (RF08, RN05, RN06, RNF06). → CA04, CA05, CA09
- [x] **T02** – Levar para o conteúdo por idioma os textos fixos dos componentes: `Header`, `Hero`, `Experience`, `Projects`, `Contact`, `Footer` e o link "Pular para o conteúdo" de `app/layout.tsx`, incluindo `aria-label` e `sr-only` (RN04). → CA04, CA05
- [x] **T03** – Criar a função pura de detecção do idioma inicial: escolha salva válida → `navigator.languages[0]`/`navigator.language` começando com `pt` → senão `en` (RN02, CE02, CE03). → CA01, CA02
- [x] **T04** – Criar o contexto/provider de idioma (client component) que: aplica o idioma detectado após a hidratação (RNF05), expõe o idioma atual e a função de troca, grava a escolha em `localStorage` com `try/catch` (RF06, CE01, RNF04) e atualiza `document.documentElement.lang` (RN07). → CA04, CA05, CA06, CA10
- [x] **T05** – Fazer os componentes lerem os textos do idioma ativo pelo contexto, e não mais por import direto (RF04). → CA04, CA05
- [x] **T06** – Criar o seletor de idioma no `Header` (desktop e mobile): botão com ícone `lucide-react`, dropdown com "Português" e "English", indicação da opção ativa, fechamento com `Escape`, clique fora e seleção, além dos atributos de acessibilidade (RF01–RF05, RNF01, RNF02). → CA03, CA07, CA08

## Tarefas de Testes

- [x] **T07** – Configurar o ambiente de testes (Vitest + Testing Library + jsdom) e o script `test`/`test:coverage` no `package.json`, já que o projeto ainda não tem testes.
- [x] **T08** – Testes unitários da detecção de idioma: `pt-BR`, `pt-PT`, `en-US`, `es-ES`, valor salvo válido, valor salvo inválido, `navigator.languages` vazio, ausência total de idioma. → CA01, CA02, CE02, CE03
- [x] **T09** – Testes do provider: troca de idioma, persistência em `localStorage`, restauração após remontagem, atualização de `<html lang>`, `localStorage` lançando exceção. → CA04, CA05, CA06, CA10, CE01
- [x] **T10** – Testes do seletor: abrir o dropdown, opção ativa indicada, selecionar "English"/"Português" altera textos renderizados, fechar com `Escape`, clique fora e seleção, `aria-expanded` correto. → CA03, CA04, CA05, CA07
- [x] **T11** – Teste que garante que nomes de empresas, projetos, tecnologias, e-mail e URLs são iguais em `pt` e `en`. → CA09
- [x] **T12** – Garantir pelo menos 90% de cobertura nas unidades novas (detecção, provider, seletor).

## Tarefas de Validação

- [x] **T13** – Executar `pnpm lint`, `pnpm build` (exportação estática) e os testes, sem erros.
- [x] **T14** – Validação manual no navegador: idioma do navegador em `pt-BR` e em `en-US`, troca pelo dropdown, recarregar a página, layout mobile (< 768px), navegação por teclado e ausência de erros de hidratação no console. → CA01–CA08, CA10

## Relação Tarefas × Critérios de Aceitação

| Critério | Implementação | Testes/Validação |
|----------|---------------|------------------|
| CA01 | T03, T04 | T08, T14 |
| CA02 | T03, T04 | T08, T14 |
| CA03 | T06 | T10, T14 |
| CA04 | T01, T02, T04, T05 | T09, T10, T14 |
| CA05 | T01, T02, T04, T05 | T09, T10, T14 |
| CA06 | T04 | T09, T14 |
| CA07 | T06 | T10, T14 |
| CA08 | T06 | T14 |
| CA09 | T01 | T11 |
| CA10 | T04 | T09, T14 |

## Checklist de Conclusão

- [x] Todas as tarefas de implementação concluídas
- [x] Todo critério de aceitação tem pelo menos um teste ou validação correspondente
- [x] Cobertura ≥ 90% nas unidades novas
- [x] `pnpm lint`, `pnpm build` e testes sem falhas
- [x] Nenhum texto em português visível com o Inglês ativo
- [x] Nada fora do escopo da spec foi implementado
