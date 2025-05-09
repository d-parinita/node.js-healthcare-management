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
        doctorId: doctorId,
        userId: req.auth.id
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
    const id = req.auth.id    
    if (!id) {
        return res.status(502).json({
            error: "Patient id is required",
        })
    }
    Appointments.find({ userId: id }).then((data) => {
        if (!data) {
            return res.status(400).json({
                error: "Appointments doesn't exist",
            })
        }
        return res.status(200).json({
            data: data,
        })
    }).catch((error) => {
        return res.status(502).json({
            error: "Unknown error occoured",
        })
    })
}