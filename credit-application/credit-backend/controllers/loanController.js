const Loan = require('../models/Loan');  // Assuming your Loan model is in a models directory

const loanController = {};

// Apply for a loan
loanController.applyForLoan = async (req, res) => {
    try {
        const newLoan = new Loan(req.body);
        const savedLoan = await newLoan.save();
        res.status(201).json(savedLoan);
    } catch (error) {
        res.status(500).json({ message: 'Error applying for loan', error });
    }
};

// Check the status of a loan by its ID
loanController.checkLoanStatus = async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.loanId);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.json(loan);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching loan status', error });
    }
};

// Update loan details by its ID
loanController.updateLoanDetails = async (req, res) => {
    try {
        const updatedLoan = await Loan.findByIdAndUpdate(req.params.loanId, req.body, { new: true });
        if (!updatedLoan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.json(updatedLoan);
    } catch (error) {
        res.status(500).json({ message: 'Error updating loan details', error });
    }
};

// Delete a loan by its ID
loanController.deleteLoan = async (req, res) => {
    try {
        const result = await Loan.findByIdAndDelete(req.params.loanId);
        if (!result) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.json({ message: 'Loan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting loan', error });
    }
};

// Fetch all loans
loanController.getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.find();
        res.json(loans);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all loans', error });
    }
};

module.exports = loanController;
