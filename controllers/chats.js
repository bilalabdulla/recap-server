const { NotFoundError } = require("../errors")
const Chat = require("../models/Chat")
const Conversation = require('../models/Conversation')

const getUserChats = async (req, res) => {

    const { receiverId } = req.params
    const senderId = req.user.userId

    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId ]}
    }).populate('messages')

    if (!conversation) {
        res.status(200).json([])
    }

    res.status(200).json( conversation.messages )
}

const createUserChat = async (req, res) => {
    const {  receiverId, text } = req.body
    const senderId = req.user.userId 

    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId ]}
    })

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        })
    }

    const newMessage = new Chat({
        senderId,
        receiverId,
        text
    })

    if (newMessage) {
        conversation.messages.push(newMessage._id)
    }

    await Promise.all([conversation.save(), newMessage.save()])

    res.status(200).json({ newMessage })
}

const getConvos = async (req, res) => {
    const {userId: senderId} = req.params
    
    const convo = await Conversation.find({
        participants: senderId 
    }).populate('participants').sort('-updatedAt')

    if (!convo) {
        res.status(404).json('not found')
    }
    res.status(200).json({ convo })
} 

module.exports = {
    getUserChats,
    createUserChat,
    getConvos
}