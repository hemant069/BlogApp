const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO, {
      serverSelectionTimeoutMS: 5000, // Prevents long connection delays
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB is connected ${connection.connection.name}`);
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

module.exports = connectDB;
