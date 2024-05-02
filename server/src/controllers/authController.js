const authService = require("../services/authService");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/ApiError");

const register = async (req, res, next) => {
  try {
    // Xử lý logic register bên trong authService để thêm user vào db
    const response = await authService.register(req.body);

    console.log("🚀response---->", response);

    // Nếu đăng ký thất bại thì throw error với custom error
    if (!response)
      throw new ApiError(StatusCodes.BAD_REQUEST, "Create new failed");

    // Nếu thành công thì trả về data cho client
    return res.status(StatusCodes.CREATED).json({
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const response = await authService.login(req.body);
    return res.status(StatusCodes.OK).json({
      accessToken: response.accessToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
