import { createRouter } from "next-connect";
import controller from "infra/controller";
import contato from "models/contato.js";
import { ServiceError, ValidationError } from "infra/errors.js";

export const config = {
  api: {
    bodyParser: { sizeLimit: "20kb" },
  },
};

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  try {
    await contato.receber(request.body);
  } catch (error) {
    if (error instanceof ValidationError || error instanceof ServiceError) {
      if (error instanceof ServiceError) console.log(error);
      return response.status(error.statusCode).json(error);
    }
    throw error;
  }

  // O robô descartado recebe a mesma resposta, para não aprender a desviar.
  return response.status(201).json({ mensagem: "Mensagem recebida." });
}
