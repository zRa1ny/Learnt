const jwt = require('jsonwebtoken')
const fs = require('fs')
const stream = require('stream')
const {
    queryFiles,
    queryFile,
    getfile
} = require('../../service/files');
const {
    stringify
} = require('uuid');
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
            id = 0
        } = ctx.params;
        let [row] = await getfile(id)
        let filepath = row.path
        let stats = fs.statSync(filepath)
        let range = ctx.headers.range;
        let positions = range ? range.replace(/bytes=/, "").split("-") : [0];
        let start = parseInt(positions[0], 10);
        let total = stats.size;
        let end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        let chunksize = (end - start) + 1;
        ctx.set("Content-Range" , "bytes " + start + "-" + end + "/" + total)
        ctx.set( "Accept-Ranges", "bytes")
        ctx.set("Content-Length" , chunksize)
        ctx.set("Content-Type" ,  row.type)
        //  let data = fs.readFileSync(filepath);
        //  ctx.end(data, "binary");
        
        // var stream = fs.createReadStream(filepath, {
        //         start: start,
        //         end: end
        //     })
        //     .on("open", function () {
        //         stream.pipe(ctx);
        //     }).on("error", function (err) {
        //         ctx.end(err);
        //     });
        // console.log(data)
        // const bufferStream = new stream.PassThrough();
        // bufferStream.end(data);
        // bufferStream.pipe(ctx);
        ctx.body = fs.createReadStream(filepath)
        return next();
    },

}