import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../Models/User.js'; // Adjust the path as necessary

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).render('register', { error: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Redirect to login page after successful registration
        res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).render('register', { error: 'Error registering user' });
    }
});

export default router;