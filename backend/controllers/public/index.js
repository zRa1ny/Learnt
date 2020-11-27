const jwt = require('jsonwebtoken')
const config = require('../../config')

module.exports = {
    test: ctx => {
        ctx.result = {
            code: 200,
            data: "test"
        }
    },
    login: (ctx,next) => {
        const {
            userName,
            password
        } = ctx.query ;// ctx.request.body;
        // console.log()
        console.log(password)
        let token = jwt.sign({
            data: password,
            // 设置 token 过期时间
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
        }, config.secret)
        ctx.result = {
            code:200,
            msg:"登录成功！"
        };
        ctx.cookies.set('token', token);
        return next()
    }

}