const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please provide a text']
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide a user']
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide a sender']
    }
}, {timestamps: true })

module.exports = mongoose.model('Chat', ChatSchema)