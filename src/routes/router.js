const express = require("express");

const UserRegistrationValidation = require("../middleware/UserRegistrationValidation");

const { postUser } = require("../controllers/user");
const Login = require("../controllers/Login");

const { userSchema } = require("../schemas/userSchema");

router = express();

router.post("/Login", Login);

router.post("/signUp", UserRegistrationValidation(userSchema), postUser);

module.exports = router;
