/*
 * @Author: Tiny 
 * @Date: 2019-02-27 10:28:59 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-02-27 16:41:59
 */

/** 
 * ES6数据结构本身的改变：
 *  1：属性名和方法简写
 *  2：属性名表达式
 *    1：属性名表达式与简洁表示法同时用会报错，
 *    2：当属性名是一个对象时，默认情况下会自动将对象转为字符串[object Object],要特别当心这一点
 *  3：方法的name属性
 *  4：属性的可枚举性和遍历
 *    遍历对象属性的5种方法:
 *      for...in
 *      Object.keys(obj)
 *      Object.getOwnPropertyNames(obj)
 *      Object.getOwnPropertySymbols(obj)
 *      Object.ownKeys(obj)
 *      以上5种方法遍历对象的键名都遵循同样的属性遍历次序规则：
 *        首先遍历所有数值键，按照设置升序排列
 *        其次遍历所有字符串键，按照加入时间升序排列
 *        最后遍历所有Symbol键，按照加入时间升序排列
 *  5：super关键字：ES6 又新增了另一个类似this的关键字super，指向当前对象的原型对象
 *    注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错，
 *    目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法
 *  6：对象的扩展运算符
 *    1：解构赋值必须是最后一个参数，否则会报错。
 *    2：另外，扩展运算符的解构赋值，不能复制继承自原型对象的属性
 * 
 * 注意：
 *  对象的遍历，我们只关心对象自身的属性，所以尽量不要用for...in, 用Objec.keys()替代
*/

// 1：属性名和方法简写
const name = 'Tiny'
const birth = '2019-01-01'
const person = {
  name,

  // 等同于birth: birth
  birth,
  wheel: 4,
  // 方法的简洁写法，等同于：hello: function() {}
  hello() {
    console.log('my name is: ' + this.name)

    // 简洁写法对于方法的返回值会非常方便
    return { name, birth }
  },
  
  get wheels() {
    return this.wheel
  },

  set wheels(value) {
    if (value < this.wheel) {
      throw new Error('value is too small !')
    }
    this.wheel = value
  }
}
console.log(person.hello())

// 2：属性名表达式：表达式放在方括号内
let propKey = 'foo'
let lastWord = 'last word'
const keyA = { a: 1 }
const keyB = { b: 2 }

const obj1 = {
  // 属性名用表达式定义
  [propKey]: true,
  [lastWord]: 'word',

  // 方法名用表达式定义
  ['my' + 'Method']() {
    return 'my method !'
  },
  [keyA]: 'valueA',
  [keyB]: 'valueB'
}
console.log(obj1[propKey]) // true
console.log(obj1.myMethod()) // my method !

// 当属性名是一个对象时，默认情况下会自动将对象转为字符串[object Object],要特别当心这一点,所以[keyA]会被[keyB]覆盖
console.log(obj1[keyA]) // valueB
console.log(obj1[keyB]) // valueB

// 3：方法的name属性：对象的方法也是函数，也具有name属性
const name = 'jrg'
const key1 = Symbol('description')
const key2 = Symbol()
const people = {
  name,
  sayName() {
    return this.name
  },

  /** 
   * 如果对象的方法使用了getter和setter，则name属性不是在该上面，而是改方法的属性的描述对象的get和set属性上面
   * 返回值是方法名前加上get和set
  */
  get foo() {
    return this.x
  },
  set foo(x) {
    this.x = x
  },
  [key1]() {},
  [key2]() {}
}
console.log(people.sayName.name) // sayName
// console.log(people.foo.name) // TypeError: Cannot read property 'name' of undefined
const descriptor = Object.getOwnPropertyDescriptor(people, 'foo')
console.log(descriptor.get.name) // get foo
console.log(descriptor.set.name) // set foo

console.log(people[key1].name) // [description]
console.log(people[key2].name) // ''

// bind方法创造的函数，name属性返回bound加上原函数的名字
console.log(people.sayName.bind().name) // bound sayName

// Function构造函数创造的函数，name属性返回anonymous
console.log((new Function()).name) // anonymous

/** 
 * 4：属性的可枚举性和遍历:
 *  下面四个操作都会忽略enumerable为false的属性：
 *    for...in, Object.keys(), JSON.stringify(), Object.assign()
 *    除了for...in可操作对象自身的和可枚举的属性外，其他三种都只能操作对象自身的属性
 *  注意：对象的遍历，我们只关心对象自身的属性，所以尽量不要用for...in, 用Objec.keys()替代
*/
// 注意遍历顺序
const obj2 = {
  [Symbol()]: 0,
  b: 0,
  10: 0,
  2: 0,
  5: 0,
  a: 0,
  c: 0
}
const ownkey = Reflect.ownKeys(obj2)
console.log(ownkey) // [ '2', '5', '10', 'b', 'a', 'c', Symbol() ]

// 5：super关键字：ES6 又新增了另一个类似this的关键字super，指向当前对象的原型对象
const proto = {
  x: 'hello',
  foo() {
    console.log(this.x)
  },
}

const obj = {
  x: 'world',
  foo() {
    super.foo()
  }
}

Object.setPrototypeOf(obj, proto)
// "world"，super.foo()指向原型对象的foo方法，但绑定的this却是当前的对象obj
obj.foo()

// 注意，super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错
// SyntaxError: 'super' keyword unexpected here
const obj3 = {
  foo: super.foo
}
// SyntaxError: 'super' keyword unexpected here
const obj4 = {
  foo: () => super.foo
}
// SyntaxError: 'super' keyword unexpected here
const obj5 = {
  foo: function() {
    return super.foo
  }
}

/** 
 * 6：对象的扩展运算符
*/
// 对象的结构赋值
let { x, y, ...z } = {
  x: 1,
  y: 2,
  a: 3,
  b: 4
}
console.log(x) // 1
console.log(y) // 2
console.log(z) // { a: 3, b: 4 }

// 解构赋值的一个用处是扩展某个函数的参数，引入其他操作
function baseFunction({ a, b }) {

}
function wrapperFunction({ x, y, ...restConfig }) {
  return baseFunction(restConfig)
}

// 扩展运算符:对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中
// 对象
let z = {
  a: 3,
  b: 4
}
let n = { ...z }
console.log(n) // { a: 3, b: 4 }

// 对象的扩展运算符相当于使用Object.assign()
let zClone = Object.assign({}, z)
console.log(zClone) // { a: 3, b: 4 }

// 克隆对象原型的属性和自身的属性
let zClone2 = Object.assign(
  Object.create(Object.getPrototypeOf(z)), 
  z
)
// 或者
let zClone3 = Object.create(
  Object.getPrototypeOf(z),
  Object.getOwnPropertyDescriptor(z)
)
console.log(zClone2)

// 数组
let foo = { ...['a', 'b', 'c'] }
console.log(foo) // { '0': 'a', '1': 'b', '2': 'c' }

// 字符串
let str = { ...'ABCD' }
console.log(str) // { '0': 'A', '1': 'B', '2': 'C', '3': 'D' }

// 扩展运算符用来合并两个对象
let a = {
  z: 1
}
let b = {
  f: 2
}
let ab = { ...a, ...b }
console.log(ab) // { z: 1, f: 2 }
let ab2 = Object.assign({}, a, b)
console.log(ab2) // { z: 1, f: 2 }