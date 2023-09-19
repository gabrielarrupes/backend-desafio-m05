const existsInDatabase = require("../utils/existsInDatabase.js");
const bcrypt = require("bcrypt");

const UserUpdateValidation = (joiSchema) => async (req, res, next) => {
  try {
    const { email, cpf } = req.user;

    const currentEmail = req.body.email;
    const currentCPF = req.body.cpf;

    const areObjectsEqual = async (fisrtObject, secondObject) => {
      passwordHash = await bcrypt.compare(
        secondObject.password,
        fisrtObject.password
      );

      if (!passwordHash) {
        return false;
      }

      return (
        fisrtObject.name === secondObject.name &&
        fisrtObject.email === secondObject.email &&
        fisrtObject.telephone === secondObject.telephone &&
        fisrtObject.cpf === secondObject.cpf
      );
    };

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
