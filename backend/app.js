const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const problemsRouter = require('./controllers/problems')
const commentRouter = require('./controllers/comments')
const app = express()
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to MongoDB')
})
.catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json({limit: '50mb'}))
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/problems', problemsRouter)
app.use('/api/comments', commentRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname,'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app