const jwt = require("jsonwebtoken");
const connection = require("../services/connection");

const UserLoggedValidation = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("Não Autorizado");
  }

  try {
    const token = authorization.replace("Bearer ", " ").trim();

    const id = jwt.verify(token, process.env.JWT_PASS);

    const userExists = await connection("users").select().where({ id }).first();

    if (!userExists) {
      return res.status(404).json("Usuário não cadastrado");
    }

    req.user = userExists;

    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = UserLoggedValidation;
