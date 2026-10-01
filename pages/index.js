import Image from "next/image";
import Link from "next/link";
import FormularioContato from "components/FormularioContato";
import Seo from "components/Seo";
import site from "lib/site";
import {
  IconeCheck,
  IconeAlvo,
  IconeBusca,
  IconeConversa,
  IconeEditar,
  IconeIdiomas,
  IconeSeta,
  IconeSite,
} from "components/Icones";

const servicos = [
  {
    Icone: IconeSite,
    titulo: "Sites institucionais",
    texto:
      "Uma presença profissional que apresenta a sua empresa, os seus serviços e o caminho até você.",
  },
  {
    Icone: IconeAlvo,
    titulo: "Landing pages",
    texto:
      "Páginas focadas em uma oferta ou campanha, pensadas para transformar visita em contato.",
  },
  {
    Icone: IconeIdiomas,
    titulo: "Sites em vários idiomas",
    texto:
      "Conteúdo em português, inglês e espanhol para atender também quem vem de fora.",
  },
  {
    Icone: IconeBusca,
    titulo: "Pronto para o Google",
    texto:
      "Títulos, descrições e estrutura pensados para buscadores, com carregamento rápido.",
  },
  {
    Icone: IconeEditar,
    titulo: "Conteúdo que você edita",
    texto:
      "Um painel simples para atualizar fotos, galerias e textos sem depender de ninguém.",
  },
  {
    Icone: IconeConversa,
    titulo: "Direto para o WhatsApp",
    texto:
      "Botões que levam o visitante para a conversa com você, no aparelho que ele já usa.",
  },
];

const projetos = [
  {
    nome: "Drony Imagem",
    segmento: "Filmagem com drones e shows de luzes",
    descricao:
      "Site institucional multilíngue, com sistema próprio de tradução em português, inglês e espanhol, galerias interativas e foco em conversão.",
    tecnologias: [
      "HTML5 semântico",
      "CSS3",
      "JavaScript",
      "i18n",
      "Google Analytics 4",
    ],
    url: "https://dronyimagem.com.br/",
    imagem: "/projetos/drony.jpg",
  },
  {
    nome: "L2 Terceirização",
    segmento: "Limpeza, portaria e jardinagem em Cuiabá",
    descricao:
      "Site corporativo com visual em preto e dourado, animações 3D feitas em CSS e contato direto pelo WhatsApp.",
    tecnologias: ["CSS 3D", "Design responsivo", "SEO", "WhatsApp"],
    url: "https://l2facilitis.com.br/",
    imagem: "/projetos/l2.jpg",
  },
];

const etapas = [
  {
    titulo: "Conversa",
    texto: "Entendemos o seu negócio e o que o site precisa resolver.",
  },
  {
    titulo: "Planejamento",
    texto: "Definimos juntos as páginas, o conteúdo e o visual.",
  },
  {
    titulo: "Desenvolvimento",
    texto: "Construímos o site com você acompanhando cada etapa.",
  },
  {
    titulo: "No ar",
    texto: "Publicamos o site, pronto para ser encontrado e lembrado.",
  },
];

const valores = ["Integridade", "Confiança", "Verdade"];

function Navegador({ src, alt, className, prioridade = false, sizes }) {
  return (
    <figure className={`navegador ${className || ""}`}>
      <div className="navegador-barra" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Image
        src={src}
        alt={alt}
        width={1440}
        height={900}
        sizes={sizes}
        priority={prioridade}
      />
    </figure>
  );
}

function Rotulo({ children, claro = false }) {
  return <p className={`rotulo ${claro ? "rotulo-claro" : ""}`}>{children}</p>;
}

export default function Home() {
  const dadosEstruturados = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.nome,
    slogan: site.slogan,
    description: site.descricao,
    url: site.url,
    logo: `${site.url}/icon-512.png`,
    image: `${site.url}/og-image.png`,
    areaServed: "BR",
  };

  return (
    <>
      <Seo caminho="/">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(dadosEstruturados),
          }}
        />
      </Seo>

      <section className="hero">
        <div className="container hero-grade">
          <div className="hero-texto">
            <Rotulo>Sites para pequenas empresas e empreendedores</Rotulo>
            <h1>
              Desenvolvimento web com{" "}
              <span className="destaque">propósito</span>.
            </h1>
            <p className="hero-lead">
              Transformamos ideias em sites rápidos, bonitos e fáceis de
              encontrar, para que a sua empresa marque o seu lugar na web.
            </p>
            <div className="hero-acoes">
              <Link className="botao botao-primario" href="/#contato">
                <IconeConversa className="botao-icone" />
                Fale conosco
              </Link>
              <Link className="botao botao-secundario" href="/#portfolio">
                Ver portfólio
              </Link>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <Navegador
              src="/projetos/l2.jpg"
              alt=""
              className="navegador-tras"
              sizes="(max-width: 900px) 70vw, 420px"
            />
            <Navegador
              src="/projetos/drony.jpg"
              alt=""
              className="navegador-frente"
              prioridade
              sizes="(max-width: 900px) 80vw, 480px"
            />
          </div>
        </div>
      </section>

      <section
        id="servicos"
        className="secao"
        aria-labelledby="servicos-titulo"
      >
        <div className="container">
          <div className="secao-cabecalho">
            <Rotulo>O que fazemos</Rotulo>
            <h2 id="servicos-titulo">Sites que trabalham pela sua empresa</h2>
            <p>
              Do primeiro site ao que já existe e precisa de cuidado: soluções
              web eficientes, acessíveis e verdadeiras.
            </p>
          </div>

          <ul className="servicos">
            {servicos.map(({ Icone, titulo, texto }) => (
              <li key={titulo} className="servico">
                <span className="servico-icone">
                  <Icone />
                </span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="portfolio"
        className="secao secao-creme"
        aria-labelledby="portfolio-titulo"
      >
        <div className="container">
          <div className="secao-cabecalho">
            <Rotulo>Portfólio</Rotulo>
            <h2 id="portfolio-titulo">Projetos no ar</h2>
            <p>
              Sites que entregamos e que hoje representam os nossos clientes na
              web.
            </p>
          </div>

          <div className="projetos">
            {projetos.map((projeto) => (
              <article key={projeto.nome} className="projeto">
                <Navegador
                  src={projeto.imagem}
                  alt={`Página inicial do site da ${projeto.nome}`}
                  sizes="(max-width: 900px) 100vw, 560px"
                />
                <div className="projeto-conteudo">
                  <div className="projeto-topo">
                    <h3>{projeto.nome}</h3>
                    <span className="selo">No ar</span>
                  </div>
                  <p className="projeto-segmento">{projeto.segmento}</p>
                  <p>{projeto.descricao}</p>
                  <ul className="tags" aria-label="Tecnologias">
                    {projeto.tecnologias.map((tecnologia) => (
                      <li key={tecnologia}>{tecnologia}</li>
                    ))}
                  </ul>
                  <a
                    className="link-seta"
                    href={projeto.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visitar o site
                    <IconeSeta />
                    <span className="sr-only">
                      {" "}
                      da {projeto.nome} (abre em nova aba)
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="como-trabalhamos"
        className="secao"
        aria-labelledby="etapas-titulo"
      >
        <div className="container">
          <div className="secao-cabecalho">
            <Rotulo>Como trabalhamos</Rotulo>
            <h2 id="etapas-titulo">Do primeiro contato ao site no ar</h2>
          </div>

          <ol className="etapas">
            {etapas.map((etapa, indice) => (
              <li key={etapa.titulo} className="etapa">
                <span className="etapa-numero" aria-hidden="true">
                  {indice + 1}
                </span>
                <h3>{etapa.titulo}</h3>
                <p>{etapa.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="secao secao-marinho" aria-labelledby="missao-titulo">
        <div className="container missao">
          <div>
            <Rotulo claro>Nossa missão</Rotulo>
            <h2 id="missao-titulo">Fé e tecnologia podem caminhar juntas.</h2>
          </div>
          <div className="missao-texto">
            <p>
              A Sancticom nasceu dessa convicção. O nosso trabalho é ajudar
              pequenas empresas e empreendedores a marcarem o seu lugar na web,
              com a integridade e a confiança que vêm dos nossos valores.
            </p>
            <ul className="valores">
              {valores.map((valor) => (
                <li key={valor}>{valor}</li>
              ))}
            </ul>
            <Link className="link-seta link-seta-claro" href="/about">
              Conheça a Sancticom
              <IconeSeta />
            </Link>
          </div>
        </div>
      </section>

      <section id="contato" className="secao" aria-labelledby="contato-titulo">
        <div className="container">
          <div className="contato">
            <div className="contato-texto">
              <Rotulo>Contato</Rotulo>
              <h2 id="contato-titulo">Vamos colocar a sua empresa na web?</h2>
              <p>
                Conte a sua ideia e respondemos no e-mail que você informar. A
                conversa é sem compromisso.
              </p>
              <ul className="contato-lista">
                <li>
                  <IconeCheck className="contato-check" />
                  Resposta pelo seu e-mail
                </li>
                <li>
                  <IconeCheck className="contato-check" />
                  Orçamento sem compromisso
                </li>
                <li>
                  <IconeCheck className="contato-check" />
                  Seus dados ficam só com a gente
                </li>
              </ul>
            </div>
            <FormularioContato />
          </div>
        </div>
      </section>
    </>
  );
}
