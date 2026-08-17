# Tripleten web_project_api_full

A full-stack social photo-sharing application where users can sign up, build a profile, and share and like "cards" (places/photos) with other users. Built as a monorepo with a custom Node.js/Express REST API and a React frontend, replacing an earlier two-API bootcamp version with a single, self-built backend.

**Live demo:** [https://around-ivan.mooo.com](https://around-ivan.mooo.com)
**API base URL:** `https://api.around-ivan.mooo.com`

---

## Features

- Email/password registration and login with JWT-based authentication
- Passwords hashed with bcrypt, never returned by the API
- Editable user profile (name, "about", avatar)
- Create, view, like/unlike, and delete photo cards
- Ownership enforcement — users can only delete their own cards or edit their own profile
- Server-side request validation (Celebrate/Joi) on all write endpoints
- Centralized, consistent error handling with custom error classes (400/401/403/404/500)
- CORS-enabled API, ready to be consumed by any frontend origin
- Responsive UI built with React and React Router, with protected client-side routes

---

## Tech Stack

**Frontend**

- React (Vite)
- React Router
- Context API for shared user state
- Vanilla CSS (BEM-style class naming)

**Backend**

- Node.js / Express 5
- MongoDB with Mongoose (schemas, validators, `.populate()`)
- JSON Web Tokens (`jsonwebtoken`) for stateless auth
- bcryptjs for password hashing
- Celebrate + Joi for request validation
- `validator` for email/URL format validation
- Custom error classes + centralized error-handling middleware

**Infrastructure**

- Google Cloud Platform (Compute Engine VM, Ubuntu)
- nginx as a reverse proxy, serving the built frontend as static files
- PM2 for backend process management
- Let's Encrypt (Certbot) for SSL
- pnpm workspaces for monorepo dependency management

---

## API Overview

| Method | Endpoint               | Auth required | Description                        |
| ------ | ---------------------- | :-----------: | ---------------------------------- |
| POST   | `/signup`              |      No       | Register a new user                |
| POST   | `/signin`              |      No       | Log in, returns a JWT              |
| GET    | `/users`               |      Yes      | List all users                     |
| GET    | `/users/me`            |      Yes      | Get the current authenticated user |
| PATCH  | `/users/me`            |      Yes      | Update name / about                |
| PATCH  | `/users/me/avatar`     |      Yes      | Update avatar URL                  |
| GET    | `/cards`               |      Yes      | List all cards                     |
| POST   | `/cards`               |      Yes      | Create a new card                  |
| DELETE | `/cards/:cardId`       |      Yes      | Delete a card (owner only)         |
| PUT    | `/cards/:cardId/likes` |      Yes      | Like a card                        |
| DELETE | `/cards/:cardId/likes` |      Yes      | Unlike a card                      |

Authenticated requests must include a header:

```
Authorization: Bearer <token>
```

---

## Security Notes

- Passwords are hashed with bcrypt and excluded from query results by default (`select: false`), only retrieved explicitly during login for credential comparison.
- Login failures return a generic message regardless of whether the email or password was wrong, to avoid leaking which accounts exist.
- Card ownership is verified server-side on every delete request using the authenticated user's ID from the JWT payload — never trusting an ID sent by the client.
- All internal error details (database errors, stack traces) are caught and replaced with a generic message before reaching the client; only intentionally raised, developer-authored error messages are exposed.

---

## Getting Started Locally

### Prerequisites

- Node.js 18+
- pnpm
- MongoDB running locally (or a connection string to a remote instance)

### Backend

```bash
cd backend
pnpm install
```

Create a `.env` file in `backend/`:

```
NODE_ENV=development
JWT_SECRET=your-dev-secret
MONGO_URI=mongodb://localhost:27017/aroundb
PORT=3000
```

```bash
pnpm dev
```

### Frontend

```bash
cd frontend
pnpm install
```

Update `src/utils/api.js` with your backend's base URL if it differs from the default, then:

```bash
pnpm dev
```

---
