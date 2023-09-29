const existsInDatabase = require("../utils/existsInDatabase.js");
const CustomerRegistrationValidation = (joiSchema) => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);
    await existsInDatabase(req, "customers");
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message, detail: error.details[0].path[0] });
  }
};

module.exports = CustomerRegistrationValidation;
