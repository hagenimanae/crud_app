# Full-Stack CRUD Application with React, Node.js, and MySQL

This is a full-stack CRUD (Create, Read, Update, Delete) application built with:
- Frontend: React.js with React Router and Bootstrap 5
- Backend: Node.js with Express
- Database: MySQL (XAMPP)

## Prerequisites

1. Node.js (v14 or higher)
2. XAMPP (for MySQL database)
3. npm or yarn package manager

## Setup Instructions

### 1. Database Setup

1. Start XAMPP and ensure MySQL service is running
2. Open phpMyAdmin (usually at http://localhost/phpmyadmin)
3. Create a new database named `crud_app`
4. The application will automatically create the required table when you start the server

### 2. Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the database connection in `.env` file:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=crud_app
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### 3. Frontend Setup

1. In a new terminal, navigate to the `crud` directory:
   ```bash
   cd crud
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Features

- View all items in a responsive table
- Add new items
- Edit existing items
- Delete items with confirmation
- Form validation
- Responsive design with Bootstrap 5

## Project Structure

```
CRUD_APP/
├── server/                 # Backend (Node.js/Express)
│   ├── node_modules/       # Dependencies
│   ├── .env                # Environment variables
│   ├── package.json        # Backend dependencies
│   └── server.js           # Backend server code
│
└── crud/                   # Frontend (React)
    ├── public/             # Static files
    ├── src/
    │   ├── components/     # React components
    │   │   ├── ItemList.jsx
    │   │   └── ItemForm.jsx
    │   ├── App.jsx         # Main App component
    │   └── main.jsx        # Entry point
    └── package.json        # Frontend dependencies
```

## API Endpoints

- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get a single item
- `POST /api/items` - Create a new item
- `PUT /api/items/:id` - Update an existing item
- `DELETE /api/items/:id` - Delete an item

## License

This project is open source and available under the MIT License.
