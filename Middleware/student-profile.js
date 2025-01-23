app.get('/student-profile', (req, res) => {
    // Your student data object here (same as before)
    const studentData = {
        // ... (student information)
    };

    res.render('student-profile', studentData);
});
