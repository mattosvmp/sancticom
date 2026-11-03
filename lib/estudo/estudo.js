import topicos from "content/estudo";

export const ORIGENS = {
  documentacao: "Documentação",
  codigo: "Visto no código",
  inferencia: "Inferência minha",
  "nao-verificado": "Não verificado",
};

export const TIPOS_DE_BLOCO = ["p", "lista", "codigo", "nota", "tabela"];

export function listarTopicos(lista = topicos) {
  return lista;
}

export function buscarTopico(slug, lista = topicos) {
  return lista.find((topico) => topico.slug === slug) || null;
}

export function vizinhos(slug, lista = topicos) {
  const indice = lista.findIndex((topico) => topico.slug === slug);
  if (indice === -1) return { anterior: null, seguinte: null };

  return {
    anterior: lista[indice - 1] || null,
    seguinte: lista[indice + 1] || null,
  };
}

export function idDaSecao(titulo) {
  return titulo
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Devolve a lista de problemas do conteúdo; vazia quer dizer que está válido.
export function validarTopico(topico) {
  const problemas = [];
  const campos = ["slug", "titulo", "resumo"];

  for (const campo of campos) {
    if (!topico[campo]) problemas.push(`falta "${campo}"`);
  }

  if (!topico.secoes?.length) problemas.push("não tem seções");
  if (!topico.perguntas?.length) problemas.push("não tem perguntas");

  for (const secao of topico.secoes || []) {
    for (const bloco of secao.blocos || []) {
      if (!TIPOS_DE_BLOCO.includes(bloco.tipo)) {
        problemas.push(
          `bloco desconhecido "${bloco.tipo}" em "${secao.titulo}"`,
        );
      }
      if (bloco.tipo === "nota" && !ORIGENS[bloco.origem]) {
        problemas.push(`nota com origem inválida em "${secao.titulo}"`);
      }
    }
  }

  for (const referencia of topico.referencias || []) {
    if (!referencia.url.startsWith("https://")) {
      problemas.push(`referência sem https: ${referencia.url}`);
    }
  }

  return problemas;
}
