const cloudinary = require("cloudinary");
const dotenv = require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDNARY1_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY1_API_SCERET,
});

module.exports = cloudinary;
