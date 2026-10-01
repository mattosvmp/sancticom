import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

const valido = {
  nome: "Maria Silva",
  email: "maria@exemplo.com.br",
  telefone: "(65) 3000-0000",
  mensagem: "Quero um site para a minha confeitaria.",
  site: "",
  tempo: 15000,
};

async function enviar(corpo) {
  return fetch("http://localhost:3000/api/v1/contato", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corpo),
  });
}

describe("POST /api/v1/contato", () => {
  describe("Anonymous user", () => {
    test("With valid data", async () => {
      const response = await enviar(valido);
      expect(response.status).toBe(201);

      const responseBody = await response.json();
      expect(responseBody).toEqual({ mensagem: "Mensagem recebida." });
    });

    test("Without the optional phone", async () => {
      const response = await enviar({ ...valido, telefone: "" });
      expect(response.status).toBe(201);
    });

    test("With invalid fields", async () => {
      const response = await enviar({
        ...valido,
        nome: "",
        email: "maria",
        telefone: "abc",
        mensagem: "Oi",
      });
      expect(response.status).toBe(400);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "ValidationError",
        message: "Alguns campos não foram preenchidos corretamente.",
        action: "Corrija os campos indicados e envie de novo.",
        status_code: 400,
        campos: {
          nome: "Informe o seu nome.",
          email: "Informe um e-mail válido, é por ele que vamos responder.",
          telefone: "Use só números, espaços, parênteses e traços.",
          mensagem: "Conte um pouco mais sobre o que você precisa.",
        },
      });
    });

    test("From a bot that fills the hidden field", async () => {
      const response = await enviar({ ...valido, site: "https://spam.com" });
      expect(response.status).toBe(201);
    });

    test("From a bot that submits too fast", async () => {
      const response = await enviar({ ...valido, tempo: 500 });
      expect(response.status).toBe(201);
    });

    test("From a bot that skips the timer", async () => {
      const semTempo = { ...valido };
      delete semTempo.tempo;
      const response = await enviar(semTempo);
      expect(response.status).toBe(201);
    });
  });
});
