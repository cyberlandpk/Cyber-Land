# Cyber Land

Production-ready Next.js 15 storefront for **Cyber Land** — laptops, gaming PCs, computer hardware, and tech accessories.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript (strict)
- Tailwind CSS v4 · Framer Motion
- Zustand · TanStack Query · Axios
- React Hook Form · Zod

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Important: dev and build don't mix

`next dev` and `next build` share the `.next` directory. Running both at the
same time corrupts the build output (`Cannot find module for page: /_error`,
missing `required-server-files.json`). Before building:

```bash
# Stop the dev server first, then:
npm run clean     # cross-platform removal of .next
npm run build
```

## WooCommerce integration

Product data comes from the WooCommerce REST API when configured; a small local
catalog is merged in as a fallback. Configure via `.env.local` (never commit
real keys — they are git-ignored):

```
NEXT_PUBLIC_WORDPRESS_URL=https://your-store.example.com
WC_CONSUMER_KEY=ck_...
WC_CONSUMER_SECRET=cs_...
```

WooCommerce credentials are used **server-side only** (HTTP Basic auth header)
and never appear in client code, HTML, or URLs.

### Store maintenance scripts

```bash
node --env-file=.env.local scripts/test-backend.mjs
node --env-file=.env.local scripts/create-subcategories.mjs
```

Scripts read credentials from the environment only and never log secret values.

## Quality gates (must pass before deploy)

```bash
npm run type-check
npm run lint
npm run build
# or all:
npm run verify
```

## Vercel deployment

1. Push this repo to GitHub (include the full `src/` folder).
2. Import the project in [Vercel](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected).
4. Optional env:
   - `NEXT_PUBLIC_SITE_URL` — production domain (e.g. `https://your-app.vercel.app`)
5. Deploy. Build command: `npm run build`. Output: `.next`.

### GitHub → Vercel

Connect the GitHub repository; every push to `main` triggers a production deploy.

## Project structure

See [ARCHITECTURE.md](./ARCHITECTURE.md).

```
src/
  app/           # Routes, sitemap, robots
  features/      # Domain modules
  components/    # UI, layout, sections
  services/      # API layer
  store/         # Zustand
  types/ config/ constants/ utils/ styles/
```

## SEO

- `src/app/sitemap.ts` — dynamic sitemap
- `src/app/robots.ts` — robots.txt
- Per-route `metadata` / `generateMetadata`
