const express = require('express')
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const uuid = require('uuid').v4

require('dotenv').config()

const { sessionMiddleWare } = require('./middlewares/session')
const userRoutes = require('./routes/user')
const nftRoutes = require('./routes/nft')

const app = express()
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173','http://127.0.0.1:5173'],
        // allowedHeaders: ['x-access-token']
    }
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(sessionMiddleWare)
app.use(morgan('tiny'))

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection
db.once('open', () => console.log('Successfully connected to MongoDB'))
db.on('error', console.error.bind(console, 'Connection error: '))

const wrap = middleWare => (socket, next) => middleWare(socket.request, {}, next)
io.use(wrap(sessionMiddleWare))
io.on('connection', (socket) => {
    console.log(`user ${socket.id} at ${new Date().toLocaleString()}`)

    socket.on('bid-made', (data) => {
        const reply = { data, time: new Date().toLocaleString()}
        socket.emit('response', reply)
    })

    socket.on('bid-removed', (data) => {
        const reply = { data, time: new Date().toLocaleString()}
        socket.emit('response', reply)
    })
})

app.get('/', (req,res) => res.status(200).json({message: `Welcome to NFT Marketplace`}))


app.use('/user', userRoutes)
app.use('/nft', nftRoutes)

server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))