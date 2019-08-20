/*
 * @Author: tiny.jiao@aliyun.com
 * @Date: 2019-08-19 23:13:58
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-20 15:08:47
 */
// 这句的意思就是引入 `express` 模块，并将它赋予 `express` 这个变量等待使用。
const express = require('express');
const utility = require('utility');
const sha1 = require('node-sha1');
const superagent = require('superagent');
const cheerio = require('cheerio');
// 调用 express 实例，它是一个函数，不带参数调用时，会返回一个 express 实例，将这个变量赋予 app 变量。
const app = express();
const eventproxy = require('eventproxy');
const url = require('url');
const async = require('async');
const cnodeUrl  = 'https://cnodejs.org/';

// app 本身有很多方法，其中包括最常用的 get、post、put/patch、delete，在这里我们调用其中的 get 方法，为我们的 `/` 路径指定一个 handler 函数。
// 这个 handler 函数会接收 req 和 res 两个对象，他们分别是请求的 request 和 response。
// request 中包含了浏览器传来的各种信息，比如 query 啊，body 啊，headers 啊之类的，都可以通过 req 对象访问到。
// res 对象，我们一般不从里面取信息，而是通过它来定制我们向浏览器输出的信息，比如 header 信息，比如想要向浏览器输出的内容。这里我们调用了它的 #send 方法，向浏览器输出一个字符串。
// app.get('/', function (req, res, next) {
  // var q = req.query.q;
  // // var md5Value = utility.md5(q);
  // var sha1Value = sha1(q)
  // res.send(sha1Value);
  // superagent.get('https://cnodejs.org/').end(function(err, sres) {
  //   if (err) {
  //     return next(err);
  //   }
  //   var $ = cheerio.load(sres.text);
  //   var items = [];
  //   $('#topic_list .topic_title').each(function(idx, e) {
  //     var $e = $(e);
  //     items.push({
  //       title: $e.attr('title'),
  //       href: $e.attr('href')
  //     })
  //   });
  //   res.send(items);
  // })
// });

//  4:学习使用eventproxy控制并发
app.get('/', function (req, response, next) {
  superagent.get(cnodeUrl).end(function(err, res) {
    if (err) {
      return console.error(err);
    }
    let topicUrls = [];
    let $ = cheerio.load(res.text);
    $('#topic_list .topic_title').each(function(idx, e){
      let $e = $(e);
      const href = url.resolve(cnodeUrl, $e.attr('href'));
      topicUrls.push(href);
    })
    // console.log(topicUrls);

    const ep = new eventproxy();
    ep.after('topic_html', topicUrls.length, function (topics) {
      topics = topics.map((topicPair) => {
        let topicUrl = topicPair[0];
        let topHtml = topicPair[1];
        let $ = cheerio.load(topHtml);
        return ({
          title: $('.topic_full_title').text().trim(),
          href: topicUrl,
          comment1: $('.reply_content').eq(0).text().trim()
        });
      });
      response.send(topics);
    });
    
    topicUrls.forEach(topicUrl => {
      superagent.get(topicUrl).end((err, res) => {
        // console.log('fetch ' + topicUrl + ' successful');
        ep.emit('topic_html', [topicUrl, res.text]);
      })
    });
  })
})

// 5:学习使用async来控制并发连接数
var concurrencyCount = 0;
var fetchUrl = function (url, callback) {
  var delay = parseInt((Math.random() * 10000000) % 2000, 10);
  concurrencyCount++;
  console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
  setTimeout(function () {
    concurrencyCount--;
    callback(null, url + ' html content');
  }, delay);
};

var urls = [];
for(var i = 0; i < 30; i++) {
  urls.push('http://datasource_' + i);
}

async.mapLimit(urls, 5, function (url, callback) {
  fetchUrl(url, callback);
}, function (err, result) {
  console.log('final:');
  console.log(result);
});

const fibonacci = n => {
  if (n === 0 || n === 1) {
    return n;
  }
  return fibonacci(n-1)+fibonacci(n-2);
}
if (require.app === module) {
  var n = Number(process.argv[2]);
  console.log('fibonacci(' + n + ') is', fibonacci(n));
}

// 定义好我们 app 的行为之后，让它监听本地的 3000 端口。这里的第二个函数是个回调函数，会在 listen 动作成功后执行，我们这里执行了一个命令行输出操作，告诉我们监听动作已完成。
app.listen(3000, function () {
  console.log('app is listening at port 3000');
});

/** 
 * 1:学习使用superagent抓取网页
 * 2:学习使用cheerio分析网页
 * 3:体会Node.js的callback hell之美
 * 4:学习使用eventproxy控制并发
 * 5:学习使用async来控制并发连接数
 * 6:测试用例：mocha, should, istanbul
 *  1):学习使用测试框架：mocha
 *  2):学习使用断言库 should
 *  3):学习使用测试率覆盖工具 istanbul
 *  4):简单Makefile的编写
*/
