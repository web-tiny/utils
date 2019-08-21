/*
 * @Author: Tiny 
 * @Date: 2019-08-21 16:50:54 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-21 17:31:13
 */
const fs = require('fs');

const addMapping = (router, mapping) => {
  for (const url in mapping) {
    if (mapping.hasOwnProperty(url)) {
      const e = mapping[url];
      if (url.startsWith('GET')) {
        const path = url.substring(4);
        router.get(path, mapping[url])
        console.log(`register URL mapping: GET ${path}`)
      } else if (url.startsWith('POST')) {
        const path = url.substring(5);
        router.post(path, mapping[url])
        console.log(`register URL mapping: POST ${path}`)
      } else {
        console.log(`invalid URL: ${url}`)
      }
    }
  }
}

const addControllers = (router, dir) => {
  fs.readFileSync(__dirname + '/' + dir)
    .filter(f => f.endsWith('.js'))
    .forEach(f => {
      console.log(`process controllers: ${f}...`);
      let mapping = require(__dirname + '/' + dir + '/' + f)
      addMapping(router, mapping)
    })
}

module.exports = (dir = 'controllers') => {
  let router = require('koa-router')();
  addControllers(router, dir)
  return router.routes();
}