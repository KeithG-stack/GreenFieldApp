import express from 'express';
import { Admin, createAdmin, authenticateAdmin } from '../Models/admin.js'; // Import the Admin model and functions
import jwt from 'jsonwebtoken';

const router = express.Router();

// Route to serve the admin registration page
router.get('/admin/register', (req, res) => {
    res.render('adminRegister', { error: null }); // Render the admin registration page (make sure you have an adminRegister.ejs file in your views folder)
});

// Route to handle admin registration
router.post('/admin/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await createAdmin(name, email, password);
        res.redirect('/admin/login'); // Redirect to the admin login page upon successful registration
    } catch (error) {
        console.error('Error registering admin:', error); // Log the error for debugging
        res.render('adminRegister', { error: 'Error registering admin' });
    }
});

// Route to serve the admin login page
router.get('/admin/login', (req, res) => {
    res.render('adminLogin', { error: null }); // Render the admin login page with error set to null
});

// Route to handle admin login
router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await authenticateAdmin(email, password);
        const token = jwt.sign({ userId: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token as a cookie
        res.cookie('token', token, { httpOnly: true });

        // Render the AdminDashboard view with the admin's name
        res.render('adminDashboard', { name: admin.name });
    } catch (error) {
        console.error('Error logging in:', error); // Log the error for debugging
        res.status(401).render('adminLogin', { error: error.message });
    }
});

// Route to handle admin logout
router.get('/admin/logout', (req, res) => {
    res.clearCookie('token'); // Clear the token cookie
    res.redirect('/admin/login'); // Redirect to the admin login page
});

export default router;