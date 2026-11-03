import { ORIGENS } from "lib/estudo/estudo";

function Tabela({ colunas, linhas }) {
  return (
    <div className="estudo-tabela">
      <table>
        <thead>
          <tr>
            {colunas.map((coluna, indice) => (
              <th key={indice} scope="col">
                {coluna}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha, indice) => (
            <tr key={indice}>
              {linha.map((celula, posicao) =>
                posicao === 0 ? (
                  <th key={posicao} scope="row">
                    {celula}
                  </th>
                ) : (
                  <td key={posicao}>{celula}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Codigo({ arquivo, codigo }) {
  return (
    <figure className="estudo-codigo">
      <figcaption>{arquivo}</figcaption>
      {/* tabIndex deixa o trecho rolável pelo teclado em telas estreitas. */}
      <pre tabIndex={0}>
        <code>{codigo}</code>
      </pre>
    </figure>
  );
}

function Nota({ origem, texto }) {
  return (
    <aside className={`estudo-nota estudo-nota-${origem}`}>
      <strong>{ORIGENS[origem]}.</strong> {texto}
    </aside>
  );
}

export default function Blocos({ blocos }) {
  return blocos.map((bloco, indice) => {
    switch (bloco.tipo) {
      case "p":
        return <p key={indice}>{bloco.texto}</p>;
      case "lista":
        return (
          <ul key={indice} className="estudo-lista">
            {bloco.itens.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        );
      case "codigo":
        return <Codigo key={indice} {...bloco} />;
      case "nota":
        return <Nota key={indice} {...bloco} />;
      case "tabela":
        return <Tabela key={indice} {...bloco} />;
      default:
        return null;
    }
  });
}
