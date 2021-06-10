/*
 * @Author: Tiny 
 * @Date: 2020-01-03 17:10:03 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: yyyy-10-Sa 11:55:11
 */

/**
 * 原生js你知道多少?
 * 1: 函数的arguments为什么不是数组？如何转化成数组？
 * 2: forEach中return有效果吗？如何中断forEach循环？
 * 3: JS判断数组中是否包含某个值,有几种方法?
 * 4: JS中flat---数组扁平化,有多少种方法?
 * 5: JS数组的高阶函数: map/reduce/filter/sort/some/every/find(能不能分别实现他们?)
 * 6: 能不能模拟实现new的功能
 * 7: 能不能模拟实现bind功能
 * 8: 能不能实现call/apply函数
 * 9: 谈谈你对js中this对理解
 * 10: js中浅拷贝对手段有哪些
 * 11: 能不能写一个完整的深拷贝
 */

/**
 * 1: 函数的arguments为什么不是数组？如何转化成数组？
 * 一: arguments是对象,有length属性,称为类数组
 * 
 * 二: 常见的类数组还有:
 * 1): 通过getElementByTagName/ClassName/Name()获得的HTMLCollection
 * 2): 用querySelector获得的nodeList
 * 
 * 三: 转化为数组的方法:
 * 1): Array.prototype.slice.call()
 * 2): Array.from()
 * 3): es6展开运算符
 * 4): concat+apply: Array.prototype.concat.apply([], arguments)
 * 
 */

/**
 * 2: forEach中return有效果吗？如何中断forEach循环？
 * 一: 不会,用try监视代码,在需要中断的地方抛出异常
 * 二: 推荐使用some/every替代
 */

/**
 * 3: JS判断数组中是否包含某个值的方法?
 * 一: array.indexof
 * 二: array.includes()
 * 三: array.find()
 * 四: array.findIndex()
 */
[1,2].indexOf(4); // -1, 有就返回值的下表,没有就返回-1
[1,2].includes(3); // false, 返回一个布尔值
[1,2,4,3].find( v => v % 2 === 0); // 2 满足回调方法的第一个值, 没有则返回undefined
[1,2,3].findIndex(v => v > 1); // 1, 满足回调函数要求的第一个值的下表,没有则返回-1
/**
 * 4: JS中flat---数组扁平化?
 */
// 一: es6的flat方法
let arrray = [1, [2, 3, [4,5 ]], 6]
let array1 = arrray.flat(Infinity);
console.log(array1) // [ 1, 2, 3, 4, 5, 6 ]

// 二: replace + split
let str2 = String([1, [2, 3, [4,5 ]], 6])
let array2 = str2.replace(/(\[|\])/g, '').split(',');
console.log(array2) // [ '1', '2', '3', '4', '5', '6' ]

// 三: replace + JSON.parse
let str3 = [1, [2, 3, [4,5 ]], 6].toString()
str3 = str3.replace(/(\[|\])/g, '');
str3 = '[' + str3 + ']';
let array3 = JSON.parse(str3);
console.log(array3) // [ 1, 2, 3, 4, 5, 6 ]

// 四: 普通递归
let result = [];
const fn = ary => {
  for (let i = 0; i < ary.length; i++) {
    const item = ary[i];
    if (Array.isArray(item)) {
      fn(item);
    } else {
      result.push(item);
    }
  }
}
fn([1, [2, 3, [4,5 ]], 6])
console.log(result)

/**
 * 6: 能不能模拟实现new的功能
 * 分析: new的实例对象能访问原型的属性,也能访问构造函数的属性
 */

 //new的模拟实现
function Person(name, age) {
  this.name = name;
  this.age = age;

  // this.hibit = 'Games';
  return null
}
Person.prototype.strenth = 60;
Person.prototype.sayYouName = function() {
  console.log('I am ' + this.name);
};

// const people = new Person('Jack', 20);
const people = ObjFactory(Person, 'Jack', 20);
console.log(people.name)
console.log(people.age)
console.log(people.strenth)
people.sayYouName()


function ObjFactory() {
  // 从Object.prototype上克隆一个对象
  const obj = new Object();

  // 取得外部传入的构造器
  const Constructor = [].shift.call(arguments);

  // 指向正确的原型,将对象的原型指向构造函数的原型
  obj.__proto__ = Constructor.prototype;

  // 借用外部传入的构造器给obj设置属性
  const ret = Constructor.apply(obj, arguments);

  // 确保构造器总是返回一个对象
  return typeof ret === 'object' ? ret || obj: obj;
}

/**
 * 7: 能不能模拟实现bind功能
 */
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
console.log(obj.__proto__, bindFoo.__proto__, bar.prototype)
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin


/**
 * 8: 能不能实现call/apply函数
 */
/**
 * 注意两点:
 * a: call改变this指向,指到两foo
 * b: bar函数执行了
 */
const foo = {
  value: 1
};
function bar(name, age) {
  console.log(this.value, name, age);
  return {
    name,
    age,
    value: this.value
  };
}
bar.call(foo, 'jrg', '18');

Function.prototype.newCall = function(context) {
  // 首先要获取调用call的函数,用this可以获取
  context = context || window
  context.fn = this;
  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`);
  }
  const result = eval(`context.fn(${args})`);
  delete context.fn;
  return result;
}
bar.newCall(foo, 'Jeck', 20);
Function.prototype.newApply = function(context, arr) {
  context = Object(context) || window;
  context.fn = this;
  let result;
  if (!arr) {
    result = context.fn();
  } else {
    let args = [];
    for (let i = 1; i < arr.length; i++) {
      args.push(`arr[${i}]`)
    }
    result = eval(`context.fn(${args})`)
  }
  delete context.fn;
  return result;
}
function bar(name, age) {
  console.log(this.value, name, age);
  return {
    name,
    age,
    value: this.value
  };
}
const arr = [3,4,5]
console.log("Apply:",bar.newApply(foo, arr));
/**
 * 9: 谈谈你对js中this对理解
 * 一: 定义:当前执行代码的环境对象
 * 
 * 二: call/applay/bind方法可以显示绑定this对象
 * 
 * 三: 主要有如下应用场景
 *  1): 全局上下文: 指向window,严格模式下为undefined
 *  2): 直接调用函数: 相当于全局对象
 *  3): 对象.方法: 指向当前对象
 *  4): DOM事件绑定: 指向当前绑定的元素
 *  5): new+构造函数: 指向当前实例对象
 *  6): 箭头函数: 没有this,不能绑定,里面的this会指向最近的非箭头函数的this,找不到就是window(严格模式下为undefined)
 */

/**
 * 10: js中浅拷贝对手段有哪些 ?
 * 为什么需要浅拷贝: js中引用类型的数据,简单的赋值操作只是改变this指针而已,还是指向同一个内存地址
 */
// 一: 手动实现
const shallowClone = target => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (const prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}
let arr = [1, 2, 3];
// let arr2 = arr;
// arr2[0] = 10;
// console.log(arr); // [ 10, 2, 3 ]
let arr3 = shallowClone(arr);
arr3[0] = 100;
console.log(arr, arr3); // [ 1, 2, 3 ] [ 100, 2, 3 ]

// 二: Object.assign(),注意:是拷贝对象的属性的引用,而不是对象本身,这个说法证明 ?
let obj = { name: 'jrg', age: 18 };
let obj2 = Object.assign({}, obj, { name: 'jim' } );
console.log(obj, obj2);

// 三: concat浅拷贝数组
let arr4 = [1, 2, 3];
let arr5 = arr4.concat();
arr5[0] = 99;
console.log(arr4); // [ 1, 2, 3 ]

// 四: slice浅拷贝数组
let arr6 = [1, 2, 3];
let arr7 = arr6.slice();
arr7[0] = 88;
console.log(arr6) // [ 1, 2, 3 ]

// 五: 扩展运算符
let arr8 = [1, 2, 3];
let arr88 = [...arr8];

/**
 * 11: 能不能写一个完整的深拷贝
 */
const isObject = target => (typeof target === 'object' || typeof target === 'function') && target !== null;

/**
 * 
 * @param {拷贝对象} target 
 * @param {通过map记录拷贝过的对象} map
 * 注意: 通过map数据接口记录拷贝过的对象有一个问题:map上的key和map构成强引用类型,从而导致对象无法被回收
 * 所以用WeakMap替代Map
 */
const deepClone = (target, map = new WeakMap()) => {
  // 如果已经拷贝过直接返回
  if (map.get(target)) {
    return target;
  }
  if (isObject(target)) {
    map.set(target, true);

    // 普通拷贝,会有一个循环引用而导致内存溢出的问题
    const cloneTarget = Array.isArray(target) ? []: {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
          cloneTarget[prop] = deepClone(target[prop], map);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}

const a = {val:2, key: { key: 3, key2: 4 },};
a.target = a;
console.log(deepClone(a))

/**
 * bind的实现:
 * 1: 返回一个函数
 * 2: 可以传入参数
 */

 // 1: 返回一个函数
Function.prototype.newBind1 = function (ctx) {
  const self = this;
  return function() {
    return self.apply(ctx);
  }
}
const foo = {
  value: 1
}
function bar() {
  return this.value;
}
const bindFoo = bar.newBind1(foo);
console.log(bindFoo())

// 可以传入参数
Function.prototype.newBind2 = function (ctx) {
  const self = this;
  // 获取newBind2函数从第二个参数到最后一个参数
  const args = Array.prototype.slice.call(arguments, 1)
  return function () {
    // newBind2 返回的函数传入的参数
    const bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(ctx, args.concat(bindArgs));
  }
}
const foo = {
  value: 1
}
function bar(name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}
const bindFoo = bar.newBind2(foo, "jrg");
console.log(bindFoo(4))

Function.prototype.newBind = function (ctx) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  const self = this;
  // 获取newBind函数从第二个参数到最后一个参数
  const args = Array.prototype.slice.call(arguments, 1)
  const fNOP = function () {};
  const fBound = function () {
    // newBind 返回的函数传入的参数
    const bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNOP ? this : ctx, args.concat(bindArgs));
  };
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}
var value = 2;
var foo = {
  value: 1
};
function bar(name, age) {
  this.habit = 'shopping';
  console.log(this.value);
  console.log(name);
  console.log(age);
}
bar.prototype.friend = 'kevin';
var bindFoo = bar.newBind(foo, 'daisy');
var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);

/**
 * 模拟实现new,
 * new 是一个关键字,所以用一个工厂函数代替
 */
function objectFactory() {
  // new 返回一个对象
  const obj = new Object();
  // 取一个参数为构造函数
  Constructor = [].shift.call(arguments);
  // 让返回对象的原型指向构造函数的原型
  obj.__proto__ = Constructor.prototype;
  // 使用apply改变构造函数的指向
  const ret = Constructor.apply(obj, arguments);
  // 如果构造函数的返回值是一个对象,则直接返回, 否则返回对象
  return typeof ret === "object" ? ret : obj;
}
function Otaku (name, age) {
  this.name = name;
  this.age = age;
  this.habit = 'Games';
  return {
    name: this.name,
    age: this.age,
    habit: this.habit
  }
}
Otaku.prototype.strength = 60;
// Otaku.prototype.sayYourName = function () {
//   console.log('I am ' + this.name);
// }
var person = objectFactory(Otaku, 'Kevin', '18')
console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60
// person.sayYourName(); 

function sortArr (arr) {
  if (!(Array.isArray(arr))) {
    throw new Error("need a array!")
  }
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i -1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      };
    }
  }
  return arr;
}
console.log(sortArr([3,4,1,2, 10,90,9]))