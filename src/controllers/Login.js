const connection = require("../services/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loggedUser = await connection("users")
      .select()
      .where({ email })
      .first();

    if (!loggedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const passwordHash = await bcrypt.compare(password, loggedUser.password);

    if (!passwordHash) {
      return res.status(400).json({ message: "A senha não confere" });
    }

    const jwtPassword = process.env.JWT_PASS;

    const token = jwt.sign(loggedUser.id, jwtPassword);

    const userData = {
      name: loggedUser.name,
      email: loggedUser.email,
      token,
    };

    return res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = Login;
