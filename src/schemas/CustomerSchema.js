const joi = require("joi");

const customerSchema = joi.object({
  name: joi
    .string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/)
    .message("O nome deve conter apenas letras")
    .required(),

  email: joi.string().email().required().messages({
    "string.email":
      "O e-mail deve ter um formato válido, exemplo: email@email.com",
  }),

  cpf: joi.string().min(11).max(11).pattern(/^\d+$/).messages({
    "string.min": "O CPF deve conter 11 números",
    "string.pattern.base": "O cpf deve conter apenas números",
    "string.max": "O CPF deve conter apenas 11 números",
  }),

  telephone: joi
    .string()
    .pattern(/^\d+$/)
    .message("O telefone deve conter apenas números"),

  cep: joi.string(),
  logradouro: joi.string(),
  complemento: joi.string(),
  bairro: joi.string(),
  cidade: joi.string(),
  estado: joi.string(),
});

module.exports = { customerSchema };
