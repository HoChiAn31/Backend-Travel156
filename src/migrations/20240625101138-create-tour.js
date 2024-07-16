"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tours", {
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
      descriptionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "TourSchedules",
          key: "id",
        },
      },
      introId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "TourIntroductions",
          key: "id",
        },
      },
      image: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rating: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
        allowNull: false,
      },
      duration: {
        type: Sequelize.BIGINT,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      pricesAdult: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      priceChild: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      departureLocation: {
        type: Sequelize.STRING,
      },
      quantityTotalParticipate: {
        type: Sequelize.BIGINT,
      },
      quantityRegistered: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
      },
      vehicle: {
        type: Sequelize.STRING,
      },
      viewVisit: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
      },
      // coach : xe khách
      //plane
      // train : xe lửa
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tours");
  },
};
