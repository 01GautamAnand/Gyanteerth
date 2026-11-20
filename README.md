# Gyanteerth Educational Society

Public website built with React, TypeScript, Vite, Tailwind CSS, and server-side rendering.

## Requirements

- Node.js 22.22.0 or newer
- npm 10 or newer

## Start locally

```bash
npm ci
npm run dev
```

Vite serves the site at `http://localhost:5173` by default. The development server also handles the contact API and SSR routes.

To run the production server locally, build both bundles and start the SSR server:

```bash
npm run build
npm start
```

The production server listens on `PORT` (default `3000`) and serves the built client assets and SSR pages.

## Elastic Beanstalk

Run `npm run build` before creating a deployment bundle. The `.ebignore` file excludes local dependencies, credentials, and caches while retaining `dist/`, which contains the production server and client bundles. Elastic Beanstalk starts the app with `npm start`.

## Useful commands

- `npm run dev` — start the development server
- `npm run build` — build the client and SSR bundles
- `npm start` — start the production SSR server (requires a prior build)
- `npm run preview` — serve the production client bundle
- `npm run test -- --run` — run the unit tests once
- `npm run test:coverage` — run tests with v8 coverage
- `npm run lint` — lint the project
- `npm run type-check` — run TypeScript checks
- `npm run audit` — check for high-severity dependency advisories
- `npm run clean` — remove build and Vite cache output

## Project layout

```text
export-plugins/       Vite content and media plugins
public/               Static assets and browser scripts
src/components/       Shared React components and UI primitives
src/content/pages/    Validated page content in JSON
src/layouts/          Shared page layouts and header/footer
src/lib/              Shared helpers and site metadata
src/pages/            Public site pages
src/server/           Express API, SEO endpoints, and SSR entry point
src/styles/           Global styles
```

Routes live in `src/routes.tsx`. Page data is validated by `src/content/schemas.ts` and exposed to pages through the virtual content module.

## Contact forms

The site posts `contact-us`, `network-enquiry`, and `membership-enquiry` submissions to `POST /api/contact/:formName`. Their Inbox routing, display titles, and required fields are configured in `src/lib/contact-form.config.json`.

Set `GODADDY_API_BASE_URL` for the upstream environment, or set `VITE_GODADDY_API_HOST` to its host name. The server selects the matching Inbox endpoint for development, test, or production.

## Environment

Copy `env.example` to `.env` when local overrides are needed. `VITE_PUBLIC_URL` supplies the SSR SEO fallback origin. `FRONTEND_DOMAIN` and `ALLOWED_ORIGINS` are optional development-server settings.

## Vite plugins

`vite.config.ts` loads plugins from `export-plugins/` for content validation, media assets, and development API requests.
