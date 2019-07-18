/*
 * @Author: tiny.jiao@aliyun.com 
 * @Date: 2019-04-03 23:10:02 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-04-03 23:10:43
 */
// 判断是否是偶数
const isEven = n => n % 2 === 0

// 返回指定范围内的随机整数
const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// 返回指定范围内的随机数
const randomNumberInRange = (min, max) => Math.random() * (max - min + 1) + min

// 将数字四舍五入到指定的位数
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)