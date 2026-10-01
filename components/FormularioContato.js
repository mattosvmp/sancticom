import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import validarContato, { limites } from "lib/validarContato";

const vazio = { nome: "", email: "", telefone: "", mensagem: "" };

function Campo({ id, rotulo, opcional, erro, children }) {
  return (
    <div className={`campo ${erro ? "campo-com-erro" : ""}`}>
      <label htmlFor={id}>
        {rotulo}
        {opcional && <span className="campo-opcional"> (opcional)</span>}
      </label>
      {children}
      {erro && (
        <p className="campo-erro" id={`${id}-erro`}>
          {erro}
        </p>
      )}
    </div>
  );
}

export default function FormularioContato() {
  const [campos, setCampos] = useState(vazio);
  const [isca, setIsca] = useState("");
  const [erros, setErros] = useState({});
  const [estado, setEstado] = useState("ocioso");
  const inicio = useRef(0);
  const formulario = useRef(null);

  useEffect(() => {
    inicio.current = Date.now();
  }, []);

  function alterar(evento) {
    const { name, value } = evento.target;
    setCampos((atuais) => ({ ...atuais, [name]: value }));
    if (erros[name]) setErros((atuais) => ({ ...atuais, [name]: undefined }));
  }

  function focarPrimeiroErro(errosEncontrados) {
    const primeiro = Object.keys(vazio).find((nome) => errosEncontrados[nome]);
    if (primeiro) formulario.current?.elements[primeiro]?.focus();
  }

  async function enviar(evento) {
    evento.preventDefault();
    const { erros: errosLocais, valido } = validarContato(campos);
    if (!valido) {
      setErros(errosLocais);
      focarPrimeiroErro(errosLocais);
      return;
    }

    setEstado("enviando");
    try {
      const resposta = await fetch("/api/v1/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...campos,
          site: isca,
          tempo: Date.now() - inicio.current,
        }),
      });

      if (resposta.status === 201) {
        setEstado("enviado");
        return;
      }
      if (resposta.status === 400) {
        const corpo = await resposta.json();
        setErros(corpo.campos || {});
        focarPrimeiroErro(corpo.campos || {});
        setEstado("ocioso");
        return;
      }
      setEstado("erro");
    } catch {
      setEstado("erro");
    }
  }

  if (estado === "enviado") {
    return (
      <div className="formulario formulario-enviado" role="status">
        <h3>Mensagem enviada!</h3>
        <p>
          Obrigado, {campos.nome.split(" ")[0]}. Vamos responder no e-mail{" "}
          <strong>{campos.email}</strong> assim que possível.
        </p>
        <button
          type="button"
          className="botao botao-secundario"
          onClick={() => {
            setCampos(vazio);
            inicio.current = Date.now();
            setEstado("ocioso");
          }}
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  const descricao = (nome) => (erros[nome] ? `${nome}-erro` : undefined);

  return (
    <form
      ref={formulario}
      className="formulario"
      onSubmit={enviar}
      noValidate
      aria-describedby="formulario-aviso"
    >
      <div className="campos-linha">
        <Campo id="nome" rotulo="Nome" erro={erros.nome}>
          <input
            id="nome"
            name="nome"
            type="text"
            autoComplete="name"
            maxLength={limites.nome.max}
            value={campos.nome}
            onChange={alterar}
            aria-invalid={Boolean(erros.nome)}
            aria-describedby={descricao("nome")}
            required
          />
        </Campo>
        <Campo id="telefone" rotulo="Telefone" opcional erro={erros.telefone}>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            autoComplete="tel"
            maxLength={limites.telefone.max}
            value={campos.telefone}
            onChange={alterar}
            aria-invalid={Boolean(erros.telefone)}
            aria-describedby={descricao("telefone")}
          />
        </Campo>
      </div>

      <Campo id="email" rotulo="E-mail" erro={erros.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={limites.email.max}
          value={campos.email}
          onChange={alterar}
          aria-invalid={Boolean(erros.email)}
          aria-describedby={descricao("email")}
          required
        />
      </Campo>

      <Campo id="mensagem" rotulo="Como podemos ajudar?" erro={erros.mensagem}>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={5}
          maxLength={limites.mensagem.max}
          value={campos.mensagem}
          onChange={alterar}
          aria-invalid={Boolean(erros.mensagem)}
          aria-describedby={descricao("mensagem")}
          required
        />
      </Campo>

      {/* Campo-isca: invisível para pessoas, irresistível para robôs. */}
      <div className="campo-isca" aria-hidden="true">
        <label htmlFor="site">Não preencha este campo</label>
        <input
          id="site"
          name="site"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={isca}
          onChange={(evento) => setIsca(evento.target.value)}
        />
      </div>

      <div className="formulario-rodape">
        <p id="formulario-aviso" className="formulario-aviso">
          Usamos os seus dados só para responder a este contato. Veja a nossa{" "}
          <Link href="/privacidade">política de privacidade</Link>.
        </p>
        <button
          type="submit"
          className="botao botao-dourado"
          disabled={estado === "enviando"}
        >
          {estado === "enviando" ? "Enviando..." : "Enviar mensagem"}
        </button>
      </div>

      <p className="formulario-status" role="status" aria-live="polite">
        {estado === "erro" &&
          "Não foi possível enviar agora. Tente de novo em alguns minutos."}
      </p>
    </form>
  );
}
