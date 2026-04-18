# Blog App

A full-stack blog application with a React frontend and an Express/MongoDB backend. Users can register, log in, browse blogs, like posts, and add comments. Admin users can also create and delete blog posts.

## Project Structure

```text
blog-App/
|-- backend/   # Express API, MongoDB models, auth, Swagger docs
`-- frontend/  # React + Vite client
```

## Features

- User registration and login with JWT authentication
- Role-based access for `admin` and `user`
- Public blog listing on the home page
- Like and comment support for authenticated users
- Admin dashboard for creating and deleting blogs
- Swagger API docs available from the backend

## Tech Stack

- Frontend: React, Vite, React Router
- Backend: Express, Mongoose, JWT, bcrypt
- Database: MongoDB
- Docs: Swagger UI

## Getting Started

### 1. Install dependencies

Install packages in both apps:

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

### 2. Create backend environment variables

Create a `.env` file inside `backend/` with:

```env
PORT=3000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
BCRYPT_SALT_ROUNDS=12
```

Notes:

- The current backend code connects to `mongodb://localhost:27017/blog-App`.
- Make sure MongoDB is running locally before starting the server.

### 3. Run the backend

```bash
cd backend
npm run dev
```

The API will run on `http://localhost:3000`.

### 4. Run the frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`.

## Available Scripts

### Backend

- `npm run dev` - Start the Express server with Nodemon

### Frontend

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the frontend for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

## API Documentation

Swagger UI is available at:

```text
http://localhost:3000/api-docs
```

Raw Swagger JSON:

```text
http://localhost:3000/api-docs.json
```

## Current App Flow

- Guests can view blogs.
- Logged-in users can like and comment on blogs.
- Admin users can access the dashboard and create or delete blogs.
- Auth tokens are stored in `localStorage` by the frontend.

## Notes

- The frontend currently calls the backend directly at `http://localhost:3000`.
- `frontend/src/utils/api.js` is set to `http://localhost:3000/api`, but most current page components use `fetch()` with direct route URLs.
- If you want to deploy this project, you will likely want to move the MongoDB connection string into the `.env` file as well.
