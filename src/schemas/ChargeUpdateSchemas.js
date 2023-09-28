const joi = require("joi");

const chargeUpdateSchemas = joi.object({

    value: joi
        .number()
        .positive()
        .required()
        .messages({
            "any.required": "O campo valor é obrigatório",
            "number.empty": "O valor não pode estar vazio",
            "number.base": "O campo valor precisa ser um número",
            "number.positive": "O campo valor precisa ser um número positivo"
        }),

    duedate: joi
        .string()
        .required()
        .messages({
            "any.required": "O campo data de vencimento é obrigatório",
            "string.empty": "A data não pode estar vazia",
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
            "string.empty": "A descrição não pode estar vazia",
        }),

});



module.exports = { chargeUpdateSchemas }