import Task from "../models/Task.js";
import Project from "../models/Project.js";
import Activity from "../models/Activity.js";

export async function getTasks(req, res) {
    try {
        const tasks = await Task.find({ user: req.user._id })
            .populate("project", "name status")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        console.error("Get tasks error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch tasks",
        });
    }
}

export async function createTask(req, res) {
    try {
        const project = await Project.findOne({
            _id: req.body.project,
            user: req.user._id,
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        const task = await Task.create({
            user: req.user._id,
            project: project._id,
            title: req.body.title,
            description: req.body.description || "",
            status: req.body.status || "backlog",
            priority: req.body.priority || "Medium",
            dueDate: req.body.dueDate || "No due date",
            points: req.body.points || 3,
            tags: req.body.tags || [],
        });

        await Project.findByIdAndUpdate(project._id, {
            $inc: { tasksCount: 1 },
        });

        await Activity.create({
            user: req.user._id,
            project: project._id,
            type: "task",
            title: `Created task: ${task.title}`,
            description: `New task added under ${project.name}.`,
            status: "created",
            actor: req.user.name,
        });

        const populatedTask = await Task.findById(task._id).populate(
            "project",
            "name status"
        );

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: populatedTask,
        });
    } catch (error) {
        console.error("Create task error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create task",
        });
    }
}

export async function updateTask(req, res) {
    try {
        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id,
            },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).populate("project", "name status");

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task,
        });
    } catch (error) {
        console.error("Update task error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update task",
        });
    }
}

export async function deleteTask(req, res) {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        await Project.findByIdAndUpdate(task.project, {
            $inc: { tasksCount: -1 },
        });

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.error("Delete task error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete task",
        });
    }
}