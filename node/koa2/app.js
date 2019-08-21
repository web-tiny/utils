/*
 * @Author: Tiny 
 * @Date: 2019-08-21 15:36:47 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-21 17:16:35
 */

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller')
const app = new Koa();

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
})
// parse request body:
app.use(bodyParser());

// add controllers:
app.use(controller())

app.listen(3000);
console.log('app started at port 3000...');