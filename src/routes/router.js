const express = require("express");
const { postUser } = require("../controllers/user");
const UserRegistrationValidation = require("../middleware/UserRegistrationValidation");
const { userSchema } = require("../schemas/userSchema");

router = express();

router.post("/sign-up", UserRegistrationValidation(userSchema), postUser);

module.exports = router;
