const { StatusCodes } = require("http-status-codes");
const db = require("../models");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const register = async (data) => {
  const { phone } = data;
  try {
    const createdUser = await db.User.findOrCreate({
      where: { phone },
      defaults: data,
    });

    // Trả về data cho authController
    return createdUser[1];
  } catch (error) {
    throw error;
  }
};

const login = async (data) => {
  try {
    const { phone, password } = data;
    // Check số điện thoại
    const user = await db.User.findOne({
      where: { phone },
    });

    if (!user) throw new ApiError(StatusCodes.UNAUTHORIZED);

    // Check password
    const checkedPassword = bcrypt.compareSync(password, user.password);
    if (!checkedPassword) throw new ApiError(StatusCodes.UNAUTHORIZED);

    // Nếu password chính xác thì tạo accessToken và trả về phía controller
    const token = jwt.sign(
      { uid: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return {
      accessToken: token,
    };
  } catch (error) {
    throw error;
  }
};

const getProfile = async (uid) => {
  try {
    const user = await db.User.findByPk(uid, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) throw new ApiError(StatusCodes.NOT_FOUND);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { register, login, getProfile };
