## Vue.js相关

#### 1. Vue CLI 3 有哪些特性？

图形化界面（vue ui）

插件系统

CLI 服务

Vue CLI 无需 Eject 即可进行 Webpack 配置（针对 Create React App）

可配置化 Polyfill

现代模式

Prefetch / Preload

webpack-merge / webpack-chain

浏览器兼容性

CSS 预处理器

环境变量

构建应用 / 库 / Web Components 组件

部署（CORS / PWA）

- 有没有设计过通用的 Vuc CLI 插件？
- 有没有设计过通用的 Vue 脚手架？
- 有研究过 Vue CLI 的源码吗？

#### 2. 能对比一下 Create React App 和 Vue CLI 3 吗？

#### 3. Vue.js 整个实现原理？

* Vue.js 源码的入口主要做了些什么处理？

  入口: src/core/instance/index.js

  1. initMixin(Vue),注册vm的_init(), 
  2. stateMixin(Vue), 注册vm的, $data/$props/$set/$watch/$delete
  3. eventsMixin(Vue), 初始化事件相关的方法$on/$once/$off/$emit
  4. lifecycleMixin(Vue), 初始化生命周期相关的方法,_update/$forceUpdate/$destroy
  5. renderMixin(Vue), 混入render, $nextTick/_render

  

* Vue.js 中的数据劫持是怎么实现的？浏览器兼容性呢？

  1. observer函数是数据劫持的入口, 该函数将data对象转换为响应式对象

  2. 如果observer的参数是对象,且不是响应式对象的时候会调用Observer类

  3. Observer对数组和对象做不同的处理

     * 数组: 重写array原生方法, 调用dep.notify
     * 对象: 调用walk方法遍历对象, 对每个属性调用defineReactive

  4. defineReactive的核心为每一个属性定义setter和getter, getter收集依赖, setter中派发更新(即调用dep.notify)

  5. notify调用Watcher的update()方法

  6. update() 方法调用run方法更新视图

  7. dep是一个观察者模式

     ```javascript
     class Dep {
       constructor() {
         // 记录所有的订阅者
         this.subs = []
       }
       // 添加订阅者
       addSub(sub) {
         if(sub && sub.update) {
           this.subs.push(sub)
         }
       }
       
       // 发布通知
       notify() {
         this.subs.forEach(sub => {
           sub.update()
         })
       }
     }
     // 订阅者-观察者
     class Watcher {
       update() {
         console.log("update")
       }
     }
     
     // test
     const dep = new Dep()
     const watcher = new Watcher()
     dep.addSub(watcher)
     dep.notidy()
     ```

     

     

* Vue.js 中的依赖收集是怎么处理的？和闭包有什么关联吗？

  利用观察者模式处理的, 在getter中通过depend方法收集依赖, 即将每一个响应对象添加到订阅者集合里, 然后在setter中通过notify方法调用update方法做更新

  

* Vue.js 中的模板解析需要经历哪几个阶段？整个过程就是把模版转成渲染函数render

  1. compileToFunctions()先从缓存中加载render函数, 有就直接返回, 

  2. 没有的话调用compile(), 用于合并options: 将用户传入的options和初始化的options合并, 然后将template和合并好的options传递给baseCompile: 模版编译的核心部分:

     1. 调用parse()把模版解析成 ast 抽象语法树
     2. 调用optimize(ast, options), 优化抽象语法树
     3. 调用generate(ast, options), 把抽象语法树生成字符串形式的js代码

  3. 最后回到compileToFunctions, 通过createFunction把字符串形式的js代码转成render函数, 并将其挂在到Vue实例的options对应的方法中.

     

* Vue.js 中的虚拟节点优势是什么？

  **思路**

  1. 什么是虚拟节点
  2. 页面渲染流程
  3. 结果: 减少dom操作, 提高页面渲染速度

  

* Vue.js 中的 DIFF 算法是怎么处理的？时间复杂度是多少？为什么？

  [DIFF算法详情](https://www.yuque.com/jiaorengui/ptee4x/oinrld)

  时间复杂度: o(n)

  为什么 ?

  

* Vue.js 中 `computed` / `watch` 实现的原理是什么？

* Vue.js 中有哪些周期函数？这些周期函数都是在什么时机执行的？

* Vue.js 中的 `$nextTick` 的原理是什么？它主要经历了哪些变化？为什么?

  **其原理是设置了一个异步任务**

  1. 先设置一个异步任务变量函数:

     1. 如果支持Promise, 且Promise没有定义, 就new 一个Promise.resolve()实例, ios中没有promise, 所以用定时器代替

     2. 支持H5的环境, 如果支持MutationObserver(h5监听dom变化的一个api)

     3. node环境, 如果有setImmediate,

     4. 如果以上三个都不是, 就用setTimeout

     5. 代码如下:

        ```javascript
        // src/core/util/next-tick.js (2.6.12)
        const callbacks = []
        let pending = false
        
        function flushCallbacks() {
          pending = false
          const copies = callbacks.slice(0)
          callbacks.length = 0
          for (let i = 0; i < copies.length; i++) {
            copies[i]()
          }
        }
        
        let timerFunc
        if (typeof Promise !== 'undefined' && isNative(Promise)) {
          const p = Promise.resolve()
          timerFunc = () => {
            p.then(flushCallbacks)
            // ios中没有promise,通过延时器来处理异步任务
            if (isIOS) setTimeout(noop)
          }
          isUsingMicroTask = true
          // MutationObserver IE11中才使用
        } else if (!isIE && typeof MutationObserver !== 'undefined' && (
            isNative(MutationObserver) ||
            // PhantomJS and iOS 7.x
            MutationObserver.toString() === '[object MutationObserverConstructor]'
          )) {
          // Use MutationObserver where native Promise is not available,
          // e.g. PhantomJS, iOS7, Android 4.4
          // (#6466 MutationObserver is unreliable in IE11)
          let counter = 1
          const observer = new MutationObserver(flushCallbacks)
          const textNode = document.createTextNode(String(counter))
          observer.observe(textNode, {
            characterData: true
          })
          timerFunc = () => {
            counter = (counter + 1) % 2
            textNode.data = String(counter)
          }
          isUsingMicroTask = true
          // ie, node 环境才支持
        } else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
          // Fallback to setImmediate.
          // Technically it leverages the (macro) task queue,
          // but it is still a better choice than setTimeout.
          timerFunc = () => {
            setImmediate(flushCallbacks)
          }
        } else {
          // Fallback to setTimeout.
          timerFunc = () => {
            // setTimeout最快也要4毫秒才会执行
            setTimeout(flushCallbacks, 0)
          }
        }
        ```

        

  2. nextTick函数

     1. 将nextTick的参数cb push进异步任务的回调函数数组, 如果没有cb, 则创建一个Promise 实例

     2. 不是pending状态的时候执行异步任务变量函数

     3. 代码如下: 

        ```javascript
        export function nextTick(cb ? : Function, ctx ? : Object) {
          let _resolve
          callbacks.push(() => {
            if (cb) {
              try {
                cb.call(ctx)
              } catch (e) {
                handleError(e, ctx, 'nextTick')
              }
            } else if (_resolve) {
              _resolve(ctx)
            }
          })
          if (!pending) {
            pending = true
            timerFunc()
          }
          // $flow-disable-line
          if (!cb && typeof Promise !== 'undefined') {
            return new Promise(resolve => {
              _resolve = resolve
            })
          }
        }
        ```

        

* Vue.js 对 DOM 的更新做了哪些标记优化处理？

* Vue.js 在语法层面可以做哪些优化处理？

* Vue.js 2.x 中的 Proxy 代理主要做了些什么工作？

* Vue.js 2.x 中如何支持 TypeScript ?

* Vue 3.x 的源码相对 Vue 2.x 主要做了哪些变化？

* Vue.js 中的 M / V / VM 分别指的是哪些？

  [MVVM及优缺点](https://juejin.cn/post/6844903903968903175#heading-1)

* Vue-loader 主要有哪些特性？

  [Vue-loader原理](https://www.yuque.com/jiaorengui/ptee4x/ackbaw)

  概括:

  1. 一种是hash模式, url中#部分的值为hash值, 它的变化不会向服务器请求数据, hash值的变化可以通过hashchange事件来监听
  2. 另一种方式是history模式, 是H5新增的一个api, 通过pushState({}, "", to)改变地址栏, 监听popState事件来实现
  3. 实现: 1. install方法, 安装插件, 将$router挂载到vue实例上, 2. 初始化一些方法: a: 将路由option通过一个对象保存起来, b: initComponents(通过渲染函数实现router-link, router-view组件), c: initEvent: hashchange事件和popstate事件

* Vue.js 如何做 ESLint 校验？

* Vue.js 如何做单元测试？

* 了解过 Vue-Router  / Vuex 的源码吗？（感知性问题，不会深入问）

* 手写一个发布 / 订阅模式？

  ```javascript
  class EventEmitter {
    constructor() {
      // 存储订阅者
      this.subs = Object.create(null)
    }
    
    // 注册事件
    $on(eventType, handle) {
      this.subs[eventType] = this.subs[eventType] || []
      this.subs[eventType].push(handle)
    }
    
    // 触发事件
    $emit(eventType) {
      if(this.subs[eventType]){
        this.subs[eventType].forEach(handler => {
          handler()
        })
      }
    }
  }
  
  // test
  const ee = new EventEmitter();
  ee.$on("click", () => {
    console.log('click1')
  })
  ee.$on("click", () => {
    console.log('click2')
  })
  ee.$emit('click')
  ```

  

* 简述 MVC / MVP / MVVM 的区别？

* 如果熟悉 Nuxt 等可能会问 SSR 的实现原理？

  [ssr原理](https://www.yuque.com/jiaorengui/ptee4x/kcetcc)

* 平常遇到 Vue.js 报 error / warning 的时候有深入追踪错误栈的习惯吗？

* Vue 2.x 中的数据劫持能否采用发布 / 订阅模式实现？采用观察者模式带来的优势和劣势有哪些？发布 / 订阅模式和观察者模式的区别是什么？

  [观察者模式、发布订阅模式的区别](https://www.yuque.com/jiaorengui/ptee4x/htsrpt#nyueE)

* Vue 的整个框架的实现原理大致可分为哪几个部分？

* [Vue响应式原理 ?](https://www.yuque.com/jiaorengui/ptee4x/cislvu)



#### 4. Vue.js 中组件之间通信有哪些方案？

- Element UI 中 `dispatch` 和 `broadcast` 是如何实现的？
- 祖先和子孙之间通信有哪些方案？
- 任意组件之间通信有哪些方案

#### 5. Vue 如何定制化脚手架？需要考虑哪些因素？

#### 6. `$nextTick` 执行的时机和 DOM 渲染的关系是什么？

- 宏任务和微任务有什么区别？
- 哪些是宏任务哪些是微任务？
- `$nextTick`在几个版本迭代中都经历了什么变化？
- 打开新的浏览器窗口时会重新创建一个新的 Network 进程吗？

#### 7. Vue 使用的是什么版本，如何配合 TypeScript 工作，TypeScript 有哪些特性？

#### 8. Vue 里的 `keep-alive` 是怎么实现的？

- 设置了 `keep-alive` 之后对组件渲染的生命周期有什么影响？
- `keep-alive` 有哪些特性？

#### 9.  说说 Vue 里的数据劫持在不同版本里是如何处理的？

#### 10. Vue 能做哪些性能优化？

- 路由懒加载是如何实现的？
- Coding Split 和哪些 Webpack 配置相关？
- Polyfill 是什么？Vue 支持哪些相关的可配置化信息？
- Vue 中可以使用 JSX 吗？（居然有人不清楚 JSX 是什么）

#### 11. 公司的组件库搭建、设计与维护？

* Webpack 构建速度 / 性能优化？

* Webpack 分析工具？

* 组件库的框架设计？

* 构建 Bundle 优化？

* 按需加载功能可以有哪些实现方案？

* 主要负责了哪些组件的设计？

* 主动性的业务组件封装案例？

* 看过 xxx 组件库的源码设计吗？

* 设计组件的时候会考虑对 TypeScript 进行支持吗？

* 业务组件的单元测试一般需要测试什么内容？

#### 12. 了解 Element UI 组件的框架设计吗？

#### 13. 组件库要做按需加载，觉得应该怎么做？

#### 14. 如何自动屏蔽 Input 的自动密码填充？

#### 15. Vue 的父组件和子组件生命周期钩子执行顺序是什么



## 疑问

1. 时间复杂度怎么算出来的, 用时多久 ?