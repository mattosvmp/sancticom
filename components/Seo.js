import Head from "next/head";
import site from "lib/site";

export default function Seo({
  titulo,
  descricao = site.descricao,
  caminho = "/",
  semIndice = false,
  children,
}) {
  const tituloCompleto = titulo
    ? `${titulo} | ${site.nome}`
    : `${site.nome} | ${site.slogan}`;
  const url = `${site.url}${caminho}`;
  const imagem = `${site.url}/og-image.png`;

  return (
    <Head>
      <title>{tituloCompleto}</title>
      <meta name="description" content={descricao} />
      <link rel="canonical" href={url} />
      {semIndice && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content={site.nome} />
      <meta property="og:title" content={tituloCompleto} />
      <meta property="og:description" content={descricao} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imagem} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Logo da Sancticom" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={tituloCompleto} />
      <meta name="twitter:description" content={descricao} />
      <meta name="twitter:image" content={imagem} />
      {children}
    </Head>
  );
}
