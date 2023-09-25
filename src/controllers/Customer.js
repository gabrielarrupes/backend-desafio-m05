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

const getCustomer = async (req, res) => {

  try {
    const result = await connection("customers")

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

const getCustomerId = async (req, res) => {

  try {
    const { id } = req.params;
    const customerId = await connection("customers").where('id', id).first();

    if (!customerId) {
      return res.status(404).json({ mesagem: "cliente não encontrado" })
    }

    return res.status(200).json(customerId);
  } catch (error) {
    console.log(error);
  }
};

const putCustomer = async (req, res) => {

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
  const { id } = req.params;
  console.log(id);
  try {

    const emailExistsInDatabase = await connection("customers").where({ email }).first();

    if (emailExistsInDatabase) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }
    const customerExist = await connection("customers").where({ id }).first()
    if (!customerExist) {
      return res.status(400).json({ message: "Cliente não encontrado" });
    }

    const customerUpdate = await connection("customers").where({ id })
      .update({
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
      }).returning("*");

    if (!customerUpdate) {
      return res.status(400).json({ message: "Erro ao atualizar o Cliente" });
    }
    return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};


module.exports = { postCustomer, getCustomer, getCustomerId, putCustomer };
