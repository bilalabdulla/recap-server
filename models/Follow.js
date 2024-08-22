const mongoose = require('mongoose')

const FollowSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Types.ObjectId,
        ref: 'SocialUser',
        required: [true, 'please provide a user']
    },
    followerId : {
        type: mongoose.Types.ObjectId,
        ref: 'SocialUser',
        required: [true, 'please provide a user to follow']
    },
    followerName: {
        type: String,
        required: [true, 'Please provide a name']
    },
    followerEmail: {
        type: String,
        required: [true, 'Please provide an email']
    } 
}, { timestamps: true })

module.exports = mongoose.model('Follow', FollowSchema)

