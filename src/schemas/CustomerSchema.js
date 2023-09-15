const joi = require("joi");

const customerSchema = joi.object({
  name: joi
    .string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/)
    .required()
    .messages({
      "string.base": "O nome deve conter apenas letras",
      "string.empty": "O campo nome é obrigatório",
      "string.pattern.base": "o nome deve conter apenas letras",
    }),

  email: joi.string().email().required().messages({
    "string.email":
      "O e-mail deve ter um formato válido, exemplo: email@email.com",
    "string.empty": "O campo email é obrigatório",
    "any.required": "O campo email é obrigatório",
  }),

  cpf: joi.string().min(11).max(11).pattern(/^\d+$/).messages({
    "string.min": "O CPF deve conter 11 números",
    "string.empty": "O campo nome é obrigatório",
    "string.pattern.base": "O cpf deve conter apenas números",
    "string.max": "O CPF deve conter apenas 11 números",
  }),

  telephone: joi.string().pattern(/^\d+$/).messages({
    "string.pattern.base": "O telefone deve conter apenas números",
    "string.empty": "O campo nome é obrigatório",
  }),

  cep: joi.string(),
  logradouro: joi.string(),
  complemento: joi.string(),
  bairro: joi.string(),
  cidade: joi.string(),
  estado: joi.string(),
});

module.exports = { customerSchema };
