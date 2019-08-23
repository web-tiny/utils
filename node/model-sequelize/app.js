/*
 * @Author: Tiny 
 * @Date: 2019-08-23 16:15:53 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-23 18:24:24
 */

// 业务代码
const model = require('./model');

const list = model.list;
const user = model.user;

list.create({
  ownerId: 1,
  name: '热裤',
  price: 900,
  number: 5
}).then(list => {
  console.log('created list.' + JSON.stringify(list));
}).catch(err => {
  console.log('failed: ' + err);
});

user.create({
  email: 'tom@163.com',
  passwd: 000,
  name: 'tom',
  gender: 1
}).then(user => {
  console.log('created user.' + JSON.stringify(user));
}).catch(err => {
  console.log('failed: ' + err);
});

