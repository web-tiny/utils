/*
 * @Author: Tiny 
 * @Date: 2019-08-23 16:38:26 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-23 17:46:43
 */
const db = require('../db');

module.exports = db.defineModel('users', {
  email: {
    type: db.STRING(100),
    unique: true
  },
  passwd: db.STRING(100),
  name: db.STRING(100),
  gender: db.BOOLEAN
});