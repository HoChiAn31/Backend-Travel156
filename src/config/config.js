const dotenv = require("dotenv");
const path = require("path");
const { Transaction } = require("sequelize");

require("dotenv").config();
dotenv.config();
// module.exports = {
//   database: process.env.DB_NAME,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   // port: process.env.DB_PORT,
//   dialect: process.env.DB_DIALECT,
//   logging: false,

//   timezone: "+07:00",
//   isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
//   jwt_secret: "NodejsApiAuthentication",
//   // development: {
//   //   // your database config
//   //   logging: console.log, // Add logging option to see database queries and connection details
//   // },
// };
module.exports = {
  database: process.env.MYSQL_ADDON_DB,
  username: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  host: process.env.MYSQL_ADDON_HOST,
  // port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  logging: false,
  timezone: "+07:00",
  isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
  jwt_secret: "NodejsApiAuthentication",
  // define: {
  //   // Chuyển đổi tên bảng thành dạng thường (lowercase)
  //   underscored: true,
  // },
  // development: {
  //   // your database config
  //   logging: console.log, // Add logging option to see database queries and connection details
  // },
};
