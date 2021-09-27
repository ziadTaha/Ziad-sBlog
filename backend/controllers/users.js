const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { request, response } = require('express')

usersRouter.get('/', async (request, response) => {
    const pageSize = 10
    const page = Number(request.query.pageNumber) || 1
    const keyWord = request.query.keyWord ?
    {
        $or:[
            {
                username: {
                    $regex: request.query.keyWord,
                    $options: 'i',
                }
            },
            {
                name: {
                    $regex: request.query.keyWord,
                    $options: 'i',
                }
            }
        ]
    }
    :{}
    const count = await User.countDocuments({...keyWord})
    const users = await User.find({...keyWord})
    .sort({'name': 1})
    .limit(pageSize)
    .skip(pageSize * (page - 1))

    response.json({users, page, pages:  Math.ceil(count/pageSize)})
})

usersRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id)
    .populate('blogs').populate('followers').populate('following')
    response.json(user)
})

usersRouter.get('/:id/following', async (request, response) => {
    const user = await User.findById(request.params.id)
    response.json(user.following)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRound = 10
    const hashedPassword = await bcrypt.hash(body.password, saltRound)
    const user = new User({
        name:body.name,
        username: body.username,
        hashedPassword,
    })
    const savedUser = await user.save()
    response.json(savedUser)
})

usersRouter.put('/follow', async (request, response) => {
    if(!request.token || !request.user){
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(request.user)
    const userToFollow = await User.findById(request.body.userToFollow)
    let following = user.following
    let followers = userToFollow.followers
    if(following.includes(request.body.userToFollow)){
        following = following.filter(f => f.toString() !== request.body.userToFollow.toString())
        followers = followers.filter(f => f.toString !== request.user)
    }
    else{
        following = following.concat(request.body.userToFollow)
        followers = followers.concat(request.user)
    }
    console.log(following)
    const newUser = {
        following: following
    }
    const newUserToFollow = {
        followers: followers
    }
    const updatedUser = await User.findByIdAndUpdate(request.user, newUser, {new: true})
    await User.findByIdAndUpdate(request.body.userToFollow, newUserToFollow, {new: true})
    response.json(updatedUser.following)

})
usersRouter.put('/', async (request, response) => {
    if(!request.token || !request.user){
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(request.user)
    
    const correctPassword = user === null
    ? false
    : await bcrypt.compare(request.body.password, user.hashedPassword)
    if(!correctPassword){
        return response.status(401).json({ error: 'wrong credintials'})
    }
    
    const newUser = {
        ...request.body
    }
    
    const updatedUser = await User.findByIdAndUpdate(request.user, newUser, {new: true})
    
    response.json(updatedUser)

})

module.exports = usersRouter