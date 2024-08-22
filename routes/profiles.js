const express = require('express')
const { getProfilePic, createProfilePic, updateHeader } = require('../controllers/profile')
const router = express.Router()


router.route('/:userId').get(getProfilePic).post(createProfilePic).patch(updateHeader)

module.exports = router