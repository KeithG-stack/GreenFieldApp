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
        res.redirect('/login'); // Redirect to the login page upon successful user creation
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
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).render('login', { error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
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

// Route to serve the about page
router.get('/about', (req, res) => {
    res.render('about'); // Render the about page (make sure you have an about.ejs file in your views folder)
});

// Route to serve the contact page
router.get('/contact', (req, res) => {
    res.render('contact'); // Render the contact page (make sure you have a contact.ejs file in your views folder)
});

// / Example route for handling login form submission

// Route to serve the faculty login page
// router.get('/faculty/login', (req, res) => {
//     res.render('facultylogin'); // Render the faculty login page (make sure you have a facultylogin.ejs file in your views folder)
// });

// // Route to handle faculty login
// router.post('/faculty/login', async (req, res) => {
//     const { password, securityNumber } = req.body;
//     try {
//         // Replace this with your actual faculty authentication logic
//         const faculty = await User.findOne({ where: { securityNumber } });
//         if (!faculty) {
//             return res.status(401).render('facultylogin', { error: 'Invalid security number or password' });
//         }

//         const isPasswordValid = await bcrypt.compare(password, faculty.password);
//         if (!isPasswordValid) {
//             return res.status(401).render('facultylogin', { error: 'Invalid security number or password' });
//         }

//         const token = jwt.sign({ userId: faculty.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         // Render the FacultyDashboard view with the faculty's name
//         res.render('facultydashboard', { name: faculty.name });
//     } catch (error) {
//         console.error('Error logging in:', error); // Log the error for debugging
//         res.status(500).render('facultylogin', { error: 'Error logging in' });
//     }
// });

export default router;