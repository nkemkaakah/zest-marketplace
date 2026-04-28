# Capstone Project — Full E-Commerce Web Application

## Overview

Build a fully functional, production-grade e-commerce web application that accurately implements the provided Figma design. This project evaluates frontend engineering skills across code quality, architecture, scalability, API integration, and payment processing.

**Figma Design:** [Full E-Commerce Website UI/UX Design](https://www.figma.com/design/cGxcEgBdExnwK7WEsIHRH5/Full-E-Commerce-Website-UI-UX-Design--Community-?node-id=1-3&p=f)

***

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React (TypeScript) |
| **Styling** | Tailwind CSS |
| **Backend** | Node.js + Express |
| **Testing** | Jest + React Testing Library |
| **Deployment** | Vercel / Netlify (frontend), Railway / Render / DigitalOcean (backend) |

***

## Project Structure

```
/
├── client/                   # React (TypeScript) frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Route-level page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── store/            # State management
│   │   ├── services/         # API service layer
│   │   ├── types/            # TypeScript interfaces & types
│   │   ├── utils/            # Utility/helper functions
│   │   └── tests/            # Unit tests
│   └── ...
│
├── server/                   # Node.js + Express backend
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── utils/
│   └── ...
│
├── .env.example
└── README.md
```

***

## UI Implementation

### Responsive Design

- Accurately translate the Figma design into a responsive web application.
- Design and implement the **mobile view** independently (not provided in Figma — exercise your design judgment).
- Support three breakpoints: **mobile**, **tablet**, and **desktop**.

### Design Principles

- Follow a **component-driven** approach — every UI element is a reusable component.
- Apply **Tailwind utility classes** consistently; avoid inline styles and arbitrary values where possible.
- Maintain visual fidelity to the Figma design on desktop.

***

## Product Features

### 1. Product Listing Page
- Display products with images, prices, and descriptions.
- Support filtering and/or sorting where applicable in the design.

### 2. Product Detail Page
- Full product view with images, description, price, and stock info.
- Add-to-cart action from this page.

### 3. Cart Management
- Add items to cart.
- Update item quantity.
- Remove items from cart.
- Persist cart state across page navigations (in-memory or via state management).

### 4. Checkout Flow
- Multi-step or single-page checkout UI matching the Figma design.
- Form validation for shipping/payment fields.
- Complete order summary before payment.

***

## Backend Integration

Connect the React frontend to the provided backend APIs for:

- **Fetching products** — product listings and individual product details.
- **Cart management** — if the backend exposes cart endpoints, integrate them; otherwise manage cart state client-side.

### Error Handling Requirements

- Handle all API loading states with appropriate skeleton/spinner UI.
- Display user-friendly error messages on API failures.
- Handle edge cases: empty product lists, out-of-stock items, network errors.
- Use an **API service layer** (`/services/`) to centralise all HTTP calls — never call `fetch`/`axios` directly in components.

***

## Payment Integration

- Integrate the **Zest SDK** for payment processing.
- Use **development credentials only** (not production).
- Simulate a complete checkout experience end-to-end:
  1. User fills in checkout form.
  2. Zest SDK is invoked on submission.
  3. Payment success/failure is handled and reflected in the UI.
- Store SDK keys in **environment variables** — never hardcode credentials.

***

## State Management

- Use a scalable state management solution appropriate for the app's complexity (e.g., React Context + `useReducer`, Zustand, or Redux Toolkit).
- Justify your choice in the README.
- Separate concerns: UI state vs. server/async state (consider React Query or SWR for API data).

***

## Code Quality & Architecture

| Principle | Requirement |
|---|---|
| **DRY** | No duplicated logic or UI — extract to components, hooks, or utilities |
| **Modularity** | Each component, hook, and service has a single responsibility |
| **TypeScript** | Strict types for all props, API responses, and state — avoid `any` |
| **Readability** | Clear naming, consistent formatting (ESLint + Prettier configured) |
| **Documentation** | JSDoc comments on non-obvious functions; inline comments for complex logic |
| **Environment Variables** | All config (API URLs, SDK keys) via `.env` files with `.env.example` provided |

***

## Testing

Write unit tests for **key components and logic** using **Jest** and **React Testing Library**.

### Coverage Areas

| Area | What to Test |
|---|---|
| **Component rendering** | Correct output given props; conditional rendering |
| **State updates** | Cart add/remove/update logic; checkout state transitions |
| **Utility functions** | Price formatting, quantity validation, data transformations |
| **API service layer** | Mocked API calls returning expected data / handling errors |

### Requirements

- Tests live in `__tests__/` folders co-located with their source files, or in `src/tests/`.
- All tests must pass before submission (`npm test` / `yarn test`).
- Aim for meaningful coverage of critical paths — quality over quantity.

***

## Performance & Best Practices

- **Lazy load** route-level components using `React.lazy` + `Suspense`.
- **Memoize** expensive computations with `useMemo`; prevent unnecessary re-renders with `React.memo` and `useCallback` where appropriate.
- **Optimise images** — use appropriate formats, sizes, and `loading="lazy"` on `<img>` tags.
- **Environment variables** for all configuration — use `VITE_` prefix (if using Vite) or `REACT_APP_` prefix (if using CRA).
- **No console errors or warnings** in the final submission.

***

## Deliverables

### 1. GitHub Repository

- Clean, meaningful commit history (conventional commits preferred: `feat:`, `fix:`, `chore:`, etc.).
- `.env.example` file with all required keys (no actual secrets committed).
- Passing test suite.

### 2. README.md

The README must include:

- **Project setup instructions** — clone, install, configure env, run locally.
- **Framework choice and justification** — why React + TypeScript + Tailwind + Express.
- **Architecture overview** — folder structure, state management approach, API layer design.
- **Assumptions made** — decisions taken where the spec or Figma was ambiguous.
- **Known limitations** — anything incomplete, deferred, or out of scope.

### 3. Live Deployment

- Frontend deployed to **Vercel** or **Netlify**.
- Backend deployed to a public URL (Railway, Render, DigitalOcean App Platform, etc.).
- Share both URLs in the README.

***

## Evaluation Criteria

| Criterion | Weight |
|---|---|
| Code structure and scalability | High |
| UI accuracy and responsiveness | High |
| DRY principles and component reuse | High |
| Backend + Zest payment SDK integration | High |
| Test quality and coverage | Medium |
| Overall user experience and polish | Medium |

***

## Notes

- Treat this as a **production-grade project** — even though it runs on development credentials, the code quality, architecture, and UX should reflect production standards.
- Pay close attention to **UI/UX detail**, especially edge cases: empty states, loading states, and error states.
- The **mobile view is your own design** — demonstrate your design sensibility; it is evaluated alongside the desktop implementation.
- Raise any questions about ambiguous requirements early.