const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/ApiError");

// Check Agent
const isAgent = (req, res, next) => {
  try {
    const { roleCode } = req.user;
    if (roleCode !== "R1" || roleCode !== "R2" || roleCode !== "R3")
      throw new ApiError(StatusCodes.FORBIDDEN);
    next();
  } catch (error) {
    next(error);
  }
};

// Check Owner
const isOwner = (req, res, next) => {
  try {
    const { roleCode } = req.user;
    if (roleCode !== "R1" || roleCode !== "R2")
      throw new ApiError(StatusCodes.FORBIDDEN);
    next();
  } catch (error) {
    next(error);
  }
};

// Check Admin
const isAdmin = (req, res, next) => {
  try {
    const { roleCode } = req.user;
    if (roleCode !== "R1") throw new ApiError(StatusCodes.FORBIDDEN);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isAgent,
  isOwner,
  isAdmin,
};
