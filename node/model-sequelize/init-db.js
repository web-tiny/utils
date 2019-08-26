/*
 * @Author: Tiny 
 * @Date: 2019-08-23 16:07:56 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-26 10:10:05
 */

// require('babel-core/register')({
//   presets: ['stage-3']
// });

const model = require('./model.js');
model.sync();

console.log('init db ok.');