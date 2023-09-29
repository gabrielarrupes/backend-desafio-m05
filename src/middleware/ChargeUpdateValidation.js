const ChargeUpdateValidation = (joiSchema) => async (req, res, next) => {
    try {
        await joiSchema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(400).json({ message: error.message, detail: error.details[0].path[0] });
    }
};

module.exports = ChargeUpdateValidation