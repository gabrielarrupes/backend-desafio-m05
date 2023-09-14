const express = require("express");

const { postUser, putUser } = require("../controllers/user");
const Login = require("../controllers/Login");

const { userSchema } = require("../schemas/userSchema");
const { userUpdateSchema } = require("../schemas/UserUpdateSchema");

const UserRegistrationValidation = require("../middleware/UserRegistrationValidation");
const UserLoggedValidation = require("../middleware/UserLoggedValidation");
const UserUpdateValidation = require("../middleware/UserUpdateValidation");

router = express();

router.post("/Login", Login);
router.post("/signUp", UserRegistrationValidation(userSchema), postUser);

router.use(UserLoggedValidation);

router.put("/user/update", UserUpdateValidation(userUpdateSchema), putUser);

module.exports = router;
