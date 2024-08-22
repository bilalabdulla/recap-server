const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SocialUser',
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
            default: []
        },
    ],
}, { timestamps: true })

module.exports = mongoose.model('Conversation', ConversationSchema)