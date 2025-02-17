# Project Setup

## Initial Setup

1. Install project dependencies:
```bash
bun install
```

2. Link your project to Vercel:
```bash
bun run vercel link
```

3. Pull environment variables:
```bash
bun run vercel env pull
```

## Adding UI Components

This project uses shadcn/ui canary version. Do not use the latest version.

To add new components:
```bash
bunx --bun shadcn-ui@canary add <component>
```

Example:
```bash
bunx --bun shadcn-ui@canary add button
```

## Development

```bash
bun install
bun run dev        # Start the Next.js development server
bun run dev:inngest # Start the Inngest development server (in a separate terminal)
```

## Deployment

This project is deployed on [Vercel](https://vercel.com). Deployments are automatically triggered when pushing to the main branch.

For manual deployments:
```bash
bun run vercel
```
