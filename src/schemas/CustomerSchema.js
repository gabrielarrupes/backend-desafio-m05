const joi = require("joi");

const customerSchema = joi.object({
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
    "string.email": "Endereço de e-mail inválido.",
    "string.empty": "O e-mail não pode estar vazio",
    "any.required": "O e-mail é obrigatório",
  }),

  cep: joi.string().max(8).pattern(/^\d+$/).messages({
    "string.max": "O CEP deve ter no máximo 8 caracteres",
    "string.pattern.base": "O CEP deve conter apenas números",
  }),

  cpf: joi.string().length(11).pattern(/^\d+$/).required().messages({
    "string.length": "O CPF deve ter exatamente 11 caracteres",
    "string.pattern.base": "O CPF deve conter apenas números",
    "any.required": "O CPF é obrigatório",
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
    "string.empty": "O campo cidade não pode estar vazio",
    "any.required": "O Campo cidade é Obrigatório",
  }),

  estado: joi.string().required().messages({
    "string.empty": "O campo Estado não pode estar vazio",
    "any.required": "O campo Estado é obrigatório",
  }),
});

module.exports = { customerSchema };
