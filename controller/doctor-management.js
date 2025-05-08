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
        profilePic: profilePic,
        userId: req.auth.id
    }
    const doctorProfile = new DoctorProfile(payload)
    doctorProfile.save().then((data) => {
        return res.status(200).json({
            msg:'success'
        })
    }).catch((error) => {
        return res.status(501).json({
            error:'error saving data'
        })
    })
}

exports.getDoctorById = (req, res) => {
    const id = req.auth.id    
    if (!id) {
        return res.status(502).json({
            error: "Doctor id is required",
        })
    }
    DoctorProfile.findOne({userId: id}).then((doctor) => {
        if (!doctor) {
            return res.status(400).json({
                error: "Doctor doesn't exist",
            })
        }
        return res.status(200).json({
            data: doctor,
        })
    }).catch((error) => {
        return res.status(502).json({
            error: "Unknown error occoured",
        })
    })
}

exports.editDoctorProfile = (req, res) => {
    const updatedData = req.body;
    const doctorId = req.auth?.id;

    DoctorProfile.updateOne({ userId: doctorId }, { $set: updatedData }).then((doctor) => {
        return res.status(200).json({
            data: doctor,
            message: "Doctor updated",
        })
    }).catch((error) => {
        return res.status(520).json({
            error: "Unknown error",
        })
    })
}

exports.deleteDoctorProfile = (req, res) => {
    const doctorId = req.auth?.id;
    DoctorProfile.findOneAndDelete({ userId: doctorId }).then((doctor) => {
        return res.status(200).json({
            data: doctor,
            message: "Doctor profile has been deleted",
        })
    }).catch((error) => {
        return res.status(200).json({
            error: "Unknown error",
        })
    })
}

exports.getDoctors = (req, res) => {

}

exports.getAppointments = (req, res) => {
    
}