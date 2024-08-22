const Follow = require('../models/Follow')

const getAllFollowers = async (req, res) => {
    const { userId } = req.params
    const followers = await Follow.find({
        userId: userId 
    }) 
    res.status(200).json({ followers })
}

const getAllFollowing = async (req, res) => {
    const { followerId } = req.params
    const followers = await Follow.find({
        followerId: followerId
    })
    res.status(200).json({ followers })
}

const createFollower = async (req, res) => {
    const follower = await Follow.create(req.body)
    res.status(200).json({ follower })
}

const getFollower = async (req, res) => {
    const { followerId, userId } = req.body 
    const follower = await Follow.findOne({
        followerId: followerId,
        userId: userId  
    })
    if(!follower) {
        res.status(404).json('Follower not found')
    }
    res.status(200).json({ follower })
}

const handleFollow = async (req, res) => {
    const { userId, followerId } = req.body
    const following = await Follow.findOne({
        followerId: followerId,
        userId: userId 
    })
    if (following) {
        const removeFollow = await Follow.findOneAndDelete({
            userId: userId,
            followerId: followerId
        })
        res.status(201).json('unfollowed')
    } else {
        const addFollow = await Follow.create(req.body)
        res.status(200).json('followed')
    }
    res.status(200).json({ following })
}

module.exports = {
    getAllFollowers,
    getFollower,
    getAllFollowing,
    createFollower,
    handleFollow
}
