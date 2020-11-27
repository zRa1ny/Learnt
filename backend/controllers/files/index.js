const jwt = require('jsonwebtoken')
const {
    queryFiles,
    queryFile
} = require('../../service/files')
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

}