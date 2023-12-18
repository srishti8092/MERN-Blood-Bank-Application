const mongoose = require("mongoose");
const colors = require("colors");

const MONGO_URL = "mongodb://localhost:27017/BloodBank";
const connnectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(`Connected to DB  ${mongoose.connection.host}`.bgMagenta.white);
  } catch (error) {
    console.log(`Mongo DB error ${error}`.bgRed.white);
  }
};

module.exports = connnectDB;
