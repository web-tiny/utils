/*
 * @Author: tiny.jiao@aliyun.com 
 * @Date: 2019-07-13 22:23:57 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-07-13 22:27:28
 */
self.onmessage = function (event) {
  var jsonText = event.data;
  var jsonData = JSON.parse(jsonText);
  self.postMessage(jsonData);
};
