"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tour.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      descriptionId: DataTypes.UUID,
      introId: DataTypes.UUID,
      image: DataTypes.STRING,
      city: DataTypes.STRING,
      rating: DataTypes.BIGINT,
      duration: DataTypes.BIGINT,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      pricesAdult: DataTypes.BIGINT,
      priceChild: DataTypes.BIGINT,
      departureLocation: DataTypes.STRING,
      quantityTotalParticipate: DataTypes.BIGINT,
      quantityRegistered: DataTypes.BIGINT,
      vehicle: DataTypes.STRING,
      viewVisit: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "Tour",
    }
  );
  return Tour;
};
