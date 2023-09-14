const existsInDatabase = require("../utils/existsInDatabase.js");
const bcrypt = require("bcrypt");

const UserUpdateValidation = (joiSchema) => async (req, res, next) => {
  try {
    const { email, cpf } = req.user;

    const currentEmail = req.body.email;
    const currentCPF = req.body.cpf;

    async function areObjectsEqual(objeto1, objeto2) {
      passwordHash = await bcrypt.compare(objeto2.password, objeto1.password);

      if (!passwordHash) {
        return false;
      }

      return (
        objeto1.name === objeto2.name &&
        objeto1.email === objeto2.email &&
        objeto1.telephone === objeto2.telephone &&
        objeto1.cpf === objeto2.cpf
      );
    }

    const checkNoChange = await areObjectsEqual(req.user, req.body);

    if (checkNoChange) {
      return res
        .status(400)
        .json({ message: "Ao menos um campo deve ser alterado" });
    }

    await joiSchema.validateAsync(req.body);

    if (email !== currentEmail || cpf !== currentCPF) {
      await existsInDatabase(req, (database = "users"));
    }

    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = UserUpdateValidation;
