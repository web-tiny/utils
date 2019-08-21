/*
 * @Author: Tiny
 * @Date: 2019-08-21 15:06:12
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-21 15:29:15
 */

// crypto模块的作用，提供通用的加密和哈希算法
const crypto = require('crypto');

// md5和sha1
const hash = crypto.createHash('sha512');
// Hmac是一种哈希算法
const hmac = crypto.createHmac('sha256', 'secret-key')

const str = 'jiaorengui'

hash.update(str);
hmac.update(str)

console.log(hash.digest('hex'));
console.log(hmac.digest('hex'));

// AES对称加密算法
const aesEncrypt = (data, key) => {
  const cipher = crypto.createCipher('aes192', key);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

const aesDecrypt = (encrypted, key) => {
  const decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

let data = '#jiaorengui@123*_11';
let key = 'Password!';
let encrypted = aesEncrypt(data, key);
let decrypted = aesDecrypt(encrypted, key)

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);