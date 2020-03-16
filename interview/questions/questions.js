/*
 * @Author: tiny.jiao@aliyun.com 
 * @Date: 2019-04-01 22:22:06 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2020-01-14 21:00:59
 */

/** 
 * 从面试中发现自己的问题所在，不断总结，不断进步
 * 1: vue-router实现原理？
 *  前端路由:
 *  1): hash模式:http://www.xxx.com/#/login
 *  这种#后面的hash值变化不会导致浏览器向服务器发出请求,每次hash值变化,还会出发hashChange事件
 * 2: 遍历数组，指定条件下跳出循环，不用for，如何做？some()/every()
 * 3: 基本数据类型: Boolean, String, Number, undefined, null, Symble, BigInt
 * 4: 原型链
 * 5: 闭包, 
 * 6: vue双向数据绑定实现原理
 * 7: 深拷贝和浅拷贝的区别，及如何实现？
 *    深拷贝：不仅将原对象的各个属性逐个复制，而且将原对象各个属性包含的对象也依次采用深复制的方法递归复制到新对象上
 *    浅拷贝：只会将对象的属性依次进行复制，不会递归复制
 * 8: Vue导航守卫
 * 9: $nextTick()
 * 10: 有哪些攻击方式
 * 11: http1和http2有哪些不同
 * 12: vue中虚拟DOM是什么东西，今天第二次被问到了，，
 * 13: querySelectAll()与document.getElementsByClassName()有什么区别
 *    1: W3C标准，querySelectAll()是W3C中Selectors的API规范[1],getElementsBy系列属于W3C的DOM规范[2]
 *    2: 浏览器兼容，querySelectAll()已被IE 8+、FF 3.5+、Safari 3.1+等良好支持，getElementsBy系列要IE9以上
 *    3: 接收参数，querySelectAll()接收的参数是一个CSS选择器，getElementsBy系列只能是单一的className、tagName 和 name，如
 *      document.querySelectorAll('#header')/document.getElementById('header')
 *    4: 返回值，querySelectAll()返回Static Node List(包括Element，Text和Comment),getElementsBy系列返回一个Live Node List(只包括element节点)
 * 14: CSS3了解多少
 * 15: js垃圾回收机制
 * 16: 元素垂直剧中有几种实现方式？
 * 17: 性能优化方式有哪些？
 * 18: watch和computed有什么区别及应用场景
 * 19: 怎么实现Vue自己写的组件的按需加载
 * 20: vue源码和element-ui的源码，了解多少？
 * 21: vue自定义指令
*/

/**
 * 
 * 1: vue-router实现原理？
 * 前端路由:
 *  1): hash模式:http://www.xxx.com/#/login, 2014年之前主流都是通过hash来实现路由
 *  这种#后面的hash值变化不会导致浏览器向服务器发出请求,每次hash值变化,还会出发hashChange事件,通过监听hashchange来实现更新页面部分内容的操作
 *  2): history模式
 *  2014后,H5标准的发布,多了两个api,pushState,replaceState,通过这两个api可以改变url地址且不会发送请求,同时还有popstate事件,但是原理跟hash实现相同的,但是H5实现单页路由就不会有#,但是当用户刷新页面操作时浏览器还是会向服务器发送请求,所以需要服务器支持
 */
function matchAndUpdate() {
  // todo匹配路径  做dom更新操作
}
window.addEventListener('hashchange', matchAndUpdate);

function matchAndUpdate2() {
  // todo匹配路径  做dom更新操作
}
window.addEventListener('popstate', matchAndUpdate2);


// 对象深拷贝
const deepCopy = obj => {
  let objArr = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const e = obj[key]
        if (e && typeof e ==='object') {
          objArr[key] = deepCopy(e)
        } else {
          objArr[key] = e
        }
      }
    }
  }
  return objArr
}

const obj = {
  name: 'tiny',
  age: 20,
  option: function () {
    this.name
  },
  action: {
    write: function () {
      return 'coding'
    },
    read: function () {
      return 'talk each other'
    }
  }
}
console.log(obj)
console.log(deepCopy(obj))

/** 
 * Vue组件的按需加载方法
 * 
*/
// 1: resolve的方式，即Vue的异步组件
{
  path: '/promiseDemo',
  name: 'PromiseDemo',
  component: resolve => require(['../components/PromiseDemo'], resolve)
}
// 2: import 方式
const ImportDemo = () => import('../components/PromiseDemo')
const ImportDemo2 = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../components/ImportFuncDemo')
const ImportDemo3 = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../components/ImportFuncDemo2')
// 3: webpack提供的require.ensure()
{
  path: '/promiseDemo',
  name: 'PromiseDemo',
  component: resolve=> require.ensure([], ()=>resolve(require('../components/PromiseDemo')), 'demo')
},
{
  path: '/Hello',
  name: 'Hello',
  component: resolve=> require.ensure([], ()=>resolve(require('../components/Hello')), 'demo')
}

/** 
 * watch和computed有什么区别及应用场景
 * watch应用场景：数据变化时需要做一些异步操作的时候，可以设置中间状态
 * computed应用场景：复杂的逻辑计算的时候(是基于它们的响应式依赖进行缓存的,只有响应式依赖发生改变时才会重新求值)
*/

/**
 * 8: Vue导航守卫
 * 1): 全局: beforeEach()/beforeResolve():全局解析守卫/afterEach():全局后置钩子
 * 2): 路由独享: beforeEnter()
 * 3): 组件内守卫: beforeRouteEnter() / beforeRouteUpdate() /  beforeRouteLeave()
 * 完整的流程: 
 * 1导航被触发 -> 2失活组件 beforeRouteLeave() -> 3全局 beforeEach() -> 4 重用组件调用 beforeRouteUpdate() -> 5 在路由配置里调用 beforeEnter() -> 6 被激活的组件 beforeRouteEnter() -> 7 全局的解析守卫 beforeResolve() -> 8 导航被确认 -> 9 全局 afterEach() -> 10 触发dom更新
 */ 

/**
 * vue自定义指令
 * 1: 全局,
 * 2: 局部
 */
// 全局自定义指令
Vue.directive('focus', {
  bind: el => {
    el.focus()
  },
  inserted: el => {
    el.focus()
  },
  update:() => {

  },
  componentUpdated: () => {

  },
  unbind: () => {
    
  }
})