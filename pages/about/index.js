import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

function About() {
  return (
    <div
      style={{
        padding: "40px 20px",
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "center",
        color: "#fff", // Adicionado cor de texto padrão
        backgroundColor: "#000", // Adicionado fundo escuro
        minHeight: "100vh", // Garante o preenchimento da tela
      }}
    >
      <Head>
        <title>Nossa Missão | Sancticom</title>
      </Head>

      <div style={{ margin: "30px 0", width: "100%", height: "auto" }}>
        {/* Ajustado: Garante que o container de imagem se ajuste */}
        <Image
          src="/logo-sancticom.svg"
          alt="Logo Sancticom"
          width={700}
          height={100}
          style={{ width: "100%", height: "auto", maxWidth: "700px" }} // Adicionado estilo de ajuste de largura
        />
      </div>

      <h1 style={{ fontSize: "2.5em", marginBottom: "20px", color: "#ff8a00" }}>
        Nossa Missão
      </h1>

      <p
        style={{
          fontSize: "1.1em",
          lineHeight: "1.6",
          color: "#ccc",
          marginBottom: "30px",
        }}
      >
        A Sancticom nasceu de um propósito maior: a convicção de que a fé e a
        tecnologia podem andar juntas para construir um ambiente de
        desenvolvimento mútuo.
      </p>

      <h2
        style={{
          fontSize: "1.8em",
          marginTop: "40px",
          marginBottom: "15px",
          color: "#fff",
          borderBottom: "1px solid #ff8a00",
          paddingBottom: "5px",
        }}
      >
        O Negócio: Tecnologia com Propósito
      </h2>
      <p
        style={{
          fontSize: "1.1em",
          lineHeight: "1.6",
          color: "#ccc",
          textAlign: "left",
        }}
      >
        Nossa missão profissional é clara:{" "}
        <strong style={{ color: "#ff8a00" }}>
          ajudar pequenas empresas e empreendedores a marcarem seu lugar na web
        </strong>
        .
        <br />
        Fazemos isso com a integridade e a confiança que vêm de nossos valores,
        oferecendo soluções web (criação de sites) que sejam eficientes,
        acessíveis e verdadeiras.
      </p>

      <h2
        style={{
          fontSize: "1.8em",
          marginTop: "40px",
          marginBottom: "15px",
          color: "#fff",
          borderBottom: "1px solid #ff8a00",
          paddingBottom: "5px",
        }}
      >
        A Comunidade: O Coração Espiritual
      </h2>
      <p
        style={{
          fontSize: "1.1em",
          lineHeight: "1.6",
          color: "#ccc",
          textAlign: "left",
        }}
      >
        Além do nosso trabalho profissional, temos a missão de fomentar uma
        comunidade focada no desenvolvimento espiritual, especialmente através
        da devoção ao Santo Rosário.
      </p>
      <p
        style={{
          fontSize: "1.1em",
          lineHeight: "1.6",
          color: "#ccc",
          textAlign: "left",
        }}
      >
        Acreditamos que, ao fortalecer a vida espiritual, podemos inspirar
        pessoas a revelar seus testemunhos e sabedoria, criando um impacto
        positivo em todas as áreas da vida.
      </p>

      <hr style={{ margin: "30px 0", borderColor: "#333" }} />

      <p style={{ marginTop: "30px" }}>
        <Link
          href="/"
          style={{ color: "#ff8a00", textDecoration: "underline" }}
        >
          Voltar para o Início
        </Link>
      </p>
    </div>
  );
}

export default About;
