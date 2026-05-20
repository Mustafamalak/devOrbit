import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
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
            required: true,
        },

        title: {
            type: String,
            required: [true, "Task title is required"],
            trim: true,
            maxlength: [160, "Task title cannot exceed 160 characters"],
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        status: {
            type: String,
            enum: ["backlog", "progress", "review", "done"],
            default: "backlog",
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High", "Critical"],
            default: "Medium",
        },

        dueDate: {
            type: String,
            default: "No due date",
        },

        points: {
            type: Number,
            default: 3,
            min: 1,
            max: 21,
        },

        tags: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;