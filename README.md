# Notes App with Google Login + MongoDB CRUD

A simple Notes application with Google OAuth sign-in and user-scoped CRUD functionality built with Express and React (Vite).  

---

## Features

- Google OAuth sign-in only (no email/password)  
- Store and manage notes in MongoDB (Atlas or local)  
- User-scoped notes: each signed-in user sees only their own notes  
- Create, read, update, delete (CRUD) notes with input validation  
- Minimal, clean React frontend with inline note editing  
- Protected backend routes with JWT authentication  
- HTTP-only cookie for session handling  
- Basic error handling and loading states 
- Zustand for state management  

---

## Prerequisites

- Node.js 18 or higher  
- MongoDB instance (MongoDB Atlas recommended or local MongoDB server)  
- Google OAuth credentials (Client ID and Client Secret)  

---

## Getting Started

### 1. Clone the repo

git clone https://github.com/Jaivardhan7773/notes-fresher.


### 2. Setup environment variables

Copy `.env.example` to `.env` and fill in your credentials:


### 3. Install dependencies


Install backend dependencies
cd api
npm install

Install frontend dependencies
cd ../web
npm install

### 4. Run the app

Run  backend 
cd api
npm run dev

Run frontend 
cd web
npm run dev

- Backend runs on [http://localhost:3000](http://localhost:3000)  
- Frontend runs on [http://localhost:5173](http://localhost:5173)  

---

## API Endpoints Overview

- `POST /auth/google` — Google Login with idToken, returns user info + sets cookie  
- `GET /me` — Returns authenticated user profile  
- `POST /api/notes` — Create a new note (auth required)  
- `GET /api/notes` — List notes belonging to user (auth required)  
- `GET /api/notes/:id` — Get note by ID (auth required)  
- `PUT /api/notes/:id` — Update note title/content (auth required)  
- `DELETE /api/notes/:id` — Delete note by ID (auth required)  
- `POST /auth/logout` — Logout by clearing token cookie  

---

## Validation Rules

- Title: required, 3–120 characters  
- Content: optional, up to 2000 characters  
- Errors return structured JSON with error codes and field details  

---

## Screenshots

### Login  
![login](https://i.ibb.co/7tLGPgNN/Screenshot-2025-10-01-210515.png)

### Notes List  
![Notes list](https://i.ibb.co/SDBwVsWx/Screenshot-2025-10-01-212533.png)

### Create Note  
![Create Note](https://i.ibb.co/twqhx9Bm/Screenshot-2025-10-01-212619.png)

### Edit Note Inline  
![login](https://i.ibb.co/8Lt5NV19/Screenshot-2025-10-01-212658.png)

### Delete Note Confirmation  
![Delete Note Confirmation ](https://i.ibb.co/sdGNH2NP/Screenshot-2025-10-01-213102.png)

---

## Troubleshooting

- Make sure `.env` file is correctly configured and not committed to git  
- Ensure Google OAuth Client ID matches the OAuth consent screen settings with correct redirect URLs  
- MongoDB connection string should be accessible from your network  
- Run API and frontend separately if combined script fails  
- Clear cookies if authentication behaves unexpectedly  

---

## Testing

Use the included `requests.http` file or Postman collection (if present) for quick API endpoint testing.

---

## License

MIT License

