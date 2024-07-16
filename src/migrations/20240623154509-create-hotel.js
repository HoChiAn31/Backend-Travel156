"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Hotels", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Việt Nam",
      },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      pricePerNight: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      images: {
        type: Sequelize.JSON,
      },
      viewVisit: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      lat: {
        type: Sequelize.BIGINT,
      },
      lng: {
        type: Sequelize.BIGINT,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Hotels");
  },
};
