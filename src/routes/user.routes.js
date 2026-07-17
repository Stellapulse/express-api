const express = require("express");
const router = express.Router();

const userController = require('../controllers/user.controller');
const validate = require("../middlewares/validator.middleware");
const authenticate = require('../middlewares/authorization.middleware');

const { registerSchema } = require("../validators/user.validator");
const { loginSchema } = require("../validators/user.validator");

router.post(
    "/register",
    validate(registerSchema),
    userController.register
);

router.post(
    "/login",
    validate(loginSchema),
    userController.login
);

router.get(
    "/profile",
    authenticate,
    userController.profile
)

module.exports = router;