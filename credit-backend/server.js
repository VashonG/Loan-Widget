const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');

// Initialize Express
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(helmet());

// Database connection
mongoose.connect('mongodb://localhost:27017/creditAppDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Application Schema
const ApplicationSchema = new mongoose.Schema({
    name: String,
    address: String,
    email: String,
    loanAmount: Number,
    salary: Number,
    status: String,
});

const Application = mongoose.model('Application', ApplicationSchema);

// Underwriting Logic
const underwriteApplication = (application) => {
    if (application.loanAmount < 5000) {
        if (application.salary > 30000) {
            return "Approved";
        } else {
            return "Denied";
        }
    } else if (application.loanAmount < 15000) {
        if (application.salary > 50000) {
            return "Approved";
        } else {
            return "Denied";
        }
    }
    return "Under Review";
}

// Routes
app.post('/apply', (req, res) => {
    const application = new Application(req.body);
    application.status = underwriteApplication(req.body);
    application.save((err, application) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(application);
    });
});

// Server listen
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
