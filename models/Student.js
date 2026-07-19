const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    roll: String,
    section: String,
    teacherName: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    attendance: [{
        date: String,
        entryTime: String,
        status: String // 'Present' or 'Late'
    }]
});

module.exports = mongoose.model('Student', studentSchema);