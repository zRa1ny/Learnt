const {
    DB
} = require('../../util/mysql')
const FileDB = new DB('file')
module.exports = {
    queryFiles(id) {
        let sql = `SELECT id,pId,name,type,size,url,des,tips,isDirectory,isFile FROM file WHERE pId = '${id}'`
        return FileDB.execcuteSql(sql)
    },
    queryFile(id) {
        return FileDB.fetchRows({
            id: id
        }, 'id,pId,name,type,size,url,des,tips,isDirectory,isFile')
    }
}