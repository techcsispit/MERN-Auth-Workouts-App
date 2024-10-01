# Workouts App

## About
This **Workouts App** is a full-stack CRUD application built using the MERN stack (MongoDB, Express, React, Node.js) with authentication implemented using **Bcrypt** and **JWT**. The app allows users to create, update, view, and delete workouts once they are authenticated. Contributions are welcome to improve styling, fix bugs, and add features.

## Requirements

Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [React.js](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)

### Node.js Packages
Run the following command to install the necessary packages:
```bash
npm install bcrypt jsonwebtoken mongoose express react-router-dom
```

## Bug Fixes Needed:
- [ ] **Cannot add a workout once signed in** - There’s an issue preventing the user from adding workouts after successfully signing in.
- [ ] **Authentication state not being updated** - The authentication state isn’t updating correctly upon user login/logout.

## Features To Be Added:
- [ ] **Styling** - Add some basic UI/UX improvements to make the application more visually appealing.
- [ ] **UI Theme** - Include a light/dark theme toggle to enhance the user experience.

### Authentication
- User registration and login system using **Bcrypt** for password hashing and **JWT** for generating tokens.
- Token-based authentication to secure routes.

### Workouts
- **CRUD functionality** for workouts (Create, Read, Update, Delete).
- Secure routes to ensure only authenticated users can manage workouts.

## Usage

### Backend
1. Clone the repository and navigate to the `backend` folder.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up a `.env` file with the following variables:
   ```env
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend
1. Navigate to the `frontend` folder.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```

## API Endpoints

### User Routes
- **POST /api/user/signup**: Register a new user.
- **POST /api/user/login**: Authenticate user and get a token.

### Workout Routes (Protected)
- **GET /api/workouts**: Get all workouts.
- **POST /api/workouts**: Create a new workout.
- **PUT /api/workouts/:id**: Update a workout.
- **DELETE /api/workouts/:id**: Delete a workout.

## Contributing
We welcome contributions to the project. Please feel free to submit bug fixes, improvements, and features via pull requests.

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Submit a pull request.

## Raising an Issue
If you encounter any bugs or would like to request a feature, please create an issue on the repository with detailed steps to reproduce or a description of the feature request.

## License
This project is licensed under the MIT License.
