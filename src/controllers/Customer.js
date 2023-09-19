const connection = require("../services/connection");

const postCustomer = async (req, res) => {
  const { id } = req.user;
  const {
    name,
    email,
    cpf,
    telephone,
    cep,
    logradouro,
    complemento,
    bairro,
    cidade,
    estado,
  } = req.body;

  try {
    const customer = await connection("customers").insert({
      id_responsable: id,
      name,
      email,
      cpf,
      telephone,
      cep,
      logradouro,
      complemento,
      bairro,
      cidade,
      estado,
    });

    if (!customer) {
      return res
        .status(400)
        .json("Não foi possível concluir o cadastro do cliente");
    }

    return res.status(201).json("Cliente cadastrado com sucesso.");
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = { postCustomer };
