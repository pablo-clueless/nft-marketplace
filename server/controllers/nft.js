const NFT = require('../schemas/nft')
const User = require('../schemas/user')
const socket = require('socket.io')

const create = async(req, res) => {
    const { name, description, file, price, creator } = req.body

    if(!name || !description || !file) return res.status(400).json({message: 'Please add all NFT info'})
    if(price === 0) return res.status(400).json({message: `Price cannot be ${price}`})

    try {
        const user = await User.findOne({_id: creator})
        if(!user) return res.status(404).json({message: 'User not found'})
        const newNFT = new NFT({ tokenId, name, description, file, price, creator: user })
        const nft = await newNFT.save()
        if(!nft) return res.status(400).json({message: 'Unable to upload NFT at this time'})
        return res.status(201).json({message: 'NFT added to your collection'})
    } catch (error) {
        return res.status(500).json({message: 'An error occurred while processing', error})
    }
}

const getOne = async(req, res) => {
    const { id } = req.params
    try {
        const nft = await NFT.findOne({_id: id})
        if(!nft) return res.status(404).json({message: 'NFT not found'})
        return res.status(200).send(nft)
    } catch (error) {
        return res.status(500).json({message: 'internal server error', error})
    }
}

const getAll = async(req, res) => {
    try {
        const nfts = await NFT.find({})
        return res.status(200).json({message: 'Sending all NFTs', nfts})
    } catch (error) {
        return res.status(500).json({message: 'internal server error', error})
    }
}

const updateOne = async(req, res) => {
    const { id, newPrice } = req.body
    try {
        const nft = await NFT.findOne({_id: id})
        if(!nft) return res.status(404).json({message: 'NFT not found'})
        const updatedNft = await NFT.findOneAndUpdate({_id: id},{$set: {price: newPrice}},{new: true})
        if(!updatedNft) return res.status(400).json({message: 'Unable to update price listing'})
        return res.status(201).json({message: 'NFT listing price updated'})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

const remove = async(req, res) => {
    const { id } = req.params
    try {
        const nft = await NFT.findOneAndDelete({ _id: id})
        if(!nft) return res.status(404).json({message: 'NFT not found'})
        res.status(200).json({message: 'NFT deleted successfully'})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

const bid = async(req, res) => {
    const { nftId, amount, bidId, action, id } = req.body
    try {
        const user = await User.findOne({_id: id})
        if(!user) return res.status(404).json({message: 'User not found'})

        const updates = {by: user.username, amount}
        switch(action) {
            case 'make-bid':
                await NFT.findOneAndUpdate({_id: nftId}, {$push: {bids: {updates}}},{new: true}, (err) => {
                    if(err) return res.status(400).json({message: 'Unable to place bid at the moment'})
                    return res.status(201).json({message: 'Bid placed successfully'})
                })
            break
            case 'remove-bid':
                await NFT.findByIdAndUpdate({_id: nftId}, {$pull: {bids:{_id: bidId}}},{new: true}, (err) => {
                    if(err) return res.status(400).json({message: 'Unable to remove bid at the moment'})
                    return res.status(201).json({message: 'Bid removed successfully'})
                })
            break
        }
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'})
    }
}

const like = async(req, res) => {
    const { action, nftId } = req.body
    try {
        switch(action) {
            case 'like':
                await NFT.findByIdAndUpdate({_id: nftId}, {$inc: {like: 1}}, {new: true}, (err) => {
                    if(err) return res.status(400).json({message: 'Unable to like this NFT'})
                    return res.status(200).json({message: 'NFT liked'})
                })
            break
            case 'unlike':
                await NFT.findByIdAndUpdate({_id: nftId}, {$inc: {like: -1}}, {new: true}, (err) => {
                    if(err) return res.status(400).json({message: 'Unable to unlike '})
                })
        }
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

module.exports = { bid, create, getAll, getOne, like, remove, updateOne }