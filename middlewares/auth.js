const jwt = require("jsonwebtoken");
const { constants } = require("../constants");

exports.isSignedIn = (req, res, next) => {
    const secret = process.env.SECRET;
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (!token) {
        return res.status(401).json({ 
            error: 'Unauthorized - Missing JWT' 
        });
    }
    jwt.verify(token, secret, { algorithms: ["sha1", "RS256", "HS256"] }, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Unauthorized - Invalid JWT' });
        }
        req.auth = decoded;
        next();
    });
}

exports.isAdmin = (req, res, next) => {
    if(req.auth.userType === constants.USERTYPE.ADMIN) {
        return res.status(401).json({
          error: "You are not an admin ! Access Denied",
        })
    } 
    next();
}

exports.isDoctor = (req, res, next) => {
    if(req.auth.userType != constants.USERTYPE.DOCTOR) {
        return res.status(401).json({
          error: "You are not an doctor ! Access Denied",
        })
    } 
    next();
}

exports.isPatient = (req, res, next) => {
    if(req.auth.userType != constants.USERTYPE.PATIENT) {
        return res.status(401).json({
          error: "You are not an patient ! Access Denied",
        })
    } 
    next();
}