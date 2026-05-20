import express from "express";
import { getSprintSummary } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/sprint-summary", getSprintSummary);

export default router;