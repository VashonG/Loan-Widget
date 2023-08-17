require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bcrypt = require('bcrypt');

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());

app.get("/", (req, res) => {
    res.send("Server is running!");
});

// MongoDB connection
const dbUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/creditAppDB';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Application schema
const ApplicationSchema = new mongoose.Schema({
    name: String,
    address: String,
    email: String,
    password: String,
    loanAmount: Number,
    status: String,
});

const Application = mongoose.model('Application', ApplicationSchema);

// Simple underwriting logic
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
    return "Pending";
}

// Routes
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
        res.status(500).send({ message: "Server error", error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
