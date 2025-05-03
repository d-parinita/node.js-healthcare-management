const mongoose = require('mongoose')

const auth = new mongoose.Schema({
    email: {
        type: String,
        maxLength: 200,
        required: true
    },
    password: {
        type: String,
        maxLength: 200,
        required: true
    },
    userType: {
        type: Number,
        default: 3
    },
    salt: String
})

module.exports = mongoose.model('Auth', auth)