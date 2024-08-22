const express = require('express')
const { getUserChats, createUserChat, getChats, getConvos } = require('../controllers/chats')
const router = express.Router()

router.route('/').post(createUserChat)
router.route('/:receiverId').get(getUserChats)
router.route('/send/:userId').get(getConvos)

module.exports = router 