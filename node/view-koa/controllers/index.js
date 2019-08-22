/*
 * @Author: Tiny
 * @Date: 2019-08-22 11:21:18
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-22 11:22:46
 */

module.exports = {
  'GET /': async (ctx, next) => {
    ctx.render('index.html',  {
      title: 'Welcome'
    })
  }
};
