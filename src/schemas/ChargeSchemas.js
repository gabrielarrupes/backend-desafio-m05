const joi = require("joi");


const chargeSchemas = joi.object({
    value: joi
        .number()
        .positive()
        .required()
        .messages({
            "any.required": "O campo valor é obrigatório",
            "number.empty": "O valor não pode estar vazio",
        }),

    duedate: joi
        .date()
        .required()
        .messages({
            "any.required": "O campo data de vencimento é obrigatória",
            "date.empty": "A data não pode estar vazia",
        }),

    status: joi
        .boolean()
        .required()
        .messages({
            "any.required": "O campo status é obrigatório",
            "boolean.empty": "O status não pode estar vazio",
        }),

    description: joi
        .string()
        .required()
        .messages({
            "any.required": "O campo descrição é obrigatório",
            "boolean.empty": "A descrição não pode estar vazia",
        }),


});

module.exports = { chargeSchemas }