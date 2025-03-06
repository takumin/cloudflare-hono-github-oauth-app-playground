# cloudflare-hono-github-oauth-app-playground

To install dependencies:

```bash
brew install aquaproj/aqua/aqua
aqua install
bun install
```

To run:

```bash
bun run src/index.ts
```

To deploy:

In the Cloudflare Workers admin panel, create a project with the following name:

`github-oauth-app-hello-world`

Create the following secret variables in your Cloudflare Workers project:

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

```bash
wrangler deploy
```

Access the URL below:

`https://github-oauth-app-hello-world.tmfam.workers.dev/login`
