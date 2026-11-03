import Link from "next/link";
import Seo from "components/Seo";
import { listarTopicos } from "lib/estudo/estudo";

export default function Estudo() {
  const topicos = listarTopicos();

  return (
    <>
      <Seo
        titulo="Estudo: FastStore e VTEX"
        caminho="/estudo"
        descricao="Material de estudo sobre FastStore, a arquitetura VTEX, GraphQL, temas e overrides."
        semIndice
      />

      <section className="pagina-topo" aria-labelledby="estudo-titulo">
        <div className="container estreito">
          <p className="rotulo">Estudo</p>
          <h1 id="estudo-titulo">FastStore e VTEX, explicado pelo código</h1>
          <p className="hero-lead">
            Notas de estudo sobre a loja construída com FastStore. Cada
            afirmação traz a origem: documentação, código lido ou inferência
            minha.
          </p>
        </div>
      </section>

      <section className="secao" aria-labelledby="topicos-titulo">
        <div className="container estreito">
          <h2 id="topicos-titulo" className="sr-only">
            Tópicos
          </h2>
          <ol className="estudo-topicos">
            {topicos.map((topico, indice) => (
              <li key={topico.slug} className="estudo-topico">
                <span className="etapa-numero" aria-hidden="true">
                  {indice + 1}
                </span>
                <div>
                  <h3>
                    <Link href={`/estudo/${topico.slug}`}>{topico.titulo}</Link>
                  </h3>
                  <p>{topico.resumo}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
