### 1. 模拟实现一个深度拷贝, 包括Symbol, Date, Boolean, String, RegExp, Function,

```javascript
function deepClone (obj, hash = new WeakMap()) {
  const isObject = obj => obj !== null && (typeof obj === 'object' || typeof obj === 'function');
  const isFunction = obj => typeof obj === 'function'

  if (hash.get(obj)) {
    // 环处理
    return hash.get(obj);
  }
  if (!isObject(obj)) {
    return obj;
  }

  if (isFunction(obj)) {
    // function返回原引用
    return obj;
  }

  let cloneObj;

  const Constructor = obj.constructor;

  switch (Constructor) {
    case Boolean:
    case Date:
      return new Date(+obj);
    case Number:
    case String:
    case RegExp:
      return new Constructor(obj);
    default:
      cloneObj = new Constructor();
      hash.set(obj, cloneObj);
  }

  [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)].forEach(k => {
    cloneObj[k] = deepClone(obj[k], hash);
  })
  return cloneObj;
}

const s1 = Symbol("s1")
const targetObj = {
  a: 1,
  b: {
    c: function () {
      return "c"
    },
    d: [1, 2],
    e: {
      f: "f"
    }
  },
  [s1]: function () {
    return 's1'
  },
  g: function () {
    return this[s1]()
  },
  h: true,
  k: new Date(),
  l: 'jjj',
  m: /\d/
}
const dObj = deepClone(targetObj)
console.log("deepFunc",dObj.g(), dObj.b.d, dObj.b.e.f, dObj.h, dObj.k, dObj.l, dObj.m)
// s1 [ 1, 2 ] f true 2021-04-19T03:23:35.098Z jjj /\d/
```

### 2. 介绍下 Promise.all 使用、原理实现及错误处理

```javascript
Promise._all = function(promises) {
  const result = [];
  return new Promise((resolve, reject) => {
    let index = 0;

    function addData(key, data) {
      result[key] = data;
      index++;
      if (index === promises.length) {
        resolve(result)
      }
    }
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(value => addData(i, value), reject)
    }
  })
}
var p22 = new Promise((resolve, reject) => {
  resolve('p22')
});
var p33 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p33')
  }, 300);
})
var p44 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p44')
  }, 300);
})
// test
Promise._all([p22, p33, p44])
.then(res => {
  console.log("all res: ",res)
})
.catch(err => {
  console.log(err) // p44
})
```

### 3.给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数

输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3
输出: [5, 6, 7, 1, 2, 3, 4]
解释:
向右旋转 1 步: [7, 1, 2, 3, 4, 5, 6]
向右旋转 2 步: [6, 7, 1, 2, 3, 4, 5]
向右旋转 3 步: [5, 6, 7, 1, 2, 3, 4]



输入: [-1, -100, 3, 99] 和 k = 2
输出: [3, 99, -1, -100]
解释: 
向右旋转 1 步: [99, -1, -100, 3]
向右旋转 2 步: [3, 99, -1, -100]

```javascript
function rotate(arr, k) {
  for (let i = 0; i < k; i++) {
    arr.unshift(arr.pop())
  }
  return arr
}
var arr = [-1, -100, 3, 99];
console.log(rotate(arr, 2)) // [3, 99, -1, -100]
```



### 4. 实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置

```javascript

const str1 = "jjeerrww"
const str2 = "eer"

// search, 字符串的search方法, 有对应的字符串则返回位置, 没有则返回-1
const find = (S, T) => S.search(T)
console.log(find(str1, str2)) // 2

// match
const find1 = (S, T) => {
  // 字符串match方法,没有匹配到则返回null, 
  // 匹配到返回一个数组["eer", index: 2, input: "jjeerrww", groups: undefined]
  // 可以直接取index
  const mathed = S.match(T)
  return mathed ? mathed.index : -1
}
console.log(find1(str1, str2)) // 2

// for
const find2 = (S, T) => {
  if (S.length < T.length) {
    return -1
  }
  for (let i = 0; i < S.length; i++) {
    if (S.slice(i, i+T.length) === T) {
      return i
    }
  }
  return -1
}
console.log(find2(str1, str2)) // 2
```



### 5. 介绍下深度优先遍历和广度优先遍历，如何实现？

### 6. 请分别用深度优先思想和广度优先思想实现一个拷贝函数？

### 7. ES5/ES6 的继承除了写法以外还有什么区别？

```javascript
// 1.子类的 __proto__ 值不同
class Super {}
class Sub extends Super {}
const sub = new Sub();
Sub.__proto__ === Super; // true, 找到父类

function Super() {}
function Sub() {}
Sub.prototype = new Super();
var sub = new Sub();
console.log(Sub.__proto__ === Function.prototype); // true
Sub.prototype.constructor === Super // true 这样才能找到父类

// 2. this 生成顺序不同, 
// ES5 的继承先生成了子类实例，再调用父类的构造函数修饰子类实例，
// ES6 的继承先生成父类实例，再调用子类的构造函数修饰父类实例。这个差别使得 ES6 可以继承内置对象
function MyES5Array() {
  Array.call(this, arguments);
}
// it's useless
const arrayES5 = new MyES5Array(3); // arrayES5: MyES5Array {}
class MyES6Array extends Array {}
// it's ok
const arrayES6 = new MyES6Array(3); // arrayES6: MyES6Array(3) []
```

ES5函数和ES6中类的区别:

2. `class`声明内部会启用严格模式

   ```javascript
   // 引用一个未声明的变量
   function Bar() {
     baz = 42; // it's ok
   }
   const bar = new Bar();
   class Foo {
     constructor() {
       fol = 42; // ReferenceError: fol is not defined
     }
   }
   const foo = new Foo();
   ```

   

3. `class` 的所有方法（包括静态方法和实例方法）都是不可枚举的

   ```javascript
   // 引用一个未声明的变量
   function Bar() {
     this.bar = 42;
   }
   Bar.answer = function() {
     return 42;
   };
   Bar.prototype.print = function() {
     console.log(this.bar);
   };
   const barKeys = Object.keys(Bar); // ['answer']
   const barProtoKeys = Object.keys(Bar.prototype); // ['print']
   
   class Foo {
     constructor() {
       this.foo = 42;
     }
     static answer() {
       return 42;
     }
     print() {
       console.log(this.foo);
     }
   }
   const fooKeys = Object.keys(Foo); // []
   const fooProtoKeys = Object.keys(Foo.prototype); // []
   ```

   

4. `class` 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有`[[construct]]`，不能使用 `new` 来调用`class`的实例方法

   ```javascript
   function Bar() {
     this.bar = 42;
   }
   Bar.prototype.print = function() {
     console.log(this.bar);
   };
   
   const bar = new Bar();
   const barPrint = new bar.print(); // it's ok
   
   class Foo {
     constructor() {
       this.foo = 42;
     }
     print() {
       console.log(this.foo);
     }
   }
   const foo = new Foo();
   const fooPrint = new foo.print(); // TypeError: foo.print is not a constructor
   ```

   

5. 必须使用 `new` 调用 `class`

   ```javascript
   function Bar() {
     this.bar = 42;
   }
   const bar = Bar(); // it's ok
   
   class Foo {
     constructor() {
       this.foo = 42;
     }
   }
   const foo = Foo(); // TypeError: Class constructor Foo cannot be invoked without 'new'
   ```

   

6. `class` 内部无法重写类名

   ```javascript
   function Bar() {
     Bar = 'Baz'; // it's ok
     this.bar = 42;
   }
   const bar = new Bar();
   // Bar: 'Baz'
   // bar: Bar {bar: 42}  
   
   class Foo {
     constructor() {
       this.foo = 42;
       Foo = 'Fol'; // TypeError: Assignment to constant variable
     }
   }
   const foo = new Foo();
   Foo = 'Fol'; // it's ok
   ```



### 8. setTimeout、Promise、Async/Await 的区别

1. 浏览器事件循环机制

2. 实例:

   ```javascript
   console.log('script start')
   let promise1 = new Promise(function (resolve) {
       console.log('promise1')
       resolve()
       console.log('promise1 end')
   }).then(function () {
       console.log('promise2')
   })
   setTimeout(function(){
       console.log('settimeout')
   })
   console.log('script end')
   
   async function async1(){
      console.log('async1 start');
       await async2();
       console.log('async1 end')
   }
   async function async2(){
       console.log('async2')
   }
   console.log('script start');
   async1();
   console.log('script end')
   ```



### 9. 数组拉平,去重,排序

已知如下数组：var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

```javascript
const fn = arr => Array.from(new Set(arr.flat(Infinity))).sort((a, b) =>(a-b))
console.log(fn(arr11))
// [1,  2, 3,  4,  5,  6,7,  8, 9, 10, 11, 12,13, 14]

// 数组扁平化的方法
// 1. 利用while循环
function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr;
}

// 2. 利用reduce
const flatten2 = arr => arr.reduce((pre, next) => pre.concat(Array.isArray(next) ? flatten2(next) : next), [])

// 3. 利用ES6 Array.flat()
const flat = arr => arr.flat(Infinity)

```

### 10. JS异步解决方案的发展历程以及优缺点

1. 回调函数

2. Promise

   * Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？: Promise构造函数是同步执行, then方法是异步执行

     ```javascript
     // eg:
     const promise = new Promise((resolve, reject) => {
       console.log(1)
       resolve()
       console.log(2)
     })
     promise.then(() => {
       console.log(3)
     })
     console.log(4)
     // 执行结果: 1243
     ```

     

3. Generator

4. async/await



### 11. 如何实现一个 new 

```javascript
// 1. 创建一个对象
// 2. 将构造函数的指向赋值给这个对象
// 3. 执行构造函数
// 4. 返回创建的对象(需要判断构造函数是否有返回值, 有返回值直接返回,否则返回创建的对象)
function _new(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const result = fn.apply(obj, args);
  return result instanceof Object ? result : obj;
}

// test
function testNew(name, age) {
  this.name = name;
  this.age = age;
  return {
    name,
    age,
    habit: "Games"
  }
}
const per = new testNew('jiao', 16)
console.log(per.name, per.age, per.habit) // jiao 16 Games
const pert = _new(testNew, 'ren', 55)
console.log(pert.name, pert.age, pert.habit) // ren 55 Games
```



### 13. 简单讲解一下 http2 的多路复用

在 HTTP/1 中，每次请求都会建立一次HTTP连接，也就是我们常说的3次握手4次挥手，这个过程在一次请求过程中占用了相当长的时间，即使开启了 Keep-Alive ，解决了多次连接的问题，但是依然有两个效率上的问题：

- 第一个：串行的文件传输。当请求a文件时，b文件只能等待，等待a连接到服务器、服务器处理文件、服务器返回文件，这三个步骤。我们假设这三步用时都是1秒，那么a文件用时为3秒，b文件传输完成用时为6秒，依此类推。（注：此项计算有一个前提条件，就是浏览器和服务器是单通道传输）
- 第二个：连接数过多。我们假设Apache设置了最大并发数为300，因为浏览器限制，浏览器发起的最大请求数为6，也就是服务器能承载的最高并发为50，当第51个人访问时，就需要等待前面某个请求处理完成。

HTTP/2的多路复用就是为了解决上述的两个性能问题。
在 HTTP/2 中，有两个非常重要的概念，分别是帧（frame）和流（stream）。
帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。
多路复用，就是在一个 TCP 连接中可以存在多条流。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。



### 14. 谈谈你对TCP三次握手和四次挥手的理解

![bye-hi](/Users/jiaorengui/Documents/javascript/image/bye-hi.png)

### 15. A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态

### 16. 介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？

#### 1. npm 模块安装机制：

- 发出`npm install`命令
- 查询node_modules目录之中是否已经存在指定模块
  - 若存在，不再重新安装
  - 若不存在
    - npm 向 registry 查询模块压缩包的网址
    - 下载压缩包，存放在根目录下的`.npm`目录里
    - 解压压缩包到当前项目的`node_modules`目录

#### 2. npm 实现原理: 输入 npm install 命令并敲下回车后，会经历如下几个阶段（以 npm 5.5.1 为例）：

**1. 执行工程自身 preinstall**

当前 npm 工程如果定义了 preinstall 钩子此时会被执行。

**2. 确定首层依赖模块:dependencies 和 devDependencies中指定的模块**

首先需要做的是确定工程中的首层依赖，也就是 dependencies 和 devDependencies 属性中直接指定的模块（假设此时没有添加 npm install 参数）。

工程本身是整棵依赖树的根节点，每个首层依赖模块都是根节点下面的一棵子树，npm 会开启多进程从每个首层依赖模块开始逐步寻找更深层级的节点。

**3. 获取模块: 1-获取模块信息. 2-获取模块实体(根据上一步获取的模块压缩包地址判断有没有缓存).3-查找模块依赖, 有依赖的话回到1**

获取模块是一个递归的过程，分为以下几步：

- 获取模块信息。在下载一个模块之前，首先要确定其版本，这是因为 package.json 中往往是 semantic version（semver，语义化版本）。此时如果版本描述文件（npm-shrinkwrap.json 或 package-lock.json）中有该模块信息直接拿即可，如果没有则从仓库获取。如 package.json 中某个包的版本是 ^1.1.0，npm 就会去仓库中获取符合 1.x.x 形式的最新版本。
- 获取模块实体。上一步会获取到模块的压缩包地址（resolved 字段），npm 会用此地址检查本地缓存，缓存中有就直接拿，如果没有则从仓库下载。
- 查找该模块依赖，如果有依赖则回到第1步，如果没有则停止。

**4. 模块扁平化（dedupe）:对依赖树的大量重复模块做处理**

上一步获取到的是一棵完整的依赖树，其中可能包含大量重复模块。比如 A 模块依赖于 loadash，B 模块同样依赖于 lodash。在 npm3 以前会严格按照依赖树的结构进行安装，因此会造成模块冗余。

从 npm3 开始默认加入了一个 dedupe 的过程。它会遍历所有节点，逐个将模块放在根节点下面，也就是 node-modules 的第一层。当发现有**重复模块**时，则将其丢弃。

这里需要对**重复模块**进行一个定义，它指的是**模块名相同**且 **semver 兼容。\**每个 semver 都对应一段版本允许范围，如果两个模块的版本允许范围存在交集，那么就可以得到一个\**兼容**版本，而不必版本号完全一致，这可以使更多冗余模块在 dedupe 过程中被去掉。

比如 node-modules 下 foo 模块依赖 lodash@^1.0.0，bar 模块依赖 lodash@^1.1.0，则 **^1.1.0** 为兼容版本。

而当 foo 依赖 lodash@^2.0.0，bar 依赖 lodash@^1.1.0，则依据 semver 的规则，二者不存在兼容版本。会将一个版本放在 node_modules 中，另一个仍保留在依赖树里。

举个例子，假设一个依赖树原本是这样：

node_modules
-- foo
---- lodash@version1

-- bar
---- lodash@version2

假设 version1 和 version2 是兼容版本，则经过 dedupe 会成为下面的形式：

node_modules
-- foo

-- bar

-- lodash（保留的版本为兼容版本）

假设 version1 和 version2 为非兼容版本，则后面的版本保留在依赖树中：

node_modules
-- foo
-- lodash@version1

-- bar
---- lodash@version2

**5. 安装模块: 更新node_modules, 并执行模块生命周期函数(preinstall/install/postinstall)**

这一步将会更新工程中的 node_modules，并执行模块中的生命周期函数（按照 preinstall、install、postinstall 的顺序）。

**6. 执行工程自身生命周期: 执行npm工程自定义钩子,生成或更新版本描述文件**

当前 npm 工程如果定义了钩子此时会被执行（按照 install、postinstall、prepublish、prepare 的顺序）。

最后一步是生成或更新版本描述文件，npm install 过程完成。



### 17. 有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣Object.prototype.toString.call() 、 instanceof 以及 Array.isArray()

1. Object.prototype.toString.call(): 每一个继承 Object 的对象都有 `toString` 方法，如果 `toString` 方法没有重写的话，会返回 `[object type]`，其中 type 为对象的类型。但当除了 Object 类型的对象外，其他类型直接使用 `toString` 方法时，会直接返回都是内容的字符串，所以我们需要使用call或者apply方法来改变toString方法的执行上下文

   * 功能: 常用于判断浏览器内置对象

   * 能判断所有基本数据类型

     ```javascript
     Object.prototype.toString.call('An') // "[object String]"
     Object.prototype.toString.call(1) // "[object Number]"
     Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
     Object.prototype.toString.call(null) // "[object Null]"
     Object.prototype.toString.call(undefined) // "[object Undefined]"
     Object.prototype.toString.call(function(){}) // "[object Function]"
     Object.prototype.toString.call({name: 'An'}) // "[object Object]"
     ```

     

2. instanceof

   * instanceof内部机制是判断类型的prototype是否出现在对象的原型链中，但是对象的原型可以随意修改，所以这种判断并不准确。

     ```javascript
     const obj = {}
     Object.setPrototypeOf(obj, Array.prototype)
     obj instanceof Array // true
     ```

3. Array.isArray()

   * 功能: 用来判断对象是否为数组

   * 与instanceof: 当检测Array实例时，`Array.isArray` 优于 `instanceof` ，因为 `Array.isArray` 可以检测出 `iframes`

     ```javascript
     var iframe = document.createElement('iframe');
     document.body.appendChild(iframe);
     xArray = window.frames[window.frames.length-1].Array;
     var arr = new xArray(1,2,3); // [1,2,3]
     
     // Correctly checking for Array
     Array.isArray(arr);  // true
     Object.prototype.toString.call(arr); // true
     // Considered harmful, because doesn't work though iframes
     arr instanceof Array; // false
     ```

   * 与Object.prototype.toString.call(), Array.isArray()是ES6新增的方法, 当不存在Array.isArray()时候,可以用Object.prototype.toString.call()替代

     ```javascript
     if (!Array.isArray) {
       Array.isArray = function(arg) {
         return Object.prototype.toString.call(arg) === '[object Array]';
       };
     }
     ```

     

### 18. [介绍下重绘和回流（Repaint & Reflow），以及如何进行优化](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/24)

思路:

1. 浏览器渲染机制
2. 重绘
3. 回流
4. 浏览器优化
5. 减少重绘与回流

### 19. 介绍下观察者模式和订阅-发布模式的区别，各自适用于什么场景

### 20. [浏览器和Node 事件循环的区别 ](https://juejin.cn/post/6844903761949753352#heading-12)

### 21. [介绍模块化发展历程](https://www.processon.com/view/link/5c8409bbe4b02b2ce492286a#map)

### 22. cookie 和 token 都存放在 header 中，为什么不会劫持 token？

1、首先token不是防止XSS的，而是为了防止CSRF的；
2、CSRF攻击的原因是浏览器会自动带上cookie，而浏览器不会自动带上token



### 23. 聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的

vue响应式原理

### 24. 两个数组合并成一个数组

请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。

```javascript
const arr33 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
const arr44 = ['A', 'B', 'C', 'D'];
const result = [...arr33, ...arr44].sort().sort((a, b) => {
  if (a.charAt(0) == b.charAt(0) && a.length > b.length) {
    return -1
  }
})
console.log(result)
```

### 25. 改造下面的代码，使之输出0 - 9，写出你能想到的所有解法

```javascript
for (var i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}
```

解决办法:

1. 原理: 利用 `setTimeout` 函数的第三个参数，会作为回调函数的第一个参数传入, 利用bind函数部分执行的特性

   ```javascript
   // 1
   for (var i = 0; i < 10; i++) {
     setTimeout(i => {
       console.log(i);
     }, 1000, i)
   }
   
   // 2
   for (var i = 0; i < 10; i++) {
     setTimeout(console.log, 1000, i)
   }
   
   // 3
   for (var i = 0; i < 10; i++) {
     setTimeout(console.log.bind(Object.create(null), i), 1000)
   }
   ```

2. 原理: 利用 `let` 变量的特性 — 在每一次 `for` 循环的过程中，`let` 声明的变量会在当前的块级作用域里面（`for` 循环的 body 体，也即两个花括号之间的内容区域）创建一个文法环境（Lexical Environment），该环境里面包括了当前 `for` 循环过程中的 `i`

   ```javascript
   // 4
   for (let i = 0; i < 10; i++) {
     setTimeout(() => {
       console.log(i);
     }, 1000)
   }
   
   // 5
   for (var i = 0; i < 10; i++) {
     let _i = i;// const _i = i;
     setTimeout(() => {
       console.log(_i);
     }, 1000)
   }
   ```

3. 原理: 利用函数自执行的方式，把当前 for 循环过程中的 i 传递进去

   ```javascript
   // 6
   for (var i = 0; i < 10; i++) {
     (i => {
       setTimeout(() => {
         console.log(i);
       }, 1000)
     })(i)
   }
   ```

4. 原理: 很多其它的方案只是把 console.log(i) 放到一个函数里面，因为 setTimeout 函数的第一个参数只接受函数以及字符串，如果是 js 语句的话，js 引擎应该会自动在该语句外面包裹一层函数

   ```javascript
   // 7
   for (var i = 0; i < 10; i++) {
     setTimeout(console.log(i), 1000)
   }
   
   // 8
   for (var i = 0; i < 10; i++) {
     setTimeout((() => {
       console.log(i);
     })(), 1000)
   }
   
   // 9
   for (var i = 0; i < 10; i++) {
     setTimeout((i => {
       console.log(i);
     })(i), 1000)
   }
   
   // 10
   for (var i = 0; i < 10; i++) {
     setTimeout((i => {
       console.log(i);
     }).call(null, i), 1000)
   }
   
   // 11
   for (var i = 0; i < 10; i++) {
     setTimeout((i => {
       console.log(i);
     }).apply(Object.create(null), [i]), 1000)
   }
   ```

5. 原理: 利用 eval 或者 new Function 执行字符串，然后执行过程同方法四

   ```javascript
   // 12
   for (var i = 0; i < 10; i++) {
     setTimeout(eval('console.log(i)'), 1000)
   }
   
   // 13
   for (var i = 0; i < 10; i++) {
     setTimeout(new Function('i', 'console.log(i)')(i), 1000)
   }
   
   // 14
   for (var i = 0; i < 10; i++) {
     setTimeout(new Function('console.log(i)')(), 1000)
   }
   ```

   

### 26. Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法

[尤大的回答](https://www.zhihu.com/question/31809713/answer/53544875)

总结下:

1. 从原生DOM和框架的封装操作
2. MVVM和virtual DOM
3. 性能场合

### 27. 下面的代码打印什么内容，为什么？

1. [解析](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/93)

   . 运算符的优先级大于 = 

   ```javascript
   var a = {n: 1};
   var b = a;
   a.x = a = {n: 2};
   console.log(a.x) // undefined
   console.log(b.x) // { n: 2 }
   ```

   

```javascript
// 下面代码分别输出什么
// ƒ b(){
//    b = 20;
//    console.log(b); 
// }
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();

var a = 10;
(function () {
    console.log(a) // undefined
    a = 5
    console.log(window.a) // 10
    var a = 20;
    console.log(a) // 20
})()

var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)


// 简单改造下面的代码，使之分别打印 10 和 20
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();
```



### 28. 浏览器缓存读取规则

可以分成 Service Worker、Memory Cache、Disk Cache 和 Push Cache，

1. 那请求的时候 from memory cache 和 from disk cache 的依据是什么，
2. 哪些数据什么时候存放在 Memory Cache 和 Disk Cache中？

[深入理解浏览器的缓存机制](https://www.jianshu.com/p/54cc04190252)



### 29. 为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？

[尤大的回答](https://www.zhihu.com/question/48759748/answer/112823337)

是为了devtool能追踪状态的变化



### 30. 下面代码中 a 在什么情况下会打印 1？

```javascript
var a = ?;
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}

// 1
var a = {
  i: 1,
  toString() {
    return a.i++;
  }
}
// 利用==会发生隐式转换,隐式转换的时候会调用toString方法
if( a == 1 && a == 2 && a == 3 ) {
  console.log(1);
}

// 2
var a = {num:0};
a.valueOf = function(){
  return ++a.num
}
if(a == 1 && a == 2 && a == 3){
  console.log(1);
}
```

### 31. 介绍下 BFC 及其应用

BFC 就是块级格式上下文，是页面盒模型布局中的一种 CSS 渲染模式，相当于一个独立的容器，里面的元素和外部的元素相互不影响。创建 BFC 的方式有：

1. html 根元素
2. float 浮动
3. 绝对定位
4. overflow 不为 visiable
5. display 为表格布局或者弹性布局

BFC 主要的作用是：

1. 清除浮动
2. 防止同一 BFC 容器中的相邻元素间的外边距重叠问题



### 32. 在 Vue 中，子组件为何不可以修改父组件传递的 Prop

如果修改了，Vue 是如何监控到属性的修改并给出警告的

1. **为何不能修改：为了保证数据的单向流动，便于对数据进行追踪，避免数据混乱**

2. vue如何知道修改了父组件传来的props？: 如果传入的props是基本数据类型，子组件修改父组件传的props会警告，并且修改不成功，如果传入的是引用数据类型，那么修改引用数据类型的某个属性值时，对应的props也会修改，并且vue不会抱警告。下面的代码就是实现Vue提示修改props的操作，在组件 `initProps` 方法的时候，会对props进行defineReactive操作，传入的第四个参数是自定义的set函数，该函数会在触发props的set方法时执行，当props修改了，就会运行这里传入的第四个参数，然后进行判断，如果不是root根组件，并且不是更新子组件，那么说明更新的是props，所以会警告

   ```javascript
   // src/core/instance/state.js 源码路径
   function initProps (vm: Component, propsOptions: Object) {
     const propsData = vm.$options.propsData || {}
     const props = vm._props = {}
     // cache prop keys so that future props updates can iterate using Array
     // instead of dynamic object key enumeration.
     const keys = vm.$options._propKeys = []
     const isRoot = !vm.$parent
     // root instance props should be converted
     if (!isRoot) {
       toggleObserving(false)
     }
     for (const key in propsOptions) {
       keys.push(key)
       const value = validateProp(key, propsOptions, propsData, vm)
       /* istanbul ignore else */
       if (process.env.NODE_ENV !== 'production') {
         const hyphenatedKey = hyphenate(key)
         if (isReservedAttribute(hyphenatedKey) ||
             config.isReservedAttr(hyphenatedKey)) {
           warn(
             `"${hyphenatedKey}" is a reserved attribute and cannot be used as component prop.`,
             vm
           )
         }
         defineReactive(props, key, value, () => {
           if (!isRoot && !isUpdatingChildComponent) {
             warn(
               `Avoid mutating a prop directly since the value will be ` +
               `overwritten whenever the parent component re-renders. ` +
               `Instead, use a data or computed property based on the prop's ` +
               `value. Prop being mutated: "${key}"`,
               vm
             )
           }
         })
       } else {
         defineReactive(props, key, value)
       }
       // static props are already proxied on the component's prototype
       // during Vue.extend(). We only need to proxy props defined at
       // instantiation here.
       if (!(key in vm)) {
         proxy(vm, `_props`, key)
       }
     }
     toggleObserving(true)
   }
   
   // src/core/observer/index.js
   /**
    * Define a reactive property on an Object.
    */
   export function defineReactive (
     obj: Object,
     key: string,
     val: any,
     customSetter?: ?Function,
     shallow?: boolean
   ) {
     const dep = new Dep()
   
     const property = Object.getOwnPropertyDescriptor(obj, key)
     if (property && property.configurable === false) {
       return
     }
   
     // cater for pre-defined getter/setters
     const getter = property && property.get
     const setter = property && property.set
     if ((!getter || setter) && arguments.length === 2) {
       val = obj[key]
     }
   
     let childOb = !shallow && observe(val)
     Object.defineProperty(obj, key, {
       enumerable: true,
       configurable: true,
       get: function reactiveGetter () {
         const value = getter ? getter.call(obj) : val
         if (Dep.target) {
           dep.depend()
           if (childOb) {
             childOb.dep.depend()
             if (Array.isArray(value)) {
               dependArray(value)
             }
           }
         }
         return value
       },
       set: function reactiveSetter (newVal) {
         const value = getter ? getter.call(obj) : val
         /* eslint-disable no-self-compare */
         if (newVal === value || (newVal !== newVal && value !== value)) {
           return
         }
         /* eslint-enable no-self-compare */
         if (process.env.NODE_ENV !== 'production' && customSetter) {
           customSetter()
         }
         // #7981: for accessor properties without setter
         if (getter && !setter) return
         if (setter) {
           setter.call(obj, newVal)
         } else {
           val = newVal
         }
         childOb = !shallow && observe(newVal)
         dep.notify()
       }
     })
   }
   ```



### 33. 实现一个 sleep 函数

比如 sleep(1000) 意味着等待1000毫秒，可从 Promise、Generator、Async/Await 等角度实现

```javascript
// 1. promise
const sleep = time => new Promise(resolve => setTimeout(resolve, time))
sleep(1000)
.then(() => {
  console.log("promise await 1000")
})

// 2. async/await
async function output(time) {
  const out = await sleep(time);
  console.log("async/await await 1000")
  return out;
}
output(1000)

// 3. generator
function *sleepGenerator(time) {
  yield new Promise(resolve => setTimeout(resolve, time))
}
sleepGenerator(1000)
.next()
.value
.then(() => {
  console.log("Generator await 1000")
})

// 4. ES5回调函数
const sleepES5 = (cb, time) => {
  if (typeof cb === 'function') {
    setTimeout(cb, time)
  }
}
const outputES5 = () => {
  console.log("ES5 callback await 1000")
}
sleepES5(outputES5, 1000)
```





### 34. 使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果

答案：[102, 15, 22, 29, 3, 8]

解析：根据MDN上对`Array.sort()`的解释，默认的排序方法会将数组元素转换为字符串，然后比较字符串中字符的UTF-16编码顺序来进行排序。所以`'102'` 会排在 `'15'` 前面



### 35. 介绍 HTTPS 握手过程 ? HTTPS 握手过程中，客户端如何验证证书的合法性 ?

1. https握手过程:
   1. 客户端使用https的url访问web服务器,要求与服务器建立ssl连接
   2. web服务器收到客户端请求后, 会将网站的证书(包含公钥)传送一份给客户端
   3. 客户端收到网站证书后会检查证书的颁发机构以及过期时间, 如果没有问题就随机产生一个秘钥
   4. 客户端利用公钥将会话秘钥加密, 并传送给服务端, 服务端利用自己的私钥解密出会话秘钥
   5. 之后服务器与客户端使用秘钥加密传输
2. https握手过程中, 客户端如何验证证书的合法性
   1. 首先浏览器读取证书中的证书所有者、有效期等信息进行校验，校验证书的网站域名是否与证书颁发的域名一致，校验证书是否在有效期内
   2. 浏览器开始查找操作系统中已内置的受信任的证书发布机构CA，与服务器发来的证书中的颁发者CA比对，用于校验证书是否为合法机构颁发
   3. 如果找不到，浏览器就会报错，说明服务器发来的证书是不可信任的。
   4. 如果找到，那么浏览器就会从操作系统中取出颁发者CA 的公钥(多数浏览器开发商发布
      版本时，会事先在内部植入常用认证机关的公开密钥)，然后对服务器发来的证书里面的签名进行解密
   5. 浏览器使用相同的hash算法计算出服务器发来的证书的hash值，将这个计算的hash值与证书中签名做对比
   6. 对比结果一致，则证明服务器发来的证书合法，没有被冒充



### 36. vue双向绑定和 vuex 是否冲突

[vux的官方文档](https://vuex.vuejs.org/zh/guide/forms.html)

总结下:

当在严格模式中使用vuex时, 在属于vuex的state上使用v-model是有些棘手的

解决办法如下:

1. vuex思维, 给input绑定一个value, 通过input/change事件去commit一个mutation来更改数据
2. 使用带有setter的双向绑定计算属性



### 37. call 和 apply 的区别是什么，哪个性能更好一些

理论上call优于apply, 因为在ECMA草案中, apply有调用CreateListFromArrayLike这一步, 其他步骤是一样的

但是我用jsbench.js测试的结果, 10万条数据的循环, 差异几乎可以忽略



### 38. 为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片？

1. 能够完成整个 HTTP 请求+响应（尽管不需要响应内容）
2. 触发 GET 请求之后不需要获取和处理数据、服务器也不需要发送数据
3. 跨域友好
4. 执行过程无阻塞
5. 相比 XMLHttpRequest 对象发送 GET 请求，性能上更好
6. GIF的最低合法体积最小（最小的BMP文件需要74个字节，PNG需要67个字节，而合法的GIF，只需要43个字节）

[为什么前端监控要用GIF打点](https://mp.weixin.qq.com/s/v6R2w26qZkEilXY0mPUBCw?utm_source=tuicool&utm_medium=referral)



### 39. （百度）实现 (5).add(3).minus(2) 功能

 5 + 3 - 2，结果为 6

```javascript
// 简化的写法, 遇到小数点会有问题
Number.prototype.add = function(n) {
  return this.valueOf() + n;
};
Number.prototype.minus = function(n) {
  return this.valueOf() - n;
};

// 下面的写法解决小数点问题
Number.MAX_SAFE_DIGITS = Number.MAX_SAFE_INTEGER.toString().length-2
Number.prototype.digits = function(){
	let result = (this.valueOf().toString().split('.')[1] || '').length
	return result > Number.MAX_SAFE_DIGITS ? Number.MAX_SAFE_DIGITS : result
}
Number.prototype.add = function(i=0){
	if (typeof i !== 'number') {
        	throw new Error('请输入正确的数字');
    	}
	const v = this.valueOf();
	const thisDigits = this.digits();
	const iDigits = i.digits();
	const baseNum = Math.pow(10, Math.max(thisDigits, iDigits));
	const result = (v * baseNum + i * baseNum) / baseNum;
	if(result>0){ return result > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : result }
	else{ return result < Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : result }
}
Number.prototype.minus = function(i=0){
	if (typeof i !== 'number') {
        	throw new Error('请输入正确的数字');
    	}
	const v = this.valueOf();
	const thisDigits = this.digits();
	const iDigits = i.digits();
	const baseNum = Math.pow(10, Math.max(thisDigits, iDigits));
	const result = (v * baseNum - i * baseNum) / baseNum;
	if(result>0){ return result > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : result }
	else{ return result < Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : result }
}
```



### 40. Vue 的响应式原理中 Object.defineProperty 有什么缺陷？

为什么在 Vue3.0 采用了 Proxy，抛弃了 Object.defineProperty？

1. Object.defineProperty无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应；
2. Object.defineProperty只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。Proxy可以劫持整个对象，并返回一个新的对象。
3. Proxy不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。

[实现双向绑定Proxy比defineproperty优劣如何?](https://juejin.cn/post/6844903601416978439)



### 41. 怎么让一个 div 水平垂直居中

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```css
// 1. 弹性盒子
div.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

// 2
div.parent{
  display:flex;
}
div.child{
  margin:auto;
}

// 3. 定位
div.parent {
    position: relative; 
}

// 4. 定位 + translate
div.child {
    position: absolute; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);  
}
// 5.定位 + margin
div.child {
    width: 50px;
    height: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -25px;
    margin-top: -5px;
}
// 6. 定位 + margin:auto
div.child {
    width: 50px;
    height: 10px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
// 7. display: grid
div.parent {
    display: grid;
}
div.child {
    justify-self: center;
    align-self: center;
}
```



### 42. 冒泡排序如何实现，时间复杂度是多少， 还可以如何改进？

```javascript
const arrBubble = [8, 2, 3, 1, 8, 45, 21,20, 12]
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr
}
// [1,  2,  3,  8, 8, 12, 20, 21, 45]
console.log(bubbleSort(arrBubble))

// 每次最大值放到最右后，会将本轮最后一个操作的位置作为下一轮的终点，可以减少不必要的一些冒泡
function bubbleSort1(arr) {
  let i = arr.length - 1;
  while (i > 0) {
    let pos = 0;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        pos = j;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    i = pos;
  }
  return arr
}
// [1,  2,  3,  8, 8, 12, 20, 21, 45]
console.log(bubbleSort1(arrBubble))
```



### 43. 某公司 1 到 12 月份的销售额存在一个对象里面

如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。

```javascript
let objSum = {1:222, 2:123, 5:888};
const arrToObj = obj => Array.from({ length: 12 }).map((_, index) => obj[index + 1] || null)
// [222, 123, null, null, 888, null, null, null, null, null, null, null]
console.log(arrToObj(objSum))
```



### 44. 要求设计 LazyMan 类，实现以下功能。

```javascript
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
```

### 45. 分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景。

display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击，
visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击
opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

继承：
display: none和opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。
visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。

性能：
displaynone : 修改元素会造成文档回流,读屏器不会读取display: none元素内容，性能消耗较大
visibility:hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取visibility: hidden元素内容
opacity: 0 ： 修改元素会造成重绘，性能消耗较少

联系：它们都能让元素不可见



### 46. 箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？

箭头函数是普通函数的简写，可以更优雅的定义一个函数，和普通函数相比，有以下几点差异：

1、函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

2、不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

3、不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

4、不可以使用 new 命令，因为：

- 没有自己的 this，无法调用 call，apply。
- 没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 __proto__

new 过程大致是这样的：

```javascript
function newFunc(father, ...rest) {
  var result = {};
  result.__proto__ = father.prototype;
  var result2 = father.apply(result, rest);
  if (
    (typeof result2 === 'object' || typeof result2 === 'function') &&
    result2 !== null
  ) {
    return result2;
  }
  return result;
}
```





### 47. 给定两个数组，写一个方法来计算它们的交集。

例如：给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。

```javascript
const nums1 = [1, 2, 2, 1];
const nums2 = [2, 2];

const intersection = (arr1, arr2) => arr1.filter(item => new Set(arr2).has(item))
// [ 2, 2 ]
console.log(intersection(nums1, nums2))
```



### 48. 已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改。

```html
<img src="1.jpg" style="width:480px!important;”>
```

1. css方法
   * max-width:300px;覆盖其样式；
   * transform: scale(0.625)；按比例缩放图片；

2. js方法
   document.getElementsByTagName("img")[0].setAttribute("style","width:300px!important;")

### 49. 介绍下如何实现 token 加密

jwt举例

1. 需要一个secret（随机数）
2. 后端利用secret和加密算法(如：HMAC-SHA256)对payload(如账号密码)生成一个字符串(token)，返回前端
3. 前端每次request在header中带上token
4. 后端用同样的算法解密

### 50. 如何设计实现无缝轮播

Todo

### 51. 模拟实现一个 Promise.finally

```javascript
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
var p66 = new Promise((resolve, reject) => {
  resolve('p66')
});
p66
.then((res) => {
  // p66 test promise finally
  console.log(res + ' test promise finally')
  return 'p66 then'
})
.finally((res) => {
  // undefined finally test promise
  console.log(res, "finally test promise")
})
```



### 52.  `a.b.c.d` 和 `a['b']['c']['d']`，哪个性能更高？

`a.b.c.d`比`a['b']['c']['d']`性能更高, 因为`a['b']['c']['d']`中可能是变量, 会多一层判断

### 53. ES6 代码转成 ES5 代码的实现思路是什么

这不就是写babel

将ES6的代码转换为AST语法树，然后再将ES6 AST转为ES5 AST，再将AST转为代码

### 54. 数组编程题

随机生成一个长度为 10 的整数类型的数组，例如 `[2, 10, 3, 4, 5, 11, 10, 11, 20]`，将其排列成一个新数组，要求新数组形式如下，例如 `[[2, 3, 4, 5], [10, 11], [20]]`。

```javascript
function arr10Random(min, max) {
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
  }
  // 随机生成10个整数数组
  const initArr = Array.from(
    { length: 10 }, 
    (v) => { 
      return getRandomIntInclusive(min, max) 
    }
  );

  // 排序
  const sort = arr => arr.sort((a, b) => a - b)

  // 去重
  const uniqueArr = arr => [...new Set(arr)]

  const resultArr = uniqueArr(sort(initArr))

  // 放入hash表
  const obj = {};
  resultArr.map((i) => {
    const intNum = Math.floor(i/10);
    if (!obj[intNum]) obj[intNum] = [];
    obj[intNum].push(i);
  })

  // 输出结果
  const resArr = [];
  for(let i in obj) {
    resArr.push(obj[i]);
  }

  return resArr;
}
// [ [ 2, 5, 9 ], [ 13, 18 ], [ 27 ], [ 40, 43, 47, 48 ] ]
console.log(arr10Random(0, 50))
```



### 55. 如何解决移动端 Retina 屏 1px 像素问题

1. 伪元素 + transform scaleY(.5)
2. border-image
3. background-image
4. box-shadow

### 56.  如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 。

```javascript
const processString = str =>
  str.split("")
  .map(item => item === item.toUpperCase()
    ? item.toLowerCase()
    : item.toUpperCase()
  )
  .join("");
console.log(processString('AbCeeeFgPPdbv')); // aBcEEEfGppDBV
```



### 57. 介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面的

1.当修改了一个或多个文件；
2.文件系统接收更改并通知webpack；
3.webpack重新编译构建一个或多个模块，并通知HMR服务器进行更新；
4.HMR Server 使用webSocket通知HMR runtime 需要更新，HMR运行时通过HTTP请求更新jsonp；
5.HMR运行时替换更新中的模块，如果确定这些模块无法更新，则触发整个页面刷新。

### 58. 实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置。

```javascript
const str1 = "jjeerrww"
const str2 = "eer"

// 1. 字符串的search方法
const find = (S, T) => S.search(T)
console.log(find(str1, str2))

// 2. 字符串的match方法
const find1 = (S, T) => {
  const mathed = S.match(T)
  return mathed ? mathed.index : -1
}
console.log(find1(str1, str2))

// 3. 遍历
const find2 = (S, T) => {
  if (S.length < T.length) {
    return -1
  }
  for (let i = 0; i < S.length; i++) {
    if (S.slice(i, i+T.length) === T) {
      return i
    }
  }
  return -1
}
console.log(find2(str1, str2))
```



### 59. 为什么普通 `for` 循环的性能远远高于 `forEach` 的性能，请解释其中的原因。

- for 循环没有任何额外的函数调用栈和上下文；
- forEach函数签名实际上是

```
array.forEach(function(currentValue, index, arr), thisValue)
```

它不是普通的 for 循环的语法糖，还有诸多参数和上下文需要在执行的时候考虑进来，这里可能拖慢性能；

### 60. 介绍下 BFC、IFC、GFC 和 FFC

**BFC（Block formatting contexts）：块级格式上下文**
页面上的一个隔离的渲染区域，那么他是如何产生的呢？可以触发BFC的元素有float、position、overflow、display：table-cell/ inline-block/table-caption ；BFC有什么作用呢？比如说实现多栏布局’

**IFC（Inline formatting contexts）：内联格式上下文**
IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响)IFC中的line box一般左右都贴紧整个IFC，但是会因为float元素而扰乱。float元素会位于IFC与与line box之间，使得line box宽度缩短。 同个ifc下的多个line box高度会不同
IFC中时不可能有块级元素的，当插入块级元素时（如p中插入div）会产生两个匿名块与div分隔开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。
那么IFC一般有什么用呢？
水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。
垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。

**GFC（GrideLayout formatting contexts）：网格布局格式化上下文**
当为一个元素设置display值为grid的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间。那么GFC有什么用呢，和table又有什么区别呢？首先同样是一个二维的表格，但GridLayout会有更加丰富的属性来控制行列，控制对齐以及更为精细的渲染语义和控制。

**FFC（Flex formatting contexts）:自适应格式上下文**
display值为flex或者inline-flex的元素将会生成自适应容器（flex container），可惜这个牛逼的属性只有谷歌和火狐支持，不过在移动端也足够了，至少safari和chrome还是OK的，毕竟这俩在移动端才是王道。Flex Box 由伸缩容器和伸缩项目组成。通过设置元素的 display 属性为 flex 或 inline-flex 可以得到一个伸缩容器。设置为 flex 的容器被渲染为一个块级元素，而设置为 inline-flex 的容器则渲染为一个行内元素。伸缩容器中的每一个子元素都是一个伸缩项目。伸缩项目可以是任意数量的。伸缩容器外和伸缩项目内的一切元素都不受影响。简单地说，Flexbox 定义了伸缩容器内伸缩项目该如何布局。

### 61. 使用 JavaScript Proxy 实现简单的数据绑定

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>proxy</title>
</head>
<body>
  <b id="count"></b>
  <button onclick="increase()">+</button>
  <button onclick="decrease()">-</button>

  <script>
    const data = {
      count: 0
    }
    const proxy = new Proxy(data, {
      get(target, property) {
        return target[property]
      },
      set(target, property, value) {
        target[property] = value;
        render(value)
      }
    })
    render(proxy.count)
    function render(value) {
      document.getElementById("count").innerHTML = value;
    }
    function increase() {
      proxy.count += 1;
    }
    function decrease() {
      proxy.count -= 1;
    }
  </script>
</body>
</html>
```



### 62. 数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少

数组可以直接根据索引取的对应的元素，所以不管取哪个位置的元素的时间复杂度都是 O(1)

Arr[0], arr[arr.length]

### 63. 输出以下代码运行结果

```javascript
// example 1
var a={}, b='123', c=123;  
a[b]='b';
a[c]='c';  
console.log(a[b]);

---------------------
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b';
a[c]='c';  
console.log(a[b]);

---------------------
// example 3
var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b';
a[c]='c';  
console.log(a[b]);

```

### 64. 算法题「旋转数组」

给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

如:

>输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3 输出: [5, 6, 7, 1, 2, 3, 4] 解释: 向右旋转 1 步: [7, 1, 2, 3, 4, 5, 6] 向右旋转 2 步: [6, 7, 1, 2, 3, 4, 5] 向右旋转 3 步: [5, 6, 7, 1, 2, 3, 4]

>输入: [-1, -100, 3, 99] 和 k = 2 输出: [3, 99, -1, -100] 解释:  向右旋转 1 步: [99, -1, -100, 3] 向右旋转 2 步: [3, 99, -1, -100]

```javascript
function rotate(arr, k) {
  for (let i = 0; i < k; i++) {
    arr.unshift(arr.pop())
  }
  return arr
}
var arr = [-1, -100, 3, 99];
console.log(rotate(arr, 2)); // [ 3, 99, -1, -100 ]
```



### 65. Vue 的父组件和子组件生命周期钩子执行顺序是什么

1. 加载渲染过程
   `父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted`
2. 子组件更新过程
   `父beforeUpdate->子beforeUpdate->子updated->父updated`
3. 父组件更新过程
   `父beforeUpdate->父updated`
4. 销毁过程
   `父beforeDestroy->子beforeDestroy->子destroyed->父destroyed`

### 66. input 搜索如何防抖，如何处理中文输入

```javascript
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

```html
<input
  ref="input"
  @compositionstart="handleComposition"
  @compositionupdate="handleComposition"
  @compositionend="handleComposition">
```



### 67. 介绍下 Promise.all 使用、原理实现及错误处理

```javascript
Promise._all = function(promises) {
  const result = [];
  return new Promise((resolve, reject) => {
    let index = 0;

    function addData(key, data) {
      result[key] = data;
      index++;
      if (index === promises.length) {
        resolve(result)
      }
    }
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(value => addData(i, value), reject)
    }
  })
}
var p22 = new Promise((resolve, reject) => {
  resolve('p22')
});
var p33 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p33')
  }, 300);
})
var p44 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('p44')
  }, 300);
})
Promise._all([p22, p33, p44])
.then(res => {
  console.log("all res: ",res)
})
.catch(err => {
  console.log(err)
})
// p44
```



### 78. 打印出 1 - 10000 之间的所有对称数

例如：121、1331 等

```javascript
const sameArr = arr => arr.filter(x => x.toString().length > 1 && x === Number(x.toString().split('').reverse().join('')))

// [11, 22, 33, 44, 55,66, 77, 88, 99]
console.log(sameArr([...Array(100).keys()]))
```



### 79. 周一算法题之「移动零」

>给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
>
>示例:
>
>```
>输入: [0,1,0,3,12]
>输出: [1,3,12,0,0]
>复制代码
>```
>
>说明:
>
>1. 必须在原数组上操作，不能拷贝额外的数组。
>2. 尽量减少操作次数。

```javascript
function zeroMove(array) {
  let len = array.length;
  let j = 0;
  for(let i=0;i<len-j;i++){
    if(array[i]===0){
      array.push(0);
      array.splice(i,1);
      i --;
      j ++;
    }
  }
  return array;
}
const arr55 = [0,1,0,0,3,12]
const result55 = zeroMove(arr55)
console.log(result55) // [ 1, 3, 12, 0, 0, 0 ]
```



### 80. var、let 和 const 区别的实现原理是什么

var的话会直接在栈内存里预分配内存空间，然后等到实际语句执行的时候，再存储对应的变量，如果传的是引用类型，那么会在堆内存里开辟一个内存空间存储实际内容，栈内存会存储一个指向堆内存的指针

let的话，是不会在栈内存里预分配内存空间，而且在栈内存分配变量时，做一个检查，如果已经有相同变量名存在就会报错

const的话，也不会预分配内存空间，在栈内存分配变量时也会做同样的检查。不过const存储的变量是不可修改的，对于基本类型来说你无法修改定义的值，对于引用类型来说你无法修改栈内存里分配的指针，但是你可以修改指针指向的对象里面的属性

### 81. 请实现一个 add 函数，满足以下功能。

### 82. 周一算法题之「两数之和」

给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。

你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。

>给定 nums = [2, 7, 11, 15], target = 9
>
> 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]

```javascript
function sum(arr, target) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const v = target - arr[i];
    const index = arr.indexOf(v, i)
    if (index >= 0) {
      result.push(i, index)
    }
  }
  return result;
}
const nums = [2, 7, 11, 15]
console.log(sum(nums, 19))
```



### 83. 在输入框中如何判断输入的是一个正确的网址。

```javascript
function isUrl(url) {
  try {
    new URL(url)
    return true
  } catch (err) {
    return false
  }
}
```



### 84. 实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度

以下数据结构中，id 代表部门编号，name 是部门名称，parentId 是父部门编号，为 0 代表一级部门，现在要求实现一个 convert 方法，把原始 list 转换成树形结构，parentId 为多少就挂载在该 id 的属性 children 数组下，结构如下：

```javascript
// 原始 list 如下
let list =[
    {id:1,name:'部门A',parentId:0},
    {id:2,name:'部门B',parentId:0},
    {id:3,name:'部门C',parentId:1},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4}
];
const result = convert(list, ...);

// 转换后的结果如下
let result = [
    {
      id: 1,
      name: '部门A',
      parentId: 0,
      children: [
        {
          id: 3,
          name: '部门C',
          parentId: 1,
          children: [
            {
              id: 6,
              name: '部门F',
              parentId: 3
            }, {
              id: 16,
              name: '部门L',
              parentId: 3
            }
          ]
        },
        {
          id: 4,
          name: '部门D',
          parentId: 1,
          children: [
            {
              id: 8,
              name: '部门H',
              parentId: 4
            }
          ]
        }
      ]
    },
  ···
];

// 实现方法如下
// 1. 循环
function convert(list) {
	const res = []
  // 遍历对象数组, 将id当作键名,当前值作为键值
	const map = list.reduce((res, v) => (res[v.id] = v, res), {})
	for (const item of list) {
    // parentId为0的是顶级
		if (item.parentId === 0) {
			res.push(item)
			continue
		}
    // item.parentId只要在map对象中存在就有children
		if (item.parentId in map) {
			const parent = map[item.parentId]
			parent.children = parent.children || []
			parent.children.push(item)
		}
	}
	return res
}
console.log(convert2(list55))

// 2. dfs
function convert2(source, parentId = 0){
  let trees = [];
  for (let item of source) {
    if(item.parentId === parentId) {
      let children = convert2(source, item['id']);
      if(children.length) {
        item.children = children
      }
      trees.push(item);
    }
  }
  return trees;
}
```

### 85. 设计并实现 Promise.race()

```javascript
Promise._race = promises => new Promise((resolve, reject) => {
	promises.forEach(promise => {
		promise.then(resolve, reject)
	})
})

// test
function promise11() { 
  return new Promise((resolve, reject) => resolve('promise11'))
}
function promise22() { 
  return new Promise((resolve, reject) => reject('promise22'))
}
Promise._race([promise22(), promise11()])
.then(res => {
  console.log(res)
})
.catch(err => {
  console.log('error info: ',err)
})
```



### 86. 介绍下 HTTPS 中间人攻击

https协议由 http + ssl 协议构成，具体的链接过程可参考[SSL或TLS握手的概述](https://github.com/lvwxx/blog/issues/3)

中间人攻击过程如下：

1. 服务器向客户端发送公钥。
2. 攻击者截获公钥，保留在自己手上。
3. 然后攻击者自己生成一个【伪造的】公钥，发给客户端。
4. 客户端收到伪造的公钥后，生成加密hash值发给服务器。
5. 攻击者获得加密hash值，用自己的私钥解密获得真秘钥。
6. 同时生成假的加密hash值，发给服务器。
7. 服务器用私钥解密获得假秘钥。
8. 服务器用假秘钥加密传输信息

防范方法：

1. 服务端在发送浏览器的公钥中加入CA证书，浏览器可以验证CA证书的有效性

### 87. 已知数据格式，实现一个函数 fn 找出链条中所有的父级 id

```javascript
const value = '112'
const fn = (value) => {
...
}
fn(value) // 输出 [1， 11， 112]

// 如下数据结构
const data100 = [{
  id: '1',
  name: 'test1',
  children: [
    {
      id: '11',
      name: 'test11',
      children: [
        {
          id: '111',
          name: 'test111'
        },
        {
          id: '112',
          name: 'test112'
        }
      ]
    },
    {
      id: '12',
      name: 'test12',
      children: [
        {
          id: '121',
          name: 'test121'
        },
        {
          id: '122',
          name: 'test122'
        }
      ]
    }
  ]
}];
 
// 方法1
function fn(id, list) {
  const match = list.find(item => item.id === id);
  if (match) return [id];
  const sub = list.find(item => id.startsWith(item.id));
  return [sub.id].concat(fn(id, sub.children));
}
console.log(fn("112", data100) ) // [ '1', '11', '112' ]

// 方法2
function bfs(target, id) {
  const quene = [...target]
  do {
    const current = quene.shift()
    if (current.children) {
      quene.push(...current.children.map(x => ({ ...x, path: (current.path || current.id) + '-' + x.id })))
    }
    if (current.id === id) {
      return current
    }
  } while(quene.length)
  return undefined
}

  
// 方法3
function dfs(target, id) {
  const stask = [...target]
  do {
    const current = stask.pop()
    if (current.children) {
      stask.push(...current.children.map(x => ({ ...x, path: (current.path || current.id) + '-' + x.id })))
    }
    if (current.id === id) {
      return current
    }
  } while(stask.length)
  return undefined
}
```



### 88. 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log(m+n))

Eg:

>nums1 = [1, 3]
>
> nums2 = [2]
>
>中位数是 2.0
>
>nums1 = [1, 2] 
>
>nums2 = [3, 4]
>
>中位数是(2 + 3) / 2 = 2.5

```javascript
var findMedianSortedArrays = function(nums1, nums2) {
  let m = nums1.length
  let n = nums2.length
  let k1 = Math.floor((m + n + 1) / 2)
  let k2 = Math.floor((m + n + 2) / 2)

  return (findMedianSortedArraysCore(nums1, 0, nums2, 0, k1) + findMedianSortedArraysCore(nums1, 0, nums2, 0, k2)) / 2
};

const findMedianSortedArraysCore = (nums1, i, nums2, j, k)  => {
  // 如果数组起始位置已经大于数组长度-1
  // 说明已经是个空数组
  // 直接从另外一个数组里取第k个数即可
  if (i > nums1.length - 1) {
    return nums2[j + k - 1]
  }
  if (j > nums2.length - 1) {
    return nums1[i + k - 1]
  }
  // 如果k为1
  // 就是取两个数组的起始值里的最小值
  if (k === 1) {
    return Math.min(nums1[i], nums2[j])
  }
  // 取k2为(k/2)或者数组1的长度或者数组2的长度的最小值
  // 这一步可以避免k2大于某个数组的长度（长度为从起始坐标到结尾）
  let k2 = Math.floor(k / 2)
  let length1 = nums1.length - i
  let length2 = nums2.length - j
  k2 = Math.min(k2, length1, length2)

  let value1 = nums1[i + k2 - 1]
  let value2 = nums2[j + k2 - 1]

  // 比较两个数组的起始坐标的值
  // 如果value1小于value2
  // 就舍弃nums1前i + k2部分
  // 否则舍弃nums2前j + k2部分
  if (value1 < value2) {
    return findMedianSortedArraysCore(nums1, i + k2, nums2, j, k - k2)
  } else {
    return findMedianSortedArraysCore(nums1, i, nums2, j + k2, k - k2)
  }
}
const arr1 = [1, 2]
const arr2 = [3, 4]
console.log(findMedianSortedArrays(arr1, arr2)) // 2.5
```



### 89. [vue 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/145)



### 90. 介绍下前端加密的常见场景和方法

首先，加密的目的，简而言之就是将明文转换为密文、甚至转换为其他的东西，用来隐藏明文内容本身，防止其他人直接获取到敏感明文信息、或者提高其他人获取到明文信息的难度。
通常我们提到加密会想到密码加密、HTTPS 等关键词，这里从场景和方法分别提一些我的个人见解。



#### 场景-密码传输

前端密码传输过程中如果不加密，在日志中就可以拿到用户的明文密码，对用户安全不太负责。
这种加密其实相对比较简单，可以使用 PlanA-前端加密、后端解密后计算密码字符串的MD5/MD6存入数据库；也可以 PlanB-直接前端使用一种稳定算法加密成唯一值、后端直接将加密结果进行MD5/MD6，全程密码明文不出现在程序中。

**PlanA**
使用 Base64 / Unicode+1 等方式加密成非明文，后端解开之后再存它的 MD5/MD6 。

**PlanB**
直接使用 MD5/MD6 之类的方式取 Hash ，让后端存 Hash 的 Hash 。



#### 场景-数据包加密

应该大家有遇到过：打开一个正经网站，网站底下蹦出个不正经广告——比如X通的流量浮层，X信的插入式广告……（我没有针对谁）
但是这几年，我们会发现这种广告逐渐变少了，其原因就是大家都开始采用 HTTPS 了。
被人插入这种广告的方法其实很好理解：你的网页数据包被抓取->在数据包到达你手机之前被篡改->你得到了带网页广告的数据包->渲染到你手机屏幕。
而 HTTPS 进行了包加密，就解决了这个问题。严格来说我认为从手段上来看，它不算是一种前端加密场景；但是从解决问题的角度来看，这确实是前端需要知道的事情。

**Plan**
全面采用 HTTPS



#### 场景-展示成果加密

经常有人开发网页爬虫爬取大家辛辛苦苦一点一点发布的数据成果，有些会影响你的竞争力，有些会降低你的知名度，甚至有些出于恶意爬取你的公开数据后进行全量公开……比如有些食谱网站被爬掉所有食谱，站点被克隆；有些求职网站被爬掉所有职位，被拿去卖信息；甚至有些小说漫画网站赖以生存的内容也很容易被爬取。

**Plan**
将文本内容进行展示层加密，利用字体的引用特点，把拿给爬虫的数据变成“乱码”。
举个栗子：正常来讲，当我们拥有一串数字“12345”并将其放在网站页面上的时候，其实网站页面上显示的并不是简单的数字，而是数字对应的字体的“12345”。这时我们打乱一下字体中图形和字码的对应关系，比如我们搞成这样：

> 图形：1 2 3 4 5
> 字码：2 3 1 5 4

这时，如果你想让用户看到“12345”，你在页面中渲染的数字就应该是“23154”。这种手段也可以算作一种加密。
具体的实现方法可以看一下《[Web 端反爬虫技术方案](https://juejin.im/post/5b6d579cf265da0f6e51a7e0)》。



### 91.React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？

## 问题描述

原问题标题“React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？ ”

1. 这里的n指的是页面的VDOM节点数，这个不太严谨。如果更严谨一点，我们应该假设
   变化之前的节点数为m，变化之后的节点数为n。
2. React 和 Vue 做优化的前提是“放弃了最优解“，本质上是一种权衡，有利有弊。

倘若这个算法用到别的行业，比如医药行业，肯定是不行的，为什么？

React 和 Vue 做的假设是：

- 检测VDOM的变化只发生在同一层
- 检测VDOM的变化依赖于用户指定的key

如果变化发生在不同层或者同样的元素用户指定了不同的key或者不同元素用户指定同样的key，
React 和 Vue都不会检测到，就会发生莫名其妙的问题。

但是React 认为， 前端碰到上面的第一种情况概率很小，第二种情况又可以通过提示用户，让用户去解决，因此
这个取舍是值得的。 没有牺牲空间复杂度，却换来了在大多数情况下时间上的巨大提升。
明智的选择！

## 基本概念

首先大家要有个基本概念。

其实这是一个典型的最小编辑距离的问题，相关算法有很多，比如Git中
，提交之前会进行一次对象的diff操作，就是用的这个最小距离编辑算法。

[leetcode](https://leetcode.com/problems/edit-distance/) 有原题目,
如果想明白这个O(n^3)， 可以先看下这个。

对于树，我们也是一样的，我们定义三种操作，用来将一棵树转化为另外一棵树：

- 删除：删除一个节点，将它的children交给它的父节点
- 插入：在children中 插入一个节点
- 修改：修改节点的值

事实上，从一棵树转化为另外一棵树，我们有很多方式，我们要找到最少的。

直观的方式是用动态规划，通过这种记忆化搜索减少时间复杂度。

## 算法

由于树是一种递归的数据结构，因此最简单的树的比较算法是递归处理。

详细描述这个算法可以写一篇很长的论文，这里不赘述。
大家想看代码的，这里有[一份](https://github.com/DatabaseGroup/tree-similarity/tree/develop)
我希望没有吓到你。

确切地说，树的最小距离编辑算法的时间复杂度是`O(n^2m(1+logmn))`,
我们假设`m 与 n 同阶`， 就会变成 `O(n^3)`。



### 92. 京东）写出如下代码的打印结果

```javascript
function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com"
  o = new Object()
  o.siteUrl = "http://www.google.com"
} 
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl); // "http://www.baidu.com"

```

### 93. bilibili）编程算法题

>用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。

```javascript
function fun(num){
  let num1 = num / 10;
  let num2 = num % 10;
  // 小于10的数
  if(num1<1){
      return num;
  }else{
      num1 = Math.floor(num1)
      return `${num2}${fun(num1)}`
  }
}
var a = fun(1234511)
console.log(a) // "1154321"
console.log(typeof a) // string
```



#### 94. （京东）请写出如下代码的打印结果

>```javascript
>function Foo() {
>  Foo.a = function() {
>     console.log(1)
>  }
>  this.a = function() {
>     console.log(2)
>  }
>}
>Foo.prototype.a = function() {
>	console.log(3)
>}
>Foo.a = function() {
>	console.log(4)
>}
>Foo.a();
>let obj = new Foo();
>obj.a();
>Foo.a();
>// 4 2 1
>```



## 疑问

1. 归并排序 ?
2. 

## 你还有什么想要了解的么?

#### 问HR

>1. 可不可以了解下公司的培训机制和学习资源 ?
>2. 最让你自豪的企业文化是什么 ?

#### 问未来领导

>1. 对于未来加入这个团队, 您对我的期望是什么 ?
>2. 您团队/部门接下来半年的工作重心是什么 ?
>3. 目前这个职位最紧要的任务是什么 ? 如果我有幸入职, 您希望我三个月完成哪些工作, 达到什么目标 ?

#### 问大领导

>1. 贵司最近有什么重大的规划 ?
>2. 能否听您谈谈贵公司业务与战略的未来规划 ?

#### 问未来同事

>1. 你对在这里工作最满意的地方是 ? 最不满意的呢 ?
>2. 团队最老的成员在这里多久了 ?

#### 问技术面试官

>1. 业务需求有没有文档记录, 是怎么记录的 ?
>2. 是否有技术分享交流活动, 有的话多久一次 ?
>3. 公司常用的技术栈 ?

#### 终面

>我对这份工作很感兴趣, 也相信我能做好, 我想知道, 您们对于雇佣我还有任何疑问吗 ?