const Appointments = require('../models/patients')
const { validationResult } = require("express-validator");

exports.bookAppointment = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Bad request'
        })
    }
    const {name, age, slot, contactNo, doctorId} = req.body
    const payload = {
        name: name,
        age: age,
        slot: slot,
        contactNo: contactNo,
        doctorId: doctorId
    }
    const appointment = new Appointments(payload)
    appointment.save().then((data) => {
        return res.status(200).json({
            msg:'success'
        })
    }).catch((error) => {
        return res.status(501).json({
            error:'error saving data'
        })
    })
}

exports.getMyAppointment = (req, res) => {
    
}