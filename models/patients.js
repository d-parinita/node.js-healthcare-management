const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const appointments = mongoose.Schema({
    name: {
        type: String,
        maxLength: 200,
        required: true,
    },
    age: {
        type: Number,
        maxLength: 200,
        required: true,
    },
    slot: {
        type: String,
        maxLength: 200,
        required: true,
    },
    contactNo: {
        type: String,
        maxLength: 200,
        required: true,
    },
    doctorId: {
        type: ObjectId,
        ref: 'Auth'
    },
    userId: {
        type: ObjectId,
        ref: 'Auth'
    }
})

module.exports = mongoose.model('Appointments', appointments)