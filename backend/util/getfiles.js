var fs = require('fs');
var UUID = require('uuid');
var Path = require('path');
var join = Path.join;
var config = require('../config.js')
var mime = require('mime')

function getJsonFiles(jsonPath) {
    let jsonFiles = [],startPath =  jsonPath;
    function findJsonFile(path, pId) {
        pId = pId || "0";
        let files = fs.readdirSync(path);
        files.forEach(function (item, index) {
            let fPath = join(path, item);
            let stat = fs.statSync(fPath);
            var id = UUID.v1();
            // jsonFiles.push({
            //     id:id,
            //     pId:pId,
            //     name:item,
            //     path:fPath,
            //     type:Path.extname(fPath).replace('.',''),
            //     isDirectory:stat.isDirectory(),
            //     isFile:stat.isFile(),
            //     size:stat.size,
            //     visitedTime: stat.atime.toLocaleString('chinese',{hour12:false}),
            //     createdTime: stat.birthtime.toLocaleString('chinese',{hour12:false}),
            //     updatedTime: stat.mtime.toLocaleString('chinese',{hour12:false})
            // });
            jsonFiles.push([
                id,
                pId,
                item.split('.')[0],
                fPath,
                fPath.replace(Path.resolve(startPath), "").replace(/\\/g, '/'),
                mime.getType(fPath),
                stat.isDirectory(),
                stat.isFile(),
                stat.size,
                stat.atime.toLocaleString('chinese', {
                    hour12: false
                }),
                stat.birthtime.toLocaleString('chinese', {
                    hour12: false
                }),
                stat.mtime.toLocaleString('chinese', {
                    hour12: false
                })
            ]);
            if (stat.isDirectory() === true) {
               
                findJsonFile(fPath, id);
            }

        });
    }
    findJsonFile(jsonPath);
    return Promise.resolve(jsonFiles)
}

function writeFile(name, data) {
    data = JSON.stringify(data, "", "\t")
    fs.writeFile(name, data, (err) => {
        if (err) console.log(err);
        else console.log('success')
    })
}

var result = getJsonFiles("../public").then(result=>{
    writeFile('./data.json',result)
});
module.exports = {
    getJsonFiles,
    writeFile
}