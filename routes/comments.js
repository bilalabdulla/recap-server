const express = require('express')
const { getAllComments, createComment, deleteComment } = require('../controllers/comments')
const router = express.Router()

router.route('/:postId').get(getAllComments).post(createComment)
router.route('/delete/:commentId').delete(deleteComment)

module.exports = router 