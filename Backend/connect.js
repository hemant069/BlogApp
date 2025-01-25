const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO);
    console.log(`DB is connected ${connection.connection.name}`);
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

module.exports = connectDB;
