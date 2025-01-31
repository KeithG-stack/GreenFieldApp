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
// Basic Authentication for the Application with task management and transactions
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.use('/', calendarRoutes);
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

// Routes
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
