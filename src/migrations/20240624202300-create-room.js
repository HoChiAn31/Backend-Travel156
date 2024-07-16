"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rooms", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      hotelId: {
        type: Sequelize.UUID,
        references: {
          model: "Hotels",
          key: "id",
        },
      },
      roomNumber: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      roomType: {
        type: Sequelize.STRING,
      },
      maxGuests: {
        type: Sequelize.BIGINT,
      },
      pricePerNight: {
        type: Sequelize.BIGINT,
      },
      availabilitystatus: {
        type: Sequelize.JSON,
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
    await queryInterface.dropTable("Rooms");
  },
};
