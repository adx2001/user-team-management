
# User Team Management API

Node.js API service with advanced user and team management features.

## Overview

The Team Management API provides endpoints for managing users, teams, and tasks within a team. The API includes user registration, login, and email verification, as well as team and task management functionalities.

## Features

- **User Management:**
  - Register a new user.
  - Verify user email.
  - Log in with email and password.
  - Refresh JWT tokens.
  - Admin Creation: Create an admin user by setting the isAdmin field to true during user registration. This can be done either via Postman or manually in the database.

- **Team Management:**
  - Create a team (admin only).
  - Retrieve a list of all teams (admin only).
  - Assign tasks to a team (admin only).
  - Retrieve tasks for a team.
  - Update the status of a task.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adx2001/user-team-management.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd user-team-management
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-email-password
   ```

5. **Run the application:**
   ```bash
   npm start
   ```

## API Endpoints

### User Management

- **POST /register**  
  Register a new user with email and password.  
  - Passwords are hashed before storing.
  - Sends a verification email with a unique link.

- **GET /verify-email**  
  Verify user email using the link provided in the verification email.

- **POST /login**  
  Log in with email and password.  
  - Returns a JWT token and a refresh token.

- **POST /refresh-token**  
  Refresh JWT tokens using a refresh token.

### Team Management

- **POST /teams**  
  Create a new team (admin only).  
  - Requires a team name and a list of user IDs.

- **GET /teams**  
  Retrieve a list of all teams (admin only).

- **POST /teams/:teamId/tasks**  
  Assign a new task to a team (admin only).  
  - Requires a task description and details.

- **GET /teams/:teamId/tasks**  
  Retrieve tasks assigned to a specific team.

- **PATCH /teams/:teamId/tasks/:taskId**  
  Update the status of a task.  
  - Status can be set to `completed`.

## Middleware

- **authenticateJWT**: Middleware to authenticate users based on JWT tokens.
- **authorizeAdmin**: Middleware to restrict certain routes to admin users only.

## Models

- **Team** :Represents a team with fields for team name and a list of user IDs who are members of the team.

- **User** : Represents a user with fields for email, password, admin status, and email verification status.

- **Task** : Represents a task with fields for team ID, description, details, status, and assignment date.


## Troubleshooting

- Ensure MongoDB is running and the URI is correctly configured in `.env`.
- Verify JWT secret is set up in `.env`.
- Check console logs for any errors during development.
