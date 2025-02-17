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

## Development

```bash
bun install
bun run dev
```

## Deployment

This project is deployed on [Vercel](https://vercel.com). Deployments are automatically triggered when pushing to the main branch.

For manual deployments:
```bash
bun run vercel
```
