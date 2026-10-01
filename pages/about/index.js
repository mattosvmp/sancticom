import Link from "next/link";
import Seo from "components/Seo";
import { IconeConversa } from "components/Icones";

const blocos = [
  {
    titulo: "Nossa missão",
    paragrafos: [
      "A Sancticom nasceu de um propósito maior: a convicção de que a fé e a tecnologia podem andar juntas para construir um ambiente de desenvolvimento mútuo.",
    ],
  },
  {
    titulo: "O negócio: tecnologia com propósito",
    paragrafos: [
      "Nossa missão profissional é clara: ajudar pequenas empresas e empreendedores a marcarem o seu lugar na web.",
      "Fazemos isso com a integridade e a confiança que vêm dos nossos valores, oferecendo soluções web que sejam eficientes, acessíveis e verdadeiras.",
    ],
  },
  {
    titulo: "A comunidade: o coração espiritual",
    paragrafos: [
      "Além do trabalho profissional, temos a missão de fomentar uma comunidade focada no desenvolvimento espiritual, especialmente pela devoção ao Santo Rosário.",
      "Acreditamos que, ao fortalecer a vida espiritual, podemos inspirar pessoas a revelar os seus testemunhos e a sua sabedoria, criando um impacto positivo em todas as áreas da vida.",
    ],
  },
];

export default function Sobre() {
  return (
    <>
      <Seo
        titulo="Sobre"
        caminho="/about"
        descricao="A Sancticom nasceu da convicção de que fé e tecnologia podem andar juntas. Conheça a nossa missão e os nossos valores."
      />

      <section className="pagina-topo">
        <div className="container estreito">
          <p className="rotulo">Sobre a Sancticom</p>
          <h1>Tecnologia com propósito.</h1>
          <p className="hero-lead">
            Sites para pequenas empresas e empreendedores, feitos com
            integridade, confiança e verdade.
          </p>
        </div>
      </section>

      <section className="secao">
        <div className="container estreito sobre">
          {blocos.map((bloco) => (
            <article key={bloco.titulo} className="sobre-bloco">
              <h2>{bloco.titulo}</h2>
              {bloco.paragrafos.map((paragrafo) => (
                <p key={paragrafo}>{paragrafo}</p>
              ))}
            </article>
          ))}

          <div className="chamada chamada-compacta">
            <h2>Vamos conversar sobre o seu site?</h2>
            <Link className="botao botao-dourado" href="/#contato">
              <IconeConversa className="botao-icone" />
              Enviar uma mensagem
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
