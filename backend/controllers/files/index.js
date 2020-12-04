const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const config = require('../../config')
const {initTableFile} = require('../../util')
const {
    queryFiles,
    queryFile,
    getfile,
    refresh
} = require('../../service/files');

module.exports = {
    queryFiles: async (ctx, next) => {
        let {
            id = 0
        } = ctx.query;
        var data = await queryFiles(id)
        ctx.result = {
            data: data
        }
        return next();
    },
    queryFile: async (ctx, next) => {
        let {
            id = 0
        } = ctx.query;
        var data = await queryFile(id)
        ctx.result = {
            data: data
        }
        return next();
    },

    getfile: async (ctx, next) => {
        let {
            filepath
        } = ctx.query;
        if (!path) return next();
        let range = ctx.headers.range; // 实际上请求头的 Range 视屏调节请求会自动带上开始内容 类似这样 Range: bytes=26214400-
        if (!range) {
            // 初始化请求不会带上range 造一个 并且返回200
            range = "bytes=0-";
            ctx.status = 200
        } else {
            // 带range的请求返回 206 表明返回目标url上的部分内容
            ctx.status = 206
        }
        let startBytes = range.replace(/bytes=/, "").split("-")[0];
        startBytes = Number(startBytes);
        filepath = path.resolve(config.public, '.' + filepath);
        let stats = fs.statSync(filepath);
        ctx.set("Accept-Ranges", "bytes")
        console.log("bytes " + startBytes + "-" + (stats.size - 1) + "/" + stats.size)
        ctx.set("Content-Length", stats.size - startBytes)
        ctx.set("Content-Range", "bytes " + startBytes + "-" + (stats.size - 1) + "/" + stats.size)
        ctx.set("Content-Type", "video/mp4")
        ctx.body = fs.createReadStream(filepath, {
            start: startBytes,
            end: stats.size
        })
        next();
    },
    refresh: async (ctx, next) => {
        let data = await refresh(); //清空表
        let reuslt = await initTableFile(); //重新录表
        ctx.result = {
            data: reuslt
        }
        return next();
    }

}