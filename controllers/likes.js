const { NotFoundError } = require("../errors")
const Like = require("../models/Like")

const getLikes = async (req, res) => {
    const { postId } = req.params
    const likes = await Like.find({ postId: postId })
    res.status(200).json( likes.length )
}

const addLikes = async (req, res) => {
    const {postId, userId } = req.body
    const likes = await Like.findOne({
        userId: userId,
        postId: postId 
    })
    if (likes) {
        const deleteLike = await Like.findOneAndDelete({
            postId: postId,
            userId: userId
        })
        res.status(201).json({ deleteLike })
    } else {
        const like = await Like.create(req.body)
        res.status(200).json({ like })
    }
    
}
const removeLike = async (req, res) => {
    const { userId, postId } = req.body 
    const like = await Like.findOneAndDelete({
        userId: userId,
        postId: postId 
    })
    if (!like) {
        throw new NotFoundError(`cant find post with id ${postId}`)
    }
    res.status(200).json({ like })
}

module.exports = { getLikes, addLikes, removeLike }