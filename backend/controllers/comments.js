const Blog = require('../models/blog')
const Comment = require('../models/comment')
const commentRouter = require('express').Router()

commentRouter.get('/', async (request, response) => {
    const comments = await Comment.find({})
    .populate('user')
    .populate('replys')
    response.json(comments)
})

commentRouter.get('/:id', async (request, response) => {
    const comment = await Comment.findById(request.params.id)
    .populate('user')
    .populate('replys')
    if(!comment)
        return response.status(404).json({error:'not found'})
    response.json(comment)
})

commentRouter.post('/', async (request, response) => {
    if(!request.token || !request.user){
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const comment = new Comment({...request.body,user: request.user})
    const savedComment = await comment.save()
    if(comment.type === 'comment'){
        const blog = await Blog.findById(comment.blog)
        blog.comments = blog.comments.concat(savedComment._id)
        await blog.save()
    }
    else{
        const origin= await Comment.findById(comment.comment)
        origin.replys = origin.replys.concat(savedComment._id)
        console.log(origin.replys)
        await origin.save()
    }
    response.status(201).json(savedComment)
})

commentRouter.put('/:id', async (request, response) => {
    if(!request.token||!request.user)
        return response.status(401).json({error : 'token missing or invalid'})
    const comment = await Comment.findById(request.body.id)
    if(!comment){
        response.status(404).json({error:'not found'})
    }
    else if(comment.user.toString() !== request.user.toString()){
        response.status(401).json({error: 'not the same user'})
    }
    else{
        const body = request.body
        const newComment = {
            ...body
        }
        const updatedComment = await Comment.findByIdAndUpdate(request.params.id
            ,newComment, {new: true})
        response.json(updatedComment)
    }
})

commentRouter.delete('/:id', async (request, response) => {
    if(!request.token || !request.user)
    return response.status(401).json({error: 'token missing or invalid'})
const comment = await Comment.findById(request.params.id).populate('user')
if(!comment){
    response.status(404).json({error:'not found'})
}
else if(comment.user._id.toString() !== request.user.id.toString()){
    response.status(401).json({error: 'not same user created'})
}
else{
    const comment = await Comment.findById(request.params.id)
    if(comment.type === 'reply'){
        const origin = await Comment.findById(comment.comment)
        origin.replys = origin.replys.filter( replay => replay!==comment._id)
        await origin.save()
    }
    await comment.remove()
    response.status(204).end()
}
})

module.exports = commentRouter