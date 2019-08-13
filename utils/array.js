/*
 * @Author: tiny.jiao@aliyun.com 
 * @Date: 2019-04-03 23:02:55 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-04-03 23:07:22
 */

/** 
 * Array,常用方法
*/

// 计算数组中一个值出现的次数
const countOccurrences = (arr, value) => arr.reduce((a, v) => v === value? a + 1: a + 0, 0)

// 将一个任何维的数组深拼合成一维数组
const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v): v))

// 移除falesy值，返回一个没有falesy值的数组
const compact = arr => arr.filter(Boolean)

// 将数组块划分为指定大小的较小数组
const chunk = (arr, size) => Array.from({length: Math.ceil(arr.length / size)}, (v, i) => arr.slice(i * size, i * size + size))

// 两个数组的差值，a数组中没有在b数组中的值组成的数组
const defference = (a, b) => {
  const s = new Set(b)
  return a.filter(x => !s.has(x))
}

// 两个数组的补集（a不在b中，b不在a中的组成的数组）
const symmetricDifference = (a, b) => {
  const sA = new Set(a)
  const sB = new Set(b)
  return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))]
}

// 两个数组的交集
const intersection = (a, b) => {
  const s = new Set(b)
  return a.filter(x => s.has(x))
}
const similarity = (arr, values) => arr.filter(v => values.includes(v))

// 去重
const uniqueValue = arr => [...new Set(arr)]

// 取第n倍个元素（按下标)
const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === 0)

// 初始化数组的指定长度的值
const initializeArrayWithValues = ( n, value = 0 ) => Array(n).fill(value)

// 返回数组的第n个元素
const nthElement = (arr, n = 0) => (n > 0 ? arr.slice(n, n+1) : arr.slice(n))[0]

// 从对象中选取对应于给定键的键值对
const pick = (obj, arr) => arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {})

// 删除数组中的指定值，返回除去删除的值的新数组
const pull = (arr, ...args) => {
  let pulled = arr.filter((v, i) => !args.includes(v))
  arr.length = 0
  pulled.forEach(v => {
    arr.push(v)
  })
}

// 从数组中移除给定方法返回false的元素，返回删除的数 组成的数组
const remove = (arr, func) => Array.isArray(arr) ? arr.filter(func).reduce((acc, val) => {
  arr.splice(arr.indexOf, 1)
  return acc.concat(val)
}, []) : []

// 返回数组中(也可以是字符串)的随机元素
const sample = arr => arr[Math.floor(Math.random() * arr.length)]

// 返回数组中除了第一个元素的所有元素
const tail = arr => arr.length > 1 ? arr.slice(1) : arr
const take = (arr, n = 1) => arr.slice(0, n)

// 合并两个数组并去重
const union = (a, b) => Array.from(new Set([...a, ...b]))

// 返回一个数字数组的平均值
const arrayAverage = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length

// 返回一个数字数组的和
const arraySum = arr => arr.reduce((acc, curr) => acc + curr, 0)

// 将数字转换为数字数组
const digitize = n => [...n].map(i => parseInt(i))