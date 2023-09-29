
const ChargeRegistrationValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(400).json({ message: error.message, detail: error.details[0].path[0] });
    }
};

module.exports = ChargeRegistrationValidation;