const express = require('express')
const { getLikes, addLikes, removeLike } = require('../controllers/likes')
const router = express.Router()

router.route('/:postId/likes').get(getLikes).post(addLikes).delete(removeLike)

module.exports = router 