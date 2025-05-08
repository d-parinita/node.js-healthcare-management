const express = require('express')
const app = express()
const moongoose = require('mongoose')
require('dotenv').config()

moongoose.connect(process.env.DATABASE)
.then(() => console.log('connected!'))
.catch((error) => console.log(error))

app.use(express.json())

const auth = require('./routes/auth')
app.use('/api', auth)

const doctor = require('./routes/doctor-management')
app.use('/api', doctor)

const patients = require('./routes/patients')
app.use('/api', patients)

const port = 8000

app.listen(port, () => {
    console.log(`APP IS RUNNING ${port}`)
})
