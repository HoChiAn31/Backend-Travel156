"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Room.init(
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
      roomNumber: DataTypes.STRING,
      image: DataTypes.STRING,
      roomType: DataTypes.STRING,
      maxGuests: DataTypes.BIGINT,
      pricePerNight: DataTypes.BIGINT,
      availabilitystatus: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
