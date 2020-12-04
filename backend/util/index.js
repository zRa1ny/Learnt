const path = require('path')
const {
    getJsonFiles,
    writeFile
} = require('./getfiles')
const {
    execcuteSql
} = require('./mysql')
const config = require('../config')

function insertFilePath2Mysql(filePath) {
    return getJsonFiles(filePath).then(res => {
        let sql = 'INSERT INTO file(`id`,`pId`,`name`,`path`,`url`,`type`,`isDirectory`,`isFile`,`size`,`visitedTime`,`createdTime`,`updatedTime`) VALUES ?';
        return execcuteSql(sql, res)
    })
}

function initTableFile() {
    return insertFilePath2Mysql(config.public)
}
module.exports = {
    insertFilePath2Mysql,
    initTableFile

}