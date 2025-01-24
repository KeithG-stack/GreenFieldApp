const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Mock user data for demonstration (replace with your actual user authentication logic)
const users = [
    { email: "jane.doe@example.com", password: "password123" } // Example user
];

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists and the password matches
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Redirect to the student homepage if login is successful
        res.redirect('/student-home');
    } else {
        // Redirect back to login with an error (you can also render an error message)
        res.redirect('/login?error=Invalid credentials');
    }
}); 