const { NotFoundError } = require("../errors")
const Profile = require("../models/Profile")


const getProfilePic = async (req, res) => {
    const { userId } = req.params
    const profile = await Profile.findOne({
        userId: userId 
    }).populate('userId')
    if (!profile) {
        throw new NotFoundError('no profile pic found')
    }
    res.status(200).json({ profile })
}

const createProfilePic = async (req, res) => {
    const { userId } = req.params
    const profile = await Profile.create({
        avi : req.file.filename,
        userId: userId 
    }).populate('userId')
    console.log(req.file);
    res.status(200).json({ profile })
}

const updateHeader = async (req, res) => {
    const { userId } = req.params 
    req.body.avi = req.file.filename
    const profile = await Profile.findOneAndUpdate({
        userId: userId 
    }, req.body, {new:true, runValidators: true }).populate('userId')
    console.log(req.file);
    res.status(200).json({ profile })
}

module.exports = {
    getProfilePic,
    createProfilePic,
    updateHeader
}