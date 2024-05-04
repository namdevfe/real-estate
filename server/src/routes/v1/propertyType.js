const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const { isAdmin } = require("../../middlewares/verifyRole");
const propertyTypeValidation = require("../../validations/propertyTypeValidation");
const propertyTypeController = require("../../controllers/propertyTypeController");

const router = express.Router();

// Create property type - method[POST]
router.post(
  "/",
  [verifyToken, isAdmin, propertyTypeValidation.createPropertyType],
  propertyTypeController.createPropertyType
);

// Get property type - method[GET]
router.get("/", propertyTypeController.getPropertyTypes);

module.exports = router;
