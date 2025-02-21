import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js'; // Adjust the path as necessary

const router = express.Router();
// Middleware to parse form data
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/login', (req, res) => {
    res.render('login', { error: null }); // Render the login registration page 
});

// Mock user data for demonstration (replace with your actual user authentication logic)
const users = [
    { email: "jane.doe@example.com", password: "password123" } // Example user
];

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password }); // Log the email and password

    try {
        const user = await User.findOne({ where: { email } });
        console.log('User found:', user); // Log the user object

        if (!user) {
            return res.status(401).render('login', { error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isPasswordValid); // Log the password validation result

        if (!isPasswordValid) {
            return res.status(401).render('login', { error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Render the StudentHome view with the student's name
        res.render('studentdashboard', { name: user.name });
    } catch (error) {
        console.error('Error logging in:', error); // Log the error for debugging
        res.status(500).render('login', { error: 'Error logging in' });
    }
});

export default router;