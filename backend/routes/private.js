
'use strict'
 
const Router = require('koa-router')
const jwtMiddleware = require('../middlewares/jwt')
 
const router = new Router()
const controllers = require('../controllers/private')

router.prefix('/api')
router.use(jwtMiddleware)

router.get('/test', controllers.test)
router.get('/getUserInfo', controllers.getUserInfo)

module.exports = router
