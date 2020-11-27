'use strict'

const fs = require('fs');
const path = require('path');
const log4js = require('log4js');
const config = require('../config');

// 判断是否有logs目录，没有就新建，用来存放日志
const logsDir = path.parse(config.logPath).dir;
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir)
}

// 配置log4js
log4js.configure({
    appenders: {
        console: { type: 'console' },
        dataFile: { type: 'dateFile', filename: config.logPath, pattern: ' yyyy-MM-dd' }
    },
    categories: {
        default: {
            appenders: ['console', 'dataFile'],
            level: 'info'
        }
    }
})

const logger = log4js.getLogger('[default]');
// logger中间件
const loggerMiddleware = async (ctx, next) => {
    const start = new Date();
    await next()
    const ms = new Date() - start;
    // 打印相关参数
    const remoteAddress = ctx.header['x-forwarded-for'] || ctx.ip || (ctx.socket && ctx.socket.remoteAddress || (ctx.socket.socket && ctx.socket.socket.remoteAddress))

    let logText = `${ctx.method} ${ctx.status} ${ctx.url} 请求参数： ${JSON.stringify(ctx.request.body)} 响应参数： ${JSON.stringify(ctx.body)} - ${remoteAddress} - ${ms}ms`
    logger.info(logText)

}


module.exports = {
    logger,
    loggerMiddleware
}
