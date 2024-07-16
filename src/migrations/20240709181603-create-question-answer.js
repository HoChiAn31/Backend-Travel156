"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("questionAnswers", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      answer: {
        type: Sequelize.TEXT("long"),
      },
      question: {
        type: Sequelize.STRING,
      },
      like: {
        type: Sequelize.BIGINT,
        defaultValue: 0,
      },
      categoriesQuestionId: {
        type: Sequelize.UUID,
        references: {
          model: "Questions",
          key: "id",
        },
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("questionAnswers");
  },
};
