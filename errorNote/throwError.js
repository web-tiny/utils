/*
 * @Author: Tiny 
 * @Date: 2019-01-25 14:53:39 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-01-25 15:57:46
 */

/** 
 * 比较下下面两个方法：
 * getDivs1方法的错误将让你不知道错在哪
 * getDivs方法的错误将告诉你是哪个方法出错，出错原因是什么
 * 
 * 抛出错误的时机也很重要：
 * 1：特别注意函数库
 * 牢记一个准则：我们的目的是在错误发生时能更加容易地调试，而不是防止错误
*/
function getDivs1 (e) {
  return e.getElementsByTagName('div')
}
function getDivs (e) {
  if (e && e.getElementsByTagName) {
    return e.getElementsByTagName('div')
  } else {
    throw new Error('getDivs(): Argument must be a DOM element.')
  }
}

/**
 * 错误类型：
 * 1: Error：所有错误的基本类型，js引擎从来不会抛出该错误
 * 2: EvalError
 * 3: RangeError：数字超出边界
 * 4: ReferenceError: 期望的对象不存在
 * 5: SyntaxError：给eval()函数传递的代码中有语法错误
 * 6: TypeError：变量不是期望的类型
 * 7: URIError：encodeURI()/encodeURIComponent(),decodeURI()/decodeURIComponent()等函数传递非法的URI字符串时的错误
 * 
*/

// 特别要注意：如果用了Error构造器，就丧失了区分自己抛出的错误和浏览器错误的能力,解决方案就是创建自己的错误类型来继承Error
function MyError (message) {
  this.message = message
}
MyError.prototype = new Error()