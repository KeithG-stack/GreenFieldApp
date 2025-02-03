app.get('/studentdashboard', (req, res) => {
    // Mock student data (replace with actual data retrieval logic)
    const studentData = {
        studentName: "Jane Doe", // Replace with actual student name
        // Add any other necessary student data here
    };
    
    res.render('StudentHome', studentData); // Render the student homepage with data
});
