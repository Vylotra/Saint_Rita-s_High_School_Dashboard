const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

// এটিই আসল জায়গা যেখানে কনস্ট্রাক্টর হিসেবে এক্সপোর্ট করা হচ্ছে
module.exports = mongoose.model('User', userSchema);