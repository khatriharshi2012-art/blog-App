# Frontend

This is the React + Vite frontend for the Blog App. It connects to the Express backend running on `http://localhost:3000`.

## Features

- View all blog posts on the home page
- Register and log in
- Store auth details in `localStorage`
- Like and comment on blogs after login
- Redirect admin users to the admin dashboard

## Routes

- `/` - Home page
- `/login` - Login page
- `/register` - Register page
- `/admin` - Admin dashboard

## Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Backend Requirement

The frontend expects the backend API to be running locally on port `3000`.

Examples used in the current code:

- `GET http://localhost:3000/blog/get-blog`
- `POST http://localhost:3000/user/login`
- `POST http://localhost:3000/user/register`

## Notes

- Most frontend pages currently use `fetch()` directly.
- `src/utils/api.js` includes an Axios instance prepared for token-based requests, but it is not yet used consistently across the app.
- For full project setup, see the root [README](../README.md).
