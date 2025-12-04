# TodoList App

A simple and modern task management application to help you track and complete your daily tasks efficiently.

## Live Demo

https://todolist-4qa4.onrender.com/

## Features

- Create, edit, and delete tasks
- Mark tasks as completed or active
- Filter tasks by status (all, active, completed)
- Filter by time period (today, this week, this month, all)
- Display task statistics
- Pagination for task lists
- Beautiful UI with Tailwind CSS

## Tech Stack

### Backend

- Node.js - JavaScript runtime
- Express 5 - Web framework
- MongoDB - Database with Mongoose ODM
- CORS - Cross-Origin Resource Sharing
- dotenv - Environment variable management

### Frontend

- React 19 - UI library
- Vite - Build tool
- Tailwind CSS 4 - Styling
- React Router - Routing
- Axios - HTTP client
- Radix UI - UI components
- Lucide React - Icons
- Sonner - Toast notifications

## Requirements

- Node.js version 18 or higher
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/luutranminhhieu/todolist.git
cd todolist
```

### 2. Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

### 3. Environment configuration

Create a `.env` file in the `backend/` directory with the following content:

```env
MONGODB_CONNECTIONSTRING=mongodb://localhost:27017/todolist
PORT=5000
```

Or use MongoDB Atlas connection string if using a cloud database.

### 4. Run the application

Run Backend (Terminal 1):

```bash
cd backend
npm run dev
```

Run Frontend (Terminal 2):

```bash
cd frontend
npm run dev
```

Open your browser and navigate to: `http://localhost:5173`

## Production Build

### Build Frontend

```bash
cd frontend
npm run build
```

### Run Full Stack

```bash
# From root directory
NODE_ENV=production npm start
```

## Project Structure

```
TodoList/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── tasksControllers.js
│   │   ├── models/
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   └── tasksRouters.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── lib/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## API Endpoints

| Method | Endpoint                  | Description         |
| ------ | ------------------------- | ------------------- |
| GET    | `/api/tasks?filter=today` | Get tasks by filter |
| POST   | `/api/tasks`              | Create new task     |
| PUT    | `/api/tasks/:id`          | Update task         |
| DELETE | `/api/tasks/:id`          | Delete task         |

## Author

Luu Tran Minh Hieu

GitHub: [@luutranminhhieu](https://github.com/luutranminhhieu)

## License

This project is licensed under the ISC License.
