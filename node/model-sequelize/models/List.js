/*
 * @Author: Tiny 
 * @Date: 2019-08-23 16:38:06 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-26 10:09:27
 */
const db = require('../db');

module.exports = db.defineModel('lists', {
  ownerId: db.id,
  name: db.STRING(100),
  price: db.DOUBLE,
  number: db.BIGINT
});
