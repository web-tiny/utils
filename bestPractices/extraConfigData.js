/*
 * @Author: Tiny 
 * @Date: 2019-01-25 14:23:48 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-01-25 14:49:31
 */

/** 
 * 抽离配置数据
*/
function validdate (value) {
  if (!value) {
    alert('Invalid value')
    location.href = '/error/invalid.php'
  }
}
function toggleSelected (element) {
  if (hasClass(element, 'selected')) {
    removeClass(element, 'selected')
  } else {
    addClass(element, 'selected')
  }
}
/** 
 * 上面代码的问题：
 *  'Invalid value','/error/invalid.php','selected'是hardcoded,
 *  如果validdate，toggleSelected这两个方法被多次调用，如果要改动这些数据，被调用多少次就要改多少次，
 *  这时候极易出错
*/

let config = {
  MSG_INVALID_VALUE: 'Invalid value',
  URL_INVALID: '/error/invalid.php',
  CSS_SELECTED: 'selected'
}
function validdate2 (value) {
  if (!value) {
    alert(config.MSG_INVALID_VALUE)
    location.href = config.URL_INVALID
  }
}
function toggleSelected2 (element) {
  const SELECTED = config.CSS_SELECTED

  if (hasClass(element, SELECTED)) {
    removeClass(element, SELECTED)
  } else {
    addClass(element, SELECTED)
  }
}
