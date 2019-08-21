/*
 * @Author: Tiny 
 * @Date: 2019-08-21 13:35:28 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-21 14:36:55
 */

const { userName, userAge } = require('./hello');
const fs = require('fs');

console.log(userName('tiny'));
console.log(userAge(10));

// 读文件
fs.readFile('test.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
})

fs.readFile('mm1.jpg', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(Buffer.from(data, 'utf-8'));
  }
})

// 向文件写入内容
const data = 'I am learning node.js !'
fs.writeFile('test.txt', data, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('ok');
  }
})

// 获取文件信息
fs.stat('mm1.jpg', (err, stat) => {
  if (err) {
    console.log(err);
  } else {
    console.log('isFile: ' + stat.isFile(), ',isDirectory: ' + stat.isDirectory())
    if (stat.isFile()) {
      console.log('size: ' + stat.size, ',birth time: ' + stat.birthtime, ',modified time: ' + stat.mtime)
    }
  }
})

/** 
 * stream
*/
const rs = fs.createReadStream('test.txt', 'utf-8');
rs.on('data', chunk => {
  console.log('DATA:');
  console.log(chunk);
})
rs.on('end', () => {
  console.log('END');
})
rs.on('error', err => {
  console.log('ERROR:' + err)
})

// 以流的形式写入文件，只要不断调用write()方法，最后以end()结束
const ws = fs.createWriteStream('output.txt', 'utf-8');
ws.write('Using Stream write data of txt ...\n');
ws.write('end');
ws.end();

const ws2 = fs.createWriteStream('output2.txt');
ws2.write(new Buffer('Using Stream write data of buffer ...\n'), 'utf-8');
ws2.write(new Buffer('end'), 'utf-8');
ws2.end();

const rsTarget = fs.createReadStream('test.txt');
const wsTarget = fs.createWriteStream('copied.txt');
// 复制文件
rsTarget.pipe(wsTarget);