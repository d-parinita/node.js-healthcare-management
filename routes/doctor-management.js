const express = require('express')
const { check } = require("express-validator");
const { addDoctorProfile, editDoctorProfile, deleteDoctorProfile } = require('../controller/doctor-management')
const { isDoctor, isSignedIn } = require('../middlewares/auth')
const router = express.Router()

router.post('/add-doctor-profile',
    [
        check('name', 'name is required'),
        check('speciality', 'speciality is required'),
        check('contactInfo', 'contactInfo is required'),
        check('availableTime', 'availableTime is required')
    ],
    isSignedIn, 
    isDoctor, 
    addDoctorProfile
)
router.patch('/edit-doctor-profile', isSignedIn, isDoctor, editDoctorProfile)
router.delete('/delete-doctor-profile', isSignedIn, isDoctor, deleteDoctorProfile)

module.exports = router;