const { StatusCodes } = require("http-status-codes");
const db = require("../models");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { where } = require("sequelize");

// Register
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

// Login
const login = async (data) => {
  try {
    const { phone, password } = data;
    // Check phone
    const user = await db.User.findOne({
      where: { phone },
    });

    if (!user) throw new ApiError(StatusCodes.UNAUTHORIZED);

    // Check password
    const isCheckedPassword = bcrypt.compareSync(password, user.password);
    if (!isCheckedPassword) throw new ApiError(StatusCodes.UNAUTHORIZED);

    // Generate accessToken & refreshToken
    const accessToken = jwt.sign(
      { uid: user.id, roleCode: user.roleCode },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );

    const refreshToken = jwt.sign(
      { uid: user.id },
      process.env.JWT_SECRET_REFRESH_TOKEN,
      { expiresIn: "15d" }
    );

    // Save refreshToken to database
    await db.User.update(
      {
        refreshToken,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

// Get Profile
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

// Refresh Token
const refreshToken = async (refreshToken) => {
  try {
    const user = await db.User.findOne({ where: { refreshToken } });
    let token = {};
    if (user) {
      jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_TOKEN, (err) => {
        if (err) {
          throw new ApiError(
            StatusCodes.FORBIDDEN,
            "Refresh token has expired"
          );
        } else {
          // Generate new accessToken
          const newAccessToken = jwt.sign(
            { uid: user.id, roleCode: user.roleCode },
            process.env.JWT_SECRET,
            { expiresIn: "5s" }
          );

          token.accessToken = newAccessToken;
          token.refreshToken = refreshToken;
        }
      });
    } else {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Refresh token invalid");
    }

    return Object.keys(token).length > 0 ? token : undefined;
  } catch (error) {
    throw error;
  }
};

module.exports = { register, login, getProfile, refreshToken };
