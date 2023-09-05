const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    rollno: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    isemailverified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'student'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
},
{timestamps: true},
);
module.exports = mongoose.model('Student', studentSchema);