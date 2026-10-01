// Regras do formulário de contato, as mesmas no navegador e na API.
export const limites = {
  nome: { min: 2, max: 100 },
  email: { max: 254 },
  telefone: { max: 30 },
  mensagem: { min: 10, max: 3000 },
};

const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const padraoTelefone = /^[0-9()+\-.\s]*$/;

function texto(valor) {
  return typeof valor === "string" ? valor.trim() : "";
}

export default function validarContato(dados = {}) {
  const contato = {
    nome: texto(dados.nome),
    email: texto(dados.email),
    telefone: texto(dados.telefone),
    mensagem: texto(dados.mensagem),
  };
  const erros = {};

  if (contato.nome.length < limites.nome.min) {
    erros.nome = "Informe o seu nome.";
  } else if (contato.nome.length > limites.nome.max) {
    erros.nome = `Use até ${limites.nome.max} caracteres.`;
  }

  if (!padraoEmail.test(contato.email)) {
    erros.email = "Informe um e-mail válido, é por ele que vamos responder.";
  } else if (contato.email.length > limites.email.max) {
    erros.email = "Este e-mail é longo demais.";
  }

  if (
    contato.telefone.length > limites.telefone.max ||
    !padraoTelefone.test(contato.telefone)
  ) {
    erros.telefone = "Use só números, espaços, parênteses e traços.";
  }

  if (contato.mensagem.length < limites.mensagem.min) {
    erros.mensagem = "Conte um pouco mais sobre o que você precisa.";
  } else if (contato.mensagem.length > limites.mensagem.max) {
    erros.mensagem = `Use até ${limites.mensagem.max} caracteres.`;
  }

  return { contato, erros, valido: Object.keys(erros).length === 0 };
}
