const logger = require('./logger')
const jwt = require('jsonwebtoken')
const config = require('./config')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:', request.path)
    logger.info('Body:', request.body)
    logger.info('---:')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if(error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }
    next(error)
}

const tokenExtractor = (request, response, next) => {
    
    const authorization = request.headers.cookie
    console.log(authorization)
    if(authorization && authorization.split('; ')[1].toLowerCase().startsWith('token'))
        request.token = authorization.split('; ')[1].substring(6)
    
    next()
}

const userExtractor = async (request, response, next) => {
    if(request.token){
        const decodedToken = await jwt.verify(request.token,config.SECRET)
        request.user = decodedToken.id
    }
    
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    userExtractor,
    tokenExtractor
}