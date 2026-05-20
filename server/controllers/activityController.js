import Activity from "../models/Activity.js";

export async function getActivities(req, res) {
    try {
        const activities = await Activity.find({ user: req.user._id })
            .populate("project", "name status")
            .sort({ createdAt: -1 })
            .limit(50);

        return res.status(200).json({
            success: true,
            activities,
        });
    } catch (error) {
        console.error("Get activities error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch activities",
        });
    }
}

export async function createActivity(req, res) {
    try {
        const activity = await Activity.create({
            user: req.user._id,
            project: req.body.project || null,
            type: req.body.type || "project",
            title: req.body.title,
            description: req.body.description || "",
            branch: req.body.branch || "main",
            status: req.body.status || "created",
            actor: req.user.name,
        });

        return res.status(201).json({
            success: true,
            message: "Activity created successfully",
            activity,
        });
    } catch (error) {
        console.error("Create activity error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create activity",
        });
    }
}