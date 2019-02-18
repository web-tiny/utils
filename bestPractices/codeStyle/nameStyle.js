/*
 * @Author: Tiny 
 * @Date: 2019-01-29 17:10:58 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-02-18 18:03:40
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

/** 
 * 三元运算符：
 *  应当仅仅用在条件赋值语句中，不要作为if语句的替代品
*/
// good
let value = condition ? value1 : value2;
// bad
condition ? doSomething() : doSomethindElse()

/** 
 * const和let的本质区别其实就是编译器内部的处理不同
*/
// bad
var a = 1, b = 2, c = 3;

// good
const a = 1;
const b = 2;
const c = 3;

// best
const [a, b, c] = [1, 2, 3]

/** 
 * 使用数组成员对变量赋值时，优先使用解构赋值
*/
const arr = [1, 2, 3, 4]

// bad
const first = arr[0]
const second = arr[1]

// good
const [first, second] = arr

/** 
 * 函数的参数如果时对象的成员，优先使用接口赋值
*/
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const secondName = user.secondName;
}

// good
function getFullName(obj) {
  const { firstName, secondName } = obj
}

// best
function getFullName({ firstName, secondName }) {

}

/** 
 * 如果函数返回多个值，优先使用对象的结构赋值，而不是数组的解构赋值
 * 这样便于以后添加返回值以及更改返回值的顺序
*/
// bad
function processInput(input) {
  return [left, right, top, bottom];
}

// good
function processInput(input) {
  return { left, right, top, bottom };
}

const { left, right } = processInput(input);

/** 
 * 对象尽量要静态化，一旦定义，就不得随意添加新的属性，如果添加属性不可避免，
 * 要使用Object.assign方法
*/
// bad
const a = {};
a.x = 3;

// if reshape unavoidable
const a = {};
Object.assign(a, { x: 3 })

// good
const a = { x: null };
a.x = 3;

// 如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义
// bad
const obj = {
  id: 5,
  name: 'San Fransisco',
}
obj[getKey('enabled')] = true

// good
const obj = {
  id: 5,
  name: 'San Fransisco',
  [getKey('enabled')]: true,
}

// 对象的属性和方法，尽量采用简洁表达式，这样易于描述和书写
var ref = 'some value';

// bad
const atom = {
  ref: ref,
  value: 1,
  addValue: function (value) {
    return atom.value + value;
  }
}

// good
const atom = {
  ref,
  value: 1,
  addValue(value) {
    return atom.value + value;
  }
}

/** 
 * 使用扩展运算符“...”拷贝数组
*/
// bad
const len = items.lenght;
const itemsCopy = [];
let i;
for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];

// 使用Array.from方法，将类似数组的对象转为数组
const foo = document.querySelectorAll('.foo')
const nodes = Array.from(foo);

/** 
 * 函数
*/
// 需要使用函数表达式的场合，尽量用箭头函数代替，因为这样更简洁且绑定this
// bad
[1, 2, 3].map(function (x) {
  return x * x
})

// good
[1, 2, 3].map( x => {
  return x * x;
})

// best
[1, 2, 3].map( x => x * x )

// 箭头函数取代Function.prototype.bind，不应再用 self/_this/that 绑定 this
// bad
const self = this
const boundMethod = function(...params) {
  return method.apply(self, params)
}

// acceptable
const boundMethod = method.bind(this);

// best
const boundMethod = (...params) => method.apply(this, params)

/** 
 * 不要在函数体内使用 arguments 变量，使用 rest 运算符（...）代替。因为 rest 运算符显式表明你想要获取参数，而且 arguments 是一个类似数组的对象，而 rest 运算符可以提供一个真正的数组
*/
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('')
}

// 使用默认值语法设置函数参数的默认值
// bad
function handleThings(opts) {
  opts = opts || {}
}

// good
function handleThings(opts = {}) {

}

/** 
 * 总是用class,取代需要prototype的操作，因为class的写法更简洁，更易于理解
*/
// bad
function queue(contents = []) {
  this._queue = [...contents]
}
queue.prototype.pop = function() {
  const value = this._queue[0]
  this._queue.splice(0, 1)
  return value
}

// good
class Queue {
  constructor(contents = []) {
    this._queue = [...contents]
  }

  pop() {
    const value = this._queue[0]
    this._queue.splice(0, 1)
    return value
  }
}

// 使用extends实现继承，因为这样更简单，不会有破坏instanceof运算的危险
// bad
const inherits = require('inherits')
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue)
PeekableQueue.prototype.peek = function() {
  return this._queue[0];
}

// good
class PeekableQueue extends Queue {
  peek() {
    return this._queue[0];
  }
}