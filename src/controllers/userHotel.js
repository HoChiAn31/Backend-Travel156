const models = require("../models/index");
const User = models.User;
const UserHotel = models.UserHotel;
const Hotel = models.Hotel;
const Sequelize = require("sequelize");

const createUserHotel = async (req, res) => {
  const userId = req.params.userId;
  const { city } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const [userHotel, created] = await UserHotel.findOrCreate({
      where: { userId, city },
    });

    res.status(201).json(userHotel);
  } catch (error) {
    console.error("Error creating user hotel:", error);
    res.status(500).send("Server Error");
  }
};

const getUserHotelRecommendationHotels = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId, {
      include: [{ model: UserHotel }],
    });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const userHotels = user.UserHotels;
    if (!userHotels.length) {
      return res.status(200).json({ recommendations: [] });
    }
    const interestedCities = userHotels
      .sort((hotel1, hotel2) => {
        return new Date(hotel2.createdAt) - new Date(hotel1.createdAt);
      })
      .map((hotel) => hotel.city);

    const recommendedTours = await Hotel.findAll({
      where: {
        city: interestedCities,
      },
      order: [
        Sequelize.literal(
          `FIELD(city, ${interestedCities
            .map((city) => `'${city}'`)
            .join(", ")})`
        ),
        ["createdAt", "DESC"],
      ],
    });

    res.json({ recommendations: recommendedTours });
  } catch (error) {
    console.error("Error fetching user hotel recommendations:", error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createUserHotel,
  getUserHotelRecommendationHotels,
};
