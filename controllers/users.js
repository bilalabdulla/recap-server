const { NotFoundError } = require('../errors')
const User = require('../models/User')

const getAllUsers = async (req, res) => {
    const users = await User.find({})
    const { user: {userId} } = req
    res.status(200).json({ users, userId })
}

const getUser = async (req, res) => {
    const { userId } = req.params 
    const user = await User.findById({
        _id: userId 
    })
    if (!user) {
        throw new NotFoundError(`no user found with id ${userId}`)
    }
    res.status(200).json({ user })
}

const deleteUser = async (req, res) => {
    const { userId } = req.params 
    // const { user: {userId} } = req 

    const user = await User.findByIdAndDelete({
        _id: userId 
    })
    if (!user) {
        throw new NotFoundError(`no user with id ${userId}`)
    }
    res.status(200).json({ user })
}

const updateUser = async (req, res) => {
    const { userId } = req.params
    req.body.pfp = req?.file?.filename
    console.log(req.file);
    const user = await User.findByIdAndUpdate({
        _id: userId
    }, req.body, {new: true, runValidators: true })
    if (!user) {
        throw new NotFoundError(`no user found with id ${userId}`)
    }
    res.status(200).json({ user })
}

module.exports = {
    deleteUser,
    updateUser,
    getAllUsers,
    getUser
}