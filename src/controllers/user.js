const bcrypt = require("bcrypt");
const connection = require("../services/connection");

postUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await connection("users").insert({
      name,
      email,
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

putUser = async (req, res) => {
  const { id } = req.user;
  const { name, email, cpf, telephone, password } = req.body;

  let passwordHash = password;

  let currentCpf = cpf || "";

  if (password) {
    passwordHash = await bcrypt.hash(password, 10);
  }

  try {
    const user = await connection("users")
      .where({ id })
      .update({
        name,
        email,
        cpf: currentCpf,
        telephone,
        password: passwordHash,
      })
      .returning("*");

    return res.status(201).json("Usuário atualizado com sucesso!");
  } catch (error) {
    return res.status(400).json(error.messagem);
  }
};

module.exports = { postUser, putUser };
