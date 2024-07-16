"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HotelBookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HotelBookings.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      hotelId: {
        type: DataTypes.UUID,
        references: {
          model: "Hotels",
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
      roomId: DataTypes.JSON,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      reasonStatus: DataTypes.STRING,
      checkInDate: DataTypes.DATE,
      checkOutDate: DataTypes.DATE,
      totalPrice: DataTypes.BIGINT,
      preOrderPrice: DataTypes.BIGINT,
      status: DataTypes.STRING,
      note: DataTypes.STRING,
      paymentMethod: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "HotelBookings",
    }
  );
  return HotelBookings;
};
