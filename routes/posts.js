const express = require('express')
const { getAllPosts, createPost, getPost, deletePost, getUserPosts, deleteAllUserPosts, likePost, updatePost } = require('../controllers/posts')
const router = express.Router()

router.route('/').get(getAllPosts).post(createPost)
router.route('/:postId').get(getPost).delete(deletePost).patch(likePost)
router.route('/:postId/update').patch(updatePost)
router.route('/userposts/:userId').get(getUserPosts).delete(deleteAllUserPosts)

module.exports = router 