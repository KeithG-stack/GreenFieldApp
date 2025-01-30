import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';
import './Middleware/script.js';
import userRoutes from './routes/userRoutes.js';
import { connect } from './Config/config.js';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import { authenticateToken } from './Middleware/auth.js'; // Adjust the path as necessary

// Basic Authentication for the Application with task managementand transactions
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//views/usethisfile.js

app.use(express.static(path.join(__dirname, 'public')));

// Default route to render main_page.ejs
app.get('/', (req,res) => {
    res.render('home'); // Render the main_page view
});

app.get('/application', (req,res) => {
    res.render('application'); // Render the main_page view
});



// Routes
app.use('/', userRoutes);

// Example of using authenticateToken in a route
app.get('/protected-route', authenticateToken, (req, res) => {
     // this should send the user to the login page
    res.send('/login');
});

// Connect to database
try {
    await connect();
} catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
}

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
