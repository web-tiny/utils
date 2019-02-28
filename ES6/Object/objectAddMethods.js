/*
 * @Author: Tiny 
 * @Date: 2019-02-27 16:43:30 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-02-28 10:54:20
 */

 /** 
  * Object新增的方法：
 */
// 1: Object.is():比较两个值是否相等，基本与 === 一致，
console.log(+0 === -0) // true
console.log(Object.is(+0, -0)) // false
console.log(NaN === NaN) // false
console.log(Object.is(NaN, NaN)) // true

// 通过ES5部署Object.is()
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    
    if (x === y) {
      // 针对针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y
    }
    // 针对NaN的情况
    return x !== x && y !== y
  },
  configurable: true,
  enumerable: false,
  writable: true
})

// 2: Object.assign()：用于对象的合并，将原对象的所有可枚举属性复制到目标对象
// 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
const target = { a: 1, b: 5 }
const source1 = { b: 2, c: 9 }
const source2 = { c: 3 }

// 其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果
// 这是因为只有字符串的包装对象，会产生可枚举属性
const v1 = 'abc'
const v2 = true
const v3 = 10
Object.assign(target, source1, source2, v1, v2, v3)
console.log(target) // { '0': 'a', '1': 'b', '2': 'c', a: 1, b: 2, c: 3 }

// Object.assign()只拷贝源对象自身属性，不拷贝继承和不可枚举属性
const target1 = { b: 'c' }
Object.assign(target1,
  Object.defineProperty({}, 'invisible', {
    // enumerable: true, // { b: 'c', invisible: 'hello' }
    enumerable: false, // { b: 'c' }
    value: 'hello'
  })
)
console.log(target1)

/** 
 * Object.assign使用时要注意：
 * 1：浅拷贝
 * 2: 同名属性替换
 * 3：数组的处理
 * 4：取值函数的处理
*/
// 1：浅拷贝
const obj6 = {
  a: {
    b: 1
  }
}
const obj7 = Object.assign({}, obj6)
obj6.a.b = 2
console.log(obj7.a.b) // 2

// 2: 同名属性替换: 对于这种嵌套的对象，一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加
const target3 = {
  a: {
    b: 'c',
    d: 'e'
  }
}
const source3 = {
  a: {
    b: 'hello'
  }
}
Object.assign(target3, source3)
console.log(target3) // { a: { b: 'hello' } }

// 3: 数组的处理: Object.assign可以用来处理数组，但是会把数组视为对象
const arr1 = [1, 2, 3]
const arr2 = [4, 5]
Object.assign(arr1, arr2)
console.log(arr1) // [ 4, 5, 3 ]

// 4：取值函数的处理: Object.assign不会复制取值函数，只会拿到值以后，将这个值复制过去,将取值函数的的函数名作为键
const source4 = {
  get foo() {
    return 1
  }
}
const target4 = {}
Object.assign(target4, source4)
console.log(target4) // { foo: 1 }

/** 
 * Object.assign()的常见用途：
*/
// 1: 为对象添加实例
class Point {
  constructor(x, y) {
    Object.assign(this, { x, y })
  }
}

// 2: 为对象添加方法
Object.assign(SomeClass.prototype, {
  momeMethod(arg1, arg2) {},
  anotherMethod() {}
})
// 等同于
SomeClass.prototype.momeMethod = function(arg1, arg2) {}
SomeClass.prototype.anotherMethod = function() {}

// 3: 克隆对象,下面的方法可以克隆继承的值
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin)
  return Object.assign(Object.create(originProto), origin)
}

// 4: 合并多个对象
const mergeObjects = (target, ...sources) => Object.assign(target, ...sources)

// 5：为属性指定默认值
const defaults = {
  logLevel: 0,
  outputFormat: 'html'
}
// defaults, options最好都是简单类型，因为是浅拷贝，
function processContent(options) {
  options = Object.assign({}, defaults, options)
}

/** 
 * Object.getOwnPropertyDescriptors():
 *  为了解决Object.assign()无法正确拷贝set和get属性的问题
 *  另一个用处是配合Object.create()方法将对象属性克隆到一个新对象。这属于浅拷贝
*/
const obj8 = {
  foo: 123,
  get bar() {
    return 'abc'
  },
  set bar(value) {
    console.log(value)
  }
}
// { foo:
//   { value: 123,
//     writable: true,
//     enumerable: true,
//     configurable: true },
//  bar:
//   { get: [Function: get bar],
//     set: [Function: set bar],
//     enumerable: true,
//     configurable: true } }
console.log(Object.getOwnPropertyDescriptors(obj8))
console.log(Object.assign({}, obj8)) // { foo: 123, bar: 'abc' }

// Object.getOwnPropertyDescriptors()方法配合Object.defineProperties()方法，实现正确拷贝
const shallowMerge = (target, source) => Object.defineProperties(
  target,
  Object.getOwnPropertyDescriptors(source)
)
const target5 = {}
console.log(shallowMerge(target5, obj8)) // { foo: 123, bar: [Getter/Setter] }

// 另一个用处是配合Object.create()方法将对象属性克隆到一个新对象。这属于浅拷贝
const clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))
// 或者
const shalloClone = (obj) => Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))

/** 
 * Object.setPrototypeOf():ES6正式推荐的设置原型对象的方法
 *  用来设置一个对象的prototype对象，返回参数对象本身
 * 格式：Object.setPrototypeOf(object, prototype)
 * 
 * Object.getPrototypeOf(): 用来获取一个对象的原型对象
*/
const proto = {}
const obj = { x: 10 }
Object.setPrototypeOf(obj, proto)
proto.y = 20
proto.z = 40
console.log(obj.x) // 10
console.log(obj.y) // 20
console.log(obj.z) // 40

// 如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果
console.log(Object.setPrototypeOf(1, {}) === 1) // true
console.log(Object.setPrototypeOf('foo', {}) === 'foo') // true
console.log(Object.setPrototypeOf(true, {}) === true) // true

console.log(Object.getPrototypeOf(1)) // [Number: 0]
console.log(Object.getPrototypeOf('foo')) // [String: '']
console.log(Object.getPrototypeOf(true)) // [Boolean: false]

/** 
 * Object.keys()
 * Object.values()
 * Object.entries(): 返回对象自身所有可遍历属性的键值对数组
*/
// Object.entries()：会忽略Symbol值
const obj9 = {
  foo: 'bar',
  baz: 40,
  [Symbol('age')]: 90
}
const arrFromObj = Object.entries(obj9)
console.log(arrFromObj) // [ [ 'foo', 'bar' ], [ 'baz', 40 ] ]

// Object.entries方法的另一个用处是，将对象转为真正的Map结构
const map = new Map(Object.entries(obj9))
console.log(map) // Map { 'foo' => 'bar', 'baz' => 40 }

// entries的实现
function* entries(obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]]
  }
}

/** 
 * Object.fromEntries(): 是Object.entries()的逆操作，用于将一个键值对数组转为对象，
 * 注意：这个方法目前只有FireFox浏览器支持
*/
const arr3 = [
  ['foo', 'bar'],
  ['baz', 42],
  ['name', 'rose']
]
const objFromarr =  Object.fromEntries(arr3)
console.log(objFromarr)