/*
 * @Author: Tiny 
 * @Date: 2019-01-25 13:59:02 
 * @Last Modified by:   tiny.jiao@aliyun.com 
 * @Last Modified time: 2019-01-25 13:59:02 
 */

 /**
 * 检测属性
 */
function testObject () {
  
  /** 
   * 下面是不好的写法：
   *  因为当属性值为falsy时结果会出错，如：0,'',false,null,undefined
  */
  if (object[propertyName]) {}
  if (object[propertyName] != null) {}
  if (object[propertyName] != undefined) {}

  /**
   * 下面是好的写法:
   *  1:使用in运算符
   *  2:使用hasOwnProperty()方法
   * 不管什么时候需要检测属性的存在性，使用in运算符或者hasOwnProperty()可以避免很多bug
   */
  const object = {
    count: 0,
    related: null
  }
  if ('count' in object) {}
  if (object.hasOwnProperty('related')) {}

  // 注意：IE8及更早的版本中，DOM对象并非继承自Object,因此不包含hasOwnProperty()方法
  // 当不确定是否为DOM对象时，这样写更安全
  if ('hasOwnProperty' in object && object.hasOwnProperty('related')) {}
}