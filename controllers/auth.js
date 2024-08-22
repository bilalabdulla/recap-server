const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    console.log(res.data);
    res.status(200).json({ user, token })
}

const login = async (req, res) => {
    const { email, password } = req.body 

    if (!email || !password) {
        throw new BadRequestError('Please provide your email and password')
    }
    const user = await User.findOne({ email })
    if(!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Incorrect Password')
    }

    const token = user.createJWT()
    console.log(token);
    res.status(StatusCodes.OK).json({ user, token })
}

module.exports = { register, login }