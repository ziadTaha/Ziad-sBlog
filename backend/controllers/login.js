const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
    const loggedInUser = request.body

    const user = await User.findOne({username: loggedInUser.username })
    const correctPassword = user === null 
    ? false
    : await bcrypt.compare(loggedInUser.password, user.hashedPassword)
    if(!(user&& correctPassword))
        return response.status(401).json({ error: 'wrong credintials'})
    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userForToken, config.SECRET)

    response.status(200)
    .cookie("token", token, { httpOnly: true })
    .send({username: user.username, name: user.name, image: user.image, id: user._id})
})

module.exports = loginRouter