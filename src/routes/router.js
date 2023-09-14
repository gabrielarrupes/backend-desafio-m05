const express = require("express");

const UserRegistrationValidation = require("../middleware/UserRegistrationValidation");

const { postUser } = require("../controllers/user");
const { userSchema } = require("../schemas/userSchema");

router = express();

router.post("/sign-up", UserRegistrationValidation(userSchema), postUser);

module.exports = router;