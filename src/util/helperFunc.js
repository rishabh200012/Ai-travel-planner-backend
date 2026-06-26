import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: userMail,
      subject: "OTP Verification",
      html: `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px;">
          <h2>Email Verification</h2>

          <p>Your OTP for email verification is:</p>

          <h1 style="letter-spacing:8px; color:#2563eb;">
            ${otp}
          </h1>

          <p>This OTP will expire in <b>10 minutes</b>.</p>

          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    console.log("OTP Email Sent Successfully");
  } catch (error) {
    console.error("Resend Error:", error);
    throw error;
  }
};
