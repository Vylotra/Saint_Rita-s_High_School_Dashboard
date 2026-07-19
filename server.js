const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware: CORS এবং JSON পার্সিং নিশ্চিত করা
app.use(cors()); 
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/schoolDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String },
    role: String,
    class: String,
    groupSection: String,
    roll: String,
    mentorTeacher: String,
    subject: String
});

const User = mongoose.model('User', userSchema);

// Registration Endpoint
app.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "Registration Successful!" });
    } catch (err) {
        res.status(500).json({ message: "Registration Failed!", error: err.message });
    }
});

// Login Endpoint (লগইন লজিক)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            // সফল লগইন হলে ড্যাশবোর্ড ইউআরএলসহ রেসপন্স
            res.status(200).json({ 
                message: "Login Successful!", 
                redirectUrl: 'dashboard.html' 
            });
        } else {
            res.status(401).json({ message: "Invalid email or password!" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error!" });
    }
});

// Server Listen on Port 5000
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});