const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/ApiError");

const createPropertyType = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().min(3).max(50).trim().strict().messages({
      "any.required": "Name is required",
      "string.empty": "Name is not allowed to be empty",
      "string.min": "Name length must be at least 3 characters long",
      "string.max":
        "Name length must be less than or equal to 50 characters long",
      "string.trim": "Name must not have leading or trailing whitespace",
    }),
    description: Joi.string()
      .required()
      .min(10)
      .max(255)
      .trim()
      .strict()
      .messages({
        "any.required": "Description is required",
        "string.empty": "Description is not allowed to be empty",
        "string.min": "Description length must be at least 10 characters long",
        "string.max":
          "Description length must be less than or equal to 255 characters long",
        "string.trim":
          "Description must not have leading or trailing whitespace",
      }),
    image: Joi.string().required().trim().strict().messages({
      "any.required": "Image is required",
      "string.empty": "Image is not allowed to be empty",
      "string.trim": "Image must not have leading or trailing whitespace",
    }),
    roleCode: Joi.string(),
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = new Error(error).message;
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      errorMessage
    );
    next(customError);
  }
};

const updatePropertyType = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().allow(null, "").min(3).max(50).trim().strict().messages({
      "string.min": "Name length must be at least 3 characters long",
      "string.max":
        "Name length must be less than or equal to 50 characters long",
      "string.trim": "Name must not have leading or trailing whitespace",
    }),
    description: Joi.string()
      .allow(null, "")
      .min(10)
      .max(255)
      .trim()
      .strict()
      .messages({
        "string.min": "Description length must be at least 10 characters long",
        "string.max":
          "Description length must be less than or equal to 255 characters long",
        "string.trim":
          "Description must not have leading or trailing whitespace",
      }),
    image: Joi.string().allow(null, "").trim().strict().messages({
      "string.trim": "Image must not have leading or trailing whitespace",
    }),
    roleCode: Joi.string(),
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = new Error(error).message;
    const customError = new ApiError(
      StatusCodes.UNPROCESSABLE_ENTITY,
      errorMessage
    );
    next(customError);
  }
};

module.exports = {
  createPropertyType,
  updatePropertyType,
};
