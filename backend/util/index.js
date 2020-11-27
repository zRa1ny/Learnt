const {
    getJsonFiles,
    writeFile
} = require('./getfiles')
const {
    execcuteSql
} = require('./mysql')
const config = require('../config')

function insertFilePath2Mysql(filePath) {
    getJsonFiles(filePath).then(res => {
        let sql = 'INSERT INTO file(`id`,`pId`,`name`,`path`,`url`,`type`,`isDirectory`,`isFile`,`size`,`visitedTime`,`createdTime`,`updatedTime`) VALUES ?';
        return execcuteSql(sql, res)
    }).then(res => {
        // console.log(res)
    }).catch(err => {
        // console.log(err)
    })
}
// insertFilePath2Mysql(config.public)
module.exports = {
    insertFilePath2Mysql
    
}