/*
 * @Author: Tiny 
 * @Date: 2019-02-22 10:22:31 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-02-22 14:07:36
 */

 /** 
  * 1: Reflect: Reflect对象与Proxy对象一样，也是ES6为了操作对象而提供的新api
  * 2: Refect的设计目的如下：
  *   1：将Object对象的一些明显属于语言内部的方法，如Object.defineProperty，放到Reflect对象上。
  *   2：修改某些Object方法的返回结果，让其变得更合理。
  *     比如：Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个error
  *     而Refelct.defineProperty(obj, name, desc)则会返回false
  *   3：让Object操作都变成函数行为
  *     如：name in obj 用 Reflect.has(obj, name)替代
  *     delete obj[name] 用 Reflect.deleteProperty(obj, name)替代
  *   4：Reflect对象的方法与Proxy对象的方法一一对应，只要时Proxy对象的方法就能在Reflect对象上找打对应的方法
  * 3: Reflect对象总共的13个静态方法
  *   1: Reflect.apply(target, thisArg, args)
  *   2: Reflect.construct(target, args)
  *   3: Reflect.get(target, name, receiver)
  *   4: Reflect.set(target, name, value, receiver)
  *   5: Reflect.defineProperty(target, name, desc)
  *   6: Reflect.deleteProperty(target, name)
  *   7: Reflect.has(target, name)
  *   8: Reflect.ownKeys(target)
  *   9: Reflect.isExtensions(target)
  *   10: Reflect.preventExtensions(target)
  *   11: Reflect.getOwnPropertyDescriptor(target, name)
  *   12: Reflect.getPrototypeOf(target)
  *   13: Reflect.setPrototypeOf(target, prototype)
  * 4: Reflect的第一个参数如果不是对象，都会报错
 */

/** 
 *下面是Proxy.set()拦截会触发Proxy.defineProperty()拦截，为什么？
 * 因为：Proxy.set里使用了Reflect.set,且传入了receiver,Proxy.set的receiver参数总是指向当前的Proxy实例，即proxy
 * 而一旦Reflect.set传入receiver，就会将属性赋值到receiver上面，即proxy，导致触发defineProperty拦截
*/
// Reflect.set()
let target = {
  a: 'a'
}
let handler = {
  set(target, key, value, receiver) {
    console.log('set')
    Reflect.set(target, key, value, receiver)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty')
    Reflect.defineProperty(target, key, attribute)
  }
}
let proxy = new Proxy(target, handler)
proxy.a = 'A'


/** 
 * Reflect.getOwnPropertyDescriptor()基本等同于Object.getOwnPropertyDescriptor()
 * 唯一区别是：
 *  Object.getOwnPropertyDescriptor(1, 'foo')不报错
 *  Reflect.getOwnPropertyDescriptor(1, 'foo')会抛出错误
*/
const myObject = {}
Object.defineProperty(myObject, 'hidden', {
  value: true,
  enumerable: false
})
let theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden')
let theDescriptorNew = Reflect.getOwnPropertyDescriptor(myObject, 'hidden')
// { value: true,
//   writable: false,
//   enumerable: false,
//   configurable: false }
console.log(theDescriptorNew)

// 如果name属性部署了读取函数getter，则读取函数的 this绑定receiver
const myObject2 = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar
  }
}
const myReceiverObject = {
  foo: 4,
  bar: 4
}
console.log(Reflect.get(myObject2, 'foo')) // 1
console.log(Reflect.get(myObject2, 'baz', myReceiverObject)) // 8

/**
 * Reflect.construct方法等同于new target(...args)
 * 通过Reflect.construct提供一种不适用new，来调用构造函数的方法
 */
function Greeting(name) {
  this.name = name
}
// new 的写法
const instance = new Greeting('tiny')
// Reflect.construct 的写法
const instance2 = Reflect.construct(Greeting, ['tiny'])

/** 
 * Reflect.getPrototypeOf(obj): 用于读取对象的__proto__属性，
 * 对应Object.getPrototypeOf(obj)
*/
const  myObject3 = new Greeting('tiny')
console.log(Object.getPrototypeOf(myObject3) === Greeting.prototype) // true
console.log(Reflect.getPrototypeOf(myObject3) === Greeting.prototype) // true

const myObject4 = {}
Object.setPrototypeOf(myObject4, Array.prototype)
Reflect.setPrototypeOf(myObject4, Array.prototype)

/** 
 * Reflect.ownKeys(target):
 *  基本等同于：Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和
*/
const myObject5 = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4
}
// 旧的写法
console.log(Object.getOwnPropertyNames(myObject5)) // [ 'foo', 'bar' ]
console.log(Object.getOwnPropertySymbols(myObject5)) // [ Symbol(baz), Symbol(bing) ]

// 新的写法
console.log(Reflect.ownKeys(myObject5)) // [ 'foo', 'bar', Symbol(baz), Symbol(bing) ]

/** 
 * 使用Proxy实现观察者模式:
 * 观察者模式：函数自动观察数据对象，一旦对象有变化，函数就会自动执行
*/
const queueObservers = new Set()
const oberve = fn => queueObservers.add(fn)

const handler = {
  set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    queueObservers.forEach(observer => observer())
    return result
  }
}
const observable = obj => new Proxy(obj, handler)

// 观察目标
const person = observable({
  name: 'lisi',
  age: 20
})

// 观察者
function print() {
  console.log(`${person.name}, ${person.age}`)
}
oberve(print)

person.name = 'zhang san' // zhang san, 20
person.age = 30 // zhang san, 30