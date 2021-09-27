const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    .populate('user')
    .populate('comments')
    response.json(blogs)
})

blogsRouter.get('/personal', async (request, response) => {
    if(!request.token || !request.user)
        return response.status(401).json({error: 'token missing or invalid'})
    
    const pageSize = 5
    const page = request.query.pageNumber || 1
    const count = await Blog.countDocuments({user: request.user})
    const blogs = await Blog.find({user: request.user})
    .sort({_id:-1}) 
    .limit(pageSize)
    .skip(pageSize*(page-1))
    .populate('user')
    .populate('comments')
    
    response.json({blogs, page , pages: Math.ceil(count/pageSize)})
})
blogsRouter.get('/timeline', async (request, response) => {
    if(!request.token || !request.user)
    return response.status(401).json({error: 'token missing or invalid'})

    const pageSize = 5
    const page = request.query.pageNumber || 1
    const user = await User.findById(request.user)
    const count = await Blog.countDocuments({$or :[{user: user.following}, {user: request.user}]})
    const blogs = await Blog.find({$or :[{user: user.following}, {user: request.user}]})
    .sort({_id:-1}) 
    .limit(pageSize)
    .skip(pageSize*(page-1))
    .populate('user')
    .populate('comments')
    response.json({blogs, page, pages: Math.ceil(count/pageSize) })
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    .populate('user')
    .populate('comments')
    response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
    if(!request.token || !request.user)
        return response.status(401).json({error: 'token missing'})
    const user = await User.findById(request.user)
    if(!user)
    return response.status(401).json({error: 'wrong user'})
    const blog = new Blog({...request.body, user: user._id})

    if(!blog.content)
        return response.status(401).json({error: 'content is missing'})
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    if(!request.token || !request.user)
        return response.status(401).json({error : 'token missing or invalid'})
    
    const blog = await Blog.findById(request.params.id)
    if(blog && blog.user.toString() === request.user.toString()){
        const blog = await Blog.findById(request.params.id)
        await blog.remove()
        response.status(204).end()
    }
    else
        response.status(401).json({error: ' not same user created the blog'})
})

blogsRouter.put('/:id', async (request, response) => {
    if(!request.token || request.user)
        return response.status(401).json({error: 'token missing or invalid'})
    
    const blog = await Blog.findById(request.params.id)
    if(blog.user.toString() === request.user.toString()){
        const body = request.body
        const newBlog = {
            content: body.content,
            user: body.user,
            comments: body.comments,
            upvotes: body.upvotes,
            downvotes: body.downvotes
        }
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id
            , newBlog, {new: true})
        response.json(updatedBlog)
    }
    else
    response.status(401).json({error: ' not same user created the blog'})
})

module.exports = blogsRouter