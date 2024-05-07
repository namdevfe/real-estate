const { StatusCodes } = require("http-status-codes");
const roleService = require("../services/roleService");

const createRole = async (req, res, next) => {
  try {
    const role = await roleService.createRole(req.body);
    return res.status(StatusCodes.CREATED).json({
      statusCode: StatusCodes.CREATED,
      data: role,
    });
  } catch (error) {
    next(error);
  }
};

const getRoles = async (req, res, next) => {
  try {
    const rolesRes = await roleService.getRoles();
    return res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      roles: rolesRes,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createRole, getRoles };
