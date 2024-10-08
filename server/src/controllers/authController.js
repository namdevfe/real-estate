const authService = require("../services/authService");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/ApiError");

const register = async (req, res, next) => {
  try {
    // const { name, password, phone } = req.body;
    const response = await authService.register(req.body);

    if (!response)
      throw new ApiError(StatusCodes.BAD_REQUEST, "Registration failed");

    return res.status(StatusCodes.CREATED).json({
      statusCode: StatusCodes.CREATED,
      message: "Your account has been created new. Please login to the system",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const response = await authService.login(req.body);
    return res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      message: "Login is successfully",
      data: {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { uid } = req.user;
    const user = await authService.getProfile(uid);
    return res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const token = await authService.refreshToken(refreshToken);
    return res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getProfile, refreshToken };
