const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const doctorProfile = mongoose.Schema({
    name: {
        type: String,
        maxLength: 200,
        required: true,
    },
    speciality: {
        type: String,
        maxLength: 200,
        required: true,
    },
    contactInfo: {
        type: String,
        maxLength: 200,
        required: true,
    },
    availableTime: {
        type: Array,
        required: true
    },
    profilePic: {
        type: String
    },
    userId: {
        type: ObjectId,
        ref: 'Auth'
    }
})

module.exports = mongoose.model('DoctorProfile', doctorProfile)