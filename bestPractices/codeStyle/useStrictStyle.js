/*
 * @Author: Tiny 
 * @Date: 2019-01-29 17:39:12 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-01-29 17:45:13
 */

/**
 *  严格模式：
 *    1：严格模式应当在函数内部使用，不要在全局使用
 *    2：如果希望在多个函数中使用，通过立即被调用的函数来实现
 *    
*/
// bad
'use strict'
function doSomething2() {
  // code
}

// good
function doSomething3() {
  'use strict'

  // code
}

// good
(function() {
  'use strict'
  
  function doSomething4() {
    // code
  }

  function doSomethingElse() {
    // code
  }
}())