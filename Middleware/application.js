import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js'; // Import the user routes

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the user routes
app.use('/api/users', userRoutes); // Prefix all user routes with /api/users

// Other routes and middleware can be defined here

const PORT = process.env.PORT ||3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
