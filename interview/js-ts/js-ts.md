

## javascript相关

#### 1. JavaScript 中数组是如何存储的？

思路: 

1. 同种类型数据的数组分配连续的内存空间

2. 存在非同种类型数据的数组使用哈希映射分配内存空间

   

* JavaScript 中的数组为什么可以不需要分配固定的内存空间？

* JavaScript 中数组的存储和 C / C++ / Java 中数组的存储有什么区别？

* JavaScript 中数组是否可以理解为特殊的对象？

* JavaScript 中数组和 C / C++ / Java 中数组存储在性能上有什么区别？

* JavaScript 中的 Array 和 Node.js 中的 Buffer 有什么区别？

* JavaScript 中的数组何时是连续存储的，何时是哈希存储的？

* 哈希存储的键冲突（散列碰撞）可以有哪些解决方案（开链法、线性探测法、红黑树等）？

  

  散列是一种常用的数据存储技术, 散列基于数组设计

  使用散列表存储数据时, 怎么存?

  * 需要通过一个散列函数将键映射为一个数字, 这个数字的范围是0到散列表的长度，因此散列是一种随机存储的数据结构
* 散列函数存在将两个键映射成同一个值的可能，这种现象称为碰撞

#### 2. 聊聊继承以及说说 ES5 和 ES6 继承的区别？

1. ES5的继承

   * 实现: 借助构造函数实现
   * 机制: 先创造子类实例对象this, 再将父类的方法添加到this上面

2. ES6的继承

   * 机制: 先创造父类的实例对象`this`, 然后再用子类的构造函数修改`this`

   * 继承了原型对象, 还继承了静态属性和静态方法

   * 原理: 

     * 子类看做一个实例对象, 父类看作一个原型对象, 子类继承了父类的所有属性和方法

     ```javascript
     class Es6Person {}
     class Es6WebDeveloper extends Es6Person {}
     
     // true
     // Es6WebDeveloper看做一个实例对象
     // Es6Person看做一个原型对象
     // 因此Es6WebDeveloper继承了Es6Person的所有属性和方法
     // 实现了类的静态属性和方法的继承
     // 子类的原型是父类
     console.log(Es6WebDeveloper.__proto__ === Es6Person)
     ```

   * ES6中的类只是ES5封装后的语法糖而已

3. 构造函数的创建过程

   - 创建一个新对象
   - 将构造函数的作用域赋给新对象（this新对象）
   - 执行构造函数中的代码
   - 返回新对象（最终返回的就是new出来的实例对象，因此this指向实例对象）

4. 从原型到原型链, 原型弊端 ?

#### 3. 说说对原生 JavaScript 的理解？

- JavaScript 实现包含的几个部分
  1. 核心（ECMAScript）
  2. 文档对象模型(DOM)
     1. 定义:  DOM是HTML和XML文档的编程接
     2. 核心接口
        - `document.getElementById(id)`
        - `document.getElementsByTagName(name)`
        - `document.createElement(name)`
        - `parentNode.appendChild(node)`
        - `element.innerHTML`
        - `element.style.left`
        - `element.setAttribute()`
        - `element.getAttribute()`
        - `element.addEventListener()`
  3. 浏览器对象模型(BOM)
     * 核心的api:
       1. window.history
       2. Window.innerHeight
       3. Window.location
       4. Window.name
       5. Window.navigator
       6. Window.open()
- JavaScript 的语言类型特性
  1. 弱类型语言,对数据类型没有严格的要求
  2. 不用预编译, 直接解析执行代码
  3. 与操作系统无关, 是一门跨平台语言
- 解释性脚本语言（对标编译性脚本语言）
- 面向对象（面向过程）
- 事件驱动 / 异步 IO
- 缺少的关键性功能等（块级作用域 、模块、子类型等）

#### 4. 谈谈你对 TypeScript 的理解？

- 类型批注和编译时类型检查
- 类
- 接口
- 模块
- 装饰器
- 声明文件（类似于 C 中的头文件）
- 对 ES 6 的支持
- 语法提示
- ESLint（TSLint 不推荐）

#### 5. JavaScript 中几种迭代语法在 Chrome 等现代浏览器中的性能差异？

- 字面量 / 数组 / 对象存储性能有没有什么区别？
- 条件比较多的时候 `if-else` 和 `switch` 性能哪个高？
- 高性能的 JavaScript 开发在语法层面你觉得有哪些可以提升性能？
- 如何在代码中减少迭代次数？
- 如何实现一个 Duff 装置？

#### 6. 如何提升 JavaScript 变量的存储性能？

1. 访问字面量和局部变量的速度最快，访问数组元素和对象成员相对较慢

2. 由于局部变量存在于作用域链的起始位置，因此访问局部变量比访问跨作用域变量更快，全局变量的访问速度最慢

3. 避免使用`with`和`catch`，除非是有必要的情况下

4. 嵌套的对象成员会明显影响性能，尽量少用，例如`window.location.href`

5. 属性和方法在原型链中的位置越深，则访问它的速度也越慢

6. 通常来说，需要访问多次的对象成员、数组元素、跨作用域变量可以保存在局部变量中从而提升 JavaScript 执行效率

总结:

1. 变量定义
2. 对象嵌套
3. 作用域链

#### 7. 浏览器和 Node.js 的事件循环机制有什么区别？

[Node.js与浏览器的Event loop有什么不同](https://juejin.cn/post/6844903761949753352#heading-12)

宏任务和微任务在Node的执行顺序不同

1. Node10以前

   1. 执行完一个阶段的所有任务
   2. 执行完nextTick队列里的内容
   3. 然后执行微任务队列的内容

2. Node 11以后, 与浏览器的行为统一了

3. eg:

   ```javascript
   function test () {
      console.log('start')
       setTimeout(() => {
           console.log('children2')
           Promise.resolve().then(() => {console.log('children2-1')})
       }, 0)
       setTimeout(() => {
           console.log('children3')
           Promise.resolve().then(() => {console.log('children3-1')})
       }, 0)
       Promise.resolve().then(() => {console.log('children1')})
       console.log('end') 
   }
   
   test()
   
   // 以上代码在node11以下版本的执行结果(先执行所有的宏任务，再执行微任务)
   // start
   // end
   // children1
   // children2
   // children3
   // children2-1
   // children3-1
   
   // 以上代码在node11及浏览器的执行结果(顺序执行宏任务和微任务)
   // start
   // end
   // children1
   // children2
   // children2-1
   // children3
   // children3-1
   ```

   

#### 8. 比较一下 TypeScript 和 JavaScript，在什么情况下你觉得需要 TypeScript ?

#### 9. 在 JavaScript 中如何实现对象的私有属性?

#### 10. async / await 和 Promise 的区别?

#### 11. 在 JavaScript 可以有哪几种形式实现继承，各有什么优缺点？

#### 12. AMD 、CMD 和 CommonJS 区别？

- common.js 和 ES 6 中模块引入的区别？

#### 13. 如何设计突发大规模并发架构？

#### 14. 一般公司是怎么部署前端代码？

[[大公司里怎样开发和部署前端代码？](https://github.com/fouber/blog/issues/6#)]

#### 15. 了解跨域吗，一般什么情况下会导致跨域

#### 16. 如何判断两个变量相等, Object.is()实现原理 ?

#### 17. Service Worker有哪些作用 ?

#### 18. 说说DOM事件流 ?事件委托有什么优点（起码两个以上）

#### 19. 消抖和节流

1. 防抖:事件停止触发后多久后才执行

   ```javascript
   // 1. 立即执行函数, 然后等到停止触发n秒后, 才可以重新触发执行
   // 2. 调用cancel后取消防抖, 可以立即执行
   function debounce(func, wait, immediate) {
     let timeout
     let result
     let debounced = function() {
       const context = this
       const args = arguments
   
       if (timeout) {
         clearTimeout(timeout)
       }
   
       if (immediate) {
         let callNow = !timeout
         timeout = setTimeout(function() {
           timeout = null
         }, wait)
         if (callNow) {
           result = func.apply(context, args)
         }
       } else {
         timeout = setTimeout(function() {
           func.apply(context, args)
         }, wait)
       }
       return result
     }
     debounced.cancel = function() {
       clearTimeout(timeout)
       timeout = null
     }
     return debounced
   }
   
   // 简化版
   function debounce(func, wait) {
     let timeout;
     return function () {
       const context = this;
       const args = arguments;
       clearTimeout(timeout);
       
       timeout = setTimeout(function(){
           func.apply(context, args)
       }, wait);
     }
   }
   ```

   

2. 节流: 事件触发的过程中, 每n秒执行一次

   ```javascript
   /**
    * 一: 使用时间戳:
    * 1: 事件会立刻执行
    * 2: 事件停止触发后没有办法再执行
    * @param {*} func 
    * @param {*} wait 
    */
   function throttle(func, wait) {
     let previous = 0
     let context
     let args
   
     return function() {
       let now = +new Date()
       context = this
       args = arguments
   
       if (now - previous > wait) {
         func.apply(context, args)
         previous = now
       }
     }
   }
   
   /**
    * 二: 使用定时器
    * 1: n秒后第一次执行
    * 2: 停止触发后依然会再执行一次
    */
   function throttle2(func, wait) {
     let timeout
   
     return function() {
       let context = this
       let args = arguments
   
       if(!timeout) {
         timeout = setTimeout(function(){
           timeout = null
           func.apply(context, args)
         }, wait)
       }
     }
   }
   ```

   

#### 20. bind, apply, call, instanceof的实现

1. call 模拟实现

```javascript
// call 模拟实现
Function.prototype.myCall = function (ctx) {
  // 1. 参数默认window
  ctx = ctx || window;
  // 2. 将this指向一个自定义函数fn
  ctx.fn = this;
  const arr = [];
  // 3. 遍历arguments,将其放入一个数组中
  for (let i = 0; i < arguments.length; i++) {
    arr.push(`arguments[${i}]`);
  }
  // 4. 通过eval执行函数fn
  const result = eval(`ctx.fn(${arr})`)
  // 5. 删除自定义的函数
  delete ctx.fn;
  // 6. 返回执行结果
  return result;
};

// test
var value = 2;
var obj = {
    value: 1
}
function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}
bar.myCall(null); // 2
console.log(bar.myCall(obj, 'kevin', 18));
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }

```

2. apply模拟实现

```javascript
// apply模拟实现
Function.prototype.myApply = function (context, arr) {
  // 1.将参数指向一个对象或者window
  var context = Object(context) || window;
  // 2. 添加一个自定义方法fn
  context.fn = this;
  var result;
  // 3. 如果没有参数数组, 直接执行自定义函数
  if (!arr) {
    result = context.fn();
  } else {
    // 如果存在数组参数
    var args = [];
    // 4. 遍历循环数组, 将arr[i] push到一个数组中
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']');
    }
    // 5. 通过eval执行自定义函数, 参数为遍历数组的结果
    result = eval('context.fn(' + args + ')')
  }
  // 6. 删除自定义函数
  delete context.fn
  // 7. 返回结果
  return result;
}
```

3. bind模拟实现

```javascript
Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var fNOP = function () {};
  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}
```

4. 手动实现instanceof

```javascript
// 手动实现instanceof
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
console.log(myInstanceof(function () {}, Object)); // false
console.log(myInstanceof({}, Object)); // true
console.log(myInstanceof([], Array)); // true
```



#### 21. JSONP实现原理, 如何实现一个JSONP, Cores

#### 22. 介绍下Graphql





## 优化相关

#### 1. SEO 有哪些优化方案？

**思路:** 

如果是SPA, 除了[SSR](https://www.yuque.com/jiaorengui/ptee4x/kcetcc)之外, 别无他法

1. Vue框架的服务端渲染框架: Nuxt.js

2. 预渲染的原理是什么？
3. [Nuxt.js 与SPA的异同](https://www.yuque.com/jiaorengui/ptee4x/fletfb)
   * 路由
   * 数据中心
   * 插件
   * 中间件

#### 2. 说说任何前端优化处理？

#### 3. 说说缓存 ? 

1. 强缓存
2. 协商缓存
3. 缓存场景





## 业务相关

#### 1. 规范代码书写的适用范围有多大？

#### 2. 版权信息小工具是干什么的，能具体介绍一下么？

#### 3. 介绍一下 dtd 组件，组件是如何维护的，版本是怎么控制的？

#### 4. 在业务的开发中有没有发现什么痛点并对其进行改进？

#### 5. 有没有觉得交互设计不合理然后自己想出方案推动交互更改的案例？

#### 6. 前端广告投放如何？Chrome 如何劫持广告？

#### 7. 简化业务设计的复杂度案例有么？

#### 8. 有没有做过什么工具简化业务开发？

#### 9. Moxtra 是你主推的么？讲讲RxJS?

#### 10. 有没有主动 own 过业务，并高效排除业务风险的案例？

#### 11. 说说如何衡量提升产品的体验？

注: 有些业务问题主要针对的是简历中的项目，在这里不适合展示。不过有一点需要注意，面试官可能会对业务的数据非常感兴趣，所以在业务上有比较 NB 的数据可以体现的最好可以提前准备好。业务这一块可能会考量的点：业务数据 / 业务难点 / 业务成果 / 业务贡献 / 业务主动性 / 业务 own 能力 / 技术栈选型考量 / 业务影响范围 / 业务通用性 / 业务思考 



https://juejin.cn/post/6844904093425598471#heading-59

https://juejin.cn/post/6844903928442667015#heading-36



## 疑惑

1. 闭包: 概念 ? 原理 ? 优缺点 ? 应用场景 ?