import express from "express";
import { Router } from "express";
import { registerController, loginController, signUpWithGoogleController, forgetPasswordController, generateOtpController, verifyOtpController, resetPasswordController } from "../Controllers/authController.js";

const router = Router();

// Auth Routes

router.post("/register", registerController);

router.post ("/login", loginController);

router.post ("/register-google", signUpWithGoogleController);

// Forget Password

router.post("/forget-password", forgetPasswordController);

router.post("/generate-otp", generateOtpController);

router.post("/verify-otp", verifyOtpController);

router.post("/reset-password",resetPasswordController);



export default router;