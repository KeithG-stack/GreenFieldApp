import express from 'express';
import { User } from '../Models/DatabaseCreation.js'; // Import the User model if needed

const router = express.Router();

// Route to serve the student home page
router.get('/studentdashboard', async (req, res) => {
    try {
        // Assuming you have a way to get the current user's ID, e.g., from a session or JWT
        const userId = req.userId; // Replace with actual logic to get the user ID

        // Fetch user data if needed
        const user = await User.findByPk(userId);

        // Render the StudentHome view with user data
        res.render('studentdashboard', { name: user.name });

    } catch (error) {
        console.error('Error fetching student home data:', error);
        res.status(500).send('Error loading student home page');
    }
});



export default router;