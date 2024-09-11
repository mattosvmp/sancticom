function status(request, response) {
  response.status(200).json({ mensagem: "Eu te amo minha caríssima!" });
}

export default status;
