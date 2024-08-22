const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide a post']
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide a user']
    }
})

module.exports = mongoose.model('PostLikes', LikeSchema)