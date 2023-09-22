const existsInDatabase = require("../utils/existsInDatabase.js");

const CustomerRegistrationValidation = (joiSchema) => async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("Não Autorizado");
  }
  try {

    const token = authorization.replace("Bearer ", " ").trim();

    await joiSchema.validateAsync(req.body);
    await existsInDatabase(req, "customers");
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = CustomerRegistrationValidation;
