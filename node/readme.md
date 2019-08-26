```javascript
/*
 * @Author: Tiny
 * @Date: 2019-08-16 16:13:18
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-26 18:06:56
*/
```
### 1: Nodejs基本模块
#### 1: fs模块 (操作文件: 同步/异步读写文件，获取文件信息)
```javascript
const fs = require('fs');
1): 读文件，  
  fs.readFile('filePath', 'utf-8', (err, data)=>{
    //  err是否为null就是判断是否出错的标识
    if (err) {
      console.log(err)
    } else {
      console.log(data)
    }
  });
  // 同步读取
  try {
    const data = fs.readFileSync('filePath', 'utf-8');
    console.log(data)
  } catch (err) {
   console.log(err)
  }

2): 写文件
  fs.writeFile('filePath', 'utf-8', (err, data)=>{
    //  err是否为null就是判断是否出错的标识
    if (err) {
      console.log(err)
    } else {
      console.log(data)
    }
  });
  // 同步写文件
  const data = 'the constents will to be writed ';
  fs.writeFileSync('filePath', data);
 
3): 获取文件信息
  fs.stat('filePath', (err, stat) => {
    if (err) {
     console.log(err)
    } else {
     /**
      * stat.isFile()
      * stat.isDirectory()
      * stat.size()
      * stat.birthtime // created time
      * stat.mtime // update time
     */
    }
  })
```
#### 2: stream模块 (操作‘流’数据结构)
```javascript
1): 从文件流读取文本内容
  const rs = fs.createReadStream('filePath', 'utf-8');
  // 'data'事件可能执行多次，每次传递一部分
  rs.on('data', chunk => { console.log(chunk) });
  rs.on('end', () => { console.log('end') });
  rs.on('err', err => { console.log('err:' + err) });

2): 以流的形式的向文件写入内容：
  const ws = fs.createWriteStream('filePath', 'utf-8');
  ws.write('content');
  ...
  ws.end();

3): 以pipe的形式复制文件
  rs.pipe(ws);
```
#### 3: HTTP模块
```javascript
const http = require('http');
const url = require('url');
const path = require('path');
// 创建服务，传入回调
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end()
});
// 监听8080端口
server.listen(8080);
```
#### 4: crypto模块(提供通用的加密和哈希算法)
```javascript
const crypto = require('crypto');

1): md5/sha1/
const hashMd5 = crypto.createHash('md5');
const hashSha1 = crypto.createHash('sha1');

const cn = 'tiny';
hashMd5.update(cn);
console.log(hashMd5.digest('hex'))

2): AES: 一种对称加密算法
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
```
### 2: Web开发
#### 1: koa框架
#### 2: 数据库：mysql
#### 3: 测试框架：mocha
#### 4: WebSocket
#### 5: REST