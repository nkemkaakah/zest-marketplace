# Zest — E-commerce capstone

Full-stack e-commerce app per [`SPEC.md`](./SPEC.md): React (TypeScript) + Tailwind on the client, Node + Express on the API.

## Prerequisites

- Node.js 20+ (LTS recommended)
- npm 10+

## Setup

```bash
git clone <your-repo-url> zest
cd zest
npm install
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Run `npm install` once at the **repository root** so npm workspaces install `client/` and `server/` together.

Edit `server/.env` and `client/.env` if ports or origins differ. See the root [`.env.example`](./.env.example) for a combined reference.

**Quick verify after install:** `npm test` (client Jest) and `npm run build` should succeed; `npm run dev` should open the app and show API health when the server is up.

## Run locally

From the repository root:

```bash
npm run dev
```

This starts:

- **Client:** [http://localhost:5173](http://localhost:5173) (Vite)
- **API:** [http://localhost:4000](http://localhost:4000) (Express)

The home page calls `GET /api/health` through `client/src/services/` to verify the stack.

Other scripts:

| Command | Description |
|--------|-------------|
| `npm run build` | Production build for client and server |
| `npm test` | Client unit tests (Jest + Testing Library) |
| `npm run lint` | ESLint on client and server |

## Framework choices

- **React + TypeScript + Vite** — Fast dev feedback, `VITE_*` env vars as in the spec, lazy routes with `React.lazy` + `Suspense`.
- **Tailwind CSS** — Utility-first styling aligned with the Figma-driven UI work in the spec.
- **Express** — Lightweight API for products, cart, and checkout endpoints as you implement them.

## Architecture

- **`client/`** — `src/components/`, `pages/`, `hooks/`, `store/`, `services/` (all HTTP from the app goes through `services/`), `types/`, `utils/`.
- **`server/`** — `src/routes/`, `controllers/`, `middleware/`, `utils/`.
- **Monorepo** — npm workspaces; `concurrently` runs client and server together.

## State management (planned)

The spec asks for a justified choice (Context + `useReducer`, Zustand, Redux Toolkit, etc.) and separation of UI vs server state (e.g. TanStack Query / SWR). The `src/store/` folder is reserved for that; document the final choice here when you add it.

## Assumptions & limitations

- **Zest payment SDK** — Env placeholders only; integration comes in a later milestone.
- **Design** — UI tokens and layouts should follow the Figma linked in `SPEC.md`; the current shell is a neutral scaffold.

## Deployment

Target: Vercel/Netlify for the client, Railway/Render/DigitalOcean for the server. Set `VITE_API_URL` in the frontend environment to the public API URL and configure `CORS_ORIGIN` on the server for the deployed site.
