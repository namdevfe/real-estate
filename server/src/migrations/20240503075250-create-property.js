"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Properties", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      listingType: {
        type: Sequelize.ENUM(["SALE", "RENTAL"]),
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(["PENDING", "CANCEL", "APPROVE"]),
        defaultValue: "PENDING",
      },
      images: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      featuredImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bedroom: {
        type: Sequelize.INTEGER,
      },
      bathroom: {
        type: Sequelize.INTEGER,
      },
      yearBuilt: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      propertySize: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      postedBy: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      propertyTypeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "PropertyTypes",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Properties");
  },
};
