import { Router } from 'express';
const router = Router();
import { applyForLoan, checkLoanStatus, updateLoanDetails, deleteLoan, getAllLoans } from '../controllers/loanController';

// Route to apply for a loan
router.post('/apply', applyForLoan);

// Route to fetch the status of a specific loan by its ID
router.get('/status/:loanId', checkLoanStatus);

// Route to update loan details by its ID
router.put('/update/:loanId', updateLoanDetails);

// Route to delete a loan by its ID
router.delete('/delete/:loanId', deleteLoan);

// Route to fetch all loans
router.get('/all', getAllLoans);

export default router;
