const Koa = require('koa')
const bodyParser = require('koa-bodyparser')()
const static = require('koa-static')
var range = require('koa-range');

const config = require('./config')
const {publicRouter,privateRouter} = require('./routes')
const { loggerMiddleware } = require('./middlewares/logger')
const { errorHandler,responseHandler }  = require('./middlewares/response')

const app = new Koa();

// 大文件持续
app.use(range)
// Logger 
app.use(loggerMiddleware)

// Error Handler
app.use(errorHandler)
app.use(bodyParser)

// Global Middlewares
// app.use(static(config.publics))
app.use(static( config.public))



// backend Routes
app.use(publicRouter.routes(),publicRouter.allowedMethods())
app.use(privateRouter.routes(),privateRouter.allowedMethods())


// Response 
app.use(responseHandler)

module.exports = app

