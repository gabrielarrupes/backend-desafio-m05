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
    const result = await connection
      .select("customers", "charge.status")
      .from(customers)
      .join(charge, "customer.id", "=", "charge.idCustomer");

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const getCustomerId = async (req, res) => {
  const { id } = req.customer;
  try {
    const customerId = await connection("customers").where({ id }).first();

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
  const { id } = req.customer;

  try {
    const customerExists = await connection('customers').where({ id }).first();

    if (!customerExists) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado' })
    };

    if (email !== req.customer.email) {
      const emailExistsInDatabase = await connection("customers")
        .where({ email })
        .first();
      if (emailExistsInDatabase) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }
    }
    const updatedCustomer = await connection("customers").where({ id })
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
      });

    return res.status(200).json({ mensagem: "Cliente atualizado com sucesso" })
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" })
  }
}

module.exports = { postCustomer, getCustomer, getCustomerId, putCustomer };
