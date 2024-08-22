const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    pfp: {
        type: String
    },
    userId : {
        type: mongoose.Types.ObjectId,
        ref: 'SocialUsers',
        required: [true, 'Please provide a user']
    },
    avi: {
        type: String
    }
},{timestamps: true})
module.exports = mongoose.model('Profile', ProfileSchema)