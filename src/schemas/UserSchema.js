const joi = require("joi");

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  cpf: joi.string(),
  tetefone: joi.string(),
  password: joi
    .string()
    .min(8)
    .regex(/[0-9]/)
    .message("A senha deve conter pelo menos um número")
    .regex(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])/)
    .message("A senha deve conter pelo menos um caractere especial")
    .regex(/^(?=.*[A-Z])/)
    .message("A senha deve conter pelo menos uma letra maiúscula")
    .required(),
});

module.exports = { userSchema };
