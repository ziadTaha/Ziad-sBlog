const mongoose = require('mongoose')
const User = require('./user')

const blogSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    upvotes: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    downvotes: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    comments: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    createdAt: { type: Date, 'default': Date.now }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
blogSchema.pre('remove', async function(next){
    User.updateOne(
        { blogs : this._id}, 
        { $pull: { blogs: this._id } }) 
    .exec()
    next()
})

module.exports = mongoose.model('Blog', blogSchema)