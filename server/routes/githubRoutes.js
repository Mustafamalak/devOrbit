import express from "express";
import {
    getGithubStatus,
    githubCallback,
    startGithubOAuth,
} from "../controllers/githubController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/connect", protect, startGithubOAuth);
router.get("/callback", githubCallback);
router.get("/status", protect, getGithubStatus);

export default router;