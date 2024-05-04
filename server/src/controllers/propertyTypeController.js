const { StatusCodes } = require("http-status-codes");
const propertyTypeService = require("../services/propertyTypeService");

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

    // // If type === 'ALL' is get all
    // if (type === "ALL") {

    // } else {
    //   return res.send("Chưa làm gì cả");
    // }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPropertyType,
  getPropertyTypes,
};
