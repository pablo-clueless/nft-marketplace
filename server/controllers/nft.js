const NFT = require('../schemas/nft')
const User = require('../schemas/user')

const createNFT = async(req, res) => {
    const { name, description, file, price, creator } = req.body

    if(!name) return res.status(400).json({message: 'NFT name cannot be empty'})
    if(!description) return res.status(400).json({message: 'NFT description cannot be empty'})
    if(!file) return res.status(400).json({message: 'Please upload a file'})
    if(!price) return res.status(400).json({message: 'Please include a starting price for your item'})

    try {
        const user = await User.findOne({_id: creator})
        if(!user) return res.status(404).json({message: 'User not found'})
        const newNFT = await new NFT({name, description, file, price, creator: user.username})
        const nft = await newNFT.save()
        if(!nft) return res.status(400).json({message: 'Unable to upload NFT at this time'})
        return res.status(201).json({message: 'NFT added to your collection'})
    } catch (error) {
        return res.status(500).json({message: 'An error occurred while processing', error})
    }
}

module.exports = { createNFT, }