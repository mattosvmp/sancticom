const graphqlEFluxoDeDados = {
  slug: "graphql-e-fluxo-de-dados",
  titulo: "GraphQL e o fluxo de dados",
  resumo:
    "O caminho de um produto, da VTEX até a tela: a rota, o getStaticProps, a query, o locator, o tratamento de erro e o ponto de extensão por fragments.",
  secoes: [
    {
      titulo: "O caminho do dado em uma frase",
      blocos: [
        {
          tipo: "p",
          texto:
            "A rota /{slug}/p roda um getStaticProps que executa uma query GraphQL no servidor, junta o resultado com o conteúdo do CMS e entrega tudo a um provider, de onde os componentes leem os dados por hooks.",
        },
        {
          tipo: "lista",
          itens: [
            "Arquivo da rota: .faststore/src/pages/[slug]/p.tsx.",
            "Quem monta a query: gql(...) importado de @generated.",
            "Quem executa: a função execute, contra a API GraphQL do FastStore, que consulta a VTEX.",
            "Quem entrega à tela: o PageProvider e hooks como usePDP.",
          ],
        },
        {
          tipo: "nota",
          origem: "codigo",
          texto:
            "Tudo desta página foi lido no código do projeto de estudo, e não em um guia. O arquivo da rota faz parte do framework, então ele pode mudar entre versões. Aqui a versão é a 4.10.0.",
        },
      ],
    },
    {
      titulo: "A query da página de produto",
      blocos: [
        {
          tipo: "codigo",
          arquivo: ".faststore/src/pages/[slug]/p.tsx (trecho)",
          linguagem: "ts",
          codigo: `const query = gql(\`
  query ServerProductQuery($locator: [IStoreSelectedFacet!]!) {
    ...ServerProduct
    product(locator: $locator) {
      id: productID

      seo { title description canonical }
      brand { name }

      sku
      gtin
      mpn
      name
      description
      releaseDate

      image { url alternateName }

      offers {
        lowPrice
        highPrice
        priceCurrency
        offers { availability price priceValidUntil seller { identifier } }
      }

      ...ProductDetailsFragment_product
    }
  }
\`)`,
        },
        {
          tipo: "lista",
          itens: [
            "$locator é a variável da query: uma lista de pares chave e valor que identifica o produto.",
            "...ServerProduct e ...ProductDetailsFragment_product são fragments, pedaços reutilizáveis de query que se somam à query da página.",
            "product(locator: $locator) devolve um único produto; id: productID renomeia o campo na resposta.",
            "A query pede só o que a página usa. Esse é o ganho do GraphQL: nada de campos sobrando.",
          ],
        },
        {
          tipo: "nota",
          origem: "codigo",
          texto:
            "O trecho acima está resumido (chaves em uma linha, alguns campos omitidos, como breadcrumbList e otherLocales). Para ver tudo, abra o arquivo no projeto.",
        },
      ],
    },
    {
      titulo: "O locator e o getStaticProps",
      blocos: [
        {
          tipo: "codigo",
          arquivo: ".faststore/src/pages/[slug]/p.tsx (trecho)",
          linguagem: "ts",
          codigo: `export const getStaticProps = async ({ params, previewData, locale }) => {
  const slug = params?.slug ?? ''
  // ...
  execute({
    variables: {
      locator: [
        { key: 'slug', value: slug },
        { key: 'channel', value: getChannelForLocale(locale) },
        { key: 'locale', value: locale },
      ],
    },
    operation: query,
  })
  // ...
}`,
        },
        {
          tipo: "lista",
          itens: [
            "O slug vem da URL (headphone-white-10000006 na página de exemplo).",
            "O canal de venda e o idioma vêm do locale da requisição.",
            "getStaticProps roda no servidor, no build ou na regeneração da página, e não no navegador. É o que faz a loja ser rápida: a página chega pronta.",
          ],
        },
        {
          tipo: "p",
          texto:
            "Os dados do CMS são buscados em paralelo com a query de produto, e o resultado é um objeto de props com os dados e as seções da página.",
        },
      ],
    },
    {
      titulo: "O que acontece quando dá errado",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Se a API devolver um erro do tipo não encontrado, a página devolve notFound (a 404 do Next) com revalidação em 5 minutos, ou o valor de revalidate404 da configuração.",
            "Se o recurso de redirecionamento estiver ligado (enableRedirects), ele procura um redirect para aquele caminho antes de desistir.",
            "Qualquer outro erro da query é lançado, e a geração da página falha.",
          ],
        },
        {
          tipo: "nota",
          origem: "codigo",
          texto:
            "Não li o return de sucesso do getStaticProps até o fim, então não afirmo qual é o intervalo de revalidação de uma página que deu certo.",
        },
      ],
    },
    {
      titulo: "O ponto de extensão: fragments",
      blocos: [
        {
          tipo: "p",
          texto:
            "A query da página já inclui ...ServerProduct. Esse fragment vive no seu src, em src/customizations/src/fragments/ServerProduct.ts, e começa quase vazio. Campos que você acrescentar a ele passam a vir na resposta, sem tocar no framework.",
        },
        {
          tipo: "codigo",
          arquivo: "src/customizations/src/fragments/ServerProduct.ts",
          linguagem: "ts",
          codigo: `import { gql } from '@generated'

export const fragment = gql(\`
  fragment ServerProduct on Query {
    product(locator: $locator) {
      id: productID
    }
  }
\`)`,
        },
        {
          tipo: "nota",
          origem: "documentacao",
          texto:
            "A documentação tem um guia sobre estender queries por fragments, e que os componentes leem os dados por hooks como usePLP e usePDP. Não segui o guia passo a passo; o que está aqui é o arquivo do starter e a leitura da query.",
        },
      ],
    },
    {
      titulo: "Regras para trazer dados que não estão no esquema",
      blocos: [
        {
          tipo: "p",
          texto:
            "O AGENTS.md do starter lista regras para quem precisa de dados fora do esquema nativo. Trate-as como orientação do próprio starter, e não como a documentação publicada.",
        },
        {
          tipo: "lista",
          itens: [
            "Estenda o esquema em src/customizations/src/graphql/. Nunca edite .faststore/api.",
            "Não faça chamadas diretas a APIs externas pelo front-end: use extensões da API, para evitar erros 504.",
            "Não crie rotas de API do Next além das que o FastStore já traz.",
            "Dentro de resolvers, chame as APIs da VTEX pelo domínio da loja, e não por vtexcommercestable.",
            "A geração dos tipos roda sozinha no yarn dev e no yarn build; campos novos só aparecem nos tipos depois disso.",
          ],
        },
      ],
    },
    {
      titulo: "O que eu vi funcionando",
      blocos: [
        {
          tipo: "p",
          texto:
            "Ao rodar a loja de demonstração, a página de produto trouxe o nome Headphone, o preço 136.62 e a moeda BRL, vindos da loja newstore. Os 404 do CMS no log não impediram a página.",
        },
        {
          tipo: "nota",
          origem: "inferencia",
          texto:
            "Não rastreei a camada de API (.faststore/api) até a VTEX. Só segui a ponta da página. Se perguntarem como a API fala com a VTEX por baixo, diga isso com franqueza.",
        },
      ],
    },
  ],
  perguntas: [
    {
      pergunta: "Siga o caminho do dado desde a VTEX até o componente.",
      resposta:
        "A rota /{slug}/p roda o getStaticProps, que executa a ServerProductQuery com o locator (slug, canal e idioma). A API do FastStore consulta a VTEX; o resultado se junta ao conteúdo do CMS e vai para o PageProvider, de onde os componentes leem por hooks como usePDP.",
    },
    {
      pergunta:
        "Preciso de um campo novo no produto. O que você faz e o que não faz?",
      resposta:
        "Acrescento o campo ao fragment ServerProduct no meu src, ou estendo o esquema em src/customizations/src/graphql/. Não edito o .faststore e não chamo API externa direto do componente.",
    },
    {
      pergunta: "Por que getStaticProps e não buscar os dados no navegador?",
      resposta:
        "A página sai pronta do servidor, com HTML e SEO completos e sem esperar uma requisição no cliente. É o ganho de desempenho central da loja. O custo é lidar com revalidação e dados que mudam.",
    },
  ],
  referencias: [
    {
      titulo: "Estendendo queries com fragments",
      url: "https://developers.vtex.com/docs/guides/faststore/api-extensions-extending-queries-using-fragments",
    },
    {
      titulo: "Consumindo extensões da API em componentes",
      url: "https://developers.vtex.com/docs/guides/faststore/api-extensions-consuming-api-extensions",
    },
    {
      titulo: "Visão geral da FastStore API",
      url: "https://developers.vtex.com/docs/guides/faststore/faststore-api-overview",
    },
  ],
};

export default graphqlEFluxoDeDados;
