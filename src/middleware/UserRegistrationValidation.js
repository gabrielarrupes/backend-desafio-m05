const existsInDatabase = require("../utils/existsInDatabase.js");
const UserRegistrationValidation = (joiSchema) => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);
    await existsInDatabase(req, res);
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = UserRegistrationValidation;
