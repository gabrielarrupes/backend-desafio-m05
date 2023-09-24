const bcrypt = require("bcrypt");
const connection = require("../services/connection");

const postUser = async (req, res) => {
  const { name, email, password, activeStep } = req.body;

  if (!name) {
    return res.status(400).json({ message: "O campo nome é obrigatório" });
  }

  if (!email) {
    return res.status(400).json({ message: "O campo email é obrigatório" });
  }

  try {
    if (name && email && password === "" && activeStep === 0) {
      const emailExistsInDatabase = await connection("users")
        .where({ email })
        .first();
      if (emailExistsInDatabase) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }
      if (!emailExistsInDatabase) {
        return res.status(200).json({ message: "certo" });
      }

      if (activeStep === 1 && password === "") {
        return res
          .status(400)
          .json({ message: "O campo senha deve ser preenchido" });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const user = await connection("users")
        .insert({
          name,
          email,
          password: passwordHash,
        })
        .returning("*");
      //console.log(user);
      const { senha: _, ...userPost } = user[0];
      if (!user[0]) {
        return res.status(500).json({ message: "Erro interno do servidor" });
      }

      return res.status(201).json(userPost);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro ao cadastrar usuário" });
  }
};

const getUser = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await connection("users").where({ id }).first();

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const putUser = async (req, res) => {
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

    if (!user) {
      return res.status(400).json({ message: "Erro ao atualizar o usuário" });
    }

    req.user = user;

    return res.status(200).json("Usuário atualizado com sucesso!");
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

module.exports = { getUser, postUser, putUser };
