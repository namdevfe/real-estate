const { StatusCodes } = require("http-status-codes");
const db = require("../models");
const ApiError = require("../utils/ApiError");
const { Op, Sequelize, where } = require("sequelize");

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
    const { limit, fields, name, page, sort, ...query } = queryData || {};
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

    // Sorting
    // Syntax: order: [['name', 'ASC']]
    if (sort) {
      const order = sort
        .split(",")
        .map((field) =>
          field.startsWith("-")
            ? [field.replace("-", ""), "DESC"]
            : [field, "ASC"]
        );

      options.order = order;
    }

    // Get all
    if (!limit) {
      const propertyTypes = await db.PropertyType.findAll({
        where: query,
        ...options,
      });
      return propertyTypes?.length > 0 ? propertyTypes : [];
    }

    // Pagination
    const pageCurrent = Number(page) || 1;
    const offset = (pageCurrent - 1) * limit;
    if (offset) options.offset = offset;
    options.limit = limit;
    const propertyTypes = await db.PropertyType.findAndCountAll({
      where: query,
      ...options,
    });
    return propertyTypes;
  } catch (error) {
    throw error;
  }
};

// Update property type
const updatePropertyType = async (id, data) => {
  try {
    const res = await db.PropertyType.update(data, { where: { id } });
    return res;
  } catch (error) {
    throw error;
  }
};

const deletePropertyType = async (id) => {
  try {
    const res = await db.PropertyType.destroy({
      where: { id },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createPropertyType,
  getPropertyTypes,
  updatePropertyType,
  deletePropertyType,
};
