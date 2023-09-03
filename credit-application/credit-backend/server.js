require('dotenv').config();
import cors from 'cors';
import express, { json } from 'express';
import { json as _json } from 'body-parser';
import { connect, connection, Schema, model } from 'mongoose';
import helmet from 'helmet';
import { genSaltSync, hashSync } from 'bcrypt';
import morgan from 'morgan';
import { post } from 'axios';

const app = express();
app.use(cors());
app.use(_json());
app.use(morgan('dev'));
// Middleware
app.use(json());
app.use(helmet());

app.post('/apply', (req, res) => {
    post('http://localhost:5000/apply', req.body)
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send(error);
      });
  });
  
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// MongoDB connection
const dbUrl = process.env.DATABASE_URL || 'mongodb+srv://paygeon:popcorn@cluster0.kj3eo6m.mongodb.net/?retryWrites=true&w=majority';
connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});

connection.on('connected', () => {
    console.log('Connected to MongoDB');
});


// Application schema
const ApplicationSchema = new Schema({
    name: String,
    address: String,
    email: String,
    password: String,
    loanAmount: Number,
    status: String,
});

const Application = model('Application', ApplicationSchema);

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
        const salt = genSaltSync(10);
        const hashedPassword = hashSync(req.body.password, salt);

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
