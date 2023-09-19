const express = require("express");

const Login = require("../controllers/Login");
const { postUser, putUser, getUser } = require("../controllers/User");
const { postCustomer } = require("../controllers/Customer");

const { userSchema } = require("../schemas/UserSchema");
const { userUpdateSchema } = require("../schemas/UserUpdateSchema");
const { customerSchema } = require("../schemas/CustomerSchema");

const UserRegistrationValidation = require("../middleware/UserRegistrationValidation");
const UserLoggedValidation = require("../middleware/UserLoggedValidation");
const UserUpdateValidation = require("../middleware/UserUpdateValidation");
const CustomerRegistrationValidation = require("../middleware/CustomerRegistrationValidation");

const router = express();

router.post("/login", Login);
router.post("/signUp", UserRegistrationValidation(userSchema), postUser);

router.use(UserLoggedValidation);

router.get("/", getUser);

router.put("/user/update", UserUpdateValidation(userUpdateSchema), putUser);

router.post(
  "/customer",
  CustomerRegistrationValidation(customerSchema),
  postCustomer
);

module.exports = router;
