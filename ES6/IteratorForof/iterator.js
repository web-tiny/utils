/*
 * @Author: Tiny 
 * @Date: 2019-02-28 10:56:09 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-07-18 20:38:09
 */

 /** 
  * Iterator: 
  *   1：概念：是一种为各种不同的数据结构提供统一的访问机制的接口
  *   2：作用：
  *     1）：为各种数据结构提供一个统一简便的访问接口
  *     2）：使数据结构的成员能按某种次序排列
  *     3）：ES6创造了一种新的遍历命令for...of，Iterator接口主要供for...of消费
  *   3：遍历过程：
  *     1）：创建一个指针对象，指向当前数据结构的起始位置
  *     2）：第一次调用指针对象的next方法，将指针指向数据结构的第一个成员
  *     3）：第二次调用指针对象的next方法，将指针指向数据结构的第二个成员
  *     4）：不断调用指针对象的next方法，直到它指向数据结构的结束位置
  *   
 */
// 下面是模拟next方法返回值的例子
function makeIterator(arr) {
  let nextIndex = 0
  return {
    next: function() {
      return nextIndex < arr.length ? { value: arr[nextIndex++], done: false } : { value: undefined, done: true }
    }
  }
}
const it = makeIterator(['a', 'b'])
console.log(it.next()) // { value: 'a', done: false }
console.log(it.next()) // { value: 'b', done: false }
console.log(it.next()) // { value: undefined, done: true }

/** 
 * 4：一种数据结构只要部署了Iterator接口，我们就称这种数据结构是可遍历的
 *  ES6规定，默认的Iterator接口部署在数据结构的Symbol.iterator属性上，
 *  也就是说一个数据结构只要具有Symbol.iterator属性就可以认为是可遍历的（iterable）
 * 5：原生具备Iterator接口的数据结构如下：
 *  Array
 *  Map
 *  Set
 *  String
 *  TypedArray
 *  函数的arguments对象
 *  NodeList对象
*/
// 在一个对象上部署Symbol.iterator遍历器生成方法，就可以通过for...of调用了
const obj2 = {
  data: ['hello', 'world'],
  [Symbol.iterator]() {
    const self = this
    let index = 0
    return {
      next() {
        if(index < self.data.length) {
          return { value: self.data[index++], done: false }
        } else {
          return { value: undefined, done: true }
        }
      }
    }
  }
}
for (const v of obj2) {

  // hello
  // world
  console.log(v)
}

// 下面是为一个类添加遍历器
class RangeIterator {
  constructor(start, stop) {
    this.value = start
    this.stop = stop
  }

  [Symbol.iterator]() {
    return this
  }

  next() {
    let value = this.value
    if(value < this.stop) {
      this.value ++
      return { done: false, value: value }
    }
    return { done: true, value: undefined }
  }
}
function range(start, stop) {
  return new RangeIterator(start, stop)
}
for (const k of range(0, 3)) {
  console.log(k) // 0 1 2
}
console.log(range(0, 3).next()) // { done: false, value: 0 }

/** 
 * 6：调用Iterator接口的场合：
 *  1）：解构赋值
 *  2）：扩展运算符
 *  3）：yiel*
 *  4）：字符串
 *  5）：其他场合：for...of, Array.from(), Map(),Set(),WeakMap(), WeakSet(),Promise.all(),Promise.race()
*/
// 解构赋值
let set = new Set().add('a').add('b').add('c')
let [x, y] = set
let [first, ...rest] = set
console.log(first) // a
console.log(rest) // [ 'b', 'c' ]

// 3）：yiel*
let generator = function* () {
  yield 1
  yield* [2, 3, 4]
  yield 5
}
const iterator = generator()
for (const k of generator()) {
  console.log(k) // 1 2 3 4 5
}
/** 
 * 7: Generator实现Iterator
*/
const myIterator = {
  [Symbol.iterator]: function* () {
    yield 1
    yield 2
    yield 3
  }
}
console.log([...myIterator]) // [ 1, 2, 3 ]

/** 
 * 8: for...of
*/
const arr = ['red', 'green', 'blue']
for (const v of arr) {
  console.log(v) // red green blue
}

// 给对象部署Symbol.iterator属性，就可以用for...of
const obj3 = {}
obj3[Symbol.iterator] = arr[Symbol.iterator].bind(arr)
for (const v of arr) {
  console.log(v) // red green blue
}

/** 
 * for...in与for...of
 * for...in(主要是遍历对象而设计的)有几个缺点：
 *  1：数组的键名是数字，但是for...in循环是以字符串作为键名"0","1","2"...
 *  2: for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键
 *  3: 某些情况下，for...in循环会以任意顺序遍历键名
 * 
 * for...of：
 *  1：没有for...in的缺点
 *  2：不同于forEach方法，它可以与break, continue, return配合使用
 *  3：提供了遍历所有数据结构的统一操作接口
*/
