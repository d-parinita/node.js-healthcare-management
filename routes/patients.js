const express = require('express')
const { check } = require("express-validator")
const { isSignedIn, isPatient } = require('../middlewares/auth')
const { bookAppointment, getMyAppointment } = require('../controller/patients')
const router = express.Router()

router.post('/book-appointment', 
    [
        check('name', 'name is required'),
        check('age', 'age is required'),
        check('contactNo', 'contactNo is required'),
        check('slot', 'slot is required'),
        check('doctorId', 'doctorId is required'),
    ],
    isSignedIn, 
    isPatient, 
    bookAppointment
)
router.get('/view-my-appointments', isSignedIn, isPatient, getMyAppointment)

module.exports = router