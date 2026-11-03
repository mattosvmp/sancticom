import Link from "next/link";
import Blocos from "components/estudo/Blocos";
import Seo from "components/Seo";
import { IconeSeta } from "components/Icones";
import {
  buscarTopico,
  idDaSecao,
  listarTopicos,
  vizinhos,
} from "lib/estudo/estudo";

export function getStaticPaths() {
  return {
    paths: listarTopicos().map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const topico = buscarTopico(params.slug);
  const { anterior, seguinte } = vizinhos(params.slug);

  return {
    props: {
      topico,
      anterior: anterior && { slug: anterior.slug, titulo: anterior.titulo },
      seguinte: seguinte && { slug: seguinte.slug, titulo: seguinte.titulo },
    },
  };
}

export default function Topico({ topico, anterior, seguinte }) {
  return (
    <>
      <Seo
        titulo={topico.titulo}
        caminho={`/estudo/${topico.slug}`}
        descricao={topico.resumo}
        semIndice
      />

      <article>
        <header className="pagina-topo">
          <div className="container estreito">
            <p className="rotulo">Estudo</p>
            <h1>{topico.titulo}</h1>
            <p className="hero-lead">{topico.resumo}</p>
          </div>
        </header>

        <div className="secao">
          <div className="container estreito estudo">
            <nav className="estudo-indice" aria-label="Nesta página">
              <h2 className="estudo-indice-titulo">Nesta página</h2>
              <ol>
                {topico.secoes.map((secao) => (
                  <li key={secao.titulo}>
                    <a href={`#${idDaSecao(secao.titulo)}`}>{secao.titulo}</a>
                  </li>
                ))}
                <li>
                  <a href="#perguntas">Perguntas para treinar</a>
                </li>
                <li>
                  <a href="#referencias">Referências</a>
                </li>
              </ol>
            </nav>

            {topico.secoes.map((secao) => (
              <section
                key={secao.titulo}
                id={idDaSecao(secao.titulo)}
                className="estudo-secao"
                aria-labelledby={`${idDaSecao(secao.titulo)}-titulo`}
              >
                <h2 id={`${idDaSecao(secao.titulo)}-titulo`}>{secao.titulo}</h2>
                <Blocos blocos={secao.blocos} />
              </section>
            ))}

            <section
              id="perguntas"
              className="estudo-secao"
              aria-labelledby="perguntas-titulo"
            >
              <h2 id="perguntas-titulo">Perguntas para treinar</h2>
              <p>
                Tente responder em voz alta antes de abrir a resposta sugerida.
              </p>
              {topico.perguntas.map((item) => (
                <details key={item.pergunta} className="estudo-pergunta">
                  <summary>{item.pergunta}</summary>
                  <p>{item.resposta}</p>
                </details>
              ))}
            </section>

            <section
              id="referencias"
              className="estudo-secao"
              aria-labelledby="referencias-titulo"
            >
              <h2 id="referencias-titulo">Referências</h2>
              <ul className="estudo-lista">
                {topico.referencias.map((referencia) => (
                  <li key={referencia.url}>
                    <a
                      className="link-seta"
                      href={referencia.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {referencia.titulo}
                      <IconeSeta />
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <nav className="estudo-navegacao" aria-label="Outros tópicos">
              {anterior ? (
                <Link href={`/estudo/${anterior.slug}`}>
                  <span>Anterior</span>
                  {anterior.titulo}
                </Link>
              ) : (
                <Link href="/estudo">
                  <span>Voltar</span>
                  Todos os tópicos
                </Link>
              )}
              {seguinte && (
                <Link href={`/estudo/${seguinte.slug}`}>
                  <span>Próximo</span>
                  {seguinte.titulo}
                </Link>
              )}
            </nav>
          </div>
        </div>
      </article>
    </>
  );
}
