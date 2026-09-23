const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to DataBase");
  } catch (err) {
    console.log("error while connecting to DB", err);
  }
};
module.exports = connectToDB;
