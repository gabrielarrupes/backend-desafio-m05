const express = require("express");

const Login = require("../controllers/Login");
const { postUser, putUser, getUser } = require("../controllers/user");
const { postCustomer, getCustomer, getCustomerId, putCustomer } = require("../controllers/Customer");
const { postCharge, getCharge } = require("../controllers/Charge");

const { userSchema } = require("../schemas/UserSchema");
const { userUpdateSchema } = require("../schemas/UserUpdateSchema");
const { customerSchema } = require("../schemas/CustomerSchema");
const { chargeSchemas } = require("../schemas/chargeSchemas");
const { customerUpdateSchema } = require("../schemas/customerUpdateSchema");

const UserRegistrationValidation = require("../middleware/UserRegistrationValidation");
const UserLoggedValidation = require("../middleware/UserLoggedValidation");
const UserUpdateValidation = require("../middleware/UserUpdateValidation");
const CustomerRegistrationValidation = require("../middleware/CustomerRegistrationValidation");
const ChargeRegistrationValidation = require("../middleware/ChargeRegistrationValidation");
const CustomerUpdateValidation = require("../middleware/CustomerUpdateValidation");


const router = express();

router.post("/login", Login);
router.post("/signUp", UserRegistrationValidation(userSchema), postUser);



router.use(UserLoggedValidation);

router.get("/", getUser);

router.put("/user/update", UserUpdateValidation(userUpdateSchema), putUser);

router.post("/customer", CustomerRegistrationValidation(customerSchema), postCustomer);

router.get("/customer", getCustomer);

router.get("/customer/:id", getCustomerId);

router.post("/charge", ChargeRegistrationValidation(chargeSchemas), postCharge);

router.get("/charge/:id", getCharge);

router.put('/customer/:id', CustomerUpdateValidation(customerUpdateSchema), putCustomer);


module.exports = router;
