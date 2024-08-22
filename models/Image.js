const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    Image: String 
})

module.exports = mongoose.model('Image', ImageSchema)