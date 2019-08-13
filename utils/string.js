/*
 * @Author: tiny.jiao@aliyun.com 
 * @Date: 2019-04-03 23:14:06 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-01 20:48:17
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

// 判断一个字符是由2个字节还是4个字节组成的最简单方法
const is32Bit = c => c.codePointAt(0) > 0xFFFF;