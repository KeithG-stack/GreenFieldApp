import express from 'express';
import { Faculty, createFaculty, authenticateFaculty } from '../models/Faculty.js'; // Import the Faculty model and functions
import jwt from 'jsonwebtoken';

const router = express.Router();

// Route to serve the faculty registration page
router.get('/faculty/register', (req, res) => {
    res.render('facultyRegister', { error: null }); // Render the faculty registration page (make sure you have a facultyRegister.ejs file in your views folder)
});

// Route to handle faculty registration
router.post('/faculty/register', async (req, res) => {
    const { name, email, password, securityNumber } = req.body;
    try {
        await createFaculty(name, email, password, securityNumber);
        res.redirect('/faculty/login'); // Redirect to the faculty login page upon successful registration
    } catch (error) {
        console.error('Error registering faculty:', error); // Log the error for debugging
        res.render('facultyRegister', { error: 'Error registering faculty' });
    }
});

// Route to serve the faculty login page
router.get('/faculty/login', (req, res) => {
    res.render('facultylogin', { error: null }); // Render the faculty login page with error set to null
});

// Route to handle faculty login
router.post('/faculty/login', async (req, res) => {
    const { password, securityNumber } = req.body;
    try {
        const faculty = await authenticateFaculty(securityNumber, password);
        const token = jwt.sign({ userId: faculty.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token as a cookie
        res.cookie('token', token, { httpOnly: true });

        // Render the FacultyDashboard view with the faculty's name
        res.render('facultydashboard', { name: faculty.name });
    } catch (error) {
        console.error('Error logging in:', error); // Log the error for debugging
        res.status(401).render('facultylogin', { error: error.message });
    }
});

// Route to handle faculty logout
router.get('/faculty/logout', (req, res) => {
    res.clearCookie('token'); // Clear the token cookie
    res.redirect('/faculty/login'); // Redirect to the faculty login page
});

export default router;