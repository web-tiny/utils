/*
 * @Author: tiny.jiao@aliyun.com 
 * @Date: 2019-04-01 22:22:06 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-04-02 00:46:04
 */

/** 
 * 从面试中发现自己的问题所在，不断总结，不断进步
 * 1: vue-router实现原理？
 * 2: 遍历数组，指定条件下跳出循环，不用for，如何做？
 * 3: 基本数据类型
 * 4: 原型链
 * 5: 闭包
 * 6: vue双向数据绑定实现原理
 * 7: 深拷贝和浅拷贝的区别，及如何实现？
 *    深拷贝：不仅将原对象的各个属性逐个复制，而且将原对象各个属性包含的对象也依次采用深复制的方法递归复制到新对象上
 *    浅拷贝：只会将对象的属性依次进行复制，不会递归复制
 * 8: Vue导航守卫
 * 9: $nextTick()
 * 10: 有哪些攻击方式
 * 11: http1和http2有哪些不同
 * 12: vue中虚拟DOM是什么东西
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
*/

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