# CourseHub

CourseHub is a full-stack web application that allows users to create, view, update, and delete courses. The application features user authentication, course management, and a clean, responsive user interface.

## Features

- User authentication (sign up, sign in, sign out)
- Create, read, update, and delete courses
- Responsive design that works on desktop and mobile
- Markdown support for course materials
- Secure password hashing
- Protected routes for authenticated users
- Error handling and validation

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- React Markdown for rendering markdown content
- CSS for styling

### Backend
- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL database
- bcryptjs for password hashing
- Basic authentication

## Deployment

The application is deployed using:
- Frontend: Vercel
- Backend: Render
- Database: PostgreSQL on Render

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd coursehub
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd api
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables:

For the backend (api/.env):
```
POSTGRES_URL=your_postgresql_database_url
NODE_ENV=development
```

For the frontend (client/.env):
```
VITE_API_URL=your_backend_api_url
```

4. Start the development servers:

```bash
# Start backend server (from api directory)
npm run dev

# Start frontend server (from client directory)
npm run dev
```

## API Endpoints

### Authentication
- POST /api/users - Create a new user
- POST /api/users/signin - Sign in a user

### Courses
- GET /api/courses - Get all courses
- GET /api/courses/:id - Get a specific course
- POST /api/courses - Create a new course
- PUT /api/courses/:id - Update a course
- DELETE /api/courses/:id - Delete a course

## Project Structure

```
coursehub/
├── api/                 # Backend code
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── config/         # Configuration files
│   └── app.js          # Express application
├── client/             # Frontend code
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── context/    # Context providers
│   │   └── config.js   # Frontend configuration
│   └── public/         # Static files
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React.js documentation
- Express.js documentation
- Sequelize documentation
- Vercel and Render for hosting services
