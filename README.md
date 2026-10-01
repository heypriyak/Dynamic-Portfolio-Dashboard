# Octa Byte Capital

Portfolio dashboard built for the Octa Byte AI case study using Next.js, React, TypeScript and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Implementation notes

- The portfolio snapshot is kept in `src/app/page.tsx` and mirrors the supplied 29-holding report across six sectors.
- `/api/market` requests CMP from Yahoo Finance every 10 seconds and returns the saved snapshot if the unofficial endpoint is unavailable.
- Google Finance does not provide a supported public API. P/E and latest earnings are represented by the supplied report snapshot, with the limitation shown in the UI instead of pretending the values are live.
- The client refreshes prices every 15 seconds and calculates present value, gain/loss, portfolio weight and sector summaries from the same rows.
- No API keys are exposed in browser code. Public finance endpoints can change or rate-limit requests, so production use would add a provider adapter, cache, and scheduled server-side updates.

## Checks

```bash
npm run lint
npm run build
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
