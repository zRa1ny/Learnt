const mysql = require('mysql');
const fs = require('fs')
const config = require('../config')

/**
 * @name: 
 * @param {
 *  host
 *  user
 *  password
 *  database
 * }  
 * @return {*}
 * @Author: Rainy
 */
class Pool {
    constructor(config) {
        this.pool = mysql.createPool(config)
    }
}

/**
 * @name: 
 * @param {*}
 * @return {*
 *  getConnection:创建单链接
 *  fetchRow: 查询一条数据
 * }
 * @Author: Rainy
 */
class DB {
    static Pool = new Pool(config.mysql).pool
    constructor(table) {
        this.table = table;
        this.pool = DB.Pool;
    }
    getConnection() {
        const {
            pool
        } = this
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) reject(err)
                else resolve(connection)
            })
        })
    }
    /**
     * @name: 
     * @param {*
     *  id:1,
     *  name:2,
     *  ...
     * } params
     * @param  fields String :   id,name,des
     * @return [{}]
     * @Author: zRainy
     */
    fetchRow(params, fields = "*") {
        const {
            pool,
            table
        } = this
        return new Promise((resolve, reject) => {
            const sql = `select ${fields} from ${table} where ? limit 1`
            pool.query(sql, params, function (error, result) {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })

    }

    fetchRows(params, fields = "*") {
        const {
            pool,
            table
        } = this
        return new Promise((resolve, reject) => {
            const sql = `select ${fields} from ${table} where ?`
            pool.query(sql, params, function (error, result) {
                if (error) {
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }
    refresh() {
        const {
            pool,
            table
        } = this;
        return new Promise((resolve, reject) => {
            const sql = ` truncate table ${table} `
            pool.query(sql, function (error, result) {
                if (error) {
                    return reject(error)
                }

                resolve(result)
            })
        })
    }

    execcuteSql(sql) {
        const {
            pool
        } = this
        return new Promise((resolve, reject) => {
            pool.query(sql, function (err, result) {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result)
            });
        })
    }


}

// let fileDB = new DB('file');
// fileDB.fetchRows({
//     pId: '814ec210-3063-11eb-85f3-cd347bf25711'
// }).then(res => {
//     console.log(res)
// })

function execcuteSql(sql, ...params) {
    return new Promise((resolve, reject) => {
        let connection = mysql.createConnection(config.mysql)
        connection.connect()
        connection.query(sql, params, function (err, result) {
            if (err) {
                console.log('[ERROR] - ', err.message);
                reject(err)
                return;
            }
            resolve(result)
        });
        connection.end();
    })
}

// const pool = mysql.createPool(config.mysql);

// pool.query('SELECT * FROM file WHERE ?', {
//     pId: 0
// }, function (err, result) {
//     console.log(err)
//     console.log(result)
// })


// var addSql = 'INSERT INTO file(`id`,`pId`,`name`,`path`,`type`,`isDirectory`,`isFile`,`size`,`visitedTime`,`createdTime`,`updatedTime`) VALUES ?';
// var json = JSON.parse(fs.readFileSync("./file.json", 'utf-8'))
// execcuteSql(addSql,json)

module.exports = {
    execcuteSql,
    DB
}