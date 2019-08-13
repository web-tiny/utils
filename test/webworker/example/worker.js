/*
 * @Author: tiny.jiao@aliyun.com 
 * @Date: 2019-07-13 22:22:56 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-07-13 22:36:38
 */
try {
  var worker = new Worker('jsonparser.js');
  worker.onmessage = function (event) {
    var jsonData = event.data;
    evaluateData(jsonData);
  };
  worker.postMessage(jsonText);
} catch (error) {
  console.log(error);
}