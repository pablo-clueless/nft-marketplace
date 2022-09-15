const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String },
    walletAddress: { type: String, required: true },
    profileImage: { type: String },
    collections: [{
        name: { type: String },
        nfts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NFT' }]
    }],
    bids: [{
        item: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String },
        price: { type: Number }
    }]
})

const User = mongoose.model('User', userSchema)
module.exports = User