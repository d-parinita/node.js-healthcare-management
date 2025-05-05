const DoctorProfile = require("../models/doctor-management")
const { validationResult } = require("express-validator");

exports.addDoctorProfile = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error:'Bad request'
        }) 
    }
    const {name, speciality, contactInfo, availableTime, profilePic} = req.body
    const payload = {
        name: name,
        speciality: speciality,
        contactInfo: contactInfo,
        availableTime: availableTime,
        profilePic: profilePic
    }
    const doctorProfile = new DoctorProfile(payload)
    doctorProfile.save().then((data) => {
        console.log(data);
        return res.status(200).json({
            msg:'success'
        })
    }).catch((error) => {
        return res.status(501).json({
            error:'error saving data'
        })
    })
}

exports.editDoctorProfile = (req, res) => {
    
}

exports.deleteDoctorProfile = (req, res) => {
    
}