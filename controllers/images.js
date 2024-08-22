const Image = require('../models/Image')

const getAllImages = async (req, res) => {
    const images = await Image.find({})
    res.status(200).json({ images })
}

const getImage = async (req, res) => {
    
}

const uploadImage = async (req, res) => {
    const image = Image.create({
        Image: req.file.filename
    })
    res.status(200).json({ image })
}

module.exports = {
    uploadImage,
    getAllImages
}
