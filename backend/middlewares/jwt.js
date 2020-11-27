'use strict'

const koaJwt = require('koa-jwt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const jwtMiddleware = koaJwt({ secret: config.secret })

module.exports = (ctx, next) => {
    // 将token中的数据解密存在ctx中
    try {
        let token = ctx.cookies.get('token');
        if (token) {
            ctx.jwtData = jwt.verify(token, config.secret)
        } else {
            throw { code: 401, message: 'no token' }
        }
    } catch (error) {
        throw { code: 401, message: error.message }
    }
    next()
}