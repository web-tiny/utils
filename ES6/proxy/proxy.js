/*
 * @Author: Tiny 
 * @Date: 2019-02-20 15:51:54 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-02-20 18:19:47
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
  *     13：constructor(target, args)
 */

/**
 * get(target, propKey, receiver):
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
const proxy = new Proxy({}, {
  get: function(target, property, receiver) {
    return receiver
  }
})
console.log(proxy.getReceiver === proxy) // true

const d = Object.create(proxy)
console.log(d.a === d) // true

/** 
 * 如果一个属性不可配置(configurable)且不可写(write)，
 * 则Proxy不能修改该属性，否则通过Proxy对象访问该属性会报错
*/
const target = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false,
  }
})
const handler = {
  get(target, propKey) {
    return 'abc'
  }
}
const proxy = new Proxy(target, handler)
console.log(proxy.foo) // 报错

/** 
 * set(target, propKey, value, receiver)
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

let person = new Proxy({}, validator)
person.age = 100
console.log(person.age)
person.age = 300 // RangeError: The age seems invalid

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

// set()第四个参数值原始的操作行为所在的那个对象
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