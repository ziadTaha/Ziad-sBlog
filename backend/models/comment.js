const mongoose = require('mongoose')
const Blog = require('./blog')

const CommentSchema = mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type :{
        type: String,
        enum: ['comment', 'reply']   
    },
    replys:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
        required: function() {
            return this.type === 'comment';
          }
    },
    comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment',
        required: function() {
            return this.type === 'reply';
          }
    },
    upvotes: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    downvotes: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    createdAt: { type: Date, 'default': Date.now }
})

CommentSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
CommentSchema.pre('remove', async function(next){
    Blog.updateOne(
        { comments : this._id}, 
        { $pull: { comments: this._id } }) 
    .exec()
    next()
})

CommentSchema.pre('remove', async function(next){
    Blog.updateOne(
        { comments : this._id}, 
        { $pull: { comment: this._id } }) 
    .exec()
    next()
})
module.exports = mongoose.model('Comment', CommentSchema)