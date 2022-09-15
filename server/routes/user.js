const express = require('express')

const {addAvatar, createUser, loginUser} = require('../controllers/user')

const router = express.Router()

router.post('/signup', createUser)
router.post('/signin', loginUser)
router.put('/add-image', addAvatar)

module.exports = router