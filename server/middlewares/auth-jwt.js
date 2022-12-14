const jwt = require('jsonwebtoken')

const { secret } = require('../config/auth.config')

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token']
    if(!token) {
        res.status(403).json({message: 'No access token provided'})
    }
    jwt.verify(token, secret, (err, decoded) => {
        if(err) {
            res.status(401).json({message: 'User is unauthorized'})
        }
        req.userId = decoded.id
        next()
    })
}

const authJwt = { verifyToken }

module.exports = authJwt