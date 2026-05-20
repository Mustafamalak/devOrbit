import express from "express";
import {
    createActivity,
    getActivities,
} from "../controllers/activityController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getActivities).post(createActivity);

export default router;