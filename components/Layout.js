import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import site from "lib/site";
import { IconeFechar, IconeMenu } from "components/Icones";

const links = [
  { href: "/#servicos", rotulo: "Serviços" },
  { href: "/#portfolio", rotulo: "Portfólio" },
  { href: "/#como-trabalhamos", rotulo: "Como trabalhamos" },
  { href: "/about", rotulo: "Sobre" },
];

function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fechar = () => setAberto(false);
    router.events.on("hashChangeStart", fechar);
    router.events.on("routeChangeStart", fechar);
    return () => {
      router.events.off("hashChangeStart", fechar);
      router.events.off("routeChangeStart", fechar);
    };
  }, [router.events]);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (evento) => evento.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  return (
    <header className="cabecalho">
      <div className="container cabecalho-conteudo">
        <Link
          href="/"
          className="cabecalho-logo"
          aria-label="Sancticom, página inicial"
        >
          <Image
            src="/logo-sancticom.svg"
            alt=""
            width={1110}
            height={280}
            priority
          />
        </Link>

        <button
          type="button"
          className="menu-botao"
          aria-expanded={aberto}
          aria-controls="menu-principal"
          onClick={() => setAberto((valor) => !valor)}
        >
          {aberto ? <IconeFechar /> : <IconeMenu />}
          <span className="sr-only">
            {aberto ? "Fechar menu" : "Abrir menu"}
          </span>
        </button>

        <nav
          id="menu-principal"
          className={`menu ${aberto ? "menu-aberto" : ""}`}
          aria-label="Principal"
        >
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setAberto(false)}>
                  {link.rotulo}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            className="botao botao-primario botao-pequeno"
            href="/#contato"
            onClick={() => setAberto(false)}
          >
            Fale conosco
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className="rodape">
      <div className="container rodape-grade">
        <div className="rodape-marca">
          <Image
            src="/logo-sancticom.svg"
            alt="Sancticom"
            width={1110}
            height={280}
            className="rodape-logo"
          />
          <p>{site.slogan}.</p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="rodape-titulo">Navegação</h2>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.rotulo}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="rodape-titulo">Contato</h2>
          <ul>
            <li>
              <Link href="/#contato">Formulário de contato</Link>
            </li>
            <li>
              <Link href="/privacidade">Política de privacidade</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container rodape-base">
        <p>
          © {ano} {site.nome}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default function Layout({ children }) {
  return (
    <>
      <a className="pular-conteudo" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo">{children}</main>
      <Rodape />
    </>
  );
}
