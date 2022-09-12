const express = require('express')
const http = require('http')

const app = express()
const server = http.createServer(app)

require('dotenv').config()

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})