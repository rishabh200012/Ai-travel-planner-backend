import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const hashedPass = async (password) => {
  const pass = await bcrypt.hash(password, 10);
  return pass;
};

export const checkPass = async (password, storedPass) => {
  const isMatch = await bcrypt.compare(password, storedPass);
  return isMatch;
};

export const generateJWT = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

export const sendOtpOnMail = async (otp, userMail) => {
  // const transpoter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: process.env.MAIL_ADD,
  //     pass: process.env.MAIL_PASS,
  //   },
  // });
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_ADD,
      pass: process.env.MAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.MAIL_ADD,
    to: userMail,
    subject: "OTP verification",
    text: `Your otp for email verification is ${otp}. This otp will expire in 10 minutes`,
  });
};
