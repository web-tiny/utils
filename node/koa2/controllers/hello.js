/*
 * @Author: Tiny
 * @Date: 2019-08-21 16:33:24
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-21 16:34:06
 */

const fn_hello =  async (ctx, next) => {
  const name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}</h1>`
};

module.exports = {
  'GET/hello/:name': fn_hello
};