import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

function Home() {
  return (
    <div>
      <Head>
        <title>Sancticom - Em Breve</title>
      </Head>

      <div style={{ margin: "30px 0" }}>
        <Image
          src="/logo-sancticom.svg"
          alt="Logo Sancticom"
          width={700}
          height={100}
          priority
        />
      </div>

      <h2>Nosso novo site está em construção!</h2>

      <p>
        Estamos trabalhando para lançar a plataforma ideal para ajudar pequenas
        empresas a marcarem seu lugar na web, com propósito e integridade.
      </p>

      <hr style={{ margin: "30px 0" }} />

      <h3>Entre em Contato</h3>
      <p>
        Precisa de um site ou quer mais informações sobre nossos serviços?
        <br />
        Estamos prontos para conversar!
      </p>

      <p>
        <a
          href="https://api.whatsapp.com/send?phone=5565992423538&text=Ol%C3%A1!%20Visitei%20o%20site%20da%20Sancticom%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "12px 20px",
            fontSize: "1.1em",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#25D366",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Falar pelo WhatsApp
        </a>
      </p>

      <p>
        Ou ligue: <strong>(65) 99242-3538</strong>
      </p>

      <p style={{ marginTop: "30px" }}>
        <Link href="/about">Conheça nossa missão</Link>
      </p>
    </div>
  );
}

export default Home;
