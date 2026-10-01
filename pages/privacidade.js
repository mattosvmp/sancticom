import Link from "next/link";
import Seo from "components/Seo";

const blocos = [
  {
    titulo: "Quais dados coletamos",
    paragrafos: [
      "Só o que você escreve no formulário de contato: nome, e-mail, telefone (se quiser informar) e a mensagem.",
      "O site não usa cookies de rastreamento nem ferramentas de publicidade.",
    ],
  },
  {
    titulo: "Para que usamos",
    paragrafos: [
      "Para responder ao seu contato e, se você quiser, conversar sobre o seu projeto. Não vendemos nem repassamos os seus dados.",
    ],
  },
  {
    titulo: "Onde ficam",
    paragrafos: [
      "A mensagem chega à nossa caixa de e-mail por um serviço de envio de e-mails, que só faz a entrega. Os dados ficam guardados enquanto forem necessários para o atendimento.",
    ],
  },
  {
    titulo: "Os seus direitos",
    paragrafos: [
      "Pela Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode pedir a qualquer momento para ver, corrigir ou apagar os seus dados. Basta mandar o pedido pelo formulário de contato.",
    ],
  },
];

export default function Privacidade() {
  return (
    <>
      <Seo
        titulo="Política de privacidade"
        caminho="/privacidade"
        descricao="Como a Sancticom trata os dados enviados pelo formulário de contato."
      />

      <section className="pagina-topo">
        <div className="container estreito">
          <p className="rotulo">Privacidade</p>
          <h1>Política de privacidade</h1>
          <p className="hero-lead">
            O que acontece com os dados que você envia pelo site, em poucas
            linhas.
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

          <p className="privacidade-voltar">
            <Link className="link-seta" href="/#contato">
              Ir para o formulário de contato
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
