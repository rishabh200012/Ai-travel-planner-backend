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
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ADD,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("SMTP Connected");

    await transporter.sendMail({
      from: process.env.MAIL_ADD,
      to: userMail,
      subject: "OTP verification",
      text: `Your otp is ${otp}`,
    });

    console.log("Mail Sent");
  } catch (err) {
    console.error("SMTP ERROR:", err);
    throw err;
  }
};
