const existsInDatabase = require("../utils/existsInDatabase.js");
const bcrypt = require("bcrypt");

const UserUpdateValidation = (joiSchema) => async (req, res, next) => {
  try {
    if (!req.body.password) {
      if (
        req.user.name === req.body.name &&
        req.user.email === req.body.email &&
        req.user.telephone === req.body.telephone &&
        req.user.cpf === req.body.cpf
      ) {
        return res
          .status(400)
          .json({ message: "Ao menos um campo deve ser alterado" });
      }
    }

    await joiSchema.validateAsync(req.body);

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = UserUpdateValidation;
