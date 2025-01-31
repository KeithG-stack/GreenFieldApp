import express from 'express';
const router = express.Router();

let events = []; // In-memory event storage

// Render the calendar
router.get('/calendar', (req, res) => {
    res.render('calendar', { events:[] });
});

// Handle event submission
router.post('/add-event', (req, res) => {
    const { date, title } = req.body;
    events.push({ date, title });
    res.redirect('/calendar');
});

export default router;