const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/ApiError");

const register = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().min(3).max(50).trim().strict().messages({
      "any.required": "Name is required",
      "string.empty": "Name is not allowed to be empty",
      "string.min": "Name length must be at least 3 characters long",
      "string.max":
        "Name length must be less than or equal to 50 characters long",
      "string.trim": "Name must not have leading or trailing whitespace",
    }),
    password: Joi.string().required().min(6).max(20).trim().strict().messages({
      "any.required": "Password is required",
      "string.empty": "Password is not allowed to be empty",
      "string.min": "Password length must be at least 6 characters long",
      "string.max":
        "Password length must be less than or equal to 20 characters long",
      "string.trim": "Password must not have leading or trailing whitespace",
    }),
    phone: Joi.string().required().trim().strict().messages({
      "any.required": "Phone is required",
      "string.empty": "Phone is not allowed to be empty",
      "string.trim": "Phone must not have leading or trailing whitespace",
    }),
    roleCode: Joi.string().allow(null, ""),
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

const login = async (req, res, next) => {
  const correctCondition = Joi.object({
    password: Joi.string().required().min(6).max(20).trim().strict().messages({
      "any.required": "Password is required",
      "string.empty": "Password is not allowed to be empty",
      "string.min": "Password length must be at least 6 characters long",
      "string.max":
        "Password length must be less than or equal to 20 characters long",
      "string.trim": "Password must not have leading or trailing whitespace",
    }),
    phone: Joi.string().required().trim().strict().messages({
      "any.required": "Phone is required",
      "string.empty": "Phone is not allowed to be empty",
      "string.trim": "Phone must not have leading or trailing whitespace",
    }),
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

const refreshToken = async (req, res, next) => {
  const correctCondition = Joi.object({
    refreshToken: Joi.string().required().messages({
      "any.required": "Refresh token is required",
      "string.empty": "Refresh token is not allowed to be empty",
    }),
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
  register,
  login,
  refreshToken,
};
