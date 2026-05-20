import express from "express";
import {
    getGithubRepos,
    getGithubStatus,
    githubCallback,
    importGithubRepos,
    startGithubOAuth,
    syncGithubCommits,
} from "../controllers/githubController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/connect", protect, startGithubOAuth);
router.get("/callback", githubCallback);
router.get("/status", protect, getGithubStatus);
router.get("/repos", protect, getGithubRepos);
router.post("/import", protect, importGithubRepos);
router.post("/sync-commits", protect, syncGithubCommits);

export default router;