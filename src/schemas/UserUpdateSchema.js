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

  cpf: joi.string().min(11).pattern(/^\d+$/).messages({
    "string.min": "O CPF deve conter 11 números",
    "string.pattern.base": "O cpf deve conter apenas números",
    "string.max": "O CPF deve conter apenas 11 números",
  }),

  telephone: joi.string().min(0).messages({
    "string.pattern.base": "O telefone deve conter apenas números",
  }),

  password: joi
    .string()
    .min(8)
    .pattern(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*.])/)
    .required()
    .messages({
      "string.empty": "O campo Senha é obrigatório",
      "any-required": "O campo senha é obrigatório",
      "string.min":
        "A senha deve ter no mínimo 8 caracteres, pelo menos um número, pelo menos uma letra maiúscula e pelo menos um caractere especial",
      "string.pattern.base":
        "A senha deve ter no mínimo 8 caracteres, pelo menos um número, pelo menos uma letra maiúscula e pelo menos um caractere especial",
    }),
});

module.exports = { userUpdateSchema };
