import Link from "next/link";

function About() {
  return (
    <div>
      <h1>Sobre</h1>
      <p>
        <Link href="/">Início</Link>
      </p>
      <h2>Propósito:</h2>
      <p>
        Criar uma comunidade de melhoria de vida através do Santo Rosário, nisso
        envolver as pessoas em um ambiente também de direção espiritual, nisso
        ser repetido pelos comentários dos próprios usuários.
      </p>
      <h2>Perfil do usuário:</h2>
      <p>
        Alguém aberto a se desenvolver a partir do seu próprio desenvolvimento
        espiritual, e através disso revelar com sabedoria, seu testemunho.
      </p>
    </div>
  );
}

export default About;
