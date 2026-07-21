const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware: CORS এবং JSON পার্সিং নিশ্চিত করা
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String }
});

const User = mongoose.model('User', userSchema);

// Basic Route
app.get('/', (req, res) => {
    res.send('Saint Rita High School Dashboard API is running...');
});

// Port configuration for Render & Localhost
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});