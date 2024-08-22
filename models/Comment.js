const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Please provide your comment']
    },
    // commentedBy: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'SocialUser',
    //     required: [true, 'Please provide user']
    // },
    commentedOn: {
        type: mongoose.Types.ObjectId,
        ref: 'SocialPost',
        required: [true, 'Please provide a post']
    }
}, {timestamps: true })

module.exports = mongoose.model('SocialComment', CommentSchema)