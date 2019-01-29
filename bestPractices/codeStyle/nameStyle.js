/*
 * @Author: Tiny 
 * @Date: 2019-01-29 17:10:58 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-01-29 17:34:03
 */

// 命名
/** 
 *  1：变量
 *    a: 仅限于数字字母字符，某些情况使用下划线
 *    b: 第一个单词以名词开头
 *    c: 不要在变量名中使用下划线
 *    d：驼峰命名，首字母小写
*/

// good
let accountNumber = '12'

// bad
let AccountNumber = '12'

// bad,动词开头
let getAccountNumber = '12'

// bad,使用下划线
let account_number = '12'

/** 
 *  2：函数
 *    a：驼峰命名，首单词是动词
 *    b: 函数名最好不要使用下划线
*/
// good
function doSomething() {
  // code
}

// bad,大写字母开头
function DoSomething() {
  // code
}

// bad:名词开头
function car() {
  // code
}

// bad：使用下划线
function do_something() {
  // code
}

/** 
 *  3: 常量
 *    a: 所有字母大写。
 *    b: 不同单词之间用单个下划线隔开。
 *    c: 用const，不用var和let
*/
// good
const TOTAL_COUNT = 10

// bad
const totalCount = 10

// bad
const total_COUNT = 10

/** 
 *  4：Object
 *    a: 对象的属性同变量名的规则，方法同函数的命名规则
 *    b: 如果属性或者方法是私有的，应当在之前加一个下划线
*/
// good
let object = {
  _count: 10,

  _getCount: function() {
    return this._count
  }
}