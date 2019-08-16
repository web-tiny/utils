/*
 * @Author: Tiny
 * @Date: 2019-08-15 15:19:23
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-15 16:12:43
 */
const _ = require('lodash');

// chapter03
function makeEmptyObj () {
  return new Object();
}

let globals = {};
function makeBindFun (resolver) {
  return (k, v) => {
    const stack = globals[k] || [];
    globals[k] = resolver(stack, v);
    return globals;
  }
}
const stackBinder = makeBindFun((stack, v) => { stack.push(v); return stack; });
const stackUnBinder = makeBindFun(stack => { stack.pop(); return stack; });
const dynamicLookup = k => { const slot = globals[k] || []; return _.last(slot) };
const f = () => dynamicLookup('a');
const g = () => { stackBinder('a', 'g'); return f() }
console.log(f(), g())
console.log(globals)

// chapter04
// 比较一个数组中的最值
const best = (fun, coll) => _.reduce(coll, (x, y) => fun(x, y) ? x : y)
const result = best((x, y) => x > y, [10,2,9,4,6]);
console.log(result);

// 由数字和字母组成的指定长度的随机数
const uniqueString = len => Math.random().toString(36).substr(2, len);
console.log(uniqueString(4));

const uniqueString = prefix => [prefix, new Date().getTime()].join('');
console.log(uniqueString("argento"));