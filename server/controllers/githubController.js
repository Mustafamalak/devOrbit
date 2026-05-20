import jwt from "jsonwebtoken";
import User from "../models/User.js";

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