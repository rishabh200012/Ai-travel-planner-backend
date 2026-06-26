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
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ADD,
      pass: process.env.MAIL_PASS,
    },
  });
  try {
    const info = await transporter.sendMail({
      from: `"AI Travel Planner" <${process.env.MAIL_ADD}>`,
      to: userMail,
      subject: "OTP Verification",
      html: `
        <div style="font-family:Arial,sans-serif">
          <h2>Email Verification</h2>

          <p>Your OTP is</p>

          <h1 style="letter-spacing:8px;color:#2563eb">
            ${otp}
          </h1>

          <p>This OTP expires in 10 minutes.</p>
        </div>
      `,
    });

    console.log("Mail Sent:", info.messageId);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
