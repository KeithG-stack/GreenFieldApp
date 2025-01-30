import express from 'express';
import createUser from '../Models/UserCreation.js'; // Import the createUser function
import { User } from '../Models/DatabaseCreation.js'; // Import the User model
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Sequelize } from 'sequelize';

const router = express.Router();

// Route to create a new user
router.post('/submit-application', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        await createUser(username, email, password);

        res.render('login'); // Redirect to the login page upon successful user creation

    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            res.render('register', { error: 'Email already exists' }); // Render the registration page with an error message
        } else {
            res.render('register', { error: 'Error creating user' }); // Render the registration page with a generic error message
        }
    }
});

// Route to serve the login page
router.get('/login', (req, res) => {
    res.render('login'); // Render the login page (make sure you have a login.ejs file in your views folder)
});

// Route to login a user
router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    console.log("LOGIN ", req.body)

    try {
        const user = await User.findOne({ where: { email } });

        console.log("USER:::", user)
        if (!user) {
            return res.status(401).render('login', { error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).render('login', { error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.render('StudentHome', {name: user.name});


    } catch (error) {
        console.error('Error logging in:', error); // Log the error for debugging
        res.status(500).render('login', { error: 'Error logging in' });
    }
});

export default router;
