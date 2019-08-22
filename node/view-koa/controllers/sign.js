/*
 * @Author: Tiny 
 * @Date: 2019-08-22 11:23:48 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-22 13:13:17
 */

module.exports = {
  'POST /singnin': async (ctx, next) => {
    const email = ctx.request.body.email || '';
    const password = ctx.request.body.password || '';
    if (email === 'amdin@example.com' && password === '123456') {
      console.log('signin ok!')
      ctx.render('sigin-ok.html', {
        title: 'Sign in OK',
        name: 'Mr Node'
      })
    } else {
      console.log('signin failed!');
      ctx.render('sigin-failed.html', {
        title: 'Sign in Failed'
      })
    }
  }
}