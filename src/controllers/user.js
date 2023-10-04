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
    if (name && email && activeStep === 0) {
      const emailExistsInDatabase = await connection("users")
        .where({ email })
        .first();
      if (emailExistsInDatabase) {
        return res.status(400).json({ message: "Email já cadastrado" });
      } else {
        return res.status(200).json({ message: "ok" });
      }
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

    const { senha: _, ...userPost } = user[0];
    if (!user[0]) {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }

    return res.status(201).json(userPost);
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

  const emailUser = req.user.email;
  const cpfUser = req.user.cpf;

  const passwordUser = req.user.password;

  let passwordHash = password;

  let currentCpf = cpf || "";

  if (!password) {
    passwordHash = passwordUser;
  }

  if (password) {
    passwordHash = await bcrypt.hash(password, 10);
  }

  try {
    const newEmail = req.body.email;

    if (newEmail !== emailUser) {
      const emailExistsInDatabase = await connection("users")
        .where({ email })
        .first();
      if (emailExistsInDatabase) {
        return res.status(400).json({ message: "Email já cadastrado!!!" });
      }
    }

    const newCPF = req.body.cpf;

    if (newCPF) {
      if (newCPF !== cpfUser) {
        const cpfExistsInDatabase = await connection("users")
          .where({ cpf })
          .first();
        if (cpfExistsInDatabase) {
          return res.status(400).json({ message: "CPF já cadastrado!!!" });
        }
      }
    }

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
