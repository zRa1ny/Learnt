const http = require('http');
const https = require('https');
const Koa = require('koa');
const app = new Koa();


// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  console.log('------1---------');
  await next();
  console.log('------2---------');

  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  console.log('------3--------');

  await next();
  console.log('------4---------');

  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(async (ctx, next) => {
  console.log('------5--------');

  await next();
  console.log('------6---------');

});

// response
app.use(async ctx => {
  console.log('------7---------');

  ctx.body = ctx.response.status;
});

http.createServer(app.callback()).listen(3000);
// https.createServer(app.callback()).listen(3000);