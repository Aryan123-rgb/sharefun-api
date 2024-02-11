import express from "express";
import {
  fetchLoggedInUserData,
  sendFriendRequest,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:userId", fetchLoggedInUserData);
router.post("/sentFriendRequest", sendFriendRequest);

export default router;
