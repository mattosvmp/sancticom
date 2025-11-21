import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

function Home() {
  const projectDronyImagem = {
    title: "DronyImagem - Website Completo",
    description:
      "Criação e desenvolvimento de um website institucional completo para a empresa DronyImagem, focada em soluções aéreas, shows de drones e vídeos cinematográficos.",
    link: "https://dronyimagem.com.br/",
    technologies: [
      "HTML5 / CSS3 / JavaScript (Vanilla JS)",
      "Design Responsivo (Mobile-First)",
      "Suporte Multi-idioma (JSON Localization)",
      "Google Tag Manager / Analytics",
      "Otimização de Performance e SEO",
    ],
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <Head>
        <title>Sancticom - Soluções Web com Propósito</title>
      </Head>

      {/* ========================================================== */}
      {/* 1. SEÇÃO "EM BREVE" (Existing Content)                     */}
      {/* ========================================================== */}
      <div style={{ margin: "30px 0", width: "100%", height: "auto" }}>
        {/* Ajustado: Garante que o container de imagem se ajuste */}
        <Image
          src="/logo-sancticom.svg"
          alt="Logo Sancticom"
          width={700}
          height={100}
          style={{ width: "100%", height: "auto", maxWidth: "700px" }} // Adicionado estilo de ajuste de largura
          priority
        />
      </div>

      <h2 style={{ fontSize: "2em", margin: "10px 0" }}>
        Nosso novo site está em construção!
      </h2>

      <p style={{ fontSize: "1.1em", color: "#ccc", lineHeight: "1.6" }}>
        Estamos trabalhando para lançar a plataforma ideal para ajudar pequenas
        empresas a marcarem seu lugar na web, com propósito e integridade.
      </p>

      <hr style={{ margin: "30px 0", borderColor: "#333" }} />
      {/* ========================================================== */}
      {/* 2. NOVO PORTFÓLIO: DronyImagem Project                     */}
      {/* ========================================================== */}
      <section
        style={{ marginTop: "60px", marginBottom: "60px", textAlign: "left" }}
      >
        <h3
          style={{
            fontSize: "1.8em",
            color: "#ff8a00",
            marginBottom: "30px",
            borderBottom: "2px solid #ff8a00",
            paddingBottom: "10px",
            textAlign: "center",
          }}
        >
          Portfólio
        </h3>

        {/* Project Card */}
        <div
          style={{
            border: "1px solid #333",
            borderRadius: "10px",
            padding: "30px",
            backgroundColor: "#111",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.3s",
          }}
        >
          <h4
            style={{ fontSize: "1.5em", color: "#fff", marginBottom: "10px" }}
          >
            {projectDronyImagem.title}
          </h4>
          <p style={{ color: "#ccc", marginBottom: "15px" }}>
            {projectDronyImagem.description}
          </p>

          <p
            style={{ fontWeight: "bold", color: "#ff8a00", marginTop: "20px" }}
          >
            Tecnologias Utilizadas:
          </p>
          {/* Adicionado flex-direction column para mobile, revertendo para row em desktop */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "10px 0 20px 0",
              fontSize: "0.9em",
              color: "#aaa",
              display: "flex",
              flexDirection: "column", // Padrão para mobile
              flexWrap: "wrap",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {projectDronyImagem.technologies.map((tech, index) => (
              <li key={index} style={{ margin: "5px 10px" }}>
                <span style={{ color: "#50FA7B" }}>•</span> {tech}
              </li>
            ))}
          </ul>

          <a
            href={projectDronyImagem.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              fontSize: "1em",
              fontWeight: "bold",
              color: "#000",
              backgroundColor: "#ff8a00",
              borderRadius: "5px",
              textDecoration: "none",
              marginTop: "15px",
            }}
          >
            Ver Projeto ao Vivo →
          </a>
        </div>
      </section>
      {/* ========================================================== */}
      {/* 3. SEÇÃO DE CONTATO (Existing Content)                     */}
      {/* ========================================================== */}
      <hr style={{ margin: "30px 0", borderColor: "#333" }} />

      <h3 style={{ fontSize: "1.5em" }}>Entre em Contato</h3>
      <p style={{ fontSize: "1.1em", color: "#ccc", lineHeight: "1.6" }}>
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
            marginTop: "15px",
            transition: "background-color 0.3s",
          }}
        >
          Falar pelo WhatsApp
        </a>
      </p>

      <p style={{ fontSize: "1.1em", marginTop: "15px" }}>
        Ou ligue: <strong>(65) 99242-3538</strong>
      </p>

      <p style={{ marginTop: "30px", marginBottom: "40px" }}>
        <Link
          href="/about"
          style={{ color: "#ff8a00", textDecoration: "underline" }}
        >
          Conheça nossa missão
        </Link>
      </p>
    </div>
  );
}

export default Home;
