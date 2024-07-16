require("dotenv").config();
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const User = require("./src/models/user");
const app = express();
const port = process.env.MYSQL_ADDON_PORT || 3000;
const dbConfig = require("./src/config/config");
const routes = require("./src/routes/index");
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    dialectModule: require("mysql2"),
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.error("Error", err);
  });

// Middleware
app.use(bodyParser.json(), cors());
routes(app, sequelize);
// Test route
app.get("/", async (req, res) => {
  // const users = await db.User.findAll();
  // res.json(users);
  res.send("Hello World!");
});
// app.get("/hotels", async (req, res) => {
//   res.send("success hotels");
// });
// app.post("/hotels", async (req, res) => {
//   try {
//     // Attempt to create a new hotel using the data from the request body.
//     const newHotel = await models.Hotel.create(req.body);

//     // If the hotel is created successfully, send a 201 status code with the created hotel data.
//     res.status(201).json(newHotel);
//   } catch (error) {
//     // If an error occurs while creating the hotel, log the error and send a 500 status code with an error message.
//     console.error("Error creating hotel:", error);
//     res.status(500).json({ error: "Error creating hotel" });
//   }
// });

// Start server
app.listen(port, () => console.log(`Listening to port ${port}`));

// Sync database
// db.sequelize
//   .sync()
//   .then(() => {
//     console.log("Database synced");
//   })
//   .catch((err) => {
//     console.log("Error syncing database:", err);
//   });
