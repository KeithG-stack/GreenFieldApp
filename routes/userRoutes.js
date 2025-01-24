import express from 'express';
import { createUser } from '../Models/UserCreation.js'; // Import the createUser function

const router = express.Router();

// Route to create a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        await createUser(username, email, password);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// Additional user routes can be defined here
// e.g., login, get user profile, etc.

export default router; 