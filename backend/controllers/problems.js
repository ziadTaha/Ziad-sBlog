const problemsRouter = require('express').Router()
const User = require('../models/user')
const Problem = require('../models/problem')
const user = require('../models/user')
const mongoose = require('mongoose')

problemsRouter.get('/', async (request, response) => {
    if(!request.token || !request.user)
        return response.status(401).json({error: 'token missing or invalid'})
    const pageSize = 2
    const page = Number(request.query.pageNumber) || 1
    const keyWord = request.query.keyWord ?
    {
        title: {
            $regex: request.query.keyWord,
            $options: 'i',
        },
    }
    : {}
    const difficulity = request.query.difficulity ? {
        difficulity : request.query.difficulity
    } : {}
    const count = await Problem.countDocuments({...keyWord})
    const problems = await Problem.find({user: request.user,...keyWord,...difficulity})
    .limit(pageSize)
    .skip(pageSize*(page - 1))
    .populate('user')
    response.json({problems,page, pages: Math.ceil(count/pageSize)})
})

problemsRouter.get('/:id', async (request, response) => {
    if(!request.token || !request.user)
        return response.status(401).json({error: 'token missing or invalid'})
    let problem = null
    if(mongoose.Types.ObjectId.isValid(request.params.id)){
        problem = await Problem.findById(request.params.id).populate('user')
    }
    if(!problem){
        response.status(404).json({error:'not found'})
    }
    else if(problem.user._id.toString() !== request.user.toString()){
        response.status(401).json({error: 'not same user created'})
    }
    else{
        response.json(problem)
    }
    
})

problemsRouter.post('/', async (request, response) => {
    if(!request.token || !request.user)
        return response.status(401).json({error: 'token missing or invalid'})
    const user = await User.findById(request.user)
    const problem = new Problem({...request.body, user: user._id})
    if(!problem.title)
        return response.status(401).json({error: 'title is missng'})
    if(!problem.url)
        return response.status(401).json({error: 'url is missng'})
    const savedProblem = await problem.save()
    user.problems = user.problems.concat(savedProblem._id)
    await user.save()
    response.status(201).json(savedProblem)
})

problemsRouter.put('/:id', async (request, response) => {
    if(!request.token || !request.user)
    return response.status(401).json({error: 'token missing or invalid'})
const problem = await Problem.findById(request.params.id)
if(!problem){
    return response.status(404).json({error:'not found'})
}
else if(problem.user.toString() !== request.user.toString()){
    return response.status(401).json({error: 'not same user created'})
}
else{
    
    const newProblem = {
         ...request.body
    }
    const updatedProblem = await Problem.findByIdAndUpdate(request.params.id
        ,newProblem, {new: true})
    response.json(updatedProblem)
}
})

problemsRouter.delete('/:id',  async (request, response) => {
    if(!request.token || !request.user)
    return response.status(401).json({error: 'token missing or invalid'})
const problem = await Problems.findById(request.params.id)
if(!problem){
    response.status(404).json({error:'not found'})
}
else if(problem.user.toString() !== request.user.toString()){
    response.status(401).json({error: 'not same user created'})
}
else{
    const problem = await Problem.findById(request.params.id)
    await problem.remove()
    response.status(204).end()
}
})
module.exports = problemsRouter
