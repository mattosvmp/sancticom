import Link from "next/link";
import Seo from "components/Seo";

export default function NaoEncontrada() {
  return (
    <>
      <Seo titulo="Página não encontrada" caminho="/404" semIndice />
      <section className="pagina-topo pagina-404">
        <div className="container estreito">
          <p className="numero-404" aria-hidden="true">
            404
          </p>
          <h1>Página não encontrada</h1>
          <p className="hero-lead">
            O endereço pode ter mudado ou não existir mais.
          </p>
          <Link className="botao botao-primario" href="/">
            Voltar para o início
          </Link>
        </div>
      </section>
    </>
  );
}
