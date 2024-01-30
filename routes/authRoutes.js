import express from "express";
import {
  login,
  register,
  resetPassword,
  verifyOTP,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/reset-password", resetPassword);
router.post('/verifyOTP',verifyOTP)

export default router;
