const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (public ফোল্ডার)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

// User Schema & Model
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String }
});

const User = mongoose.model('User', userSchema);

// --- Frontend Page Routes ---

// ১. মূল লিঙ্কে ঢুকলে রেজিস্ট্রেশন পেজ দেখাবে
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// ২. লগইন পেজ
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// ৩. ড্যাশবোর্ড পেজ (সঠিক ফাইলের নামসহ)
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'student-dashboard.html'));
});


// --- Backend API Routes ---

// রেজিস্ট্রেশন API
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(400).send('Registration failed! Email might already exist.');
    }
});

// লগইন API
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        
        if (user) {
            res.redirect('/dashboard');
        } else {
            res.send('Invalid email or password! <a href="/login">Try again</a>');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});