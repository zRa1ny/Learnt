const jwt = require('jsonwebtoken')
const {getUserInfo} = require('../../service/user')
module.exports = {
    test: (ctx, next) => {
        ctx.result = {
            token: ctx.jwtData
        };
        return next()
    },
    getUserInfo:(ctx, next) => {
        ctx.result ={
            msg:'请求成功！',
            data:getUserInfo()
        } 
        return next()
    },
}