const faststoreEVtex = {
  slug: "faststore-e-vtex",
  titulo: "FastStore e a arquitetura VTEX",
  resumo:
    "O que é um front-end headless, como o projeto nasce no WebOps, o que cada pasta faz e o que o discovery.config.js decide.",
  secoes: [
    {
      titulo: "O que é o FastStore",
      blocos: [
        {
          tipo: "p",
          texto:
            "O FastStore é o front-end headless da VTEX. Headless quer dizer que a vitrine (o que o cliente vê) é separada do back-end de comércio (catálogo, preço, carrinho, checkout). A loja que você roda no navegador é um projeto Next.js à parte, que consulta a VTEX por uma API GraphQL.",
        },
        {
          tipo: "p",
          texto:
            "Na prática o projeto é pequeno: o framework vem pronto em pacotes e você escreve só as customizações. No projeto de estudo, todos os pacotes do framework estão na versão 4.10.0.",
        },
        {
          tipo: "tabela",
          colunas: ["Pacote", "Para que serve"],
          linhas: [
            [
              "@faststore/core",
              "O framework da loja: páginas, seções e a lógica de dados. É o que vira a pasta .faststore.",
            ],
            [
              "@faststore/ui",
              "Componentes de interface e o sistema de estilos.",
            ],
            [
              "@faststore/sdk",
              "Utilidades do lado do cliente, como carrinho e sessão.",
            ],
            ["@faststore/api", "A API GraphQL que conversa com a VTEX."],
            [
              "@faststore/cli",
              "Os comandos faststore dev, build, start e cms-sync.",
            ],
          ],
        },
        {
          tipo: "nota",
          origem: "documentacao",
          texto:
            "A lista de pacotes principais (core, sdk, ui, api e cli) vem da página de estrutura do projeto. A descrição de cada um é minha leitura dos nomes, e não texto da documentação.",
        },
      ],
    },
    {
      titulo: "Como o projeto nasce: o onboarding",
      blocos: [
        {
          tipo: "p",
          texto:
            "No fluxo oficial, o projeto não nasce de um comando de terminal. Ele é criado no FastStore Onboarding, pelo app FastStore WebOps, dentro do VTEX Admin (Storefront > FastStore WebOps). O WebOps liga o seu código ao GitHub e gera uma prévia da loja. A documentação o chama de control plane dos projetos FastStore.",
        },
        {
          tipo: "lista",
          itens: [
            "É preciso o papel Owner (Admin Super) numa conta VTEX.",
            "É preciso uma conta GitHub pessoal ou de organização.",
            "Na etapa de Git você escolhe entre criar um repositório novo ou usar um existente.",
            "A documentação recomenda ter um catálogo para popular e testar a loja.",
          ],
        },
        {
          tipo: "p",
          texto:
            "Depois do onboarding, o dia a dia local é: clonar o repositório, yarn install, yarn dev e abrir http://localhost:3000.",
        },
        {
          tipo: "nota",
          origem: "documentacao",
          texto:
            "Pré-requisitos locais na documentação: Node acima de 15.0.0 e Yarn. O README do starter público pede Node 20 ou mais; use a regra mais restritiva.",
        },
        {
          tipo: "nota",
          origem: "inferencia",
          texto:
            "Este projeto de estudo não passou pelo onboarding. Ele parte do starter público vtex-sites/starter.store, que aponta para a loja de demonstração newstore. A documentação do onboarding não menciona essa possibilidade; que o starter rode sem conta foi confirmado só rodando.",
        },
      ],
    },
    {
      titulo: "As pastas do projeto",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Caminho", "O que é"],
          linhas: [
            [
              ".faststore/",
              "O framework (@faststore/core) montado pelo CLI. É gerado e sobrescrito nas atualizações, então não se edita.",
            ],
            [
              "src/",
              "Tudo o que é seu: o tema, as fontes e os overrides de componentes.",
            ],
            [
              "src/themes/custom-theme.scss",
              "Os design tokens: tipografia, cores, bordas e espaçamentos.",
            ],
            ["src/fonts/WebFonts.tsx", "Onde se carrega a fonte da loja."],
            [
              "discovery.config.js",
              "A configuração da loja: conta VTEX, sessão padrão, SEO, tema e opções experimentais.",
            ],
            [
              "vtex.env",
              "Variáveis de ambiente do desenvolvimento local. Não guarda segredos.",
            ],
            ["yarn.lock", "Fixa as versões exatas das dependências."],
          ],
        },
        {
          tipo: "p",
          texto:
            "O CLI trabalha em duas camadas: ele junta o core e o seu src dentro da pasta .faststore. O seu código acaba em .faststore/src/customizations/src. Por isso o AGENTS.md do starter manda editar só o src e nunca o .faststore.",
        },
        {
          tipo: "nota",
          origem: "codigo",
          texto:
            "A junção foi confirmada lendo o CLI instalado (o caminho tmpCustomizationsSrcDir) e achando o fragment ServerProduct dentro de .faststore/src/customizations/src.",
        },
      ],
    },
    {
      titulo: "O discovery.config.js, linha a linha",
      blocos: [
        {
          tipo: "codigo",
          arquivo: "discovery.config.js (trechos do starter)",
          linguagem: "js",
          codigo: `module.exports = {
  contentSource: {
    type: "CP",
  },

  // Tema
  theme: "custom-theme",

  // Plataforma de e-commerce
  platform: "vtex",

  api: {
    storeId: "newstore",
    workspace: "master",
    environment: "vtexcommercestable",
    hideUnavailableItems: true,
  },

  // Sessão padrão
  session: {
    currency: { code: "BRL", symbol: "R$" },
    locale: "pt-BR",
    country: "BRA",
  },

  experimental: {
    nodeVersion: 24,
    optimizedFonts: true,
  },
};`,
        },
        {
          tipo: "lista",
          itens: [
            'contentSource.type: "CP" diz que o conteúdo editorial vem do CMS novo (Content Platform). O CMS legado é outro fluxo, com outras regras.',
            'theme: "custom-theme" aponta para o arquivo src/themes/custom-theme.scss.',
            "api.storeId, workspace e environment dizem de qual loja VTEX vêm os dados. Trocar de loja é trocar essas linhas.",
            "session define o padrão antes de o cliente informar algo: moeda BRL, idioma pt-BR e país BRA.",
            "experimental.nodeVersion: 24 é a versão de Node usada no build do WebOps.",
          ],
        },
        {
          tipo: "nota",
          origem: "documentacao",
          texto:
            "A documentação diz que o arquivo configura SEO, conta VTEX e tema, e que a maior parte dos valores é definida no onboarding. Que discovery.config.js indica FastStore v3 ou posterior (e store.config.js, v1) também vem dela.",
        },
      ],
    },
    {
      titulo: "Catálogo e conteúdo editorial são coisas diferentes",
      blocos: [
        {
          tipo: "p",
          texto:
            "O produto, o preço e as imagens vêm do catálogo da VTEX. Já a estrutura das páginas (quais seções aparecem, banners, textos de marketing) vem do CMS. O FastStore junta as duas fontes em cada página.",
        },
        {
          tipo: "p",
          texto:
            "Ao rodar a loja de demonstração, o terminal mostra erros 404 em endereços como .../content-platform/data/newstore/faststore/pdp/entries/slug/.... A página continua funcionando.",
        },
        {
          tipo: "nota",
          origem: "inferencia",
          texto:
            "Minha leitura: o 404 é o CMS dizendo que não há conteúdo editorial cadastrado para aquele produto, e o FastStore usa o padrão. Isso não está na documentação; veio do log e do comportamento da página.",
        },
      ],
    },
    {
      titulo: "O que o framework não deixa fazer",
      blocos: [
        {
          tipo: "p",
          texto:
            "Quis criar uma página nova (/estudo) dentro da loja e descobri um limite. O CLI só aceita páginas próprias com o prefixo /pvt/account, a área Minha conta. Qualquer outra página em src/customizations/src/pages faz o CLI lançar o erro Only these prefix pages: (/pvt/account) are allowed.",
        },
        {
          tipo: "nota",
          origem: "codigo",
          texto:
            "Isso foi lido no código do @faststore/cli 4.10.0 (a constante ALLOWED_PREFIX_PAGES). A documentação oficial não trata do assunto. É a razão de este material de estudo viver no site da Sancticom.",
        },
      ],
    },
  ],
  perguntas: [
    {
      pergunta:
        "O que significa headless, e o que o FastStore faz que a VTEX não faz?",
      resposta:
        "Headless separa a vitrine do back-end. A VTEX continua dona do catálogo, do carrinho e do checkout; o FastStore é o front-end Next.js que consulta isso por GraphQL e cuida da experiência na tela.",
    },
    {
      pergunta: "Por que você não edita a pasta .faststore?",
      resposta:
        "Ela é o framework montado pelo CLI e é sobrescrita nas atualizações. As customizações vivem em src, que o CLI preserva e junta ao core.",
    },
    {
      pergunta: "O que acontece se eu trocar o storeId no discovery.config.js?",
      resposta:
        "A loja passa a consultar outra conta VTEX. É a configuração que liga o front-end ao back-end; o código das páginas não muda.",
    },
  ],
  referencias: [
    {
      titulo: "Rodando o projeto localmente",
      url: "https://developers.vtex.com/docs/guides/faststore/getting-started-3-running-the-project-locally",
    },
    {
      titulo: "FastStore Onboarding",
      url: "https://developers.vtex.com/docs/guides/faststore/1-onboarding-starting-the-project",
    },
    {
      titulo: "Estrutura do projeto",
      url: "https://developers.vtex.com/docs/guides/faststore/getting-started-4-understanding-the-project-structure",
    },
    {
      titulo: "Starter público (vtex-sites/starter.store)",
      url: "https://github.com/vtex-sites/starter.store",
    },
  ],
};

export default faststoreEVtex;
