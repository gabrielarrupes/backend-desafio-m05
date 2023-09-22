const UserRegistrationValidation = (joiSchema) => async (req, res, next) => {
  if (req.body.password !== "" && req.body.activeStep === 1) {
    console.log("oi entrou no middleware");

    try {
      await joiSchema.validateAsync(req.body);

      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }
  }

  if (req.body.email && req.body.password === "") {
    next();
  }
  if (!req.body.email || !req.body.name) {
    next();
  }

  if (req.body.email && req.body.name && req.body.password) {
    next();
  }
};

module.exports = UserRegistrationValidation;
