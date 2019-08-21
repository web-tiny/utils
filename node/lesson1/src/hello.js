/*
 * @Author: Tiny 
 * @Date: 2019-08-21 13:32:59 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-21 14:43:40
 */
const http = require('http');

const userName = name => `Hi ${name} !`;
const userAge = age => age + 1;

const server = http.createServer((req, res) => {
  console.log(req.method + ' : ' + req.url);
  res.writeHead(200, { 'Content-Type' : 'text/html' });
  res.end('<h1>Hello world !</h1>');
})
server.listen(8000);
console.log('Server is running port: 8000');

module.exports = {
  userName,
  userAge
}