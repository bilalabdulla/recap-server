const Comment = require('../models/Comment')

const getAllComments = async (req, res) => {
    const { postId } = req.params
    const comments = await Comment.find({
        commentedOn: postId 
    })
    res.status(200).json({ comments })
}

const createComment = async (req, res) => {
    const { postId } = req.params 
    req.body.commentedOn = postId 
    const comment = await Comment.create(req.body)
    res.status(200).json({comment})
}

const deleteComment = async (req, res) => {
    const { commentId } = req.params
    const comment = await Comment.findByIdAndDelete({
        _id: commentId 
    })
    res.status(200).json({ comment })
}

module.exports = {
    getAllComments, createComment, deleteComment
}