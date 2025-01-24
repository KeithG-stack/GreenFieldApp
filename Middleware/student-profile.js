app.get('/student-profile', (req, res) => {
    const studentData = {
        studentName: "Jane Doe", // Replace with actual student name
        studentId: "123456",
        studentEmail: "jane.doe@example.com",
        studentMajor: "Computer Science",
        currentGPA: 3.8,
        expectedGraduation: "2024",
        completedCredits: 90,
        educationHistory: [
            { degree: "B.Sc. in Computer Science", institution: "Greenfield University", year: 2022 }
        ],
        grantsReceived: [
            { name: "Academic Excellence Grant", amount: 1000, year: 2023 }
        ],
        achievements: [
            { name: "Dean's List", description: "For outstanding academic performance", year: 2023 }
        ]
    };

    res.render('my-profile', studentData); // Ensure the EJS file name matches
});
