const NFT = require('../schemas/nft')
const User = require('../schemas/user')

const create = async(req, res) => {
    const { tokenId, name, description, file, price, creator } = req.body

    try {
        const user = await User.findOne({_id: creator})
        if(!user) return res.status(404).json({message: 'User not found'})
        const newNFT = await new NFT({tokenId, name, description, file, price, creator: user })
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
        const updatedNft = NFT.findOneAndUpdate({_id: id},{$set: {price: newPrice}},{new: true})
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

module.exports = { create, getAll, getOne, remove }