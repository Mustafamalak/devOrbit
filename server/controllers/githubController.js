import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Project from "../models/Project.js";
import Activity from "../models/Activity.js";

function buildGithubAuthUrl(userId) {
    const params = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID,
        redirect_uri: process.env.GITHUB_CALLBACK_URL,
        scope: "read:user user:email repo",
        state: userId.toString(),
    });

    return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

export async function startGithubOAuth(req, res) {
    try {
        const authUrl = buildGithubAuthUrl(req.user._id);

        return res.status(200).json({
            success: true,
            authUrl,
        });
    } catch (error) {
        console.error("Start GitHub OAuth error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to start GitHub OAuth",
        });
    }
}

export async function githubCallback(req, res) {
    try {
        const { code, state } = req.query;

        if (!code || !state) {
            return res.redirect(
                `${process.env.GITHUB_FRONTEND_REDIRECT}?github=failed`
            );
        }

        const tokenResponse = await fetch(
            "https://github.com/login/oauth/access_token",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code,
                    redirect_uri: process.env.GITHUB_CALLBACK_URL,
                }),
            }
        );

        const tokenData = await tokenResponse.json();

        if (!tokenData.access_token) {
            console.error("GitHub token error:", tokenData);

            return res.redirect(
                `${process.env.GITHUB_FRONTEND_REDIRECT}?github=failed`
            );
        }

        const profileResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
                Accept: "application/vnd.github+json",
                "User-Agent": "DevOrbit",
            },
        });

        const profile = await profileResponse.json();

        if (!profile?.login) {
            return res.redirect(
                `${process.env.GITHUB_FRONTEND_REDIRECT}?github=failed`
            );
        }

        const decodedStateUserId = state;

        await User.findByIdAndUpdate(decodedStateUserId, {
            githubConnected: true,
            githubUsername: profile.login,
            githubProfileUrl: profile.html_url,
            githubAvatar: profile.avatar_url,
            githubAccessToken: tokenData.access_token,
        });

        return res.redirect(
            `${process.env.GITHUB_FRONTEND_REDIRECT}?github=connected`
        );
    } catch (error) {
        console.error("GitHub callback error:", error);

        return res.redirect(
            `${process.env.GITHUB_FRONTEND_REDIRECT}?github=failed`
        );
    }
}

export async function getGithubStatus(req, res) {
    try {
        const user = await User.findById(req.user._id);

        return res.status(200).json({
            success: true,
            github: {
                connected: user.githubConnected,
                username: user.githubUsername,
                profileUrl: user.githubProfileUrl,
                avatar: user.githubAvatar,
            },
        });
    } catch (error) {
        console.error("GitHub status error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch GitHub status",
        });
    }
}

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

function inferStackFromRepo(repo) {
    const stack = [];

    if (repo.language) {
        stack.push(repo.language);
    }

    const name = `${repo.name || ""} ${repo.description || ""}`.toLowerCase();

    if (name.includes("next")) stack.push("Next.js");
    if (name.includes("react")) stack.push("React");
    if (name.includes("node")) stack.push("Node.js");
    if (name.includes("express")) stack.push("Express");
    if (name.includes("mongo")) stack.push("MongoDB");
    if (name.includes("tailwind")) stack.push("Tailwind CSS");
    if (name.includes("three")) stack.push("Three.js");
    if (name.includes("ai")) stack.push("AI");

    return [...new Set(stack)].filter(Boolean);
}

export async function getGithubRepos(req, res) {
    try {
        const user = await User.findById(req.user._id).select("+githubAccessToken");

        if (!user?.githubConnected || !user?.githubAccessToken) {
            return res.status(400).json({
                success: false,
                message: "GitHub is not connected",
            });
        }

        const response = await fetch(
            "https://api.github.com/user/repos?sort=updated&per_page=50&type=owner",
            {
                headers: {
                    Authorization: `Bearer ${user.githubAccessToken}`,
                    Accept: "application/vnd.github+json",
                    "User-Agent": "DevOrbit",
                },
            }
        );

        const repos = await response.json();

        if (!response.ok) {
            console.error("GitHub repos error:", repos);

            return res.status(500).json({
                success: false,
                message: "Failed to fetch GitHub repositories",
            });
        }

        const existingProjects = await Project.find({
            user: req.user._id,
            source: "github",
        }).select("githubRepoId");

        const importedRepoIds = new Set(
            existingProjects.map((project) => project.githubRepoId)
        );

        const normalizedRepos = repos.map((repo) => ({
            id: String(repo.id),
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description || "",
            private: repo.private,
            htmlUrl: repo.html_url,
            language: repo.language || "Unknown",
            stars: repo.stargazers_count || 0,
            forks: repo.forks_count || 0,
            openIssues: repo.open_issues_count || 0,
            defaultBranch: repo.default_branch || "main",
            updatedAt: repo.updated_at,
            alreadyImported: importedRepoIds.has(String(repo.id)),
        }));

        return res.status(200).json({
            success: true,
            repos: normalizedRepos,
        });
    } catch (error) {
        console.error("Get GitHub repos error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch GitHub repositories",
        });
    }
}

export async function importGithubRepos(req, res) {
    try {
        const { repos } = req.body;

        if (!Array.isArray(repos) || repos.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Select at least one repository to import",
            });
        }

        const currentProjectCount = await Project.countDocuments({
            user: req.user._id,
        });

        const importedProjects = [];

        for (let index = 0; index < repos.length; index += 1) {
            const repo = repos[index];

            const existingProject = await Project.findOne({
                user: req.user._id,
                source: "github",
                githubRepoId: String(repo.id),
            });

            if (existingProject) {
                continue;
            }

            const orbitFields = buildOrbitFields(currentProjectCount + index);

            const project = await Project.create({
                user: req.user._id,
                name: repo.name,
                category: repo.private ? "Private GitHub Repository" : "GitHub Repository",
                description:
                    repo.description ||
                    `Imported from GitHub repository ${repo.fullName || repo.name}.`,
                status: repo.openIssues > 5 ? "Warning" : "Healthy",
                priority: repo.openIssues > 5 ? "High" : "Medium",
                health: repo.openIssues > 5 ? 68 : 86,
                progress: 50,
                deadline: "No deadline",
                stack: inferStackFromRepo(repo),
                tasksCount: 0,
                bugsCount: Number(repo.openIssues || 0),
                commitsCount: 0,
                source: "github",
                githubRepoId: String(repo.id),
                githubUrl: repo.htmlUrl,
                ...orbitFields,
            });

            await Activity.create({
                user: req.user._id,
                project: project._id,
                type: "project",
                title: `Imported GitHub repo ${repo.name}`,
                description: `${repo.fullName || repo.name} was imported into DevOrbit.`,
                branch: repo.defaultBranch || "main",
                status: "created",
                actor: req.user.name,
            });

            importedProjects.push(project);
        }

        return res.status(201).json({
            success: true,
            message: `${importedProjects.length} repositories imported successfully`,
            projects: importedProjects,
        });
    } catch (error) {
        console.error("Import GitHub repos error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to import GitHub repositories",
        });
    }
}

export async function syncGithubCommits(req, res) {
    try {
        const user = await User.findById(req.user._id).select("+githubAccessToken");

        if (!user?.githubConnected || !user?.githubAccessToken) {
            return res.status(400).json({
                success: false,
                message: "GitHub is not connected",
            });
        }

        const githubProjects = await Project.find({
            user: req.user._id,
            source: "github",
            githubUrl: { $ne: "" },
        });

        if (githubProjects.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No imported GitHub repositories found",
            });
        }

        const createdActivities = [];

        for (const project of githubProjects) {
            const repoPath = project.githubUrl.replace("https://github.com/", "");

            if (!repoPath || !repoPath.includes("/")) {
                continue;
            }

            const response = await fetch(
                `https://api.github.com/repos/${repoPath}/commits?per_page=10`,
                {
                    headers: {
                        Authorization: `Bearer ${user.githubAccessToken}`,
                        Accept: "application/vnd.github+json",
                        "User-Agent": "DevOrbit",
                    },
                }
            );

            const commits = await response.json();

            if (!response.ok || !Array.isArray(commits)) {
                console.error("GitHub commits error:", commits);
                continue;
            }

            let newCommitCount = 0;

            for (const commit of commits) {
                const sha = commit.sha;
                const message = commit.commit?.message || "GitHub commit";
                const author =
                    commit.commit?.author?.name || commit.author?.login || req.user.name;

                const existingActivity = await Activity.findOne({
                    user: req.user._id,
                    project: project._id,
                    type: "commit",
                    title: message.split("\n")[0],
                    branch: sha.slice(0, 7),
                });

                if (existingActivity) {
                    continue;
                }

                const activity = await Activity.create({
                    user: req.user._id,
                    project: project._id,
                    type: "commit",
                    title: message.split("\n")[0],
                    description: `Synced from GitHub repository ${repoPath}. Commit SHA: ${sha.slice(
                        0,
                        7
                    )}`,
                    branch: sha.slice(0, 7),
                    status: "success",
                    actor: author,
                });

                createdActivities.push(activity);
                newCommitCount += 1;
            }

            if (newCommitCount > 0) {
                await Project.findByIdAndUpdate(project._id, {
                    $inc: {
                        commitsCount: newCommitCount,
                    },
                });
            }
        }

        return res.status(200).json({
            success: true,
            message: `${createdActivities.length} new commits synced`,
            activities: createdActivities,
        });
    } catch (error) {
        console.error("Sync GitHub commits error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to sync GitHub commits",
        });
    }
}