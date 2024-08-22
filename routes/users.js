const express = require('express')
const { deleteUser, updateUser, getAllUsers, getUser } = require('../controllers/users')
const router = express.Router()

router.route('/').get(getAllUsers)
router.route('/:userId').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router