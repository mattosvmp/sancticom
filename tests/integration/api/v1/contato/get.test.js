import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/contato", () => {
  describe("Anonymous user", () => {
    test("Is not allowed", async () => {
      const response = await fetch("http://localhost:3000/api/v1/contato");
      expect(response.status).toBe(405);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "MethodNotAllowedError",
        message: "Método não permitido para este endpoint.",
        action:
          "Verifique se o método HTTP enviado é válido por este endpoint.",
        status_code: 405,
      });
    });
  });
});
