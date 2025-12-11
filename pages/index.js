import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagem de Capa com Efeito Zoom */}
      <div className="card-image-container">
        <div className={`card-overlay ${isHovered ? "active" : ""}`}>
          <span className="view-text">Visitar Site</span>
        </div>
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={340}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      </div>

      {/* Conteúdo do Card */}
      <div className="card-content">
        <div className="card-header">
          <h3>{project.title}</h3>
          <span
            className={`status-badge ${project.status === "Live" ? "live" : ""}`}
          >
            {project.status === "Live" ? "● Online" : "○ Em Breve"}
          </span>
        </div>

        <p className="card-description">{project.description}</p>

        <div className="tech-stack">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-visit"
        >
          Ver Projeto →
        </a>
      </div>
    </div>
  );
};

export default function Home() {
  const projects = [
    {
      title: "DronyImagem",
      description:
        "Plataforma institucional multilíngue para serviços de drones. Focada em performance e conversão, com sistema próprio de internacionalização (i18n) e galerias interativas.",
      link: "https://dronyimagem.com.br/",
      image: "/project-drony.png",
      status: "Live",
      technologies: [
        "HTML5 Semântico",
        "CSS3 Variables",
        "Vanilla JS (ES6+)",
        "i18n (JSON System)",
        "Google Analytics 4",
      ],
    },
    {
      title: "L2 Facilitis",
      description:
        "Site corporativo de alto padrão para empresa de terceirização. Apresenta design premium 'Gold & Black', animações 3D CSS (Coverflow) e integração direta com WhatsApp API.",
      link: "https://l2facilitis.com.br/",
      image: "/project-l2.jpg",
      status: "Live",
      technologies: [
        "CSS3 3D Transforms",
        "Vertical Slider Logic",
        "Responsive Design",
        "Glassmorphism",
        "WhatsApp API Integration",
      ],
    },
  ];

  return (
    <div className="page-wrapper">
      <Head>
        <title>Sancticom - Soluções Web com Propósito</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="main-container">
        {/* ================= HEADER ================= */}
        <section className="hero-intro">
          <div className="logo-area">
            {/* Se não tiver o logo, usa texto como fallback */}
            <Image
              src="/logo-sancticom.svg"
              alt="Sancticom"
              width={200}
              height={50}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <h1>
            Desenvolvimento Web <br />
            <span className="highlight">Com Propósito.</span>
          </h1>
          <p>
            Transformamos ideias em experiências digitais de alta performance.
            Abaixo, confira nossos projetos recentes.
          </p>
        </section>

        {/* ================= PORTFOLIO GRID ================= */}
        <section className="portfolio-section">
          <h2 className="section-title">Portfólio Selecionado</h2>

          <div className="projects-grid">
            {projects.map((proj, index) => (
              <ProjectCard key={index} project={proj} />
            ))}
          </div>
        </section>
      </main>

      {/* ================= CSS STYLES (Styled JSX) ================= */}
      <style jsx global>{`
        /* Reset & Base */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background-color: #050505;
          color: #ffffff;
          font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          line-height: 1.6;
        }

        .page-wrapper {
          min-height: 100vh;
          background: radial-gradient(
            circle at 50% 0%,
            #1a1a1a 0%,
            #050505 100%
          );
        }

        .main-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px 80px;
        }

        /* Hero Section */
        .hero-intro {
          text-align: center;
          margin-bottom: 80px;
          padding-top: 40px;
        }

        .logo-area {
          margin-bottom: 30px;
          display: flex;
          justify-content: center;
        }

        .hero-intro h1 {
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 15px;
          line-height: 1.1;
        }

        .highlight {
          background: linear-gradient(90deg, #ff8a00, #e52e71);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-intro p {
          color: #888;
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Portfolio Section */
        .section-title {
          font-size: 1.5rem;
          color: #fff;
          margin-bottom: 40px;
          border-left: 4px solid #ff8a00;
          padding-left: 15px;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
        }

        /* CARD DESIGN */
        .project-card {
          background: #111;
          border: 1px solid #222;
          border-radius: 16px;
          overflow: hidden;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          border-color: #333;
        }

        .card-image-container {
          width: 100%;
          height: 220px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid #222;
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 2;
        }

        .card-overlay.active {
          opacity: 1;
        }

        .view-text {
          border: 1px solid #fff;
          padding: 8px 20px;
          border-radius: 30px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-size: 0.8rem;
        }

        .card-content {
          padding: 25px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .card-header h3 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #fff;
        }

        .status-badge {
          font-size: 0.75rem;
          padding: 4px 10px;
          border-radius: 12px;
          background: #222;
          color: #666;
          font-weight: 600;
        }

        .status-badge.live {
          background: rgba(80, 250, 123, 0.1);
          color: #50fa7b;
        }

        .card-description {
          color: #aaa;
          font-size: 0.95rem;
          margin-bottom: 20px;
          line-height: 1.5;
          flex-grow: 1;
        }

        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 25px;
        }

        .tech-tag {
          font-size: 0.75rem;
          color: #ccc;
          background: #1a1a1a;
          padding: 4px 12px;
          border-radius: 6px;
          border: 1px solid #333;
        }

        .btn-visit {
          display: block;
          text-align: center;
          background: #fff;
          color: #000;
          font-weight: 700;
          padding: 12px;
          border-radius: 8px;
          transition: background 0.3s ease;
        }

        .btn-visit:hover {
          background: #ff8a00;
          color: #fff;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .hero-intro h1 {
            font-size: 2.2rem;
          }
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
