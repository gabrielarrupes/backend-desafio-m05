const joi = require("joi");

const userSchema = joi.object({
  name: joi
    .string()
    .regex(/^[a-zA-Z\s]*$/)
    .required()
    .messages({
      "string.base": "O nome deve conter apenas letras e espaços",
      "string.empty": "O campo nome é obrigatório",
      "any.required": "o campo nome é obrigatório",
    }),

  email: joi.string().email().required().messages({
    "string.email":
      "O e-mail deve ter um formato válido, exemplo: email@email.com",
    "string.empty": "O campo email é obrigatório",
    "any.required": "O campo email é obrigatório",
  }),

  cpf: joi.string().min(11).max(11).pattern(/^\d+$/).messages({
    "string.min": "O CPF deve conter 11 números",
    "string.pattern.base": "O cpf deve conter apenas números",
    "string.max": "O CPF deve conter apenas 11 números",
  }),

  telephone: joi.string().pattern(/^\d+$/).messages({
    "string.pattern.base": "O telefone deve conter apenas números",
    "string.empty": "O campo nome é obrigatório",
  }),

  password: joi
    .string()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .required()
    .messages({
      "string.empty": "O campo Senha é obrigatório",
      "any-required": "O campo senha é obrigatório",
      "string.min":
        "A senha deve ter no mínimo 8 caracteres, pelo menos um número, pelo menos uma letra maiúscula e pelo menos um caractere especial",
      "string.regex.base":
        "A senha deve ter no mínimo 8 caracteres, pelo menos um número, pelo menos uma letra maiúscula e pelo menos um caractere especial",
    }),

  repeatedPassword: joi
    .string()
    .required()
    .messages({
      "any-required": "O campo Repita Senha é obrigatório",
      "string.empty": "O campo Repita Senha é obrigatório",
    }),

  activeStep: joi.number(),
});

module.exports = { userSchema };
