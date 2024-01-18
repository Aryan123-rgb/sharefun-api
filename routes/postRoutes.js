import express from "express";
import { createPost, getAllPosts } from "../controllers/postController.js";

const router = express.Router();

router.post("/createPost", createPost);
router.get("/getAllPost", getAllPosts);

export default router;
