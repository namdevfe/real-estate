"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Property.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      listingType: {
        type: DataTypes.ENUM,
        values: ["SALE", "RENTAL"],
      },
      price: DataTypes.FLOAT,
      status: {
        type: DataTypes.ENUM,
        values: ["PENDING", "CANCEL", "APPROVED"],
      },
      images: {
        type: DataTypes.TEXT,
        // Before save to database set array images to JSON
        set(images) {
          this.setDataValue("images", JSON.stringify(images));
        },
        // Parse images type JSON to array type
        get() {
          const rawImages = this.getDataValue("images");
          return rawImages ? JSON.parse(rawImages) : [];
        },
      },
      featuredImage: DataTypes.STRING,
      bedroom: DataTypes.INTEGER,
      bathroom: DataTypes.INTEGER,
      yearBuilt: DataTypes.INTEGER,
      propertySize: DataTypes.FLOAT,
      propertyTypeId: DataTypes.UUID,
      postedBy: DataTypes.UUID,
      owner: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Property",
    }
  );
  return Property;
};
