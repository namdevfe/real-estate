const express = require("express");
const authController = require("../../controllers/authController");
const authValidation = require("../../validations/authValidation");

const router = express.Router();

router.post("/register", authValidation.register, authController.register);
router.post("/login", authValidation.login, authController.login);

module.exports = router;
