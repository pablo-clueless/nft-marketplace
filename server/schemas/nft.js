const mongoose = require('mongoose')

const nftSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: String, required: true },
    price: { type: Number, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
    bids: [{
        by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        amount: { type: Number }
    }],
    likes: { type: Number, default: 0, min: 0 }
})

const NFT = mongoose.model('NFT', nftSchema)
module.exports = NFT