const bcrypt = require('bcrypt')

const User = require('../schemas/user')
const { PASSWORD_REGEX } = require('../utils')

const createUser = async(req, res) => {
    const { username, password, walletAddress } = req.body
    
    if(!username) return res.status(400).json({message: 'Username cannot be empty'})
    if(!walletAddress) return res.status(400).json({message: 'Wallet Address cannot be empty'})
    if(!PASSWORD_REGEX.test(password)) return res.status(400).json({message: 'Password is invalid'})

    try {
        const isUsernameInUse = await User.findOne({username: username})
        const isWalletAddressInUse = await User.findOne({walletAddress: walletAddress})
        if(isUsernameInUse || !isWalletAddressInUse) return res.status(500).json({message: 'This user already exists.'})
        const saltRounds = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        await User.create({username, walletAddress, password: hashedPassword})
        res.status(201).json({message: 'User created succesfully'})
    } catch (error) {
        return res.status(500).json({message: 'An error occured while creating user', error})
    }
}

const loginUser = async(req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({username: username})
        if(!user) return res.status(404).json({message: 'User not found'})
        const isPasswordValid = bcrypt.compare(password, user.password)
        if(!isPasswordValid) return res.status(400).json({message: 'Invalid password'})
        res.status(200).json({message: 'Signin successful', user})
    } catch (error) {
        return res.status(500).json({message: `Internal server error, couldn't verify user`, error})
    }
}

module.exports = { createUser, loginUser }