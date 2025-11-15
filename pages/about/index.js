import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

function About() {
  return (
    <div>
      <Head>
        <title>Nossa Missão | Sancticom</title>
      </Head>

      <div style={{ margin: "30px 0" }}>
        <Image
          src="/logo-sancticom.svg"
          alt="Logo Sancticom"
          width={700}
          height={100}
        />
      </div>

      <h1>Nossa Missão</h1>

      <p>
        A Sancticom nasceu de um propósito maior: a convicção de que a fé e a
        tecnologia podem andar juntas para construir um ambiente de
        desenvolvimento mútuo.
      </p>

      <h2>O Negócio: Tecnologia com Propósito</h2>
      <p>
        Nossa missão profissional é clara:{" "}
        <strong>
          ajudar pequenas empresas e empreendedores a marcarem seu lugar na web
        </strong>
        .
        <br />
        Fazemos isso com a integridade e a confiança que vêm de nossos valores,
        oferecendo soluções web (criação de sites) que sejam eficientes,
        acessíveis e verdadeiras.
      </p>

      <h2>A Comunidade: O Coração Espiritual</h2>
      <p>
        Além do nosso trabalho profissional, temos a missão de fomentar uma
        comunidade focada no desenvolvimento espiritual, especialmente através
        da devoção ao Santo Rosário.
      </p>
      <p>
        Acreditamos que, ao fortalecer a vida espiritual, podemos inspirar
        pessoas a revelar seus testemunhos e sabedoria, criando um impacto
        positivo em todas as áreas da vida.
      </p>

      <hr style={{ margin: "30px 0" }} />

      <p>
        <Link href="/">Voltar para o Início</Link>
      </p>
    </div>
  );
}

export default About;
