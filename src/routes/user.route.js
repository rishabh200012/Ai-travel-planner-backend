import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getMe,
  userLogin,
  userRegister,
  otpVerification,
  resendOtp,
  logout,
} from "../controller/user.controller.js";

const userRoutes = Router();
userRoutes.get("/me", authMiddleware, getMe);
userRoutes.post("/register", userRegister);

userRoutes.post("/verify-otp", otpVerification);

userRoutes.post("/resend-otp", resendOtp);

userRoutes.post("/login", userLogin);
userRoutes.post("/logout", logout);
export default userRoutes;
