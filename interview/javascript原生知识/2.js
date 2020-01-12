/*
 * @Author: Tiny 
 * @Date: 2020-01-03 17:10:03 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2020-01-07 23:30:48
 */

/**
 * 原生js你知道多少?
 * 1: 函数的arguments为什么不是数组？如何转化成数组？
 * 2: forEach中return有效果吗？如何中断forEach循环？
 * 3: JS判断数组中是否包含某个值?
 * 4: JS中flat---数组扁平化?
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

/**
 * 4: JS中flat---数组扁平化?
 */
// 一: es6的flat方法
array = arrray.flat(Infinity);

// 二: replace + split
array = str.replace(/(\[|\])/g, '').split(',');

// 三: replace + JSON.parse
str = str.replace(/(\[|\])/g, '');
str = '[' + str + ']';
array = JSON.parse(str);

// 四: 普通递归
let result = [];
let fn = ary => {
  for (let i = 0; i < ary.length; i++) {
    const item = ary[i];
    if (Array.isArray(item)) {
      fn(item);
    } else {
      result.push(item);
    }
  }
}

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

const a = {val:2};
a.target = a;
console.log(deepClone(a))