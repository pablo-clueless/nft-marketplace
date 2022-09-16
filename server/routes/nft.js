const express = require('express')

const { bid, create, getAll, getOne, like, remove, updateOne } = require('../controllers/nft')
const { verifyToken } = require('../middlewares/auth-jwt')

const router = express.Router()

router.get('/get', getAll)

router.get('/get/:id', getOne)

router.post('/add', create)

router.put('/update-price', updateOne)

router.put('/bid', bid)

router.put('/like', like)

router.delete('/delete/:id', remove)

module.exports = router