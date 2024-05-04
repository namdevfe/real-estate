const { StatusCodes } = require("http-status-codes");
const propertyTypeService = require("../services/propertyTypeService");
const ApiError = require("../utils/ApiError");

// CREATE
const createPropertyType = async (req, res, next) => {
  try {
    const propertyType = await propertyTypeService.createPropertyType(req.body);
    return res.status(StatusCodes.CREATED).json({
      statusCode: StatusCodes.CREATED,
      message: "Created successfully",
      propertyType,
    });
  } catch (error) {
    next(error);
  }
};

// READ
const getPropertyTypes = async (req, res, next) => {
  try {
    // const { limit, page, fields, type, ...query } = req.query;
    const propertyTypes = await propertyTypeService.getPropertyTypes(req.query);
    return res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      propertyTypes,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE
const updatePropertyType = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (Object.keys(req.body).length === 0)
      throw new ApiError(StatusCodes.BAD_REQUEST, "Must have least 1 agrument");

    const [isUpdated] = await propertyTypeService.updatePropertyType(
      id,
      req.body
    );

    // Update fail
    if (isUpdated === 0)
      throw new ApiError(StatusCodes.BAD_REQUEST, "Update failed");

    // Update success
    return res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      message: "Updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// DELETE
const deletePropertyType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isDeleted = await propertyTypeService.deletePropertyType(id);
    if (!isDeleted)
      throw new ApiError(StatusCodes.BAD_REQUEST, "Delete failed");
    return res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      message: "Deleted successfully ",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPropertyType,
  getPropertyTypes,
  updatePropertyType,
  deletePropertyType,
};
