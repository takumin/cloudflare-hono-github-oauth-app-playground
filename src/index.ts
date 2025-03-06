import { Hono } from "hono";

type Bindings = {
	GITHUB_CLIENT_ID: string;
	GITHUB_CLIENT_SECRET: string;
	GITHUB_REDIRECT_URI: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
	return c.text("GitHub OAuth App Hello World!");
});

app.get("/login", (c) => {
	const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");

	githubAuthUrl.searchParams.append("client_id", c.env.GITHUB_CLIENT_ID);
	githubAuthUrl.searchParams.append("redirect_uri", c.env.GITHUB_REDIRECT_URI);
	githubAuthUrl.searchParams.append("scope", "read:user user:email");

	return c.redirect(githubAuthUrl.toString());
});

app.get("/callback", async (c) => {
	const url = new URL(c.req.url);
	const code = url.searchParams.get("code");

	if (!code) {
		return c.text("Missing authorization code", 400);
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
				client_id: c.env.GITHUB_CLIENT_ID,
				client_secret: c.env.GITHUB_CLIENT_SECRET,
				code: code,
				redirect_uri: c.env.GITHUB_REDIRECT_URI,
			}),
		},
	);
	const tokenData = await tokenResponse.json();

	if (!tokenData.access_token) {
		return c.text("Failed to obtain access token", 400);
	}

	const accessToken = tokenData.access_token;

	const userResponse = await fetch("https://api.github.com/user", {
		headers: { Authorization: `Bearer ${accessToken}` },
	});
	const userData = await userResponse.json();

	return c.json(userData);
});

export default app;
