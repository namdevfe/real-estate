const express = require("express");
const authController = require("../../controllers/authController");
const authValidation = require("../../validations/authValidation");
const verifyToken = require("../../middlewares/verifyToken");

const router = express.Router();

router.post("/register", authValidation.register, authController.register);
router.post("/login", authValidation.login, authController.login);
router.get("/profile", verifyToken, authController.getProfile);
router.put(
  "/refresh-token",
  authValidation.refreshToken,
  authController.refreshToken
);

module.exports = router;
