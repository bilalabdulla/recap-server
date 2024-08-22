const UnauthenticatedError = require('../errors/unauthenticated')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    authHeader = req.headers.authorization || req.headers.Authorization 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('invalid authentication')
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId, name: payload.name }
        next()
    } catch (error) {
        throw new UnauthenticatedError('invalid')
    }
}

module.exports = auth 