const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // or 465 for SSL
  secure: false, // true for 465
  auth: {
    user: "hemantprajapati7860@gmail.com",
    pass: process.env.PASS,
  },
});

// send mail added here

const sendMail = async (otp, usermail) => {
  await transporter.sendMail({
    from: '"Your App" <your-email@gmail.com>',
    to: "recipient@example.com",
    subject: `Your OTP ${otp}`,
    html: `<strong>Your OTP is ${otp}</strong>`,
  });

  console.log("Email sent!");
};

module.exports = { sendMail, transporter };
