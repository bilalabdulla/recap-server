const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    pfp: {
        type: String
    },
    userId : {
        type: mongoose.Types.ObjectId,
        ref: 'SocialUser',
        required: [true, 'Please provide a user']
    },
    avi: {
        type: String
    }
})

module.exports = mongoose.model('Profile', ProfileSchema)