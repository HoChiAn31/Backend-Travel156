const models = require("../models/index");
const User = models.User;
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email && password) {
    // Tìm user trong database
    User.findOne({
      where: {
        email: email,
        password: password,
      },
    })
      .then((user) => {
        if (user) {
          // Tạo token nếu tìm thấy user
          const token = jwt.sign(
            {
              id_user: user.id,
              nameUser: user.full_name,
              email: user.email,
              role: user.role,
            },
            "secret_key"
          );
          res.json({ token });
        } else {
          res.status(401).send("incorrect");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal server error");
      });
  }
};
let otpStore = {};
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME, // Thay bằng email của bạn
    pass: process.env.EMAIL_PASSWORD, // Thay bằng mật khẩu của bạn
  },
});

exports.sendOtp = (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore[email] = otp;

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Mã OTP của bạn",
    text: `Mã OTP của bạn là ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error sending OTP");
    }
    res.status(200).send("OTP sent");
  });
};

exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] === otp) {
    delete otpStore[email];
    res.status(200).send("OTP verified");
  } else {
    res.status(400).send("Invalid OTP");
  }
};
