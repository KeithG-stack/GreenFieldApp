import express from 'express';
const router = express.Router();

// Route to serve the assignments page
router.get('/assignments', (req, res) => {
    const assignments = [
        { className: 'english', title: 'Research Paper', dueDate: '2025-2-15' },
        { className: 'Math(calculas 1)', title: 'Problem Set 5', dueDate: '2025-2-20' },
        { className: 'Computer Science', title: 'Lab Report', dueDate: '2025-2-22' },
        { className: 'Theology', title: 'Essay on Ancient Civilizations', dueDate: '2025-2-25' },
        { className: 'Chemistry', title: 'Group Project', dueDate: '2025-2-30' }
    ];

    res.render('assignments', { assignments });
});

export default router;