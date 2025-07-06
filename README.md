# 💪 Workout Tracker App

A full-stack MERN (MongoDB, Express, React, Node.js) fitness tracker that allows users to log, view, update, and delete their workouts securely. This project includes full authentication and uses protected API routes to manage workout data.

## 🚀 Features

- ✅ Sign up and log in with secure authentication (JWT)
- 🏋️ Create new workouts (title, load, reps)
- 📄 View all your workouts
- ✏️ Update or delete existing workouts
- 🔐 Access control via protected routes
- 💾 Store workouts in MongoDB
- 🔁 Persistent user sessions
- 🧠 Context API for global state management (auth + workouts)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- React Context API
- useReducer, useEffect, useState
- CSS Modules

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Token) for auth
- dotenv for env configuration

---

## 📁 Project Structure

### 🧩 Frontend (`client/`)
```
src/
├── App.js
├── index.js
├── context/
│   ├── AuthContext.js
│   └── workoutContext.js
├── hooks/
│   ├── useAuthContext.js
│   ├── useWorkoutContext.js
│   ├── useLogin.js
│   └── useSignup.js
├── pages/
│   ├── Home.js
│   ├── Login.js
│   ├── Signup.js
│   └── UpdateWorkout.js
├── components/
│   ├── Navbar.js
│   ├── WorkoutDetails.js
│   └── WorkoutForm.js
└── styles/
    └── index.css
```

### 🖥️ Backend (`server/`)
```
server/
├── controllers/
│   ├── workoutController.js
│   └── userController.js
├── models/
│   ├── Workout.js
│   └── User.js
├── routers/
│   ├── workoutRouters.js
│   └── usersRouter.js
├── middleware/
│   └── requireAuth.js
├── .env
├── server.js
└── package.json
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/workout-tracker-app.git
cd workout-tracker-app
```

### 2. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_LOCAL=mongodb://localhost:27017/workoutDB
JWT_SECRET=your_jwt_secret
```

Then run the server:

```bash
npm run dev
```

### 3. Set Up the Frontend

```bash
cd client
npm install
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Authentication

- **Protected Routes**: Users must be logged in to access workout routes.
- **JWT Tokens**: Stored in localStorage and sent via Authorization headers.
- **React Context**: Auth state is managed globally for login/logout handling.

---

## 📡 API Endpoints

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| GET    | `/api/workouts`     | Get all user workouts    |
| POST   | `/api/workouts`     | Create a new workout     |
| PATCH  | `/api/workouts/:id` | Update a workout         |
| DELETE | `/api/workouts/:id` | Delete a workout         |
| POST   | `/api/users/login`  | Log in a user            |
| POST   | `/api/users/signup` | Register a new user      |

---

## 📌 Future Improvements

- Search and filter workouts
- Pagination and sorting
- Upload workout images or videos
- Share workouts with friends
- Admin dashboard

