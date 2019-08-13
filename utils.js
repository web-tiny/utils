/*
 * @Author: jrg 
 * @Date: 2018-12-27 14:11:49 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-04-03 23:29:32
 */

/**
 * Array
 * @param {*} arr 
 * @param {*} value 
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


// 获取url参数并返回一个由key和valu组成的对象
const getUrlParameters = url => url.match(/([^?=&]+)(=([^&]*))/g).reduce((a,v) =>(a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=')+1), a),{})

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
  console.log('I woke up after 1 second.')
}
sleepWork()

// 返回一个数字数组的平均值
const arrayAverage = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length

// 返回一个数字数组的和
const arraySum = arr => arr.reduce((acc, curr) => acc + curr, 0)

// 将数字转换为数字数组
const digitize = n => [...n].map(i => parseInt(i))

// 计算一个数的阶乘
const factorial = n => n < 0 ?(() => { throw new TypeError('Negative numbers are not allowed')}) : n <= 1 ? 1: n * factorial( n-1 )

// 生成一个斐波那契数列数组
const fibonacci = n => Array(n).fill(0).reduce((acc, curr, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2]: i), [])
console.log(fibonacci(8)) //[ 0, 1, 1, 2, 3, 5, 8, 13 ]

// 判断是否是偶数
const isEven = n => n % 2 === 0

// 返回指定范围内的随机整数
const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// 返回指定范围内的随机数
const randomNumberInRange = (min, max) => Math.random() * (max - min + 1) + min

// 将数字四舍五入到指定的位数
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)

/**
 * Object
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

// 将字符串中每个单词的首字母大写
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase())

// 从匹配转换字符串：someLabelThatNeedsToBeCamelized -> some-label-that-needs-to-be-camelized
const fromCamelCase = (str, separator = '_') =>
  str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2').toLowerCase()

// 将字符串转换为匹配:some_database_field_name->someDatabaseFieldName
const toCamelCase = str => str.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2, offset) => p2 ? p2.toUpperCase() : p1.toLowerCase())

// 字符串反转
const reverseString = str => [...str].reverse().join('')

// 按字母顺序对字符串中的字符进行排序
const sortCharactersInString = str => str.split('').sort((a, b) => a.localeCompare(b)).join('')

// 将字符串截断为指定长度
const truncateString = (str, num) => str.length > num ? str.slice(0, num > 3 ? num -3 : num) + '...' : str

// 去掉字符串的首尾空格
const trim = str => str.replace(/(^\s*)|(\s*$)/g, '')

// 去掉字符串的所有空格
const trimAll = str => str.replace(/\s/g,'')

/**
 * usefal
 * @param  {...any} args 
 */
// 返回第一个非undefined/null/''/NaN参数
const coalesce = (...args) => args.find(_ => ![undefined, null, '', NaN].includes(_))

// 返回值的类型
const getType = v => v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase()

// 将以#开头的颜色值转化为rgb值
const hexToRgb = hex => {
  const extendHex = shortHex => '#' + shortHex.slice(shortHex.startsWith('#') ? 1 : 0).split().map(x => x + x).join('')
  const extendedHex = hex.slice(hex.startsWith('#') ? 1 : 0).length === 3 ? extendHex(hex) : hex
  return `rgb(${parseInt(extendedHex.slice(1), 16) >> 16}, ${(parseInt(extendedHex.slice(1), 16) & 0x00ff00) >> 8}, ${parseInt(extendedHex.slice(1), 16) & 0x0000ff})`
}

// 将 RGB 组件的值转换为 colorcode
const RGBToHex = (r, g, b) => '#' + ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')

// const isArray = val => !!val && Array.isArray(val)
/**
 * 因为IE9,Firefox4+,Safari5+,Opera10.5+,chrome才实现Array.isArray方法
 * 这样写更健壮
 * @param {*} val 
 */
const isArray = val => typeof Array.isArray === 'function' ? Array.isArray(val) : Object.prototype.toString.call(val) === '[object Array]'

const isBoolean = val => typeof val === 'boolean'

const isFunction = val => val && typeof val === 'function'

const isNumber = val => /^[0-9]+.?[0-9]*$/.test(val)

const isString = val => typeof val === 'string'

const isSymbol = val => typeof val === 'symbol'

const isObject = val => Object.prototype.toString.call(val) === '[object Object]'

// 判断正整数
const isPositiveInteger = data => /^[0-9]*[1-9][0-9]*$/.test(data)

// 验证是否中文
const isChineseName = name => /^[\u4E00-\u9FA5]{1,30}$/.test(name)

// 检查是否是有效的email
const validateEmail = str => /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str)

// 检查是否为数字
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n

// 验证是否是有效的手机号
const validatePhone = phone => /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)

// 验证有效的密码：至少1个大写字母，1个小写字母和1个数字，长度为6-16
const validPassword = val => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){6,16}$/.test(val)

//验证用户名，4到16位（字母，数字，下划线，减号）
const validUserName = val => /^[a-zA-Z0-9_-]{4,16}$/.test(val)

// 验证url
const validURL = val => /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(val)

// 验证车牌号
const validCarNum = val => /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})$/.test(val)

// 验证银行卡号13-19位，第一位不为0
const validBankNum = val => /^([1,9]{1})(\d{12,18})$/.test(val)

// 测量执行函数所用的时间
const timeTaken = callback => {
  console.time('timeTaken')
  const r = callback()
  console.timeEnd('timeTaken')
  return r
}

/**
 * 将日期转为自己想要的格式（如果第二个参数不传，默认是：yy-mm-dd hh:mm:ss），
 * 如果不是内部的格式，则返回一个年月日时分秒的对象，自己组装成想要的格式
 * @param {*} t（date或者时间戳）
 * @param {*} format （自己想要的格式）
 */
const formatDate = (t, format = 'yy-mm-dd hh:mm:ss') => {
  const time = new Date(t)
  const paddingZero = data => (data < 10 ? '0' + data : data)

  const y = time.getFullYear()
  const m = time.getMonth() + 1
  const d = paddingZero(time.getDate())
  const h = paddingZero(time.getHours())
  const mi = paddingZero(time.getMinutes())
  const s = paddingZero(time.getSeconds())

  let outputTime = null
  if (format === 'yy-mm-dd') {
    outputTime = y + '-' + m + '-' + d
  } else if (format === 'yy-mm-dd hh:mm:ss') {
    outputTime = y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + s
  } else if (format === 'yy/mm/dd') {
    outputTime = y + '/' + m + '/' + d
  } else if (format === 'yy/mm/dd hh:mm:ss') {
    outputTime = y + '/' + m + '/' + d + ' ' + h + ':' + mi + ':' + s
  } else if (format === 'hh:mm:ss') {
    outputTime = h + ':' + mi + ':' + s
  } else {
    outputTime = { years: y, mouths: m, days: d, hours: h, minutes: mi, seconds: s }
  }
  return outputTime
}

/**
 * 基于当前时间的多少天前或者多少天后
 * @param {*} format 前/后
 * @param {*} date 多少天
 * @param {*} showFormat 格式
 */
const getSomeDay = (format, date, showFormat) => {
  if ((format !== '+') && (format !== '-')) {
    console.warn('第一个参数只能是'+'或者'-'字符')
    return ''
  }
  if (!isPositiveInteger(date)) {
    console.warn('第二个参数只能是正整数')
    return ''
  }
  let basicTimeStamp = new Date().valueOf()
  let time
  format === '+' && (time = basicTimeStamp + (3600 * 1000 * 24 * date))
  format === '-' && (time = basicTimeStamp - (3600 * 1000 * 24 * date))

  return formatDate(time, showFormat)
}

// 身份证校验码校验
const checkCode = (val) => {
  const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
  let code = val.substring(17)
  if (p.test(val)) {
    let sum = 0
    for (let i = 0; i < 17; i++) {
      sum += val[i] * factor[i]
    }
    if (parity[sum % 11] == code.toUpperCase()) {
      return true
    }
  }
  return false
}

// 身份证出生日期校验
const checkDate = val => {
  const pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/
  if (pattern.test(val)) {
    const year = val.substring(0, 4)
    const month = val.substring(4, 6)
    const date = val.substring(6, 8)
    const date2 = new Date(year + '-' + month + '-' + date)
    if (date2 && date2.getMonth() == (parseInt(month) - 1)) {
      return true
    }
  }
  return false
}

// 身份证省级地址码校验
const checkProv = val => {
  var pattern = /^[1-9][0-9]/
  var provs = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门'
  }
  if (pattern.test(val)) {
    if (provs[val]) {
      return true
    }
  }
  return false
}

/**
 * 身份证号校验 val为String类型
 * @param {*} val 
 */
const validateCardID = val => {
  if (checkCode(val)) {
    const date = val.substring(6, 14)
    if (checkDate(date)) {
      if (checkProv(val.substring(0, 2))) {
        return true
      }
    }
  }
  return false
}

/**
 * 过滤对象中为false的键,
 * 注意：当值为0的时候，falsy值为false
 * @param {*} obj 
 */
const filterObjectNullKey = obj => {
  for (const key in obj) {
    (obj[key] !== 0 && !obj[key]) && delete obj[key]
  }
  return obj
}

/**
 * 节流函数，防止onresize,mousemove,onscroll等事件造成的卡顿
 * @param {需要节流的方法} fn 
 * @param {延迟时间，单位是毫秒} time 
 */
const throttle = (fn, time) => {
  clearTimeout(fn.tId)
  fn.tId = setTimeout(() => {
    fn.call(this)
  }, time)
}

// cookie
const cookieOption = {
  _get: (name) => {
    let cookieName = encodeURIComponent(name) + '='
		let	cookieStart = document.cookie.indexOf(cookieName)
		let	cookieValue = null
    let	cookieEnd = ''
    
		if(cookieStart > -1) {
			cookieEnd = document.cookie.indexOf(';', cookieStart)
			if(cookieEnd == -1) {
				cookieEnd = document.cookie.length
			}
			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
		}
		return cookieValue
  },
  _set: (name, value, expires, path, domain, secure) => {
		let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value)
		if(expires instanceof Date) {
			cookieText += '; expires=' + expires.toGMTString()
		}
		if(path) {
			cookieText += '; path=' + path
		}
		if(domain) {
			cookieText += '; domain=' + domain
		}
		if(secure) {
			cookieText += '; secure'
		}
		document.cookie = cookieText
  },
  _unset: (name, path, domain, secure) => {
		this._set(name, '', new Date(0), path, domain, secure)
	}
}

export default {
  validateCardID,
  getSomeDay,
  formatDate,
  validatePhone,
  validateNumber,
  validateEmail,
  timeTaken,
  isChineseName,
  isPositiveInteger,
  isSymbol,
  isString,
  isNumber,
  isFunction,
  isBoolean,
  isArray,
  isObject,
  RGBToHex,
  hexToRgb,
  getType,
  coalesce,
  truncateString,
  sortCharactersInString,
  reverseString,
  toCamelCase,
  fromCamelCase,
  capitalizeEveryWord,
  anagrams,
  objectToPairs,
  objectFromPairs,
  cleanObj,
  round,
  randomNumberInRange,
  randomIntegerInRange,
  isEven,
  fibonacci,
  factorial,
  digitize,
  arraySum,
  arrayAverage,
  sleep,
  promisify,
  scrollToTop,
  redirect,
  getUrlParameters,
  union,
  take,
  sample,
  remove,
  pull,
  pick,
  nthElement,
  initializeArrayWithValues,
  everyNth,
  uniqueValue,
  similarity,
  symmetricDifference,
  defference,
  chunk,
  compact,
  deepFlatten,
  countOccurrences,
  filterObjectNullKey,
  trim,
  trimAll,
  throttle,
  validPassword,
  validUserName,
  validURL,
  validCarNum,
  validBankNum,
  cookieOption,
  deepCopy
}
