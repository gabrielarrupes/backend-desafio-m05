const connection = require("../services/connection");

const existsInDatabase = async (req, database) => {
  const { email, cpf } = req.body;

  if (email) {
    const emailExistsInDatabase = await connection(database)
      .where({ email })
      .first();
    if (emailExistsInDatabase) {
      throw new Error("Email já cadastrado");
    }
  }

  if (cpf) {
    const cpfExistsInDatabase = await connection(database)
      .where({ cpf })
      .first();
    if (cpfExistsInDatabase) {
      throw new Error("CPF já cadastrado");
    }
  }
};

module.exports = existsInDatabase;
