const models = require("../models/index");
const User = models.User;
const UserTour = models.UserTour;
const Tour = models.Tour;
const Sequelize = require("sequelize");

const createUserTour = async (req, res) => {
  const userId = req.params.userId;
  const { location } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const [userTour, created] = await UserTour.findOrCreate({
      where: { userId, location },
    });

    res.status(201).json(userTour);
  } catch (error) {
    console.error("Error creating user location:", error);
    res.status(500).send("Server Error");
  }
};

const getUserRecommendationTours = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId, {
      include: [{ model: UserTour }],
    });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const userTours = user.UserTours;
    if (!userTours.length) {
      return res.status(200).json({ recommendations: [] });
    }

    const interestedLocations = userTours
      .sort((loc1, loc2) => {
        return new Date(loc2.createdAt) - new Date(loc1.createdAt); // Sắp xếp từ mới nhất đến cũ nhất
      })
      .map((loc) => loc.location);

    // Lấy danh sách các tour đề xuất dựa trên địa điểm quan tâm

    const recommendedTours = await Tour.findAll({
      where: {
        city: interestedLocations,
      },
      //   order: [["createdAt", "DESC"]],
      order: [
        Sequelize.literal(
          `FIELD(city, ${interestedLocations
            .map((city) => `'${city}'`)
            .join(", ")})`
        ),
        ["createdAt", "DESC"], // Sắp xếp thêm theo createdAt giảm dần (hoặc thứ tự khác nếu cần)
      ],
    });

    res.json({ recommendations: recommendedTours });
  } catch (error) {
    console.error("Error fetching user recomm   endations:", error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createUserTour,
  getUserRecommendationTours,
};
