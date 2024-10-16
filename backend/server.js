const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/alumniDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('Connection error', err);
});

const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    yearOfPassing: {
        type: Number,
        required: true,
    },
    currentlyWorking: {
        type: String,
        required: true,
    },
    yearOfJoining: {
        type: Number,
        required: true,
        min: 0,
        max: 99,
    },
    departmentCode: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: String,
        required: true,
        match: /^[0-9]{3}$/,
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const Registration = mongoose.model('Registration', registrationSchema);

app.post('/register', async (req, res) => {
    const {
        name,
        email,
        phone,
        yearOfPassing,
        currentlyWorking,
        yearOfJoining,
        departmentCode,
        rollNumber,
        registrationNumber,
        password
    } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Registration({
            name,
            email,
            phone,
            yearOfPassing,
            currentlyWorking,
            yearOfJoining,
            departmentCode,
            rollNumber,
            registrationNumber,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Registration.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Logged in successfully!', user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
