/*
 * @Author: tiny.jiao@aliyun.com 
 * @Date: 2019-04-03 23:11:36 
 * @Last Modified by:   tiny.jiao@aliyun.com 
 * @Last Modified time: 2019-04-03 23:11:36 
 */
// 移除 JSON 对象指定的属性,并返回该属性组成对象
const cleanObj = (obj, keysToKeep = [], childIncator) => {
  Object.keys(obj).forEach(key => {
    if (key === childIncator) {
      cleanObj(obj[key], keysToKeep, childIncator)
    } else if(!keysToKeep.includes(key)) {
      delete obj[key]
    }
  })
}
const testObj = {
  a: 1,
  b: 2,
  children: {
    a: 1,
    b: 2,
    children: {
      a: 1,
      b: 2
    }
  }
}
cleanObj(testObj, ['a'], 'children')
console.log(testObj) // { a: 1, children: { a: 1, children: { a: 1 } } }

// 从给定的键值对数组创建对象
const objectFromPairs = arr => arr.reduce((a, v) => (a[v[0]] = v[1], a), {})

// 从对象创建键值对数组的数组
const objectToPairs = obj => Object.keys(obj).map( k => [k, obj[k]])

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