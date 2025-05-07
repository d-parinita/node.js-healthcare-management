const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const auth = require('../models/auth')

exports.signup = (req, res) => {
    const {email, password, userType} = req.body
    const payload = {
        email: email,
        password: password,
        userType: userType,
        id: null
    }
    if (!email || !password) {
        return res.status(400).json({
            error: 'Bad request'
        })
    }
    auth.findOne({
        email: email
    }).then((user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email already exists'
            })
        }
        const authData = new auth(payload)
        bcrypt.genSalt(10, ((err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    throw err
                }
                authData.password = hash
                authData.save().then((data) => {
                    payload.id = data._id
                    jwt.sign(payload, process.env.SECRET, {expiresIn: 3600},
                        (error, token) => {
                            if (error) {
                                return res.status(400).json({
                                    error: 'Error'
                                })
                            }
                            return res.status(200).json({
                                email: email,
                                token: token
                            })
                        }
                    )
                })
            })
        }))
    }).catch((error) => {
        return res.status(501).json({
            error: 'Internal server error'
        })
    })
}

exports.signin = (req, res) => {
    const {email, password} = req.body
    const payload = {
        email: email,
        password: password,
        userType: null,
        id: null
    }
    if (!email || !password) {
        return res.status(400).json({
            error: 'Bad request'
        })
    }
    auth.findOne({
        email: email
    }).then((user) => {
        if (!user) {
            return res.status(400).json({
                error: 'User does not exists'
            })
        }
        payload.id = user._id
        payload.userType = user.userType
        bcrypt.compare(password, user.password).then((isCorrect) => {
            if (isCorrect) {
                jwt.sign(payload, process.env.SECRET, {expiresIn: 3600}, 
                    (error, token) => {
                        if (error) {
                            return res.status(400).json({
                                error: 'Error'
                            })
                        }
                        return res.status(200).json({
                            email: email,
                            token: token
                        })
                    }
                )
            } else {
                return res.status(401).json({
                    error: 'password does not match'
                })
            }
        })
    }).catch((error) => {
        return res.status(501).json({
            error: 'Internal server error'
        })
    })
}