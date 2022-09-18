const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../schemas/user')
const { PASSWORD_REGEX } = require('../utils')
const { secret } = require('../config/auth.config')

const createUser = async(req, res) => {
    const { username, password, walletAddress } = req.body
    
    if(!username) return res.status(400).json({message: 'Username cannot be empty'})
    if(!walletAddress) return res.status(400).json({message: 'Wallet Address cannot be empty'})
    if(!PASSWORD_REGEX.test(password)) return res.status(400).json({message: 'Password is invalid'})

    try {
        const isUsernameInUse = await User.findOne({username: username})
        const isWalletAddressInUse = await User.findOne({walletAddress: walletAddress})
        if(isUsernameInUse || isWalletAddressInUse) return res.status(500).json({message: 'This user already exists.'})
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
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) return res.status(400).json({message: 'Invalid password'})
        const token = jwt.sign({id: user._id}, secret, {expiresIn: '30d'})
        req.session.token = token
        res.status(200).json({message: 'Signin successful', user, token})
    } catch (error) {
        return res.status(500).json({message: `Internal server error, couldn't verify user`, error})
    }
}

const addAvatar = async() => {
    const { image, username } = req.body

    try {
        const user = User.findOne({username: username})
        if(!user) return res.status(404).json({message: 'User not found'})
        const updatedUser = await User.findOneAndUpdate({_id: user._id}, {image: image}, {new: true})
        if(!updatedUser) return res.status(500).json({message: 'An error occurred'})
        res.status(201).json({message: 'Profile picture added'})
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error})
    }
}

module.exports = { addAvatar, createUser, loginUser }