import express from "express";
import {
  acceptFriendRequest,
  fetchLoggedInUserData,
  sendFriendRequest,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:userId", fetchLoggedInUserData);
router.post("/sentFriendRequest", sendFriendRequest);
router.post("/acceptFriendRequest", acceptFriendRequest);

export default router;
