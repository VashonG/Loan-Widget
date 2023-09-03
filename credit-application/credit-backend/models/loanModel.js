import { Schema, model } from 'mongoose';

const loanSchema = new Schema({
    applicantName: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: [1000, 'Minimum loan amount is 1000'],
        max: [1000000, 'Maximum loan amount is 1000000']
    },
    purpose: {
        type: String,
        required: true,
        enum: ['Home Loan', 'Car Loan', 'Personal Loan', 'Education Loan']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true
    },
    dateApplied: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    }
});

export default model('Loan', loanSchema);
