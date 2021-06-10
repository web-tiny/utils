/*
 * @Author: Tiny 
 * @Date: 2019-03-01 10:05:41 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: yyyy-10-Mo 04:40:54
 */

 /** 
  * Array:
  *   1: 扩展运算符
  *   2：Array.from()
  *   3: Array.of()
  *   4: 数组实例的copyWithin(target, start, end)
  *   5: 数组实例的find(fn, this),findIndex(fn, this)
  *   6: 数组实例的fill(target, start, end)
  *   7: 数组实例的entries(), keys(), values(),ES6提供的三个遍历数组的方法
  *   8：数组实例的includes()
  *   9: 数组实例的flat(), flatMap()
  *   10: 数组的空位
 */

/**
 * 扩展运算符：将一个数组转为用逗号分隔的参数序列
 * 1：应用：
 *  1）：主要用于函数调用
 *  2）：替代函数的apply方法
 *  3）：复制数组
 *  4）：合并数组
 *  5）：与解构赋值结合生成数组
 *  6）：将字符串转为真正的数组
 * 2: 后面可以放置表达式
 * 3：实现了Iterator接口的对象，因此可以将Map,Set,Generator转为数组
 */
// 用于函数调用
function add(x, y) {
  return x + y
}
console.log(add(...[4, 45])) // 49

// 替代函数的apply方法
function multi(x, y, z) {
  return x * y * z
}
const args = [ 1, 2, 3 ]
// ES5
console.log(multi.apply(null, args)) // 6
// ES6
console.log(multi(...args)) // 6

// 复制数组
const arr1 = [ 'a', 'b', 'c' ]
// 方法一
const arr2 = [...arr1]
// 方法二
const [...arr3] = arr1
console.log(arr2, arr3) // [ 'a', 'b', 'c' ] [ 'a', 'b', 'c' ]

// 合并数组
// ES5
const arr5 = arr1.concat(arr2, arr3)
// ES6
const arr4 = [...arr1, ...arr2, ...arr3]
console.log(arr4, arr5) // [ 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c' ] [ 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c' ]

// 与解构赋值结合生成数组
// 注意：如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错
const [first, ...rest] = [1, 2, 3, 4]
console.log(first, rest) // 1 [ 2, 3, 4 ]

// 将字符串转为真正的数组
console.log([...'tiny']) // [ 't', 'i', 'n', 'y' ]

// 将部署了Iterator接口的类数组对象转为数组
const nodeList = document.querySelectorAll('div')
const arr6 = [...nodeList]

// 下面的类数组对象没有部署Iterator接口，所以报错
const arrLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
}
const arr7 = [...arrLike] // TypeError: arrLike is not iterable

// 将Map结构的数据转为数组
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three']
])
const arr8 = [...map.keys(map)]
console.log(arr8) // [ 1, 2, 3 ]
console.log(Array.from(map)) // [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ]

// 将Generator函数的值转为数组
const to = function* () {
  yield 1
  yield 2
  yield 3
}
console.log([...to()]) // [ 1, 2, 3 ]

/**
 * Array.from(): 用于将类数组对象和可遍历对象（Set，Map）转为真正的数组
 * 常见的类似数组的对象：DOM数组返回的NodeList集合，函数内部的arguments对象
 */
const arrLike2 = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
}
const arr9 = Array.from(arrLike2)
console.log(arr9) // [ 'a', 'b', 'c' ]

// 将Set转为数组
const nameSet = new Set(['name', 'age', 'phone'])
const arr10 = Array.from(nameSet)
console.log(arr10) // [ 'name', 'age', 'phone' ]

// Array.form(obj, fn):可以接受第二个参数，作用类似于数组的map方法
const arr11 = Array.from(arr10, v => v.toUpperCase())
console.log(arr11) // [ 'NAME', 'AGE', 'PHONE' ]

// 通过Array.from()的第二个参数检查数值类型
function typesOf() {
  return Array.from(arguments, v => typeof v)
}
console.log(typesOf(null, [], NaN, undefined, new Map())) // [ 'object', 'object', 'number', 'undefined', 'object' ]

/**
 * Array.of(): 用于将一组值转为数组，
 * 该方法的目的主要是弥补数组构造函数Array()的不足，基本上可以用来替代Array()和new Array()
 *  
 */
console.log(Array()) // []
// 一个参数时是指数组长度
console.log(Array(3)) // [ <3 empty items> ]
// 不少于两个参数时才会返回所有参数组成的新数组
console.log(Array(3, 11, 8)) // [ 3, 11, 8 ]

// Array.of()解决了Array()行为不统一
console.log(Array.of()) // []
console.log(Array.of(3)) // [ 3 ]
console.log(Array.of(3, 11, 8)) // [ 3, 11, 8 ]

// Array.of()的实现
function ArrayOf() {
  return [].slice.call(arguments)
}

/**
 * 数组实例的copyWithin(target, start, end):
 *  target（必需）：从该位置开始替换数据。如果为负值，表示倒数.
 *  start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数.
 *  end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数.
 */
const arr12 = [1, 2, 3, 4, 5]
console.log(arr12.copyWithin(0, 3, 4)) // [ 4, 2, 3, 4, 5 ]
console.log(arr12.copyWithin(0, -2, -1)) // [ 4, 2, 3, 4, 5 ]

/**
 * find(fn, this), findIndex(fn, this): 第二个参数用来绑定回调函数的this对象
 */
const arr13 = [1, 4, -5, 10]
const value = arr13.find(n => n < 0)
console.log(value) // -5
const value1 = arr13.find((value, index, arr) => value > 9)
console.log(value1) // 10
const index = arr13.findIndex((value, index, arr) => value > 9)
console.log(index) // 3

function f(v) {
  return v > this.age
}
const person = { name: 'John', age: 20 }
const arr14 = [ 10, 12, 26, 15 ]
const value2 = arr14.find(f, person)
console.log(value2) // 26

/**
 * 参数实例的fill(value, start, end): 用给定的数填充一个数组
 */
const arr15 = [ 'a', 'b', 'c' ]
const arr16 = arr15.fill('hello world', 1, 2)
console.log(arr16) // [ 'a', 'hello world', 'c' ]

/**
 * ES6提供的三个遍历数组的方法,entries(), keys(), values(),
 */
for (const index of ['a', 'b'].keys()) {
  console.log(index) // 0 1
}
for (const v of ['a', 'b'].values()) {
  console.log(v) // a b
}
for (const [i, v] of ['a', 'b'].entries()) {
  // 0 : a
  // 1 : b
  console.log(i + ' : ' + v)
}

/**
 * 数组实例的 includes(): 判断某个数组是否包含某个值
 * indexOf有两个缺点：
 *  1：不够语义化
 *  2：它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判
 * 注意：
 *  Map结构的has(),是用来查找键名的，Map.prototype.has(key), WeakMap.prototype.has(key),Reflect.has(target, propertyKey)
 *  Set结构的has(),是用来查找值的,Set.prototype.has(value), WeakSet.prototype.has(value)
 */
const arr17 = [ 1, 2, 3, 'tiny', true, NaN ]
console.log(arr17.includes(true)) // true
console.log(arr17.includes(5)) // false

console.log([NaN].indexOf(NaN)) // -1
console.log([NaN].includes(NaN)) // true

// 下面的代码用来检查当前环境是否支持includes方法，如果不支持的话部署一个简易的替代版本
const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(v => v === value)
)()

/**
 * 数组实例的flat(value), 用于将数组转为一维数组，默认拉平一层，value: 拉平的层数，
 * 如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数
 * flatMap(): 对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法
 * 
 * 注意：IE和Edge都不支持
 */
let arr18 = [ 1, 2, [3, 4, [5, 6]] ]
const arr19 = arr18.flat()
console.log(arr19) // [1, 2, 3, 4, Array(2)]
console.log(arr18.flat(2)) // [1, 2, 3, 4, 5, 6]
console.log(arr18.flat(Infinity)) // [1, 2, 3, 4, 5, 6]

let arr20 = [ 2, 3, 4 ]
let arr21 = arr20.flatMap(x => [x, x * 2])
console.log(arr21) //  [2, 4, 3, 6, 4, 8]

/** 
 * 数组的空位:
 *  forEach(), filter(), reduce(), every() 和some()都会跳过空位
 *  map()会跳过空位，但会保留这个值
 *  join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串
 *  ES6新增的一些方法会将空位处理为undefined，如
 *    entries(), keys(), values(), find(), findIndex(), ..., Array.from()
 * 
 * 由于空位的处理规则非常不统一，所以建议避免出现空位
*/
