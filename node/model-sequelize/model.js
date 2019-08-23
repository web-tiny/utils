/*
 * @Author: Tiny 
 * @Date: 2019-08-23 16:08:36 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-23 17:47:37
 */

//  scan all models defined in models:

const fs = require('fs');
const db= require('./db');

let files = fs.readdirSync(__dirname + '/models');

let js_files = files.filter(f => f.endsWith('.js'), files);

module.exports = {};

for (const f of js_files) {
  console.log(`import model from file ${f}...`);
  let name = f.substring(0, f.length - 3);
  module.exports[name] = require(__dirname + '/models/' + f);
}

module.exports.sync = () => {
  db.sync();
}