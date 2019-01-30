/*
 * @Author: Tiny 
 * @Date: 2019-01-30 10:31:49 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-01-30 11:07:15
 */

 /** 
  * 语句：
  * 1：if语句
  *   绝不允许在if语句中省略花括号
  * 2：for语句
  * 3：while语句
  * 4：do语句
  * 5：switch语句
  * 6：try语句
 */
// if语句
function ifStatement() {

  // good
  if (condition) {
    statement
  }

  // bad:不恰当的空格
  if(condition){
    doSomething()
  }
  
  // bad:遗漏花括号
  if (condition)
    doSomething()

  // good
  if (condition) {
    statement
  } else {
    statement
  }

  // bad:所有代码写在一行
  if (condition) { doSomething() }

  // good
  if (condition) {
    statement
  } else if (condition) {
    statement
  } else {
    statement
  }

  // bad:所有代码写在一行且没有花括号
  if (condition)  doSomething()
}

/** 
 * for语句：
 *  1：for语句的初始化部分不应当有变量申明
 *  2: 在使用for-in语句时，记得使用hasOwnProperty()进行双重检查来过滤出对象成员
*/
function forStatement() {
  
  // good
  for (initialization; condition; update) {
    statements
  }

  // good
  for (variable in object) {
    statements
  }

  // bad:初始化时申明变量
  for (let prop in object) {
    // code
  }

  // good
  let i,
      len;
  for (i = 0, len = 10; i < len; i++) {
    // code
  }

  // bad:初始化时申明变量
  for (var i, len = 10; i < len; i++) {
    // code
  }
}

/** 
 * do-while语句
*/
// good
function dowhileStatement() {
  do {
    statements
  } while (condition)
}

/** 
 * while语句
*/
// good
function whileStatement() {
  while (condition) {
    statements
  }
}

/** 
 * switch语句
 *  1: 每一组语句（default除外），都应当以break,return,throw结尾，或者用一行注释表示跳过
 *  2: 如果一个switch语句不包含default情况，应当用一行注释代替
*/
function switchStatement() {

  // good
  switch (expression) {
    case expression:
      statements
      break
  
    default:
      statement
  }

  // good：每一组语句（default除外），都应当以break,return,throw结尾，或者用一行注释表示跳过
  switch (value) {
    case 1:
      // falls through

    case 2:
      doSomething()
      break

    case 3:
      return true

    default:
      throw new Error('This should not happen')
  }

  // good：如果一个switch语句不包含default情况，应当用一行注释代替
  switch (key) {
    case 1:
      // falls through
      
    case 2:
      doSomething()
      break

    case 3:
      return true

    // 没有default
  }
}

/** 
 * try语句
*/
function tryStatement() {
  
  // good
  try {
    statements
  } catch (variable) {
    statements
  }

  // good
  try {
    statements
  } catch (error) {
    statements
  } finally {
    statements
  }
}