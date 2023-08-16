const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bcrypt = require('bcrypt');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(helmet());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/creditAppDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Application schema
const ApplicationSchema = new mongoose.Schema({
    name: String,
    address: String,
    email: String,
    password: String, // Added a field for password
    loanAmount: Number,
    status: String,
    // You can add other necessary fields
});

const Application = mongoose.model('Application', ApplicationSchema);

// Simple underwriting logic
const underwriteApplication = (application) => {
    if(application.loanAmount < 5000) {
        if(application.salary > 30000) {
            return "Approved";
        } else {
            return "Denied";
        }
    } else if(application.loanAmount < 15000) {
        if(application.salary > 50000) {
            return "Approved";
        } else {
            return "Denied";
        }
    }
    // You can add logic for higher loan amounts or other conditions
    return "Pending"; // Default to pending if none of the above conditions are met
}

// Routes

// POST route - to save the application
app.post('/apply', async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        
        const application = new Application({
            ...req.body,
            password: hashedPassword
        });
        
        application.status = underwriteApplication(req.body);
        const savedApplication = await application.save();
        
        res.status(200).send(savedApplication);
    } catch (err) {
        res.status(500).send(err);
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
