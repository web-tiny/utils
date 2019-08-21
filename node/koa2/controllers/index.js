/*
 * @Author: Tiny
 * @Date: 2019-08-21 16:29:46
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-21 16:31:58
 */

const fn_index = async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
    <form action="/signin" method="post">
      <p>Name: <input name="name" value="koa"></p>
      <p>Password: <input name="password" type="password"></p>
      <p><input type="submit" value="Submit"></p>
    </form>
  `
};

const fn_signin = async (ctx, next) => {
  let name = ctx.request.body.name || '';
  let password = ctx.request.body.password || '';
  if (name === 'koa' && password === '12345') {
    ctx.response.body = `<h1>Welcome, ${name}</h1>`
  } else {
    ctx.response.body = `<h1>Login failed !</h1>
    <p><a href="/">Try agin</a></p>`;
  }
}

module.exports = {
  'GET/': fn_index,
  'POST/signi': fn_signin 
}