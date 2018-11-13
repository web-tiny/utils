/**
 * Array
 * @param {*} arr 
 * @param {*} value 
 */
// 计算值的次数
const countOccurrences = (arr, value) => arr.reduce((a, v) => v === value? a + 1: a + 0, 0)
console.log(countOccurrences([1, 1, 1, 2, 2, 3, 9], 3))  // 1

// 深拼合数组
const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v): v))
console.log(deepFlatten([1, [2], [[3, [4, 5, [6], 10], 9], 8], 7])) // [ 1, 2, 3, 4, 5, 6, 10, 9, 8, 7 ]

// 移除falesy值
const compact = arr => arr.filter(Boolean)
console.log(compact([0, 1, "", false, NaN, undefined, 2, 3, 's'])) // [ 1, 2, 3, 's' ]

// 将数组块划分为指定大小的较小数组
const chunk = (arr, size) => Array.from({length: Math.ceil(arr.length / size)}, (v, i) => arr.slice(i * size, i * size + size))
console.log(chunk([1, 2, 3, 4, 5], 3)) // [ [ 1, 2, 3 ], [ 4, 5 ] ]

// 两个数组的差值
const defference = (a, b) => { const s = new Set(b); return a.filter(x => !s.has(x)) }
console.log(defference([1, 2, 3], [1, 2, 4])) // [3]

// 两个数组的补集
const symmetricDifference = (a, b) => {
  const sA = new Set(a)
  const sB = new Set(b)
  return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))];
}
console.log(symmetricDifference([2, 3, 4, 5, 6, 7], [4, 5, 20, 30, 50, 60])) // [ 2, 3, 6, 7, 20, 30, 50, 60 ]

// 两个数组的交集
const intersection = (a, b) => { const s = new Set(b); return a.filter(x => s.has(x)) }
console.log(intersection([1, 2, 3], [4, 3, 2])) // [ 2, 3 ]
const similarity = (arr, values) => arr.filter(v => values.includes(v))
console.log(similarity([1, 2, 3], [4, 3, 2])) // [ 2, 3 ]

// 去重
const uniqueValue = arr => [...new Set(arr)]
console.log(uniqueValue([1, 1, 2, 2, 3, 3, 4, 5])) //[ 1, 2, 3, 4, 5 ]

// 取第n倍个元素
const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === 0)
console.log(everyNth([1, 2, 3, 4, 5, 6], 3)) //[ 1, 4 ]

// 初始化数组的指定长度的值
const initializeArrayWithValues = ( n, value = 0 ) => Array(n).fill(value)
console.log(initializeArrayWithValues(5, 2)) //[ 2, 2, 2, 2, 2 ]

// 返回数组的第n个元素
const nthElement = (arr, n = 0) => (n > 0 ? arr.slice(n, n+1) : arr.slice(n))[0]
console.log(nthElement(['A', 'b', 'c'], 2)) // c
console.log(nthElement(['A', 'b', 'c'], -2)) // b
console.log(nthElement(['A', 'b', 'c'], 3)) // undefined
console.log(nthElement(['A', 'b', 'c'])) // A

// 从对象中选取对应于给定键的键值对
const pick = (obj, arr) => arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {})
console.log(pick({ a: 1, b: "2", c: 3 }, ["a", "c"])) // { a: 1, c: 3 }

// 拉去数组中不包括指定值的数组
const pull = (arr, ...args) => {
  let pulled = arr.filter((v, i) => !args.includes(v))
  arr.length = 0
  pulled.forEach(v => {
    arr.push(v)
  })
}
let myarray = ["a", "b", "c", "a", "b", "c"]
pull(myarray, 'a', 'c')
console.log(myarray) // [ 'b', 'b' ]
let myarray2 = [5, 6, 7, 10, 20, 60]
pull(myarray2, 10, 20)
console.log(myarray2) // [ 5, 6, 7, 60 ]

// 从数组中移除给定方法返回false的元素
const remove = (arr, func) => Array.isArray(arr) ? arr.filter(func).reduce((acc, val) => {
  arr.splice(arr.indexOf, 1)
  return acc.concat(val)
}, []) : []
console.log(remove([1, 2, 3, 4], n => n % 2 === 0)) // [ 2, 4 ]

// 返回数组中(也可以是字符串)的随机元素
const sample = arr => arr[Math.floor(Math.random() * arr.length)]
console.log(sample([7, 9, 11]))
console.log(sample('jiaorengui'))

// 返回数组中除了第一个元素的所有元素
const tail = arr => arr.length > 1 ? arr.slice(1) : arr
const take = (arr, n = 1) => arr.slice(0, n)

// 合并两个数组并去重
const union = (a, b) => Array.from(new Set([...a, ...b]))
console.log(union([1, 2, 3], [4, 3, 2])) // [ 1, 2, 3, 4 ]


// 获取url参数转为一个对象
const getUrlParameters = url => url.match(/([^?=&]+)(=([^&]*))/g).reduce((a,v) =>(a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=')+1), a),{})
console.log(getUrlParameters("http://url.com/page?age=18&name=jiao&education=1"))
console.log("http://url.com/page?age=18&name=jiao&education=1".match(/([^?=&]+)(=([^&]*))/g))

// 重定向到指定的url
const redirect = (url, asLink = true) => asLink ? window.location.href = url : window.location.replace(url)

// 平滑滚动到页面顶部
const scrollToTop = () => {
  const c = document.documentElement.scrollTop ||  document.body.scrollTop
  if ( c > 0 ) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c-c/8)
  }
}

// 将函数变为异步代码
const promisify = func => (...args) => new Promise((resolve, reject) => func(...args, (err, result) => err ? reject(err): resolve(result)))
const delay = promisify((d,cd) => setTimeout(cd,d))
delay(2000).then(()=> console.log('hi'))

// 延迟异步函数的执行
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
async function sleepWork() {
  console.log('I\'m going to sleep for 1 second.')
  await sleep(1000)
  console.log('I woke up after 1 second.');
}
sleepWork()

// 返回一个数字数组的平均值
const arrayAverage = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length
console.log(arrayAverage([1,2,3,4,5])) // 3

// 返回一个数字数组的和
const arraySum = arr => arr.reduce((acc, curr) => acc + curr, 0)
console.log(arraySum([1, 2, 3, 4, 5])) // 15

// 将数字转换为数字数组
const digitize = n => [...n].map(i => parseInt(i))
console.log(digitize('343453')) // [ 3, 4, 3, 4, 5, 3 ]

// 计算一个数的阶乘
const factorial = n => n < 0 ?(() => { throw new TypeError('Negative numbers are not allowed')}) : n <= 1 ? 1: n * factorial( n-1 )
console.log(factorial(6)) // 720

// 生成一个斐波那契数列数组
const fibonacci = n => Array(n).fill(0).reduce((acc, curr, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2]: i), [])
console.log(fibonacci(8)) //[ 0, 1, 1, 2, 3, 5, 8, 13 ]

// 判断是否是偶数
const isEven = n => n % 2 === 0

// 返回指定范围内的随机整数
const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
console.log(randomIntegerInRange(1, 3))

// 返回指定范围内的随机数
const randomNumberInRange = (min, max) => Math.random() * (max - min + 1) + min
console.log(randomNumberInRange(1, 3))

// 将数字四舍五入到指定的位数
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)
console.log(round(5.00857))

/**
 * Object
 */
// 移除从 JSON 对象指定的属性之外的任何特性
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

// 从给定的键值对创建对象
const objectFromPairs = arr => arr.reduce((a, v) => (a[v[0]] = v[1], a), {})
console.log(objectFromPairs([['a', 1], ['b', 2]])) // { a: 1, b: 2 }

// 从对象创建键值对数组的数组
const objectToPairs = obj => Object.keys(obj).map( k => [k, obj[k]])
console.log(objectToPairs({ a: 1, b: 2 })) // [ [ 'a', 1 ], [ 'b', 2 ] ]

/**
 * String
 */
// 生成字符串的所有字谜 
const anagrams = str => {
  if (str.length <= 2) {
    return str.length === 2 ? [str, str[1] + str[0]] : [str]
  }
  return str.split('').reduce((acc, letter, i) => acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)), [])
}
console.log(anagrams('abc')) // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]

// 将字符串中每个单词的首字母大写
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase())
console.log(capitalizeEveryWord('hello jiao rengui')) // Hello Jiao Rengui

// 从匹配转换字符串
const fromCamelCase = (str, separator = "_") =>
  str.replace(/([a-z\d])([A-Z])/g, "$1" + separator + "$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + separator + "$2").toLowerCase()
console.log(fromCamelCase('someLabelThatNeedsToBeCamelized', '-')) // some-label-that-needs-to-be-camelized

// 将字符串转换为匹配
const toCamelCase = str => str.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2, offset) => p2 ? p2.toUpperCase() : p1.toLowerCase())
console.log(toCamelCase('some_database_field_name')) //someDatabaseFieldName

// 字符串反转
const reverseString = str => [...str].reverse().join('')
console.log(reverseString('jiaorengui')) // iugneroaij

// 按字母顺序对字符串中的字符进行排序
const sortCharactersInString = str => str.split('').sort((a, b) => a.localeCompare(b)).join('')
console.log(sortCharactersInString('jiaorengui')) //aegiijnoru

// 将字符串截断为指定长度
const truncateString = (str, num) => str.length > num ? str.slice(0, num > 3 ? num -3 : num) + '...' : str
console.log(truncateString('jiao Rengui',10))

/**
 * usefal
 * @param  {...any} args 
 */
// 返回第一个非undefined/null/''/NaN参数
const coalesce = (...args) => args.find(_ => ![undefined, null, '', NaN].includes(_))
console.log(coalesce(null, undefined, "", NaN, "Waldo"))

// 返回值的类型
const getType = v => v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase()
console.log(getType(''))

// 将以#开头的颜色值转化为rgb值
const hexToRgb = hex => {
  const extendHex = shortHex => '#' + shortHex.slice(shortHex.startsWith('#') ? 1 : 0).split().map(x => x + x).join('')
  const extendedHex = hex.slice(hex.startsWith('#') ? 1 : 0).length === 3 ? extendHex(hex) : hex
  return `rgb(${parseInt(extendedHex.slice(1), 16) >> 16}, ${(parseInt(extendedHex.slice(1), 16) & 0x00ff00) >> 8}, ${parseInt(extendedHex.slice(1), 16) & 0x0000ff})`
}
console.log(hexToRgb('#27ae60'))

// 将 RGB 组件的值转换为 colorcode
const RGBToHex = (r, g, b) => '#' + ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0")
console.log(RGBToHex(255, 255, 255))

const isArray = val => !!val && Array.isArray(val)

const isBoolean = val => typeof val === 'boolean'

const isFunction = val => val && typeof val === 'function'

const isNumber = val => typeof val === 'number'

const isString = val => typeof val === 'string'

const isSymbol = val => typeof val === 'symbol'

// 测量执行函数所用的时间
const timeTaken = callback => {
  console.time('timeTaken')
  const r = callback()
  console.timeEnd('timeTaken')
  return r
}
console.log(timeTaken(() => Math.pow(2,100)))

// 检查是否是有效的email
const validateEmail = str => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str)
console.log(validateEmail('234@foxmail.com'))

// 检查是否为数字
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n