const fs = require('fs');
const url = require('url');
const path = require('path');
const http= require('http');

const root = path.resolve(process.argv[2] || '.');
console.log('Static root dir:' + root);

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;
  const filepath = path.join(root, pathname);
  fs.stat(filepath, (err, stats) => {
    if (!err && stats.isFile()) {
      console.log('200' + req.url);
      res.writeHead(200);
      fs.createReadStream(filepath).pipe(res)
    } else {
      console.log('404' + req.url);
      res.writeHead(404);
      res.end('404 Not Found')
    }
  })
})

server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080');