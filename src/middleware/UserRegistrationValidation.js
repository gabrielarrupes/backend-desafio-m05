const UserRegistrationValidation = (joiSchema) => async (req, res, next) => {
  if (req.body.activeStep === 1) {
    try {
      await joiSchema.validateAsync(req.body);
      next();
      return;
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error.message, detail: error.details[0].path[0] });
    }
  }

  next();
};

module.exports = UserRegistrationValidation;
