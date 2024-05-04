const { StatusCodes } = require("http-status-codes");
const db = require("../models");
const ApiError = require("../utils/ApiError");
const { Op, Sequelize } = require("sequelize");

// Create new property type
const createPropertyType = async (data) => {
  try {
    const { name } = data;
    const [propertyType, isCreated] = await db.PropertyType.findOrCreate({
      where: { name },
      defaults: data,
    });

    if (!isCreated)
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Created new property type failed. Please try again !"
      );

    return propertyType;
  } catch (error) {
    throw error;
  }
};

// Get property types
const getPropertyTypes = async (queryData) => {
  try {
    const { type, fields, name, ...query } = queryData || {};
    const options = {};

    // Limit fields
    if (fields) {
      const attributes = fields?.split(",");

      // Case: exclude fields
      const isExclude = attributes?.some((field) => field.startsWith("-"));
      if (isExclude) {
        options.attributes = {
          exclude: attributes?.map((field) => field.replace("-", "")),
        };
      } else {
        // Case: include fields
        options.attributes = attributes;
      }
    }

    // Filter by client query
    if (name) {
      query.name = Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("name")),
        "LIKE",
        `%${name.toLowerCase()}%`
      );
    }

    // Get all
    if (type?.toUpperCase() === "ALL") {
      const propertyTypes = await db.PropertyType.findAll({
        where: query,
        ...options,
      });
      return propertyTypes?.length > 0 ? propertyTypes : [];
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createPropertyType,
  getPropertyTypes,
};
