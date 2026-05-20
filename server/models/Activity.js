import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            default: null,
        },

        type: {
            type: String,
            enum: ["commit", "pull_request", "issue", "deploy", "review", "bug", "task", "project"],
            default: "project",
        },

        title: {
            type: String,
            required: [true, "Activity title is required"],
            trim: true,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        branch: {
            type: String,
            default: "main",
        },

        status: {
            type: String,
            enum: ["success", "merged", "warning", "reviewed", "fixed", "created"],
            default: "created",
        },

        actor: {
            type: String,
            default: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;