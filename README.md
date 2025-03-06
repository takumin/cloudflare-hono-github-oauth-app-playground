# bun-langchainjs-playground

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

- Create the following secret variables in your Cloudflare Workers project:
  - `GITHUB_CLIENT_ID`
  - `GITHUB_CLIENT_SECRET`
- Create the following environment variables in your Cloudflare Workers project:
  - `GITHUB_REDIRECT_URI`

```bash
wrangler deploy
```
