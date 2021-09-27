const mongoose = require('mongoose')
const User = require('./user')
const problemSchema = mongoose.Schema({
   title: {
       type: String,
       required: true,
   } ,
   description: String ,
   difficulity: {
       type: String,
       enum: ['easy', 'meduim', 'hard'] 
   },
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
   },
   url: {
       type: String,
       required: true
   },
   createdAt: { type: Date, 'default': Date.now }
})
problemSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

problemSchema.pre('remove', async function(next){
    User.updateOne(
        { problems : this._id}, 
        { $pull: { problems: this._id } }) 
    .exec()
    next()
})

module.exports = mongoose.model('Problem', problemSchema)