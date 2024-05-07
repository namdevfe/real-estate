const { StatusCodes } = require("http-status-codes");
const db = require("../models");
const ApiError = require("../utils/ApiError");

const createRole = async (data) => {
  try {
    const { code } = data;
    const [role, created] = await db.Role.findOrCreate({
      where: { code },
      defaults: data,
    });
    if (!created) throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY);
    return role;
  } catch (error) {
    throw error;
  }
};

const getRoles = async () => {
  try {
    const roles = db.Role.findAll({
      attributes: ["code", "value"],
    });
    if (roles.length === 0)
      throw new ApiError(StatusCodes.BAD_REQUEST, "Cannot get roles");
    return roles;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createRole,
  getRoles,
};
