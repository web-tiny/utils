/*
 * @Author: Tiny 
 * @Date: 2019-02-20 15:51:54 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-02-21 18:37:51
 */

 /** 
  * Proxy: 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截。
  *   1：ES6原生提供Proxy构造函数，用来生成Proxy实例
  *     let proxy = new Proxy(target, handle)
  *   2: Proxy支持以下13种拦截操作
  *     1：get(target, propKey, receiver)
  *     2：set(target, propKey, value, receiver)
  *     3：has(target, propKey)
  *     4：deleteProperty(target, propKey)
  *     5：ownKeys(target)
  *     6：getOwnPropertyDescriptor(target, propKey)
  *     7：defineProperty(target, propKey, propDesc)
  *     8：preventExtensions(target)
  *     9：getPropertyOf(target)
  *     10：isExtensible(target)
  *     11：setPrototypeOf(target, proto)
  *     12：apply(target, object, args)
  *     13：construct(target, args)
 */

/**
 * 1: get(target, propKey, receiver):
 *  target: 目标对象
 *  propKey: 属性名
 *  receiver: proxy实例本身
 */
let person = {
  name: '张三'
}
let proxy = new Proxy(person, {
  get: function(target, property) {
    if (property in target) {
      return target[property]
    } else {
      throw new ReferenceError('Property \"' + property + '\" does not exist.')
    }
  }
})
console.log(proxy.name) // 张三
console.log(proxy.age) // ReferenceError: Property "age" does not exist.

/** 
 * 使用get拦截，实现数组读取负数的索引
*/
function createArray(...e) {
  let handler = {
    get(target, propKey, receiver) {
      let index = Number(propKey)

      if (index < 0) {
        propKey = String(target.length + index)
      }
      return Reflect.get(target, propKey, receiver)
    }
  }

  let target = []
  target.push(...e)
  return new Proxy(target, handler)
}
let arr = createArray('a', 'b', 'c')
console.log(arr[-2]) // b

// 下面是利用get拦截实现一个生成各种DOM节点的通用函数dom
const dom = new Proxy({}, {
  get(target, property) {
    return function(attrs = {}, ...children) {
      const el = document.createElement(property)
      
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(prop, attrs[prop])
      }

      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child)
        }
        el.appendChild(child)
      }
      return el
    }
  }
})
const el = dom.div({id: 'body', class: 'body'},
  'hello, my name is ',
  dom.ul({class: 'nameList'},
    dom.li({class: 'item'}, 'the web'),
    dom.li({class: 'item'}, 'food'),
    dom.li({class: 'item'}, '...actualy that\'s it'),
  )
)
document.body.appendChild(el)

/** 
 * get方法的第三个参数总是指向原始的读操作所在的那个对象，
 * 一般情况就是Proxy实例
*/
const proxy1 = new Proxy({}, {
  get: function(target, property, receiver) {
    return receiver
  }
})
console.log(proxy1.getReceiver === proxy1) // true

const d = Object.create(proxy)
console.log(d.a === d) // true

/** 
 * 如果一个属性不可配置(configurable)且不可写(write)，
 * 则Proxy不能修改该属性，否则通过Proxy对象访问该属性会报错
*/
const target01 = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false,
  }
})
const handler01 = {
  get(target, propKey) {
    return 'abc'
  }
}
const proxy01 = new Proxy(target01, handler01)
console.log(proxy01.foo) // 报错

/** 
 * 2: set(target, propKey, value, receiver)
*/
/** 
 * 由于设置了存值函数set，任何不符合要求的age属性赋值，都会抛出一个错误，这是数据验证的一种实现方法。
 * 利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新 DOM
*/
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer')
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid')
      }
    }
    obj[prop] = value
  }
}

let person01 = new Proxy({}, validator)
person01.age = 100
console.log(person01.age)
person01.age = 300 // RangeError: The age seems invalid

/** 
 * 设置私有属性的一个方法：
 *  将私有属性通过下划线(_)定义，
 *  通过get和set方法做一层拦截，一旦对私有属性做读写操作就报错
*/
const handler2 = {
  get (target, key) {
    invariant(key, 'get')
    return target[key]
  },
  set (target, key, value) {
    invariant(key, 'set')
    target[key] = value
    return true
  }
}
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property `)
  }
}
const target2 = {}
const proxy2 = new Proxy(target2, handler2)
// proxy2._prop // Error: Invalid attempt to get private "_prop" property 
proxy2._prop = 'c' // Error: Invalid attempt to set private "_prop" property

/** 
 * set()第四个参数值是原始的操作行为所在的那个对象
 * 
 *  注意：
 *    1：如果目标对象自身的某个属性不可写且不可配置，那么set方法将不起作用
 *    2：严格模式下，set代理如果没有返回true就会报错
*/
const handler3 = {
  set: function(obj, prop, value, receiver) {
    obj[prop] = receiver
  }
}
const proxy3 = new Proxy({}, handler3)
proxy3.foo = 'bar'
console.log(proxy3.foo === proxy3) // true

const myObj = {}
Object.setPrototypeOf(myObj, proxy3)
myObj.foo = 'foo'
console.log(myObj.foo === myObj) // true

/** 
 * 严格模式下，set代理返回false或者undefined，都会报错
*/
'use strict'
const handler4 = {
  set: function(obj, prop, value,receiver) {
    obj[prop] = receiver

    // 无论有没有下面这一行，都会报错
    return false
  }
}
const proxy4 = new Proxy({}, handler4)
proxy4.foo = 'bar'

/** 
 * 3: apply(target, ctx, args): 用来拦截函数调用/call/apply操作
 *  target：目标对象
 *  ctx：目标对象上下文
 *  args：目标对象参数数组
 *  
*/
// 拦截函数调用
const target5 = function () {
  return 'I am the target'
}
const handler5 = {
  apply: function () {
    return 'I am the handler'
  }
}
const proxy5 = new Proxy(target5, handler5)
console.log(proxy5()) // I am the handler

// 拦截call/apply对方法的调用
const twice = {
  apply: function (target, ctx, args) {
    return Reflect.apply(...arguments) * 2
  }
}
function sum(left, right) {
  return left + right
}
const proxy6 = new Proxy(sum, twice)
console.log(proxy6(1, 2)) // 6
console.log(proxy6.call(null, 5, 6)) // 22
console.log(proxy6.apply(null, [7, 8])) // 30

// 直接调用Reflect.apply方法，也会被拦截
console.log(Reflect.apply(proxy6, null, [9, 10])) // 38

/** 
 * 4: has(target, propKey):has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效
 *  target: 目标对象
 *  propKey：需查询的属性
 * 
 * 注意：
 *  1：has方法拦截的是hasProperty操作，不是HasOwnProperty操作
 *  2：虽然for...in循环也用到了in运算符，但是has拦截对for...in循环不生效
*/
// 使用has方法隐藏某些属性，不被in运算符发现
const handler7 = {
  has(target, key) {
    if (key[0] === '_') {
      return false
    }
    return key in target
  }
}
const target7 = {
  _prop: 'foo',
  prop: 'foo'
}
const proxy7 = new Proxy(target7, handler7)
console.log('_prop' in proxy7) // false

// 如果原对象不可配置或者禁止扩展，这时has拦截会报错
const obj8 = {
  a: 10
}
Object.preventExtensions(obj8)
const proxy8 = new Proxy(obj8, {
  has(target, prop) {
    return false
  }
})
// TypeError: 'has' on proxy: trap returned falsish for property 'a' but the proxy target is not extensible
console.log('a' in proxy8)

// has拦截只对in运算符生效，对for...in循环不生效
let stu1 = {
  name: '张三',
  score: 59
}
let stu2 = {
  name: '李四',
  score: 99
}
let handler9 = {
  has(target, prop) {
    if (prop === 'score' && target[prop] < 60) {
      console.log(`${target.name} 不及格`)
      return false
    }
    return prop in target
  }
}
let oproxy1 = new Proxy(stu1, handler9)
let oproxy2 = new Proxy(stu2, handler9)
console.log('score' in oproxy1) // 张三 不及格 false
console.log('score' in oproxy2) // true

for(let a in oproxy1) {
  console.log(oproxy1[a]) // 张三 59
}
for(let b in oproxy2) {
  console.log(oproxy2[b]) // 李四 99
}

/** 
  * 5：construct(target, args):用于拦截new命令
  *   target：目标对象
  *   args：构造函数的参数对象
  * 
*/
const proxy9 = new Proxy(function () {}, {
  construct(target, args) {
    console.log('called: ' + args.join(', ')) // called: 2, 5
    return {
      value: args[0] * 10
    }
  }
})
console.log((new proxy9(2, 5)).value) // 20

// construct方法返回的必须是一个对象，否则会报错
const proxy10 = new Proxy(function () {}, {
  construct(target, argumentsList) {
    return 1
  }
})
new proxy10() // TypeError: 'construct' on proxy: trap returned non-object ('1')

/** 
 * 6: deleteProperty():用于拦截delete操作，如果这个方法抛出错误或者返回false，
 * 当前属性就无法被delete命令删除
*/
const handler11 = {
  deleteProperty (target, key) {
    invariant(key, 'delete')
    delete target[key]
    return true
  }
}
const target11 = {
  _prop: 'foo'
}
const proxy11 = new Proxy(target11, handler11)
delete proxy11._prop

/** 
 * 7: defineProperty(target, propKey, propDesc)
 *  ECMAScript6入门教程上说不能添加，但是我这里居然添加成功了？
*/
const handler12 = {
  defineProperty(target, key, descriptor) {
    return false
  }
}
const target12 = {}
const proxy12 = new Proxy(target12, handler12)
target12.foo = 'bar'
console.log(target12.foo) // bar

/** 
 * 8：getOwnPropertyDescriptor(target, propKey)：
 *  拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined
*/
const handler13 = {
  getOwnPropertyDescriptor(target, key) {
    if (key[0] === '_') {
      return
    }
    return Object.getOwnPropertyDescriptor(target, key)
  }
}
const target13 = {
  _foo: 'bar',
  baz: 'tar'
}
const proxy13 = new Proxy(target13, handler13)
console.log(Object.getOwnPropertyDescriptor(proxy13, 'wat')) // undefined
console.log(Object.getOwnPropertyDescriptor(proxy13, '_foo')) // undefined
// { value: 'tar',
//   writable: true,
//   enumerable: true,
//   configurable: true }
console.log(Object.getOwnPropertyDescriptor(proxy13, 'baz'))

/** 
 * 9: getPropertyOf(target): 用来拦截获取对象原型，
 * 具体来说就是拦截下面这些操作:
 *  1：Object.prototype.__proto__
 *  2: Object.prototype.isPrototypeOf()
 *  3: Object.getPrototypeOf()
 *  4: Reflect.getPrototypeOf()
 *  5: instanceof
*/
/** 
 * 注意：
 *  1：getPrototypeOf方法的返回值必须是对象或者null，否则报错，
 *  2：如果目标对象不可扩展，getPrototypeOf方法必须返回目标对象的原型对象
*/
const proto = {}
const proxy14 = new Proxy({}, {
  getPrototypeOf(target) {
    return proto
  }
})
console.log(Object.getPrototypeOf(proxy14) === proto) // true