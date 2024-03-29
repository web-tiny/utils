/*
 * @Author: Tiny
 * @Date: 2019-08-13 14:05:54
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-16 13:35:59
 */
/** 
 * 函数式编程：
 * 1：纯函数：相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用
 *    副作用：只要是跟函数外部环境发生的交互就都是副作用。
 * 2：函数式编程的哲学就是假定副作用是造成不正当行为的主要原因。
*/

const { _, curry }= require('lodash');

const match = curry((what, str) => str.match(what));

const replace = curry((what, replacement, str) => str.replace(what, replacement));

const filter = curry((f, ary) => ary.filter(f));

const map = curry((f, ary) => ary.map(f));

console.log(match(/\s+/g, 'hello world'));
console.log(match(/\s+/g)(' tiny'))

let hasSpaces = match(/\s+/g); // [ ' ' ]
const result = filter(hasSpaces, ['tiny jiao', 'tiny.jiao']); // [ ' ' ]
console.log(result) // [ 'tiny jiao' ]

const compose = (f, g) => x => f(g(x));

const toUpperCase = x => x.toUpperCase();
const exclaim = x => x + '!';
const shout = compose(exclaim, toUpperCase);
console.log(shout('send in the clowns')); // SEND IN THE CLOWNS!

const head = x => x[0];
const reverse = x => x.reverse();
const last = compose(head, reverse);
console.log(last(['jumpDown', 'roundhouse', 'uppdercut']));


/** 
 * 函数签名：
 */
// id :: x -> x
const id = x => x;

const Container = function (x) {
  this.__value = x;
}
Container.of = x => new Container(x);

console.log(Container.of(3)) // Container { __value: 3 }
console.log(Container.of(Container.of({ name: 'yoda' }))) // Container { __value: Container { __value: { name: 'yoda' } } }

// functor
// (a -> b) -> Container a -> Container b
Container.prototype.map = f => Container.of(f(this.__value));
const result2 = Container.of(2).map(function (a) { return a + 2 })
console.log(result);

const result3 = Container.of('bombs').map(_.concat(' away').map(_.property('length')))
console.log(result2)
// Container.of(2).chain(two => Container.of(3).map(add(two)));

Container.prototype.ap = other_comtainer => other_comtainer.map(this.__value);

// 函数式程序：通过管道把数据在一系列纯函数间传递的程序

/** 
 * TODO:
 * 链表的javascript实现(js数据接口这本书)
 * 
*/