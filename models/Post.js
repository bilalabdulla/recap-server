const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        maxlength: 50
    },
    content: {
        type: String,
        required: [true, "Please provide content"]
    },
    image: {
        type: String,
        default: null 
    }, 
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'SocialUser',
        required: [true, 'Please provide User']
    },
    likes: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model('SocialPost', PostSchema)