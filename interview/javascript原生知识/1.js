/*
 * @Author: Tiny 
 * @Date: 2020-01-03 18:01:05 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2020-01-07 18:28:43
 */

/**
 * 1: JS原始数据类型有哪些？引用数据类型有哪些？
 * 2: null是对象吗？为什么？
 * 3: '1'.toString()为什么可以调用？
 * 4: 0.1+0.2为什么不等于0.3？
 * 5: typeof 是否能正确判断类型？
 *    基本数据类型:null,undefined,Boolean,String,Number,Symble,BigInt,除了null都能准确表示
 *    引用数据类型:除了函数('function')之外,结果都是'object',
 * 6: instanceof能否判断基本数据类型？
 * 8: 能不能手动实现一下instanceof的功能？
 * 9: Object.is和===的区别？
 * 10: [] == ![]结果是什么？为什么？
 * 11: JS中类型转换有哪几种？
 * 12: == 和 ===有什么区别？
 * 13: 对象转原始类型是根据什么流程运行的？
 * 14: 如何让if(a == 1 && a == 2)条件成立？
 * 15: 谈谈你对闭包的理解以及表现形式?
 * 16: 谈谈你对原型链的理解?
 * 17: JS如何实现继承？
 */

// 1: JS原始数据类型有哪些？引用数据类型有哪些？
// js中存在着7种原始值:
Boolean
String
undefined
null
Number
Symbol
BigInt

console.log(typeof 1n) // bigint
console.log((1n).toLocaleString()) // 1

// 应用数据类型
Object // 普通对象-Object,数组对象-Array,正则对象-RegExp,日期对象-Date,数学函数-Math
Function

// 2: typeof null => object 为什么是null
console.log(typeof null) // object

// 3: '1'.toString()为什么可以调用？
/**
 * 1创建String类实例->2调用实例方法->3执行完方法立即销毁这个实例
 */
let s = new String('1');
s.toString();
s = null;

// 手动实现instanceof
var simpleStr = "This is a simple string"; 
var myString  = new String();
var newStr    = new String("String created with constructor");
var myDate    = new Date();
var myObj     = {};
var myNonObj  = Object.create(null);
console.log(simpleStr instanceof String)
console.log(myNonObj  instanceof Object)
console.log(myDate instanceof String)

// 8: 手动实现instanceof
const myInstanceof = (left, right) => {
  if (typeof left !== 'object' || left === null) {
    return false;
  }
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) {
      return false;
    }
    if (proto === right.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
}
console.log('------------------------------')
console.log(myInstanceof(simpleStr, String))
console.log(myInstanceof(myNonObj, Object))
console.log(myInstanceof(myDate, String))

/**
 * 9: Object.is和===的区别？
 * Object.is对+0,-0及NaN的处理,
 * 一般在需要考虑元编程方案的时候用,
 */
console.log((+0) === (-0)) // true
console.log(NaN === NaN) // false
console.log(Object.is(+0, -0), Object.is(NaN, NaN)) // false  true


/**
 * 10: [] == ![]结果是什么？为什么？
 * ![] => !true => false => 0, 
 */
console.log([] == ![]) // true

/**
 * 11: JS中类型转换有哪几种？
 *  转为Number,转为String, 转为Boolean
 */

/**
 * 13: 对象转原始类型是根据什么流程运行的？
 * 1: Symbol.toPrimitive()优先调用
 * 2: valueOf() 其次调用valueOf取原始值
 * 3: toString() 最后调用
 * 4: 如果都没有返回原始类型,则报错
 * 
 * ** 没明白为什么会有这样一个顺序
 */
// eg:
const obj = {
  value: 3,
  [Symbol.toPrimitive]() {
    return 4
  },
  valueOf(){
    return 5
  },
  toString(){
    return '6'
  }
}
console.log('number+:', obj+1, 'String+:', obj+'6'); // 5 46

/**
 * 14: 如何让if(a == 1 && a == 2)条件成立？
 * 其实就是对象转原始类型都应用
 */
const a = {
  value: 0,
  valueOf() {
    this.value++;
    return this.value
  }
}
console.log(a == 1 && a == 2)

/**
 * 15: 谈谈你对闭包的理解以及表现形式?
 * 一: 定义:
 * 红宝书对闭包的定义:有权访问另外一个函数作用域中的变量的函数
 * MDN对闭包的定义: 能访问自由变量的函数(自由变量: 指在函数中使用的,既不是arguments也不是函数局部变量的变量,* 也就是另外一个函数作用域中的变量)
 * 2: 闭包产生的原因: 
 * 作用域链,ES5中存在两种作用域:全局作用域和函数作用域,当访问一个变量的时候,会从底层开始,直到找到全局作用域或window为止,如果没找到就抛出异常
 * 3: 闭包产生的本质:
 * 当前环境中存在指向父级作用域的引用
 * 4: 表现形式:
 * 1): 返回一个函数
 * 2): 函数作为参数传递: 定时器,事件监听等
 */
// 经典灵魂叩问
for(var i = 1; i <= 5; i ++){
  setTimeout(function timer(){
    console.log(i)
  }, 0)
}

/**
 * 16: 谈谈你对原型链的理解?
 * 一:原型对象和构造函数的关系
 * js中,每当定义一个函数数据类型(普通函数,类)等时候,都会自带一个prototype属性,这个属性指向函数的原型对象
 * 当函数通过new调用时,这个函数就成了构造函数,返回一个全新的实例对象,这个实例对象有一个proto属性,指向构造函数的原型对象
 * 二:原型链
 * js对象通过prototype指向父类对象,直到指向Object为止,这样就形成了一个原型指向的链条,就叫原型链
 * 1):对象通过hasOwnProperty()来检查对象自身是否含有该属性
 * 2):使用in检查对象中是否含有某个属性时,如果对象中没有但是原型链中有，也会返回 true
 */

/**
 * 17: js如何实现继承 ?
 * 一: 利用call,
 * 二: 利用原型链
 * 三: 两种组合
 */