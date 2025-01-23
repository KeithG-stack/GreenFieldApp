app.get('/student-home', (req, res) => {
    const studentData = {
        studentName: "Jane Doe" // Replace with actual student name
    };
    res.render('student-home', studentData);
});
