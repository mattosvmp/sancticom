const nextReactTypescriptEFerramentas = {
  slug: "next-react-typescript-e-ferramentas",
  titulo: "Next.js, React, TypeScript e ferramentas",
  resumo:
    "O que o FastStore usa por baixo, quais versões estão instaladas, o que cada script faz e como a loja de estudo se compara ao site da Sancticom.",
  secoes: [
    {
      titulo: "As peças e as versões instaladas",
      blocos: [
        {
          tipo: "p",
          texto:
            "O FastStore não é uma tecnologia isolada: é um projeto Next.js com React, escrito em TypeScript e configurado pelo CLI. Estas são as versões que estavam instaladas no projeto de estudo na data em que li o node_modules.",
        },
        {
          tipo: "tabela",
          colunas: ["Peça", "Versão instalada", "Papel no projeto"],
          linhas: [
            [
              "Next.js",
              "16.2.7",
              "Framework das páginas, da geração estática e do servidor.",
            ],
            ["React", "18.3.1", "Biblioteca dos componentes de interface."],
            ["TypeScript", "5.9.3", "Tipos nas customizações em src."],
            [
              "graphql",
              "16.14.1",
              "Biblioteca de GraphQL usada pelas queries.",
            ],
            ["Sass", "1.100.0", "Compila o custom-theme.scss."],
            [
              "@faststore/*",
              "4.10.0",
              "O framework: core, ui, sdk, api, cli e components.",
            ],
            ["Cypress", "12.17.4", "Testes de ponta a ponta."],
            [
              "Node.js",
              "24.21.0",
              "Runtime local. O starter pede Node 20 ou mais.",
            ],
            ["Yarn", "1.22.22", "Gerenciador de dependências."],
          ],
        },
        {
          tipo: "nota",
          origem: "codigo",
          texto:
            "Versões lidas em node_modules/*/package.json. O package.json do starter pede react ^18.2.0, graphql ^16.11.0 e typescript ^5.9.3, e deixa o Next e o resto a cargo do @faststore/cli. As versões instaladas podem mudar a cada yarn install, então confira antes de citá-las.",
        },
      ],
    },
    {
      titulo: "Pages Router, e por quê",
      blocos: [
        {
          tipo: "p",
          texto:
            "O FastStore usa o Pages Router do Next.js: as rotas estão em .faststore/src/pages (index.tsx, [slug]/p.tsx, [...slug].tsx, s, checkout.tsx e outras). É por isso que a página de produto usa getStaticProps, API típica do Pages Router.",
        },
        {
          tipo: "lista",
          itens: [
            "getStaticProps: gera a página no servidor, no build ou na regeneração.",
            "Rotas dinâmicas: [slug] pega um trecho da URL, e [...slug] pega vários.",
            "O site da Sancticom usa o mesmo Pages Router (Next 14.2.13, em JavaScript). Esse é o seu ponto de contato mais forte com o FastStore.",
          ],
        },
        {
          tipo: "nota",
          origem: "inferencia",
          texto:
            "Que o App Router (a pasta app) não é usado eu deduzi de só ter visto a pasta pages. Não procurei uma pasta app para confirmar.",
        },
      ],
    },
    {
      titulo: "Os scripts do projeto",
      blocos: [
        {
          tipo: "codigo",
          arquivo: "package.json (scripts do starter)",
          linguagem: "json",
          codigo: `{
  "scripts": {
    "dev": "faststore dev",
    "build": "faststore build",
    "start": "faststore start",
    "cms-sync": "faststore cms-sync",
    "test": "faststore test"
  }
}`,
        },
        {
          tipo: "tabela",
          colunas: ["Script", "O que faz"],
          linhas: [
            [
              "yarn dev",
              "Monta o .faststore juntando o core e o seu src, gera os tipos do GraphQL e sobe o servidor em http://localhost:3000.",
            ],
            ["yarn build", "Gera a versão de produção."],
            ["yarn start", "Serve a versão de produção localmente."],
            [
              "yarn cms-sync",
              "Sincroniza as definições de conteúdo com o CMS. Exige VTEX CLI logado numa conta, e não foi usado.",
            ],
            ["yarn test", "Roda os testes Cypress."],
          ],
        },
        {
          tipo: "nota",
          origem: "codigo",
          texto:
            "O guia do repositório vtex/skills (e não a documentação publicada) diz que o yarn cms-sync do projeto é do estilo antigo e recomenda faststore cms-sync diretamente. Não executei nenhum dos dois.",
        },
      ],
    },
    {
      titulo: "TypeScript: um cuidado com o tsc",
      blocos: [
        {
          tipo: "p",
          texto:
            "O tsconfig do starter usa strict: true e exclui a pasta .faststore. Mesmo assim, rodar tsc --noEmit na raiz acusa muitos erros do tipo Cannot find module 'src/components/...'. Eles vêm de arquivos do framework em node_modules/@faststore/core, que importam caminhos que só existem depois da junção feita pelo CLI.",
        },
        {
          tipo: "p",
          texto:
            "Ou seja, a checagem de tipos de verdade acontece dentro do yarn dev e do yarn build. Para olhar só o seu código, filtre a saída do tsc pelos arquivos de src.",
        },
        {
          tipo: "nota",
          origem: "codigo",
          texto:
            "Foi o que fiz: o tsc não acusou erro em nenhum arquivo de src. Mas como a checagem completa não é conclusiva fora do CLI, não trate isso como prova de que o código compila no build.",
        },
      ],
    },
    {
      titulo: "Qualidade: testes, acessibilidade e desempenho",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Cypress 12.17.4 para testes de ponta a ponta, com a configuração em cypress.config.ts.",
            "cypress-axe para checar acessibilidade, e @testing-library/cypress para consultas.",
            "@lhci/cli (Lighthouse CI) para medir desempenho; o discovery.config.js lista as páginas a medir (home, produto e coleção).",
            "O discovery.config.js também lista as páginas dos testes de ponta a ponta, entre elas a busca (/s?q=Newstore).",
          ],
        },
        {
          tipo: "nota",
          origem: "nao-verificado",
          texto:
            "Nada disso foi rodado no projeto de estudo. As ferramentas vêm no starter; eu só li a configuração. Se perguntarem sobre testes, diga que o starter os traz e que você ainda não escreveu os seus.",
        },
      ],
    },
    {
      titulo: "Ruídos do terminal que não são problema seu",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Erros 404 do content-platform: o CMS sem conteúdo cadastrado para aquela página, e o FastStore usa o padrão.",
            "HeroCustom not found: o CMS da demonstração referencia uma seção que não existe no seu código.",
            "Aviso do React sobre a prop fetchPriority: o framework passa uma prop em maiúscula que o React 18.3.1 não reconhece num elemento DOM. Vem do framework.",
          ],
        },
        {
          tipo: "nota",
          origem: "inferencia",
          texto:
            "A explicação dos três é minha leitura do log e do comportamento da loja. Nenhuma está na documentação.",
        },
      ],
    },
    {
      titulo: "FastStore versus o site da Sancticom",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["", "Loja de estudo (FastStore)", "Site da Sancticom"],
          linhas: [
            ["Linguagem", "TypeScript", "JavaScript"],
            [
              "Next.js",
              "Pages Router, versão 16.2.7 instalada",
              "Pages Router, versão 14.2.13",
            ],
            [
              "Dados",
              "GraphQL do FastStore para a VTEX",
              "Rotas de API próprias e PostgreSQL",
            ],
            [
              "Estilo",
              "Tokens --fs-* em SCSS",
              "CSS puro em styles/globals.css",
            ],
            [
              "Customização",
              "Só em src, sobre um framework pronto",
              "Código inteiro é seu",
            ],
          ],
        },
      ],
    },
  ],
  perguntas: [
    {
      pergunta: "Quanto do FastStore é Next.js, e como você sabe?",
      resposta:
        "É um projeto Next.js com o Pages Router: as rotas ficam em .faststore/src/pages e a página de produto usa getStaticProps. Eu vi isso no código do projeto, e não só na documentação.",
    },
    {
      pergunta:
        "Você rodou tsc e não deu erro no seu código. Isso prova que compila?",
      resposta:
        "Não. O tsc isolado acusa erros de caminho no framework, porque os imports só se resolvem depois da junção feita pelo CLI. A checagem de verdade é a do yarn dev e do yarn build; o filtro do tsc por src é só um indício.",
    },
    {
      pergunta: "O que você já testou e o que não testou neste projeto?",
      resposta:
        "Subi a loja, vi a página de produto trazer dados reais, apliquei o tema e o override e conferi o contraste por cálculo. Não rodei Cypress nem Lighthouse, não vi o resultado em 360px e não sincronizei com o CMS.",
    },
  ],
  referencias: [
    {
      titulo: "Estrutura do projeto",
      url: "https://developers.vtex.com/docs/guides/faststore/getting-started-4-understanding-the-project-structure",
    },
    {
      titulo: "FastStore no GitHub (monorepo)",
      url: "https://github.com/vtex/faststore",
    },
    {
      titulo: "Starter público (vtex-sites/starter.store)",
      url: "https://github.com/vtex-sites/starter.store",
    },
  ],
};

export default nextReactTypescriptEFerramentas;
