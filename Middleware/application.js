app.get('/apply', (req, res) => {
    res.render('application');
});
app.post('/submit-application', (req, res) => {
    // Process the form data here
    // You can access form data using req.body
    // Remember to use body-parser middleware or express.urlencoded() for parsing form data
    console.log(req.body);
    res.send('Application received!');
});
