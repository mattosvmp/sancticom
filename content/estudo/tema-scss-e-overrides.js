const temaScssEOverrides = {
  slug: "tema-scss-e-overrides",
  titulo: "Tema, SCSS e overrides",
  resumo:
    "Como os design tokens --fs-* mudam a loja inteira, como a identidade da Sancticom foi aplicada e como funciona um override de seção.",
  secoes: [
    {
      titulo: "Design tokens: a ideia central",
      blocos: [
        {
          tipo: "p",
          texto:
            "O FastStore descreve a aparência por design tokens, que são variáveis CSS com nomes padronizados começando por --fs-. Um tema é um arquivo de estilo que redefine esses tokens. Mudar um token global muda de uma vez todos os componentes que o usam.",
        },
        {
          tipo: "lista",
          itens: [
            "Tokens globais: afetam a loja toda. São o arquivo principal de um tema e se dividem em Branding Core, UI Essentials e Refinements.",
            "Tokens locais: estilizam um componente específico e se ligam aos globais.",
            "Os tokens semânticos (botão primário, link, anel de foco) apontam para as escalas da paleta. Trocar a escala propaga para eles.",
          ],
        },
        {
          tipo: "nota",
          origem: "documentacao",
          texto:
            "Os três grupos e a distinção entre global e local vêm da página de Theming. Os nomes e os valores padrão das escalas vêm das páginas Colors e Typography.",
        },
      ],
    },
    {
      titulo: "A paleta e os tokens semânticos",
      blocos: [
        {
          tipo: "tabela",
          colunas: ["Escala", "Papel", "Valor padrão do FastStore"],
          linhas: [
            [
              "--fs-color-main-0 a main-4",
              "Cor principal da marca",
              "main-2 é #00419e",
            ],
            [
              "--fs-color-accent-0 a accent-4",
              "Cor de destaque",
              "accent-2 é #9d8abf",
            ],
            [
              "--fs-color-neutral-0 a neutral-7",
              "Cinzas, fundos e textos",
              "neutral-7 é #171a1c",
            ],
          ],
        },
        {
          tipo: "p",
          texto:
            "Os semânticos referenciam a paleta. Por exemplo, o fundo do botão primário é var(--fs-color-main-2), o hover é main-3 e o estado ativo é main-4. O link usa main-2, e o texto principal usa neutral-7.",
        },
      ],
    },
    {
      titulo: "A identidade da Sancticom no tema",
      blocos: [
        {
          tipo: "p",
          texto:
            "Os valores vieram do CSS do site da Sancticom. Dois deles (main-4 e accent-1) não existem no site e foram derivados por mim para completar as escalas.",
        },
        {
          tipo: "tabela",
          colunas: ["Token", "Valor", "Origem no site"],
          linhas: [
            ["main-0", "#faf7f0", "--creme"],
            ["main-1", "#e7e1d3", "--linha"],
            ["main-2", "#0d2c54", "--marinho"],
            ["main-3", "#081f3d", "--marinho-fundo"],
            ["main-4", "#04152b", "derivado"],
            ["accent-0", "#f7eed6", "--ouro-claro"],
            ["accent-1", "#ecd48a", "derivado"],
            ["accent-2", "#daa520", "--ouro"],
            ["accent-3", "#b8860b", "--ouro-escuro"],
            ["accent-4", "#8a6511", "--ouro-texto"],
            ["neutral-6", "#55607a", "--apagado"],
            ["neutral-7", "#14223a", "--tinta"],
            ["focus-ring", "#daa520", "o outline do site"],
          ],
        },
        {
          tipo: "codigo",
          arquivo: "src/themes/custom-theme.scss (trecho)",
          linguagem: "scss",
          codigo: `.theme {
  // Identidade da Sancticom: azul-marinho (main) e dourado (accent).
  --fs-color-main-2: #0d2c54;
  --fs-color-main-3: #081f3d;
  --fs-color-main-4: #04152b;

  --fs-color-accent-2: #daa520;
  --fs-color-accent-4: #8a6511;

  --fs-color-neutral-7: #14223a;
  --fs-color-focus-ring: #daa520;

  --fs-text-face-body: "Inter", -apple-system, system-ui, sans-serif;
  --fs-text-face-title: "Montserrat", var(--fs-text-face-body);
}`,
        },
        {
          tipo: "p",
          texto:
            "O contraste foi calculado, e não medido com uma ferramenta de auditoria: texto principal sobre branco 15,9:1, texto leve 6,3:1, botão primário (branco sobre marinho) 14,0:1, hover 16,5:1 e ação em dourado escuro (branco sobre #8a6511) 5,3:1. Todos passam de 4,5:1, o mínimo do WCAG AA para texto normal.",
        },
        {
          tipo: "nota",
          origem: "nao-verificado",
          texto:
            "Não conferi o visual em todos os estados (hover, foco, desabilitado, erro) nem em 360px de largura. O cálculo cobre pares de cor, e não a tela inteira.",
        },
        {
          tipo: "nota",
          origem: "codigo",
          texto:
            'O arquivo do starter usa a classe .theme e, no topo, um @use de utilitários do @faststore/ui, com o mixin u.media(">=notebook") para pontos de quebra. A documentação cita .theme dentro de @layer theme nos temas de exemplo; no trecho que li, o custom-theme.scss do starter usa só .theme.',
        },
      ],
    },
    {
      titulo: "Fontes",
      blocos: [
        {
          tipo: "p",
          texto:
            "Trocar a fonte tem dois passos. Primeiro, o arquivo src/fonts/WebFonts.tsx inclui um link para a fonte (aqui, o Google Fonts). Depois, o token --fs-text-face-body recebe o nome da família. O token do título herda o do texto por padrão, então a Montserrat entra com um token próprio.",
        },
        {
          tipo: "codigo",
          arquivo: "src/fonts/WebFonts.tsx",
          linguagem: "tsx",
          codigo: `function WebFonts() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=Montserrat:wght@500;600;700&display=swap"
      />
    </>
  )
}

export default WebFonts`,
        },
      ],
    },
    {
      titulo: "Overrides: três jeitos de customizar",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Override de props: passa props extras a um componente dentro de uma seção. É o mais barato e o que melhor sobrevive a atualizações.",
            "Override de seção: cria uma seção nova baseada na nativa, para mudar a estrutura.",
            "Override de estilos da seção: muda a aparência sem mexer na funcionalidade.",
          ],
        },
        {
          tipo: "p",
          texto:
            "Toda customização de componente acontece dentro de uma seção. As seções nativas são Alert, BannerText, Breadcrumb, CrossSellingShelf, EmptyState, Hero, Navbar, Newsletter, ProductDetails, ProductGallery, ProductShelf e RegionBar. Componentes com prefixo __experimental podem ser sobrescritos, mas as props deles não ficam acessíveis, e a documentação não recomenda mexer sem necessidade.",
        },
        {
          tipo: "nota",
          origem: "documentacao",
          texto:
            "A página de overrides diz que o guia vale para lojas com o Headless CMS legado. O starter usa contentSource CP. O guia que li para o CP usa o mesmo getOverriddenSection e o mesmo registro, mas ele é do repositório vtex/skills, e não da documentação publicada.",
        },
      ],
    },
    {
      titulo: "O override que foi feito",
      blocos: [
        {
          tipo: "p",
          texto:
            "A seção nativa ProductDetails ganhou um ajuste de props: o ícone do botão de compra passa para a direita do texto. A busca de dados e o comportamento da seção continuam os do framework.",
        },
        {
          tipo: "codigo",
          arquivo: "src/components/sections/ProductDetailsSancticom.tsx",
          linguagem: "tsx",
          codigo: `import { ProductDetailsSection, getOverriddenSection } from '@faststore/core'

// Sobrescreve só as props de componentes dentro da seção nativa: a busca de
// dados e o comportamento da ProductDetails continuam os do framework.
const ProductDetailsSancticom = getOverriddenSection({
  Section: ProductDetailsSection,
  components: {
    BuyButton: { props: { iconPosition: 'right' } },
  },
})

export default ProductDetailsSancticom`,
        },
        {
          tipo: "codigo",
          arquivo: "src/components/index.tsx",
          linguagem: "tsx",
          codigo: `import ProductDetailsSancticom from './sections/ProductDetailsSancticom'

// A chave precisa ser a da seção nativa que está sendo sobrescrita.
const sections = {
  ProductDetails: ProductDetailsSancticom,
}

export default sections`,
        },
        {
          tipo: "lista",
          itens: [
            "getOverriddenSection recebe a seção nativa (Section) e um objeto components com as props de cada componente que se quer mudar.",
            "O registro em src/components/index.tsx é por export default, e a chave (ProductDetails) tem de coincidir com a da seção nativa.",
            "Rodar yarn dev sincroniza o componente com a prévia da loja; reiniciei o servidor para o registro valer.",
            "BuyButton é um dos componentes sobrescrevíveis da ProductDetails, junto com ProductTitle, DiscountBadge, QuantitySelector, SkuSelector, ShippingSimulation e ImageGallery.",
          ],
        },
        {
          tipo: "nota",
          origem: "nao-verificado",
          texto:
            "O servidor subiu sem erro de compilação e o TypeScript não acusou erro nos arquivos de src. Eu não consegui ver o botão na tela nem localizá-lo no HTML que o curl recebe, então a confirmação visual de que o ícone está à direita é manual.",
        },
      ],
    },
    {
      titulo: "O que ficou de fora, e por quê",
      blocos: [
        {
          tipo: "lista",
          itens: [
            "Logo: não é um componente à parte. É prop do NavbarRow, preenchida pelo CMS. A documentação manda sobrescrever o NavbarRow, mas não mostra o formato das props, e eu não verifiquei.",
            "Vitrine da home: uma seção nova só aparece se o CMS a referenciar, o que exige faststore cms-sync com o VTEX CLI logado numa conta.",
            "Card de produto: __experimentalProductCard pode afetar o rastreamento de cliques, e a documentação avisa para usar o hook useProductLink_unstable.",
            "A documentação também diz que o que se configura no Headless CMS tem prioridade sobre os overrides feitos no código.",
          ],
        },
      ],
    },
  ],
  perguntas: [
    {
      pergunta:
        "Por que você sobrescreveu só as props do BuyButton, e não a seção inteira?",
      resposta:
        "É a customização mais barata e a que melhor sobrevive a atualizações: o framework continua dono da estrutura e dos dados, e eu só ajusto o que precisava. Sobrescrever a seção inteira faria sentido se a estrutura da página mudasse, e custaria manutenção.",
    },
    {
      pergunta:
        "Como a identidade visual da loja inteira mudou mexendo em poucas linhas?",
      resposta:
        "Os tokens semânticos apontam para as escalas da paleta. Troquei as escalas main e accent por tokens da marca, e botão, link e foco acompanharam. A mudança está num arquivo, o custom-theme.scss.",
    },
    {
      pergunta: "Você disse que o contraste passa. Como sabe, e o que falta?",
      resposta:
        "Calculei a razão de contraste dos pares principais, todos acima de 4,5:1. Falta auditar a tela com uma ferramenta e olhar estados como hover, foco e desabilitado, além da largura de 360px.",
    },
  ],
  referencias: [
    {
      titulo: "Theming",
      url: "https://developers.vtex.com/docs/guides/faststore/using-themes-overview",
    },
    {
      titulo: "Tokens globais: cores",
      url: "https://developers.vtex.com/docs/guides/faststore/global-tokens-colors",
    },
    {
      titulo: "Tokens globais: tipografia",
      url: "https://developers.vtex.com/docs/guides/faststore/global-tokens-typography",
    },
    {
      titulo: "Section override",
      url: "https://developers.vtex.com/docs/guides/faststore/overrides-overview",
    },
    {
      titulo: "Sobrescrevendo props de componentes nativos",
      url: "https://developers.vtex.com/docs/guides/faststore/overrides-component-props",
    },
    {
      titulo: "Lista de seções nativas e componentes sobrescrevíveis",
      url: "https://developers.vtex.com/docs/guides/faststore/developing-and-customizing-components-list-of-native-sections",
    },
  ],
};

export default temaScssEOverrides;
