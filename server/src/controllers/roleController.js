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

module.exports = { createRole };
