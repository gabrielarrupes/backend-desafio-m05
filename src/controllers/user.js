const bcrypt = require("bcrypt");
const connection = require("../services/connection");

postUser = async (req, res) => {
  const { name, email, cpf, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await connection("users").insert({
      name,
      email,
      cpf,
      password: passwordHash,
    });

    if (!user) {
      return res.status(400).json("Não foi possível concluir o cadastro");
    }

    return res.status(200).json("Usuário cadastrado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.messagem);
  }
};

module.exports = { postUser };
