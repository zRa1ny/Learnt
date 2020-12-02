var path = require('path');

module.exports = {
    port: 1000,
    publics:[
        {
            dir: "./public",
            router:"/public"
        }
    ],
    public:path.resolve(__dirname,"./public"),
    logPath: path.resolve(__dirname, './logs/koa-template.log'),
    secret: "zrainy.com",
    mysql: {
        host: "127.0.0.1",
        user: "root",
        password: "root",
        database: "files"
    }
}