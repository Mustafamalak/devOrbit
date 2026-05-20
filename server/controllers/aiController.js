import Project from "../models/Project.js";
import Task from "../models/Task.js";
import Activity from "../models/Activity.js";

function percentage(part, total) {
    if (!total) return 0;
    return Math.round((part / total) * 100);
}

function getWorkspaceMood({ criticalProjects, warningProjects, pendingTasks }) {
    if (criticalProjects > 0) return "Critical";
    if (warningProjects > 0 || pendingTasks > 8) return "Needs Attention";
    if (pendingTasks === 0) return "Clean";
    return "Stable";
}

export async function getSprintSummary(req, res) {
    try {
        const [projects, tasks, activities] = await Promise.all([
            Project.find({ user: req.user._id }).sort({ createdAt: -1 }),
            Task.find({ user: req.user._id }).populate("project", "name status"),
            Activity.find({ user: req.user._id })
                .populate("project", "name status")
                .sort({ createdAt: -1 })
                .limit(30),
        ]);

        const doneTasks = tasks.filter((task) => task.status === "done").length;
        const pendingTasks = tasks.length - doneTasks;

        const criticalProjects = projects.filter(
            (project) => project.status === "Critical"
        ).length;

        const warningProjects = projects.filter(
            (project) => project.status === "Warning"
        ).length;

        const totalBugs = projects.reduce(
            (sum, project) => sum + Number(project.bugsCount || 0),
            0
        );

        const totalCommits = projects.reduce(
            (sum, project) => sum + Number(project.commitsCount || 0),
            0
        );

        const averageHealth =
            projects.length === 0
                ? 0
                : Math.round(
                    projects.reduce(
                        (sum, project) => sum + Number(project.health || 0),
                        0
                    ) / projects.length
                );

        const taskClosureRate = percentage(doneTasks, tasks.length);

        const workspaceMood = getWorkspaceMood({
            criticalProjects,
            warningProjects,
            pendingTasks,
        });

        let headline = "Your DevOrbit workspace is ready for project tracking.";

        if (projects.length > 0) {
            headline = `Your workspace is ${workspaceMood.toLowerCase()} with ${projects.length} project${projects.length > 1 ? "s" : ""
                }, ${tasks.length} task${tasks.length !== 1 ? "s" : ""}, and ${activities.length
                } recent activity event${activities.length !== 1 ? "s" : ""}.`;
        }

        const strengths = [];

        if (averageHealth >= 75) {
            strengths.push(`Average project health is strong at ${averageHealth}%.`);
        }

        if (taskClosureRate >= 50) {
            strengths.push(`Task closure rate is healthy at ${taskClosureRate}%.`);
        }

        if (totalCommits > 0) {
            strengths.push(`${totalCommits} commits are tracked across projects.`);
        }

        if (strengths.length === 0) {
            strengths.push("Your structure is ready; add more data to generate stronger insights.");
        }

        const risks = [];

        if (criticalProjects > 0) {
            risks.push(`${criticalProjects} critical project needs immediate attention.`);
        }

        if (warningProjects > 0) {
            risks.push(`${warningProjects} warning-level project should be reviewed.`);
        }

        if (totalBugs > 0) {
            risks.push(`${totalBugs} open bug${totalBugs > 1 ? "s" : ""} may reduce project health.`);
        }

        if (pendingTasks > 0) {
            risks.push(`${pendingTasks} pending task${pendingTasks > 1 ? "s" : ""} still need closure.`);
        }

        if (risks.length === 0) {
            risks.push("No major risk detected from current workspace data.");
        }

        const actions = [];

        if (criticalProjects > 0 || warningProjects > 0) {
            actions.push("Review risky projects first before adding new features.");
        }

        if (pendingTasks > 0) {
            actions.push("Move completed work to Done so analytics reflect sprint progress.");
        }

        if (totalBugs > 0) {
            actions.push("Prioritize bug cleanup to improve average health score.");
        }

        if (projects.length === 0) {
            actions.push("Create or import GitHub projects to activate the full dashboard.");
        }

        if (activities.length === 0) {
            actions.push("Add activities or sync GitHub commits to enrich the timeline.");
        }

        if (actions.length === 0) {
            actions.push("Continue syncing commits and updating task statuses regularly.");
        }

        return res.status(200).json({
            success: true,
            summary: {
                headline,
                workspaceMood,
                averageHealth,
                taskClosureRate,
                totalProjects: projects.length,
                totalTasks: tasks.length,
                doneTasks,
                pendingTasks,
                totalActivities: activities.length,
                totalBugs,
                totalCommits,
                strengths,
                risks,
                actions,
                generatedAt: new Date().toISOString(),
            },
        });
    } catch (error) {
        console.error("AI sprint summary error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate sprint summary",
        });
    }
}