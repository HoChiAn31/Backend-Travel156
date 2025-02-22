const userRoute = require("./user");
const hotelRoute = require("./hotel");
const tourRoute = require("./tour");
const roomRoute = require("./room");
const hotelBookings = require("./hotelBookings");
const tourBookings = require("./tourBookings");
const reviewRoute = require("./reviews");
const promotionRoute = require("./promotion");
const favouriteRoute = require("./favourite");
const paymentRoute = require("./payment");
const tourScheduleRoute = require("./tourschedule");
const tourIntroductionRoute = require("./tourintroduction");
const authRoute = require("./auth");
const userLocationRoute = require("./usertour");
const userHotelRoutes = require("./userHotel");
const categoriesHelpsRoute = require("./categoriesHelps");
const categoriesQuestionDetailsRoute = require("./questions");
const questionAnswerRoute = require("./questionAnswer");
module.exports = function (app, sequelize) {
  app.use("/users", userRoute);
  app.use("/hotels", hotelRoute);
  app.use("/tours", tourRoute);
  app.use("/rooms", roomRoute);
  app.use("/hotelBookings", hotelBookings);
  app.use("/tourBookings", tourBookings);
  app.use("/reviews", reviewRoute);
  app.use("/promotions", promotionRoute);
  app.use("/favourites", favouriteRoute);
  app.use("/payments", paymentRoute);
  app.use("/tourSchedules", tourScheduleRoute);
  app.use("/tourIntroductions", tourIntroductionRoute);
  app.use("/login", authRoute);
  app.use("/userLocations", userLocationRoute);
  app.use("/userHotels", userHotelRoutes);
  app.use("/categoriesHelps", categoriesHelpsRoute);
  app.use("/questions", categoriesQuestionDetailsRoute);
  app.use("/questionAnswer", questionAnswerRoute);
};
