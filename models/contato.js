import { ServiceError, ValidationError } from "infra/errors.js";
import validarContato from "lib/validarContato.js";

// Quem preenche o formulário em menos de 3 segundos, ou preenche o campo-isca
// que só robô enxerga, não é gente.
const TEMPO_MINIMO_MS = 3000;

function pareceRobo(dados) {
  const preencheuIsca = typeof dados.site === "string" && dados.site !== "";
  const rapidoDemais =
    typeof dados.tempo !== "number" || dados.tempo < TEMPO_MINIMO_MS;
  return preencheuIsca || rapidoDemais;
}

function montarTexto(contato) {
  return [
    `Nome: ${contato.nome}`,
    `E-mail: ${contato.email}`,
    `Telefone: ${contato.telefone || "não informado"}`,
    "",
    contato.mensagem,
  ].join("\n");
}

async function enviarEmail(contato) {
  const chave = process.env.RESEND_API_KEY;
  const destino = process.env.CONTATO_DESTINO;

  if (!chave || !destino) {
    if (process.env.NODE_ENV === "production") {
      throw new ServiceError({
        message: "O formulário de contato está indisponível no momento.",
      });
    }
    // Sem as chaves, em desenvolvimento a mensagem só aparece no terminal.
    console.log(`[contato] e-mail não enviado:\n${montarTexto(contato)}`);
    return;
  }

  const resposta = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${chave}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.CONTATO_REMETENTE ||
        "Site Sancticom <onboarding@resend.dev>",
      to: destino,
      reply_to: contato.email,
      subject: `Novo contato pelo site: ${contato.nome}`,
      text: montarTexto(contato),
    }),
  });

  if (!resposta.ok) {
    throw new ServiceError({
      message: "Não foi possível enviar a mensagem agora.",
      cause: new Error(`Resend respondeu ${resposta.status}`),
    });
  }
}

async function receber(dados) {
  if (!dados || typeof dados !== "object") {
    throw new ValidationError({ campos: {} });
  }

  if (pareceRobo(dados)) {
    return { descartado: true };
  }

  const { contato, erros, valido } = validarContato(dados);
  if (!valido) {
    throw new ValidationError({ campos: erros });
  }

  await enviarEmail(contato);
  return { descartado: false };
}

const contato = {
  receber,
};

export default contato;
