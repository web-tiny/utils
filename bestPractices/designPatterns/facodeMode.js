/*
 * @Author: Tiny 
 * @Date: 2019-01-28 11:26:27 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-01-28 13:17:15
 */

/** 
 * 门面模式（包装器）：
 *  为一个已存在的对象创建一个新的接口
*/

function DOMWrapper (element) {
  this.element = element
}

DOMWrapper.prototype.addClass = function (className) {
  element.className += ' ' + className
}

DOMWrapper.prototype.remove = function () {
  this.element.parenNode.removeChild(thid.element)
}

const WRAPPER = new DOMWrapper(document.getElementById('my-div'))
WRAPPER.addClass('selected')
// WRAPPER.remove()
console.log(WRAPPER.className)