"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuestionAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QuestionAnswer.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      answer: DataTypes.TEXT("long"),
      question: DataTypes.STRING,
      like: DataTypes.BIGINT,
      categoriesQuestionId: {
        type: DataTypes.UUID,
        references: {
          model: "Questions",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "QuestionAnswer",
    }
  );
  return QuestionAnswer;
};
