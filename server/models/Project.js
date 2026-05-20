import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        name: {
            type: String,
            required: [true, "Project name is required"],
            trim: true,
            maxlength: [80, "Project name cannot exceed 80 characters"],
        },

        category: {
            type: String,
            default: "Developer Project",
            trim: true,
        },

        description: {
            type: String,
            default: "",
            trim: true,
            maxlength: [600, "Description cannot exceed 600 characters"],
        },

        status: {
            type: String,
            enum: ["Healthy", "Warning", "Critical", "Prototype"],
            default: "Prototype",
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High", "Critical"],
            default: "Medium",
        },

        health: {
            type: Number,
            default: 70,
            min: 0,
            max: 100,
        },

        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        deadline: {
            type: String,
            default: "No deadline",
        },

        stack: {
            type: [String],
            default: [],
        },

        tasksCount: {
            type: Number,
            default: 0,
        },

        bugsCount: {
            type: Number,
            default: 0,
        },

        commitsCount: {
            type: Number,
            default: 0,
        },

        source: {
            type: String,
            enum: ["manual", "github"],
            default: "manual",
        },

        githubRepoId: {
            type: String,
            default: "",
        },

        githubUrl: {
            type: String,
            default: "",
        },

        orbitColor: {
            type: String,
            default: "#ff4ecd",
        },

        orbitRadius: {
            type: Number,
            default: 3.2,
        },

        orbitSpeed: {
            type: Number,
            default: 0.3,
        },

        orbitSize: {
            type: Number,
            default: 0.34,
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;