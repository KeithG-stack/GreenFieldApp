import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config'; // Ensure this is present to load environment variables
import './Middleware/script.js';
import userRoutes from './routes/userRoutes.js';
import { neon } from './Config/database.js'; // Import the sequelize instance
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import { authenticateToken } from './Middleware/auth.js'; // Adjust the path as necessary
import bodyParser from 'body-parser';
import calendarRoutes from './routes/calendarRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import studenthomeRoutes from './routes/StudentHomeRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';

// Basic Authentication for the Application with task management and transactions
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock data for notifications
const notifications = [
    { id: 1, message: 'You have a new message', read: false },
    { id: 2, message: 'Your order has been shipped', read: true },
    { id: 3, message: 'Reminder: Meeting at 3 PM', read: false },
  ];
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', paymentRoutes);
app.use('/', calendarRoutes);
app.use('/', studenthomeRoutes);
app.use('/', courseRoutes);
app.use('/', assignmentRoutes);
app.use('/', settingsRoutes);
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Default route to render home.ejs
app.get('/', (req, res) => {
    res.render('home'); // Render the home view
});

// Route to render the registration page
app.get('/register', (req, res) => {
    res.render('register', { error: null }); // Render the register view with error set to null
});

app.get('/about', (req, res) => {
    res.render('about', { error: null }); // Render the register view with error set to null
});

app.get('/studentdashboardboard', (req, res) => {
    res.render('studentdashboard', { error: null }); // Render the register view with error set to null
});

app.get('/contact', (req, res) => {
    res.render('contact', { error: null }); // Render the register view with error set to null
});
  // Route for the inbox page
  app.get('/inbox', (req, res) => {
    res.render('inbox', { notifications });
  });

// Routes
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
