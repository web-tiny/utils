/*
 * @Author: tiny.jiao@aliyun.com 
 * @Date: 2019-04-03 23:17:15 
 * @Last Modified by:   tiny.jiao@aliyun.com 
 * @Last Modified time: 2019-04-03 23:17:15 
 */
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

// 平滑滚动到页面顶部
const scrollToTop = () => {
  const c = document.documentElement.scrollTop ||  document.body.scrollTop
  if ( c > 0 ) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c-c/8)
  }
}

// 获取url参数并返回一个由key和valu组成的对象
const getUrlParameters = url => url.match(/([^?=&]+)(=([^&]*))/g).reduce((a,v) =>(a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=')+1), a),{})

// 重定向到指定的url
const redirect = (url, asLink = true) => asLink ? window.location.href = url : window.location.replace(url)

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