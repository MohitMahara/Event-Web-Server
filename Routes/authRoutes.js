import express from "express";
import { Router } from "express";
import {
  registerController,
  loginController,
  signUpWithGoogleController,
  generateOtpController,
  verifyOtpController,
  resetPasswordController,
} from "../Controllers/authController.js";

const router = Router();

// Auth Routes

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/register-google", signUpWithGoogleController);

// Forget Password

router.post("/generate-otp", generateOtpController);

router.post("/verify-otp", verifyOtpController);

router.post("/reset-password", resetPasswordController);

export default router;
