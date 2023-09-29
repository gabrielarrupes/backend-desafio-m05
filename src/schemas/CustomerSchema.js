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
    "string.email": "O e-mail deve ter um formato válido, exemplo: email@email.com",
    "string.empty": "O email não pode estar vazio",
    "any.required": "O email é obrigatório",
  }),

  cpf: joi.string().min(11).max(11).pattern(/^\d+$/).required().messages({
    "string.min": "O CPF deve conter 11 números",
    "string.pattern.base": "O cpf deve conter apenas números",
    "string.max": "O CPF deve conter apenas 11 números",
    "any.required": "O CPF é obrigatório"
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

  cep: joi.string().max(8).pattern(/^\d+$/).required().messages({
    "string.max": "O cep deve ter no máximo 8 caracteres",
    "string.pattern.base": "O cep deve conter apenas números",
    "any.required": "O CEP é obrigatório"
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


module.exports = { customerSchema };
