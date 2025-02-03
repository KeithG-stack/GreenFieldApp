import express from 'express';
const router = express.Router();

// Route to serve the settings page
router.get('/settings', (req, res) => {
    const userInfo = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        major: "Computer Science",
        graduationYear: "2024",
        academicHistory: [
            { degree: "B.Sc. in Computer Science", institution: "Greenfield University", year: 2022 }
        ],
        documents: [
            { name: "Transcript", link: "/uploads/transcript.pdf" },
            { name: "Resume", link: "/uploads/resume.pdf" }
        ]
    };

    res.render('settings', { userInfo });
});

export default router;