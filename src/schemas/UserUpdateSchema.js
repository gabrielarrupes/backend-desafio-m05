const joi = require("joi");

const userUpdateSchema = joi.object({
  name: joi
    .string()
    .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/)
    .messages({
      "string.base": "O nome deve conter apenas letras",
      "string.empty": "O campo nome é obrigatório",
      "string.pattern.base": "o nome deve conter apenas letras",
    }),

  email: joi.string().email().messages({
    "string.email":
      "O e-mail deve ter um formato válido, exemplo: email@email.com",
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

  password: joi
    .string()
    
});

module.exports = { userUpdateSchema };
