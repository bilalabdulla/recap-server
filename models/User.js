const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide your first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please provide your last name']
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'undefined'],
        default: 'undefined'
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please provide valid email'],
        unique: true 
    },
    password: {
        type: String,
        required: [true, 'Please provide your password']
    },
    pfp: {
        type: String,
        default: "userimage.png"
    },
    header: {
        type: String,
        default: null 
    },
    bio: {
        type: String 
    }
}, {timestamps: true })

UserSchema.pre('save', async function (next)  {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({
        userId: this._id, name: this.firstName
    }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('SocialUser', UserSchema)