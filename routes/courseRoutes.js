import express from 'express';
const router = express.Router();

// Route to serve the courses page
router.get('/courses', (req, res) => {
    const courses = [
        { name: 'Introduction to Psychology' },
        { name: 'Calculus I' },
        { name: 'General Chemistry' },
        { name: 'World History' },
        { name: 'Introduction to Sociology' },
        { name: 'Microeconomics' },
        { name: 'Macroeconomics' },
        { name: 'Biology I' },
        { name: 'Physics I' },
        { name: 'English Literature' },
        { name: 'Creative Writing' },
        { name: 'Computer Science I' },
        { name: 'Data Structures' },
        { name: 'Algorithms' },
        { name: 'Discrete Mathematics' },
        { name: 'Linear Algebra' },
        { name: 'Statistics' },
        { name: 'Philosophy' },
        { name: 'Political Science' },
        { name: 'Art History' },
        { name: 'Music Theory' },
        { name: 'Environmental Science' },
        { name: 'Astronomy' },
        { name: 'Anthropology' },
        { name: 'Business Management' }
    ];

    res.render('courses', { courses });
});

export default router;