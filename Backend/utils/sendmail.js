import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // or 465 for SSL
  secure: false, // true for 465
  auth: {
    user: "your-email@gmail.com",
    pass: "your-16-character-app-password",
  },
});

const sendMail = async (otp) => {
  await transporter.sendMail({
    from: '"Your App" <your-email@gmail.com>',
    to: "recipient@example.com",
    subject: `Your OTP ${otp}`,
    html: `<strong>Your OTP is ${otp}</strong>`,
  });

  console.log("Email sent!");
};

module.exports = sendMail;
