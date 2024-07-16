"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hotel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      pricePerNight: DataTypes.BIGINT,
      images: DataTypes.JSON,
      viewVisit: DataTypes.INTEGER,
      lat: DataTypes.DOUBLE,
      lng: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Hotel",
    }
  );
  return Hotel;
};
