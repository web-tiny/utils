/*
 * @Author: Tiny 
 * @Date: 2019-02-22 14:10:57 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-02-25 13:57:47
 */

 /** 
  * Symbol: Symbol值通过Symbol函数生成，ES6引入的一种新的原始数据类型，表示独一无二的，
  * 至此，JavaScript有了7中数据类型：
  *   Symbol,undefined,null,Boolean,String,Number,Object
 */

// 如果Symbol的参数是一个对象，就会调用该对象的toString方法，将其转化为字符串，然后才生成一个Symbol值
const obj = {
  toString() {
    return 'abc'
  }
}
const sym = Symbol(obj)
console.log(sym) // Symbol(abc)

// 注意：Symbol函数的参数只是表示对当前Symbol值的描述，因此相同参数的Symbol返回值是不相等的
let s1 = Symbol()
let s2 = Symbol()
console.log(s1 === s1) // true, yuanyifeng的教程是false，是错的

let s3 = Symbol('foo')
let s4 = Symbol('foo')
console.log(s3 === s4) // false

// Symbol 值不能与其他类型的值进行运算，会报错, 因为它是另一种数据类型
let sym2 = Symbol('My symbol')
// console.log('you symbol is ' + sym2) // TypeError: Cannot convert a Symbol value to a string

// 但是，Symbol 值可以显式转为字符串
console.log(String(sym2) + ' is my symbol') // Symbol(My symbol) is my symbol
console.log(sym2.toString() + ' is my symbol') // Symbol(My symbol) is my symbol

// Symbol 值也可以转为布尔值，但是不能转为数值
let sym3 = Symbol('jrg')
console.log(Boolean(sym3))
// console.log(Number(sym3)) // TypeError: Cannot convert a Symbol value to a number

/** 
 * 作为属性名的Symbol
 *  用于对象的属性名，就能保证不会出现同名的属性,能防止某一个键被不小心改写或覆盖
*/
// Symbol 值作为对象属性名时，不能用点运算符,因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值
const mySymbol = Symbol()
const a = {}
a.mySymbol = 'hello'
console.log(a[mySymbol]) // undefined
console.log(a['mySymbol']) // hello

// 在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中
let s5 = Symbol()
let obj2 = {
  [s5] (arg) {
    console.log(arg)
  }
}
obj2[s5](123) // 123

/** 
 * Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的
 * 需要注意，Symbol 值作为属性名时，该属性还是公开属性，不是私有属性
*/
const log = {}
log.levels = {
  DEBUG: Symbol('debug'),
  INFO: Symbol('info'),
  WARN: Symbol('warn')
}
console.log(log.levels.DEBUG, 'debug message') // Symbol(debug) 'debug message'
console.log(log.levels.WARN, 'warn message') // Symbol(warn) 'warn message'

/** 
 * 消除魔术字符串：指的是在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值
*/

/** 
 * 如下Triangle就是一个魔术字符串
 * 常用的消除魔术字符串的方法就是把它写成一个变量，把Triangle写成shapeType对象的triangle属性
*/
const shapeType = {
  // triangle: 'Triangle'

  /** 
   * 可以发现shapeType.triangle等于哪个值并不重要，只要确保不会跟其他shapeType属性的值冲突即可。
   * 因此，这里就很适合改用 Symbol 值
  */ 
  triangle: Symbol()
}
function getArea(shape, options) {
  let area = 0

  switch (shape) {
    // case  'Triangle':
    case  shapeType.triangle:
      area = 0.5 * options.width * options.height
      break;
  
    // 没有default
  }

  return area
}
// const area = getArea('Triangle', { width: 100, height: 100 })
const area = getArea(shapeType.triangle, { width: 100, height: 100 })

/** 
 * Symbol的遍历：Symbol作为属性名，不能被for...in, for...of,Object.keys(),Object.getOwnPropertyNames(),JSON.stringify()返回
 * 只能通过Object.getOwnPropertySymbols()方法获取，该方法返回一个数组
*/
const obj3 = {
  c: 1,
  d: 2
}
let a = Symbol('a')
let b = Symbol('b')
obj3[a] = 'hello'
obj3[b] = 'world'
const objectSymbols = Object.getOwnPropertySymbols(obj3)
console.log(objectSymbols) // [ Symbol(a), Symbol(b) ]
// for...in不能遍历Symbol值
for(let i in obj3) {
  console.log(i + ' : ' + obj3[i])
}

// Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名
console.log(Reflect.ownKeys(obj3)) // [ 'c', 'd', Symbol(a), Symbol(b) ]

/** 
 * 非私有的内部方法，如何定义？
 * 对象collection的size属性是一个 Symbol 值，
 * 所以Object.keys(collection)、Object.getOwnPropertyNames(collection)都无法获取它
*/
let size = Symbol('size')
class Collection {
  constructor () {
    this[size] = 0
  }
  add(item) {
    this[this[size]] = item
    this[size] ++
  }
  static sizeOf(instance) {
    return instance[size]
  }
}
let collection = new Collection()
console.log(Collection.sizeOf(collection)) // 0
collection.add('foo')
console.log(Collection.sizeOf(collection)) // 1
console.log(Object.keys(collection)) // [ '0' ]
console.log(Object.getOwnPropertyNames(collection)) // [ '0' ]
console.log(Object.getOwnPropertySymbols(collection)) // [ Symbol(size) ]

/** 
 * Symbol.for(),Symbol.keyFor()
 * 
 * 1:Symbol.for(),Symbol()的异同
 *  1：Symbol.for()有登记机制，当调用的时候会先检查给定的key是否存在，如果不存在才会新建一个
 *     Symbol(),没有登记机制，每一次调用都返回不同的Symbol值
 *  2：Symbol.for()为Symbol值登记的名字，是全局环境的，可以在不同iframe或service worker中取到同一个值
 * 2：Symbol.keyFor()返回一个已经登记的Symbol类型值的key
*/
let s6 = Symbol.for('foo')
let s7 = Symbol.for('foo')
console.log(s6 === s7) // true

let s8 = Symbol('foo')
let s9 = Symbol('foo')
console.log(s8 === s9) // false

console.log(Symbol.keyFor(s6)) // foo
console.log(Symbol.keyFor(s8)) // undefined

/** 
 * 除了自定义的Symbol值，ES6还提供了11个内置的Symbol值，指向语言内部使用的方法
 *  1：Symbol.hasInstance
 *  2: Symbol.isConcatSpreadable: 表示该对象用于Array.prototype.concat()时，是否可以展开
 *    数组的默认行为是可以展开的
 *    类似数组的对象默认不展开，它的Symbol.isConcatSpreadable属性设为true，才可以展开
 *  3：Symbol.species
 *  4: Symbol.match
 *  5: Symbol.replace
 *  6: Symbol.search
 *  7: Symbol.split
 *  8: Symbol.iterator
 *  9: Symbol.toPrimitive
 *  10: Symbol.toStringTag
 *  11: Symbol.unscopables
*/

// Symbol.hasInstance:使用instanceof运算符时，会调用这个方法
class Event {
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0
  }
}
// 等同于
const Even = {
  [Symbol.hasInstance] (obj) {
    return Number(obj) % 2 === 0
  }
}
console.log(1 instanceof Even) // false
console.log(2 instanceof Even) // true

// Symbol.isConcatSpreadable:是一个Boolean值，表示该对象用于Array.prototype.concat()时是否可以展开
let arr1 = ['c', 'd']
console.log(['a', 'b'].concat(arr1, 'e')) // [ 'a', 'b', 'c', 'd', 'e' ]
arr1[Symbol.isConcatSpreadable] = false
console.log(['a', 'b'].concat(arr1, 'e')) // [ 'a', 'b',[ 'c', 'd', [Symbol(Symbol.isConcatSpreadable)]: false ],'e' ]

class A1 extends Array {
  constructor(args) {
    super(args)
    // 可展开
    this[Symbol.isConcatSpreadable] = true
  }
}
class A2 extends Array {
  constructor(args) {
    super(args)
  }
  // 不可展开
  get [Symbol.isConcatSpreadable] () {
    return false
  }
}
let a1 = new A1()
a1[0] = 3
a1[1] = 4
let a2 = new A2()
a2[0] = 5
a2[0] = 6
const concatArray = [1, 2].concat(a1).concat(a2)
console.log(concatArray) // [ 1, 2, 3, 4, A2 [ 6 ] ]

// Symbol.species属性指向一个构造函数，创建衍生对象时会使用该属性
class MyArray extends Array {}
const a = new MyArray(1, 2, 3)
const b = a.map(x => x)
const c = a.filter(x => x > 1)
console.log(b instanceof MyArray) // true
console.log(c instanceof MyArray) // true

// 定义Symbol.species属性要采用get取值器
class MyArray extends Array {
  static get [Symbol.species] () {
    return Array
  }
}
const a = new MyArray()
const b = a.map(x => x)
// a.map(x => x)生成的衍生对象就不是MyArray实例，而是Array的实例
console.log(b instanceof MyArray) // false
console.log(b instanceof Array) // true

/** 
 * Symbol.math(): 指向一个函数
 *  当执行str.math(myObject)时，如果该属性存在，会调用它，返回该方法的返回值
 *  String.prototype.match(regexp)等同于
 *  regexp[Symbol.match](this)
*/
class MyMatcher {
  [Symbol.match] (str) {
    return 'hello world'.indexOf(str)
  }
}
console.log('h'.match(new MyMatcher)) // 0


/** 
 * Symbol.replace()属性指向一个方法，
 * 当该对象被String.prototype.replace方法调用时，会返回该方法的返回值
*/
/** 
 * Symbol.replace方法会收到两个参数，
 * 第一个参数是replace方法正在作用的对象，
 * 下面的例子是Hello，第二个参数是替换后的值，下面例子是World
*/
const x = {}
x[Symbol.replace] = (...s) => console.log(s)
'hello'.replace(x, 'world') // [ 'hello', 'world' ]

/** 
 * Symbol.search属性，指向一个方法，
 * 当该对象被String.prototype.search方法调用时，会返回该方法的返回值
 * String.prototype.search(regexp)等同于
 * regexp[Symbol.search](this)
*/
class MySearch {
  constructor (value) {
    this.value = value
  }
  [Symbol.search] (str) {
    return str.indexOf(this.value)
  }
}
console.log('foobar'.search(new MySearch('foo'))) // 0

/** 
 * Symbol.split属性，指向一个方法，
 * 当该对象被String.prototype.split方法调用时，会返回该方法的返回值
*/
// 使用Symbol.split重新定义字符串对象的split方法
class MySplitter {
  constructor(value) {
    this.value = value
  }
  [Symbol.split] (str) {
    let index = str.indexOf(this.value)
    if (index === -1) {
      return str
    }
    return [
      str.substr(0, index),
      str.substr(index + this.value.length)
    ]
  }
}
console.log('foobar'.split(new MySplitter('foo'))) // [ '', 'bar' ]
console.log('foobar'.split(new MySplitter('bar'))) // [ 'foo', '' ]
console.log('foobar'.split(new MySplitter('baz'))) // 'foobar'

/** 
 * Symbol.split：指向一个方法，
 * 该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值
 * 这个方法被调用时，会接受一个字符串参数，表示当前运算模式，一共有三种模式：
 *  Number: 该场合需要转成数值
 *  String: 该场合需要转成字符串
 *  Default: 该场合可以转成数值，也可以转成字符串
*/
let obj = {
  [Symbol.toPrimitive] (hint) {
    switch (hint) {
      case 'number':
        return 123
      case 'string':
        return 'str'
      case 'default':
        return 'default'   
      default:
        throw new Errow()
    }
  }
}
console.log(2 * obj) // 246
console.log(2 + obj) // 2default
console.log(String(obj)) // str

/** 
 * Symbol.toStringTag:属性，指向一个方法。在该对象上面调用Object.prototype.toString方法时，
 * 如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型.
 * 即：这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串
*/
console.log({ [Symbol.toStringTag]: 'Foo' }.toString()) // [object Foo]
class Collection {
  get [Symbol.toStringTag]() {
    return 'xxx'
  }
}
let x = new Collection()
console.log(Object.prototype.toString.call(x)) // [object xxx]

/** 
 * Symbol.unscopables属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除
*/
// 数组有 7 个属性，会被with命令排除
// [Object: null prototype] {
//   copyWithin: true,
//   entries: true,
//   fill: true,
//   find: true,
//   findIndex: true,
//   includes: true,
//   keys: true,
//   values: true }
console.log(Array.prototype[Symbol.unscopables])

// ["copyWithin", "entries", "fill", "find", "findIndex", "includes", "keys", "values"]
console.log(Object.keys(Array.prototype[Symbol.unscopables]))