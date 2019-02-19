/*
 * @Author: Tiny 
 * @Date: 2019-02-19 13:57:24 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-02-19 16:44:16
 */

/** 
 * Set：
 *  1：是ES6新增的一种数据结构，本身是一个构造函数，用来生成Set数据结构，类似于数组，成员的值是唯一的
 *  2：Set实例的属性：
 *    1：Set.prototype.constructor,默认就是Set函数
 *    2：Set.prototype.size
 *  3：Set操作方法
 *    1：add(value)
 *    2：delete(value)
 *    3：has(value)
 *    4：clear()
 *  4：Set遍历方法
 *    1：keys()
 *    2：values()
 *    3：entries()
 *    4：forEach()
*/

function set() {
  const SET = new Set()
  const ARR = [2, 3, 5, 4, 5, 2, 2]
  ARR.forEach(e => SET.add(e))
  
  // 说明Set结构的值的唯一性
  for (let i of SET) {
    console.log(i) // 2 3 5 4
  }
  
  const SET1 = new Set([1, 2, 3, 4, 4])
  console.log([...SET1]) // [ 1, 2, 3, 4 ]
  console.log(SET1.size) // 4

  const STR = 'ababbc'
  const STRUNIQUE = [...new Set(STR)].join('')
  console.log(STRUNIQUE)
  /** 所以：
   * 数组去重的一种方法：[...new Set(array)]
   * 字符串去除重复的字符: [...new Set('ababbc')].join('')
  */

  SET.add(8).add(9).add(10)
  console.log(SET.size) // 7
  console.log(SET.has(8)) // true
  SET.delete(8)
  console.log(SET.has(8)) // false
  SET.clear()
  console.log(SET) // {}
}
set()
/** 
 * WeakSet:
 *  1：结构与Set类似，
 *  2：与Set的2个区别：
 *    a：WeakSet的成员只能是对象
 *    b: WeakSet不可遍历(因为WeakSet中的对象都是弱引用，其内部有多少成员，取决于垃圾回收机制有没有运行，运行前后很可能不一样)
 *  3：WeakSet结构有三个方法：
 *    a: WeakSet.prototype.add(value)
 *    b: WeakSet.prototype.delete(value)
 *    c: WeakSet.prototype.has(value)
*/