import express from "express";
import {
  changePassword,
  login,
  register,
  resetPassword,
  verifyOTP,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/reset-password", resetPassword);
router.post("/verifyOTP", verifyOTP);
router.post("/changePassword",changePassword);

export default router;
