const express = require('express')
const { addDoctorProfile, editDoctorProfile, deleteDoctorProfile } = require('../controller/doctor-management')
const router = express.Router()

router.post('add-doctor-profile', addDoctorProfile)
router.patch('edit-doctor-profile', editDoctorProfile)
router.delete('delete-doctor-profile', deleteDoctorProfile)

module.exports = router;