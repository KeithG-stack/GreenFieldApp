import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';
import './Middleware/script.js';
import authRoutes from './routes/auth.js';
import { connect } from './config/config.js';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import { authenticateToken } from './routes/auth.js'; // Adjust the path as necessary

// Basic Authentication for the Application with task managementand transactions
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Default route to render main_page.ejs
app.get('/', (req, res) => {
    res.render('main_page'); // Render the main_page view
});

// Routes
app.use('/', authRoutes);


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
export default app;
