import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import githubRoutes from "./routes/githubRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.PRODUCTION_CLIENT_URL,
].filter(Boolean);

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "DevOrbit API is running",
        service: "DevOrbit Backend",
        version: "1.0.0",
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "healthy",
        service: "DevOrbit Backend",
        timestamp: new Date().toISOString(),
    });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`DevOrbit API running on port ${PORT}`);
    });
});