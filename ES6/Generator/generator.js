/*
 * @Author: Tiny 
 * @Date: 2019-02-25 14:10:56 
 * @Last Modified by: tiny.jiao
 * @Last Modified time: 2019-02-25 22:20:42
 */

 /** 
  * Generator函数是ES6提供的一种异步编程解决方案：
  * 1: 理解：
  *   1：语法上：可以把Generator函数当作一个状态机，封装了多个内部状态
  *   2: 执行：返回一个遍历器对象，也就是说Generator还是一个遍历器对象生成函数，可以依次遍历每一个内部的状态
  *   3: 是一个普通函数，有两个特征：
  *     一是function关键字和函数名之间有一个星号，
  *     二是函数体内部使用yield表达式，定义不同的内部状态
  *   4：调用Generator方法后，该函数并不执行，也不返回函数运行结果，而是一个指向内部状态的指针对象，
  *   必须调用遍历器对象的next方法，使指针移向下一个状态，
  *   也就说：每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止
  * 2: 注意：
  *   1：yield表达式只能用在 Generator 函数里面，用在其他地方都会报错
  * 3: 与Iterator接口的关系
  * 4: next方法的参数
  * 5：for...of循环：可以自动遍历 Generator函数运行时生成的Iterator对象，且此时不再需要调用next方法
  * 6: Generator.prototype.throw(): Generator函数返回的遍历器对象都有一个throw方法，
  * 可以在函数体外抛出错误，然后再Generator函数体内捕获
  * 7: Generator.prototype.return(): 返回给定的值，并且终结遍历 Generator 函数
  * 8: next()、throw()、return() 的共同点
  * 9: yield* 表达式
  * 10: 作为对象属性的Generator函数
  * 11: Generator 函数的this 
 */
function* helloworldGenerator() {
  yield 'hello'
  yield 'world'
  return 'ending'
}
const hw = helloworldGenerator()
console.log(hw) // Object [Generator] {}
console.log(hw.next()) // { value: 'hello', done: false }
console.log(hw.next()) // { value: 'world', done: false }
console.log(hw.next()) // { value: 'ending', done: false }
console.log(hw.next()) // { value: undefined, done: true }

// Generator函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数
function* f() {
  console.log('excuting')
}
const generator = f()
setTimeout(() => generator.next(), 1000) // excuting

// yield表达式只能用在 Generator 函数里面，用在其他地方都会报错
(function () {
  yield 1
})() // SyntaxError: Unexpected number

const arr = [1, [[2, 3], 4], [5, 6]]
const flat = function* (a) {
  // a.forEach(item => {
    
  //   // 因为yiel表达式在forEach函数里，所以报错
  //   if(typeof item !== 'number') {
  //     yield* flat(item)
  //   } else {
  //     yield item // SyntaxError: Unexpected identifier
  //   }
  // })

  const length = a.length
  for (let i = 0; i < length; i++) {
    let item = a[i]
    if(typeof item !== 'number') {
      yield* flat(item)
    } else {
      yield item
    }
  }
}
console.log(flat(arr)) // Object [Generator] {}
for(let f of flat(arr)) {
  console.log(f) // 1, 2, 3, 4, 5, 6
}

// 与Iterator接口的关系
let myIterator = {}
myIterator[Symbol.iterator] = function* () {
  yield 1
  yield 2
  yield 3
}
console.log([...myIterator]) // [ 1, 2, 3 ]
function* gen() {}
let g = gen()
console.log(g[Symbol.iterator]() === g) // true

/** 
 * next方法的参数: yield表达式本身没有返回值，或者说总是返回undefined，
 * next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值
 * 
 * 注意：由于next方法的参数表示上一个yield表达式的返回值，所以在第一次使用next方法时传递参数是无效的
 * 
*/
function* foo(x) {
  let y = 2 * (yield (x + 1))
  let z = yield (y / 3)
  return x + y + z
}

let a = foo(5)
console.log(a.next()) // { value: 6, done: false }
console.log(a.next()) // { value: NaN, done: false }
console.log(a.next()) // { value: NaN, done: true }

let b = foo(5)
// 第一次使用next方法时传递参数是无效的
console.log(b.next(50)) // { value: 6, done: false }
console.log(b.next(12)) // { value: 8, done: false }
console.log(b.next(13)) // { value: 42, done: true }

function* dataConsumer() {
  console.log('started')
  console.log(`1.${yield}`)
  console.log(`2.${yield}`)
  return 'result'
}
let genObj = dataConsumer()
console.log(genObj.next()) // started { value: undefined, done: false }
console.log(genObj.next('a')) // 1.a { value: undefined, done: false }
console.log(genObj.next('b')) // 2.b { value: 'result', done: true }

/** 
 * for...of循环：可以自动遍历 Generator函数运行时生成的Iterator对象，且此时不再需要调用next方法
*/
function* bar() {
  yield 1
  yield 2
  yield 3
  yield 4
  yield 5
  return 6
}
// 注意，for...of循环中止的条件是next方法的返回对象的done属性为true时
for(let v of bar()) {
  console.log(v) // 1 2 3 4 5 
}

// 通过Generator函数为js对象加上Iterator接口,就可以使用for...of
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj)
  for (const propKey of propKeys) {
    yield [propKey, obj[propKey]]
  }
}
let jane = {
  first: 'Jane',
  last: 'Doe'
}
for (const [k, v] of objectEntries(jane)) {
  // first: Jane
  // last: Doe
  console.log(`${k}: ${v}`)
}

// 另一种为对象加上Iterator接口的方法是将Generator函数加到对象的Symbol.iterator属性上
function* objectEntries() {
  let propKeys = Object.keys(this)
  for (const propKey of propKeys) {
    yield [propKey, this[propKey]]
  }
}
let jane = {
  first: 'Jane',
  last: 'Doe'
}
jane[Symbol.iterator] = objectEntries
for (const [k, v] of jane) {
  // first: Jane
  // last: Doe
  console.log(`${k}: ${v}`)
}

/** 
 * for...of, ..., 解构赋值， Array.from方法内部调用的都是遍历器接口，
 * 所以，它们都可以将Generator函数返回的Iterator对象作为参数
*/
function* numbers() {
  yield 1
  yield 2
  return 3
  yield 4
}

console.log([...numbers()]) // [ 1, 2 ]
console.log(Array.from(numbers())) // [ 1, 2 ]

let [x, y] = numbers()
console.log(x, y) // 1 2

for (const n of numbers()) {
  console.log(n) // 1 2
}

/** 
 * Generator.prototype.throw()：可以在函数体外抛出错误，然后在 Generator 函数体内捕获
*/

/** 
 * 遍历器对象i连续抛出两个错误，第一个错误被Generator函数体内的catch捕获，
 * i第二次抛出错误，由于Generator函数内部的catch语句已经执行过了，所以不会再捕获这个错误
 * 
*/
const g = function* () {
  try {
    yield
  } catch (e) {
    console.log('内部错误', e)
  }
}
const i = g()
i.next()
// try {
//   i.throw('a') // 内部错误 a
//   i.throw('b') // 外部捕获 b
// } catch (e) {
//   console.log('外部捕获', e)
// }

// throw方法可以接受一个参数，该参数会被catch语句接收，建议抛出Error对象的实例
i.throw('error ...') // 内部错误 error ...

/** 
 * 之所以只捕获了a，是因为函数体外的catch语句块，捕获了抛出的a错误以后，就不会再继续try代码块里面剩余的语句了
 * 其实也就是说，要捕获多个error就得写多个try...catch语句
*/
try {
  throw new Error('a')
  throw new Error('b')
} catch (e) {
  console.log('外部捕获', e)
}

// Generator 函数g内部没有部署try...catch代码块，所以抛出的错误直接被外部catch代码块捕获
const g = function* () {
  while (true) {
    yield
    console.log('内部捕获', e)
  }
}
const i = g()
i.next()
try {
  i.throw('a')
  i.throw('b')
} catch (e) {
  console.log('外部捕获', e) // 外部捕获 a
}

// 如果 Generator 函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行
const gen = function* gen() {
  yield console.log('hello')
  yield console.log('world')
}
const g = gen()
g.next() // hello
g.throw() // Uncaught undefined

/** 
 * throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法
 * 原因很简单：
 * 因为next方法一次都没执行过，等于Generator函数还没有执行
*/
function* gen1() {
  try {
    yield 1
  } catch (e) {
    console.log('inner error !')
  }
}
const g1 = gen1()
// Uncaught 1
g1.throw(1)

// throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法
// 只要 Generator 函数内部部署了try...catch代码块，那么遍历器的throw方法抛出的错误，不影响下一次遍历
const gen2 = function* gen2() {
  try {
    yield console.log('a')
  } catch (e) {
    
  }
  yield console.log('b')
  yield console.log('c')
}
const g2 = gen2()
g2.next() // a
g2.throw() // b
g2.next() // c

// Generator函数体外抛出错误，可以在函数体内捕获，反过来，Generator函数体内抛出错误也可以被函数体外的catch捕获
function* gen3() {
  let x = yield 3
  let y = x.toUpperCase()
  yield y
}
const it = gen3()
it.next()
try {
  it.next(42)
} catch (err) {
  console.log(err) // TypeError: x.toUpperCase is not a function
}

/** 
 * Generator.prototype.return():
 * Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数
*/
function* gen4() {
  yield 1
  yield 2
  yield 3
}
const g4 = gen4()
console.log(g4.next()) // { value: 1, done: false }
// console.log(g4.return('foo')) // { value: 'foo', done: true }

// 如果return方法调用时不提供参数，则返回值的value为undefined
console.log(g4.return()) // { value: undefined, done: true }
console.log(g4.next()) // { value: undefined, done: true }

/** 
 * 如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return方法会推迟到finally代码块执行完再执行
*/
function* numbers2() {
  yield 1
  try {
    yield 2
    yield 3
  } finally {
    yield 4
    yield 5
  }
  yield 6
}
const g5 = numbers2()
console.log(g5.next()) // { value: 1, done: false }
console.log(g5.next()) // { value: 2, done: false }
console.log(g5.return(7)) // { value: 4, done: false }
console.log(g5.next()) // { value: 5, done: false }
console.log(g5.next()) // { value: 7, done: true }

/** 
 * next()、throw()、return() 的共同点:
 * next()是将yield表达式替换成一个值
 * throw()是将yield表达式替换成一个throw语句
 * return()是将yield表达式替换成一个return语句
*/

/** 
 * yield* 表达式
*/
// 如果在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的
function* foo() {
  yield 'a'
  yield 'b'
}

function* bar() {
  yield 'x'
  
  // 这个时候就需要用到yield*表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数
  // foo() // x y
  yield* foo() // x a b y
  yield 'y'
}
for (const v of bar()) {
  console.log(v) 
}

function* inner() {
  yield 'hello'
}
function* outer1() {
  yield 'open'

  // 返回遍历器对象
  yield inner()
  yield 'close'
}
const gen5 = outer1()
console.log(gen5.next().value) // 'open'
console.log(gen5.next().value) // Object [Generator] {}
console.log(gen5.next().value) // 'close'

function* outer2() {
  yield 'open'

  // 返回遍历器内部对象的值
  yield* inner()
  yield 'close'
}
const gen6 = outer2()
console.log(gen6.next().value) // 'open'
console.log(gen6.next().value) // 'hello'
console.log(gen6.next().value) // 'close'

/** 
 * yield*后面的 Generator 函数（在没有return语句时），等同于在 Generator 函数内部部署一个for...of循环
 * 实际上，任何数据结构只要有 Iterator 接口，就可以被yield*遍历
*/
function* concat(iter1, iter2) {
  yield* iter1
  yield* iter2
}
const arr1 = [1, 2, 3]
const arr2 = ['name', 'age', 'phone']
const gen7 = concat(arr1, arr2)
console.log(gen7.next()) // { value: 1, done: false }
console.log(gen7.next()) // { value: 2, done: false }
console.log(gen7.next()) // { value: 3, done: false }
console.log(gen7.next()) // { value: 'name', done: false }
console.log(gen7.next()) // { value: 'age', done: false }
console.log(gen7.next()) // { value: 'phone', done: false }

const read = (function* () {
  yield 'hello'
  yield* 'hello'
})()
console.log(read.next().value) // hello
console.log(read.next().value) // h

/** 
 * 如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据
*/
function* foo() {
  yield 2
  yield 3
  return 'foo'
}
function* bar() {
  yield 1
  const v = yield* foo()
  console.log('v: ' + v)
  yield 4
}
const gen8 = bar()
console.log(gen8.next()) // { value: 1, done: false }
console.log(gen8.next()) // { value: 2, done: false }
console.log(gen8.next()) // { value: 3, done: false }
console.log(gen8.next()) // v: foo { value: 4, done: false }
console.log(gen8.next()) // { value: undefined, done: true }

/** 
 * yield*命令可以很方便地取出嵌套数组的所有成员
*/
function* iterTree(tree) {
  if(Array.isArray(tree)) {
    for(let i = 0; i < tree.length; i++) {
      yield* iterTree(tree[i])
    }
  } else {
    yield tree
  }
}
const tree = [ 'a', ['b', 'c', [1, 2, 3, ['name', 'age', 'phone']]], ['d', 'e'] ]
console.log([...iterTree(tree)]) // [ 'a', 'b', 'c', 1, 2, 3, 'name', 'age', 'phone', 'd', 'e' ]

// 作为对象属性的 Generator 函数
let obj = {
  * myGeneratorMethod() {
    // ..
  }
}
// 等价于
let obj = {
  myGeneratorMethod: function* () {
    // ...
  }
}

/**
 * Generator 函数的this
 *  Generator 函数不能跟new命令一起使用，否则会报错
 */
function* F() {
  yield this.x = 2
  yield this.y = 3
}
new F() // TypeError: F is not a constructor


// 怎样才能让Generator函数返回一个正常的对象实例，即可以用next方法，又可以获得正常的this？

// 生成一个空对象，使用call方法绑定Generator函数内部的this
function* F() {
  this.a = 1
  yield this.b = 2
  yield this.c = 3
}
let obj = {}
let f = F.call(obj)
// 执行3次next方法，F内部的代码都执行完毕，才能取到obj.x
console.log(f.next()) // { value: 2, done: false }
console.log(f.next()) // { value: 3, done: false }
console.log(f.next()) // { value: undefined, done: true }

console.log(obj.a) // 1
console.log(obj.b) // 2
console.log(obj.c) // 3

// 上面的代码，执行的遍历器对象是f，但生成的对象实例是obj，能否将两个对象统一？一个方法是将obj换成F.prototype
function* F2() {
  this.a = 1
  yield this.b = 2
  yield this.c = 3
}
let f = F2.call(F2.prototype)
// 执行3次next方法，F内部的代码都执行完毕，才能取到obj.x
console.log(f.next()) // { value: 2, done: false }
console.log(f.next()) // { value: 3, done: false }
console.log(f.next()) // { value: undefined, done: true }

console.log(f.a) // 1
console.log(f.b) // 2
console.log(f.c) // 3

// 再将F改成构造函数，就可以使用new命令了
function* gen9() {
  this.a = 1
  yield this.b = 2
  yield this.c = 3
}
function F3() {
  return gen9.call(gen9.prototype)
}
let f = new F3()
// 执行3次next方法，F内部的代码都执行完毕，才能取到obj.x
console.log(f.next()) // { value: 2, done: false }
console.log(f.next()) // { value: 3, done: false }
console.log(f.next()) // { value: undefined, done: true }

console.log(f.a) // 1
console.log(f.b) // 2
console.log(f.c) // 3
