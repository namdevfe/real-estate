const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // Kiểm tra token client gửi lên bắt đầu với chuỗi ký tự `Bearer token`
    const token = req.headers.authorization?.startsWith("Bearer");
    if (!token) throw new ApiError(StatusCodes.UNAUTHORIZED);

    // Nếu token hợp lệ thì tiến hành decode token
    const accessToken = req.headers.authorization?.split(" ")?.[1];
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        const isTokenExpired = err instanceof jwt.TokenExpiredError;
        if (!isTokenExpired)
          throw new ApiError(StatusCodes.UNAUTHORIZED, "Token invalid");
        if (isTokenExpired)
          throw new ApiError(StatusCodes.UNAUTHORIZED, "Token has expired");
      }
      req.user = decode;
    });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;
