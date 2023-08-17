const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// Route to apply for a loan
router.post('/apply', loanController.applyForLoan);

// Route to fetch the status of a specific loan by its ID
router.get('/status/:loanId', loanController.checkLoanStatus);

// Route to update loan details by its ID
router.put('/update/:loanId', loanController.updateLoanDetails);

// Route to delete a loan by its ID
router.delete('/delete/:loanId', loanController.deleteLoan);

// Route to fetch all loans
router.get('/all', loanController.getAllLoans);

module.exports = router;
