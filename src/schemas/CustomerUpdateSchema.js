const joi = require("joi");

const customerUpdateSchema = joi.object({
    name: joi
        .string()
        .regex(/^[a-zA-Z\s]+$/)
        .required()
        .messages({
            "string.empty": "O nome não pode estar vazio",
            "any.required": "O nome é obrigatório",
            "string.pattern.base": "O nome deve conter apenas letras e espaços",
        }),

    email: joi.string().email().required().messages({
        "string.email": "O email informado é inválido",
        "string.empty": "O email não pode estar vazio",
        "any.required": "O email é obrigatório",
    }),

    cep: joi.string().max(8).pattern(/^\d+$/).messages({
        "string.max": "O cep deve ter no máximo 8 caracteres",
        "string.pattern.base": "O cep deve conter apenas números",
    }),
    cpf: joi.string().length(11).pattern(/^\d+$/).required().messages({
        "string.length": "O cpf deve ter exatamente 11 caracteres",
        "string.pattern.base": "O cpf deve conter apenas números",
        "any.required": "O cpf é obrigatório",
    }),

    telephone: joi.string().pattern(/^\d+$/).required().messages({
        "string.pattern.base": "O telefone deve conter apenas números",
        "any.required": "O telefone é obrigatório",
    }),

    logradouro: joi.string().required().messages({
        "string.empty": "O logradouro não pode estar vazio",
        "any.required": "O logradouro é obrigatório",
    }),

    complemento: joi.string().required().messages({
        "string.empty": "O complemento não pode estar vazio",
        "any.required": "O complemento é obrigatório",
    }),

    bairro: joi.string().required().messages({
        "string.empty": "O bairro não pode estar vazio",
        "any.required": "O bairro é obrigatório",
    }),

    cidade: joi.string().required().messages({
        "string.empty": "A cidade não pode estar vazia",
        "any.required": "A cidade é obrigatória",
    }),

    estado: joi.string().required().messages({
        "string.empty": "O estado não pode estar vazio",
        "any.required": "O estado é obrigatório",
    }),
});


module.exports = { customerUpdateSchema };