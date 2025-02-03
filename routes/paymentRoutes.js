import express from 'express';
const router = express.Router();

router.get('/payment-status', (req, res) => {
    const classes = [
      { name: 'English', amountOwed: 500 },
      { name: 'Math', amountOwed: 600 },
      { name: 'Computer Science', amountOwed: 700 },
      { name: 'Theology', amountOwed: 800 },
      { name: 'Chemistry', amountOwed: 900 },
    ];
  
    res.render('payment-status', { classes });
  });
export default router;