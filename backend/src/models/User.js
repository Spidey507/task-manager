const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, 
        unique: true, 
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        lowercase: true, 
    }, 
    password: {
        type: String,
        required: true, 
    }
});

// Hash pass


const User = mongoose.model('User', userSchema);

module.exports = User;
