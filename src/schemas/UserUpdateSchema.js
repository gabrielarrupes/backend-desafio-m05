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

  cpf: joi.string().length(11).pattern(/^\d+$/).required().messages({
    "string.length": "O CPF deve ter exatamente 11 caracteres",
    "string.pattern.base": "O CPF deve conter apenas números",
    "any.required": "O CPF é obrigatório",
  }),

  telephone: joi.string().pattern(/^\d+$/).messages({
    "string.pattern.base": "O telefone deve conter apenas números",
    "string.empty": "O campo telefone é obrigatório",
  }),

  password: joi
    .string()
    .min(8)
    .pattern(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*.])/)
    .messages({
      "string.empty": "O campo Senha é obrigatório",
      "string.min":
        "A senha deve ter pelo menos 8 caracteres, incluindo um número, um caractere especial e uma letra maiúscula.",
      "string.pattern.base":
        "A senha deve ter pelo menos 8 caracteres, incluindo um número, um caractere especial e uma letra maiúscula.",
    }),
});

module.exports = { userUpdateSchema };
