const express = require('express')
const { uploadImage, getAllImages } = require('../controllers/images')
const router = express.Router()

router.route('/').post(uploadImage).get(getAllImages)

module.exports = router 