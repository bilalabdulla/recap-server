const { NotFoundError } = require("../errors")
const Post = require("../models/Post")

const getAllPosts = async (req, res) => {
    const posts = await Post.find({}).sort('-createdAt')
    res.status(200).json({ posts })
}

const createPost = async (req, res) => {
    const posts = await Post.create(req.body)
    res.status(200).json({ posts })
}

const updatePost = async (req, res) => {
    const { postId } = req.params
    const posts = await Post.findByIdAndUpdate({
        _id : postId 
    }, {image: req.file.filename}, {new: true, runValidators: true })
    console.log(req.file.filename);
    res.status(200).json({ posts })
}

const getUserPosts = async (req, res) => {
    const { userId } = req.params 
    const posts = await Post.find({
        createdBy: userId
    }).sort('-createdAt')
    res.status(200).json({ posts })
}

const deleteAllUserPosts = async (req, res) => {
    const { userId } = req.params 
    const posts = await Post.deleteMany({
        createdBy: userId
    })
    res.status(200).json({ posts })
}

const getPost = async (req, res) => {
    const { postId } = req.params 

    const post = await Post.findOne({
        _id: postId
    })
    if(!post) {
        throw new NotFoundError('No posts found')
    }
    res.status(200).json({ post })
}

const likePost = async (req, res) => {
    const { postId } = req.params

    const post = await Post.findByIdAndUpdate({
        _id: postId
    }, req.body, {new: true, runValidators: true})
    res.status(200).json({ post })
}

const deletePost = async (req, res) => {
    const { postId } = req.params 

    const post = await Post.findByIdAndDelete({
        _id: postId
    })
    if (!post) {
        throw new NotFoundError(`no post found with id ${postId}`)
    }
    res.status(200).json({ post })
}


module.exports = {
    getAllPosts,
    createPost,
    getPost,
    deletePost,
    getUserPosts,
    deleteAllUserPosts,
    likePost,
    updatePost
}