"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TourBookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TourBookings.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      tourId: {
        type: DataTypes.UUID,
        references: {
          model: "Tours",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      },
      nameTour: DataTypes.STRING,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      quantityPeople: DataTypes.JSON,
      totalPrice: DataTypes.BIGINT,
      preOrderPrice: DataTypes.BIGINT,
      note: DataTypes.STRING,
      status: DataTypes.STRING,
      reasonStatus: DataTypes.STRING,
      paymentmethod: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TourBookings",
    }
  );
  return TourBookings;
};
