import topicos from "content/estudo";
import {
  buscarTopico,
  idDaSecao,
  validarTopico,
  vizinhos,
} from "lib/estudo/estudo";

const lista = [{ slug: "a" }, { slug: "b" }, { slug: "c" }];

function semDuplicados(valores) {
  return valores.filter((valor, indice) => valores.indexOf(valor) === indice);
}

describe("buscarTopico", () => {
  test("acha o tópico pelo slug", () => {
    expect(buscarTopico("b", lista)).toEqual({ slug: "b" });
  });

  test("devolve null para slug desconhecido", () => {
    expect(buscarTopico("x", lista)).toBeNull();
  });
});

describe("vizinhos", () => {
  test("devolve o anterior e o seguinte", () => {
    expect(vizinhos("b", lista)).toEqual({
      anterior: { slug: "a" },
      seguinte: { slug: "c" },
    });
  });

  test("o primeiro não tem anterior e o último não tem seguinte", () => {
    expect(vizinhos("a", lista).anterior).toBeNull();
    expect(vizinhos("c", lista).seguinte).toBeNull();
  });

  test("slug desconhecido não tem vizinhos", () => {
    expect(vizinhos("x", lista)).toEqual({ anterior: null, seguinte: null });
  });
});

describe("idDaSecao", () => {
  test("tira acentos e vira um id de URL", () => {
    expect(idDaSecao("As pastas do projeto")).toBe("as-pastas-do-projeto");
    expect(idDaSecao("O discovery.config.js, linha a linha")).toBe(
      "o-discovery-config-js-linha-a-linha",
    );
    expect(idDaSecao("Ruídos do terminal")).toBe("ruidos-do-terminal");
  });
});

describe("conteúdo do estudo", () => {
  test("os slugs são únicos", () => {
    const slugs = topicos.map((topico) => topico.slug);
    expect(semDuplicados(slugs)).toEqual(slugs);
  });

  test.each(topicos.map((topico) => [topico.slug, topico]))(
    "o tópico %s é válido",
    (_slug, topico) => {
      expect(validarTopico(topico)).toEqual([]);
    },
  );

  test("os ids das seções são únicos dentro de cada tópico", () => {
    for (const topico of topicos) {
      const ids = topico.secoes.map((secao) => idDaSecao(secao.titulo));
      expect(semDuplicados(ids)).toEqual(ids);
    }
  });

  test("validarTopico aponta bloco, origem e link inválidos", () => {
    const problemas = validarTopico({
      slug: "x",
      titulo: "X",
      resumo: "R",
      secoes: [
        {
          titulo: "S",
          blocos: [{ tipo: "video" }, { tipo: "nota", origem: "achismo" }],
        },
      ],
      perguntas: [{ pergunta: "?", resposta: "!" }],
      referencias: [{ titulo: "t", url: "http://exemplo.com" }],
    });

    expect(problemas).toHaveLength(3);
  });
});
