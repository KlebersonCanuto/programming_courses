require('dotenv').config();

const database = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  dialect: "mysql",
};

module.exports = database;