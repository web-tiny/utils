/*
 * @Author: Tiny 
 * @Date: 2020-01-03 18:07:32 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: yyyy-10-Tu 04:34:08
 */

/**
 * 1: JavaScript内存机制之问——数据是如何存储的？
 * 2: V8 引擎如何进行垃圾内存的回收？
 * 3: 描述一下 V8 执行一段JS代码的过程？
 * 4: 如何理解EventLoop——宏任务和微任务篇?
 * 5: 如何理解EventLoop——浏览器篇?
 * 6: 如何理解EventLoop——nodejs篇?
 * 7: nodejs中的异步、非阻塞I/O是如何实现的？
 * 8: JS异步编程有哪些方案？为什么会出现这些方案？
 * 9: 能不能简单实现一下 node 中回调函数的机制？
 * 10: Promise之问(一)——Promise 凭借什么消灭了回调地狱？
 * 11: Promise之问(二)——为什么Promise要引入微任务？
 * 12: Promise之问(三)——Promise 如何实现链式调用？
 * 13: Promise 之问(四)——实现Promise的 resolve、reject 和 finally
 * 14: Promise 之问(五)——实现Promise的 all 和 race
 * 15: 谈谈你对生成器以及协程的理解
 * 16: 如何让 Generator 的异步代码按顺序执行完毕？
 * 17: 解释一下async/await的运行机制?
 * 18: forEach 中用 await 会产生什么问题?怎么解决这个问题？
 */

/**
 * 2: V8 引擎如何进行垃圾内存的回收？
 * 一: 为什么会进行垃圾内存的回收
 *    js不像C/C++语言可以手动进行内存管理,是V8引擎根据你定义的对象自动申请分配内存,所以V8引擎会进行垃圾回收
 * 二: 内存结构分配
 *    node环境中,可以通过process.memoryUsage()返回一个对象,包括四个字段:
 *    rss(resident set size): 所有内存占用,包括指令区和堆栈
 *    heapTotal: V8引擎可以分配的最大堆内存,包含heapUsed
 *    heapUsed: V8引擎已经分配使用的堆内存
 *    external: V8管理C++对象绑定到js对象上的内存
 * 三: 垃圾回收机制?
 *  如何判断是否可以回收?
 *  1): 标记清除:
 *    垃圾收集器运行 -> 标记内存中的所有变量 -> 运行中的变量去掉标记 -> 有标记的变量删除
 *  2): 引用计数(不太常用):
 *    如果同一个值又被赋给另一个变量，则该值的引用次数加1。相反，如果包含对这个值引用的变量改变了引用对象，则该值引用次数减1,为0则清除,Netscape Navigator 3.0最早使用引用技术策略,但是很快产生一个问题,循环引用的时候,那么这个对象永远不能被回收
 * 四: V8垃圾回收策略
 * V8采用待回收策略:将内存分为新生代(new generation)和老生代(old generation),某些条件下ng移到og
 *  1): 分代内存
 *          32位系统   64位系统
 *    新生代  16MB      32MB
 *    老生代  700MB     1.4GB
 *   新生代:
 *    分配方式:
 *     只保存一个指向内存空间的指针,存储空间快要满代时候进行一次垃圾回收
 *    算法:
 *     采用Scavenge垃圾回收算法,实现时采用cheney算法
 *     算法流程(from空间放置被引用的对象, to为闲置空间):
 *      1(在from空间分配引用对象A、B、C) 
 *      -> 2(标记没有被引用的对象如B) 
 *      -> 3(将被引用的对象从from复制到to空间) 
 *      -> 4(清空from空间的全部内存) 
 *      -> 5(交换from和to空间),重复2以后的步骤
 *   晋升: 
 *    1: 一个对象是第二次经历从from空间复制到to空间,那么把这个对象移动到老生代中
 *    2: 从from空间复制一个对象到to空间时,如果to空间已经使用了超过25%,则这个对象直接晋升到老生代中
 *   老生代:
 *     Mark-Sweep: Scavenge只复制活着的对象，而Mark-Sweep只清除死了的对象
 *     流程: 老生代-> 标记存活对象-> 清除,回收死亡对象占用的内存
 *     问题: 会存在内存空间不连续的状态
 *     Mark-Compact: 标记完存活对象以后，会将活着的对象向内存空间的一端移动，移动完成后，直接清理掉边界外的所有内存
 *     流程: 老生代 -> 标记存活对象 -> 整理阶段(将存活对象向内存空间代一侧移动) -> 清除
 *     在V8的回收策略中，Mark-Sweep和Mark-Conpact两者是结合使用的
 *     由于Mark-Conpact需要移动对象，所以它的执行速度不可能很快，在取舍上，V8主要使用Mark-Sweep，在空间不足以对从新生代中晋升过来的对象进行分配时，才使用Mark-Compact
 */

/**
 * 3: 描述一下 V8 执行一段JS代码的过程？
 * 1-生成AST(词法分析和语法分析得到的抽象语法树) -> 2-将AST生成字节码 -> 由解释器逐行执行字节码
 */

/**
* 5: 如何理解EventLoop——浏览器篇?
*/

setTimeout(_ => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then(_ => {
  console.log(3)
})

console.log(2)
// 1 2 3 4

/**
 * 8: JS异步编程有哪些方案？为什么会出现这些方案？
 * 1): 回调方法的时代,难以维护
 * 2): Promise: 解决了回调地狱问题,同时对错误进行合并处理
 * 3): async await,异步代码同步化写法
 * 4): Generator函数: 函数名加 *, 执行语句前加yield
 */


/**
 * 10: Promise之问(一)——Promise 凭借什么消灭了回调地狱？
 * 1): 回调函数延迟绑定
 * 2): 返回值穿透
 * 3): 错误冒泡
 */

/**
 * 15: 谈谈你对生成器以及协程的理解
 * 生成器是异步编程的一种解决方案
 * 什么是协程?
 * 理解: 一个线程可以存在多个协程,可以将协程理解为线程中的一个个任务,不像进程和线程,协程不受操作系统的管理,有用户控制切换
 * 运作过程: 一个线程一次只能执行一个协程
 */

/**
 * 16: 如何让 Generator 的异步代码按顺序执行完毕？
 */
// 用Generator函数改写如下：
function* longRunningTask(value1) {
  try {
    let value2 = yield step1(value1);
    let value3 = yield step2(value2);
    let value4 = yield step3(value3);
    let value5 = yield step4(value4);

    // do something
  } catch (e) {
    console.log('error info:', e);
  }
}

function scheduler(task) {
  let taskObj = task.next(task.value);
  
  if (!taskObj.done) {
    task.value = taskObj.value;
    scheduler(task);
  }
}
// 然后使用一个函数按次序自动执行所有步骤
scheduler(longRunningTask('start'));

function step1() {
  console.log('step1')
  return 1
}
function step2() {
  console.log('step2')
  return 2
}
function step3() {
  console.log('step3')
  return 3
}
function step4() {
  console.log('step4')
  return 4
}

// promise改写如下
Promise.resolve(step1())
.then((res) => {
  console.log(res)
})
.then((res) => {
  console.log(res)
  return step2()
})
.then((res) => {
  console.log(res)
  return step3()
})
.then((res) => {
  console.log(res)
  return step4()
})
.then(res => {
  console.log(res)
})
.catch(err => {
  console.log('error info: ', err)
})

/**
 * 17: 解释一下async/await的运行机制?
 * async/await利用协程和Promise实现了同步方式编写异步代码的效果，其中Generator是对协程的一种实现
 */
async function test() {
  console.log(100)
  let x = await 200
  console.log(x)
  console.log(300)
}
console.log(0)
test()
console.log('async:', test())
console.log(400)

/**
 * 18: forEach 中用 await 会产生什么问题?怎么解决这个问题？
 * 对于异步代码，forEach 并不能保证按顺序执行
 * 用for...of替代forEach
 * 因为for...of本质上是一个迭代器,
 * 何为迭代器?原生具有[Symbol.iterator]属性数据类型为可迭代数据类型。如数组、类数组（如arguments、NodeList）、Set和Map
 */
function test() {
  const arr1 = [4, 2, 1];
  arr1.forEach(async e => {
    const res = await douberNum(e)
    console.log(res)
  });
  console.log('end')
}

function douberNum(e) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(e)
    }, e);
  })
}
test()