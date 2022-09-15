const express = require('express')

const { bid, create, getAll, getOne, like, remove, updateOne } = require('../controllers/nft')
const { verifyToken } = require('../middlewares/auth-jwt')

const router = express.Router()

router.get('/get', getAll)

router.get('/get/:id', getOne)

router.post('/add', verifyToken, create)

router.put('/update-price', verifyToken, updateOne)

router.put('/bid', verifyToken, bid)

router.put('/like', verifyToken, like)

router.delete('/delete/:id', verifyToken, remove)

module.exports = router