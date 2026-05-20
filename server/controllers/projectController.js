import Project from "../models/Project.js";
import Activity from "../models/Activity.js";
import Task from "../models/Task.js";

function buildOrbitFields(index = 0) {
    const colors = ["#ff4ecd", "#7c3aed", "#fb7185", "#34d399", "#ff8a3d"];
    const radii = [3.1, 4.15, 5.2, 6.05, 6.9];
    const speeds = [0.42, 0.31, 0.25, 0.22, 0.18];
    const sizes = [0.34, 0.42, 0.31, 0.38, 0.29];

    return {
        orbitColor: colors[index % colors.length],
        orbitRadius: radii[index % radii.length],
        orbitSpeed: speeds[index % speeds.length],
        orbitSize: sizes[index % sizes.length],
    };
}

export async function getProjects(req, res) {
    try {
        const projects = await Project.find({ user: req.user._id }).sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            projects,
        });
    } catch (error) {
        console.error("Get projects error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
        });
    }
}

export async function getProjectById(req, res) {
    try {
        const project = await Project.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        return res.status(200).json({
            success: true,
            project,
        });
    } catch (error) {
        console.error("Get project error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch project",
        });
    }
}

export async function createProject(req, res) {
    try {
        const count = await Project.countDocuments({ user: req.user._id });

        const orbitFields = buildOrbitFields(count);

        const project = await Project.create({
            user: req.user._id,
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            status: req.body.status || "Prototype",
            priority: req.body.priority || "Medium",
            health: req.body.health ?? 70,
            progress: req.body.progress ?? 0,
            deadline: req.body.deadline || "No deadline",
            stack: req.body.stack || [],
            tasksCount: req.body.tasksCount || 0,
            bugsCount: req.body.bugsCount || 0,
            commitsCount: req.body.commitsCount || 0,
            source: req.body.source || "manual",
            githubUrl: req.body.githubUrl || "",
            ...orbitFields,
        });

        await Activity.create({
            user: req.user._id,
            project: project._id,
            type: "project",
            title: `Created project ${project.name}`,
            description: `${project.name} was added to the DevOrbit project fleet.`,
            status: "created",
            actor: req.user.name,
        });

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            project,
        });
    } catch (error) {
        console.error("Create project error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create project",
        });
    }
}

export async function updateProject(req, res) {
    try {
        const project = await Project.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id,
            },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project,
        });
    } catch (error) {
        console.error("Update project error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update project",
        });
    }
}

export async function deleteProject(req, res) {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        await Task.deleteMany({
            project: project._id,
            user: req.user._id,
        });

        await Activity.deleteMany({
            project: project._id,
            user: req.user._id,
        });

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    } catch (error) {
        console.error("Delete project error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete project",
        });
    }
}