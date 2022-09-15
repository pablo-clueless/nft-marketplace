const express = require('express')

const { create, getAll, getOne, remove } = require('../controllers/nft')

const router = express.Router()

router.get('/get', getAll)

router.get('/get/:id', getOne)

router.post('/add', create)

router.delete('/delete/:id', remove)

module.exports = router