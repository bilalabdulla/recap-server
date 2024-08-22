const express = require('express')
const { getAllFollowers, createFollower, getAllFollowing, handleFollow, getFollower } = require('../controllers/follow')
const router = express.Router()

router.route('/:userId/following').get(getAllFollowers)
router.route('/:followerId/followers').get(getAllFollowing)
router.route('/new').post(getFollower)
router.route('/').post(handleFollow)
// router.route('/:followerId/follow')

module.exports = router 