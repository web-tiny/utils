/*
 * @Author: Tiny 
 * @Date: 2019-02-19 14:13:16 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-02-19 17:29:01
 */

 /** 
  * Map:
  *   1：javascript对象的键，传统上只能是字符串，而ES6新增的数据结构Map的键不限于字符串，各种类型的值，包括对象都可以当作键
  *   2：注：Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。只有当两个键的值严格相等，Map才将其视为一个键(NaN除外)
  *   3：Map属性和方法：
  *     1：size属性
  *     2: set(key, value)
  *     3: get(key)
  *     4: has(key)
  *     5: delete(key)
  *     6: clear()
  *   4: 遍历方法
  *     1：keys()
  *     2：values()
  *     3：entries()
  *     4：forEach()
  *   5: 与其他数据结构的互相转换
  *     1：Map转为数组
  *     2：数组转为Map
  *     3：Map转为对象
  *     4：对象转为Map
  *     5：Map 转为 JSON
  *     6：JSON 转为 Map
 */

function map() {

  // Map转为数组
  const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc'])

  const arrFromMap = [...myMap]
  
  console.log(arrFromMap) // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

  // 数组转为Map
  const arr = [[ true, 7 ], [ { foo: 3 }, [ 'abc' ] ]]
  const mapFromArr = new Map(arr)
  console.log(mapFromArr) // Map { true => 7, { foo: 3 } => [ 'abc' ] }

  // Map转为对象
  function mapToObj(strMap) {
    let obj = Object.create(null)

    for (let [k, v] of strMap) {
      obj[k] = v
    }
    return obj
  }
  const mapObj = new Map()
  .set('yes', true)
  .set('no', false)
  console.log(mapToObj(mapObj)) // {yes: true, no: false}

  // 对象转为Map
  function objToMap(obj) {
    let strMap = new Map()

    for(let k of Object.keys(obj)) {
      strMap.set(k, obj[k])
    }
    return strMap
  }
  console.log(objToMap({yes: true, no: false})) // Map { 'yes' => true, 'no' => false }

  /** 
   * Map 转为 JSON
   *  1: Map的键名都是字符串
   *  2：Map的键名有非字符串
  */
  // Map的键名都是字符串
  function strMapToJson(strMap) {
    return JSON.stringify(mapToObj(strMap))
  }

  let map1 = new Map().set('yes', true).set('no', false)
  console.log(strMapToJson(map1)) // {"yes":true,"no":false}

  // Map的键名有非字符串
  function mapToArrayJson(map) {
    return JSON.stringify([...map])
  }

  let map2 = new Map().set(true, 7).set({ foo: 3 }, ['abc'])
  console.log(mapToArrayJson(map2)) // [[true,7],[{"foo":3},["abc"]]]

  /** 
   * JSON 转为 Map
   *  1：键名都是字符串
   *  2：有一种特殊情况，整个 JSON 就是一个数组,这往往是 Map 转为数组 JSON 的逆操作
  */
  // 键名都是字符串
  function jsonToStrMap(jsonStr) {
    return objToMap(JSON.parse(jsonStr))
  }
  console.log(jsonToStrMap('{"yes":true,"no":false}')) // Map { 'yes' => true, 'no' => false }

  // 整个 JSON 就是一个数组
  function jsontoMap(jsonStr) {
    return new Map(JSON.parse(jsonStr))
  }
  console.log(jsontoMap('[[true,7],[{"foo":3},["abc"]]]')) // Map { true => 7, { foo: 3 } => [ 'abc' ] }
}

/** 
 * WeakMap：
 *  1：与Map的区别：
 *    1：WeakMap只接受对象作为键名（null除外）
 *    2：WeakMap的键名所指向的对象，不计入垃圾回收机制
 *  2: 没有遍历操作，即没有keys()、values()和entries()方法，也没有size属性
 *  3：只有四个方法：get()、set()、has()、delete()，不支持clear方法
 *  4：WeakMap 应用的典型场合就是 DOM 节点作为键名
*/