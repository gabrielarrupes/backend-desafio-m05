const connection = require("../services/connection");

existsInDatabase = async (req) => {
  const { email, cpf } = req.body;

  const emailExistsInDatabase = await connection("users")
    .where({ email })
    .first();
  if (emailExistsInDatabase) {
    throw new Error("Email já cadastrado");
  }

  if (cpf) {
    const cpfExistsInDatabase = await connection("users")
      .where({ cpf })
      .first();
    if (cpfExistsInDatabase) {
      throw new Error("CPF já cadastrado");
    }
  }
};

module.exports = existsInDatabase;
