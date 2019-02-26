/*
 * @Author: Tiny 
 * @Date: 2019-02-26 11:18:47 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-02-26 15:32:58
 */

/** 
 * Generator的异步应用：
 * 
*/

/** 
 * Thunk函数：用于Generator函数的自动流程管理
 * “传名调用”的一种实现策略，用来替换某个表达式,
*/
var x = 1
const thunk =  function () {
  return x + 5
}
function f(thunk) {
  return thunk() * 2
}

// Generator函数的自动执行
function* gen() {
  yield 1
  yield 2
  yield 3
}
const g = gen()
let res = g.next()
while (!res.done) {
  console.log(res.value)
  res = g.next()
}

const readFileThunk1 = function (thunk) {
  return thunk() * 2
}
const gen1 = function* () {
  const r1 = yield readFileThunk1(thunk)
  console.log(r1.toString())
  const r2 = yield readFileThunk1(thunk)
  console.log(r2.toString())
}
// 上面的Generator函数，通过yield命令将Generator函数的执行权交出来，那么如何才能把执行权还给Generator呢，答案就是Thunk函数

/** 
 * Thunk 函数的自动流程管理:
 * Thunk 函数真正的威力，在于可以自动执行 Generator 函数。下面就是一个基于 Thunk 函数的 Generator 执行器
 * 只要每一个异步操作都是Thunk函数，即yield命令后面必须是Thunk函数
*/
function run(fn) {
  const gen = fn()

  function next(err, data) {
    const result = gen.next(data)
    if (result.done) {
      return;
    }
    gen.next(result.value)
  }
  next()
}
console.log(run(gen1))

/** 
 * 基于 Promise 对象的自动执行
*/
// 基于 Promise 对象的自动执行函数
function runPromise(gen) {
  const g = gen()
  
  function next(data) {
    let result = g.next(data)

    if (result.done) {
      return result.value
    }
    result.value.then(function(data) {
      next(data)
    }).catch(error => {
      console.log(error)
    })
  }
  next()
}
const readFile = function (boolean) {
  return new Promise((resolve, reject) => {
    if (boolean) {
      resolve('correct')
    } else {
      reject('error')
    }
  })
}

const gen2 = function* () {
  try {
    const t1 = yield readFile(true)
    console.log(t1)
    const t2 = yield readFile(false)
    console.log(t2)
  } catch (error) {
    console.log(error)
  }
}
runPromise(gen2)

/** 
 * co模块源码：
*/
function co(gen) {
  var ctx = this
  return new Promise((resolve, reject) => {

    // 如果是Generator 函数，就执行该函数，得到一个内部指针对象
    if (typeof gen === 'function') {
      gen = gen.call(ctx)
    }

    // 如果不是Generator 函数就返回，并将 Promise 对象的状态改为resolved
    if (!gen || typeof gen.next !== 'function') {
      return resolve(gen)
    }
    
    onFulfilled()
    /** 
     * 将 Generator 函数的内部指针对象的next方法，包装成onFulfilled函数。这主要是为了能够捕捉抛出的错误
    */
    function onFulfilled(res) {
      let ret;
      try {
        ret = gen.next(res)
      } catch (e) {
        return reject(e)
      }
      next(ret)
    }

    function next(ret) {

      // 检查当前是否为 Generator 函数的最后一步，如果是就返回
      if (ret.done) {
        return resolve(ret.value)
      }
      
      // 确保每一步的返回值，是 Promise 对象
      let value = toPromise.call(ctx, ret.value)

      // 使用then方法，为返回值加上回调函数，然后通过onFulfilled函数再次调用next函数
      if (value && isPromise(value)) {
        return value.then(onFulfilled, onRejected)
      }

      // 在参数不符合要求的情况下（参数非 Thunk 函数和 Promise 对象），将 Promise 对象的状态改为rejected，从而终止执行
      return onRejected(`You may only yield a function, promise, generator, array, or object,but the following object was passed: ${String(ret.value)}`)
    }
    
    function isPromise(obj) {
      return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
    }

    function onRejected(data) {
      console.error(data)
    }

    function toPromise(data) {
      return new Promise((resolve, reject) => {
        resolve(data)
      })
    }
  })
}

/** 
 * 处理并发的异步操作：
 * co支持并发的异步操作，即允许某些操作同时进行，等到他们全部完成，才进行下一步
 * 这时要把并发的操作都放在数组或对象里面，跟在yield语句后面
*/
co(function* () {
  const res = yield {
    1: Promise.resolve(1),
    2: Promise.resolve(2)
  }
  console.log('res:',res) // res: { '1': Promise { 1 }, '2': Promise { 2 } }
}).catch(error => console.log(error))

co(function* () {
  const values = ['n1', 'n2', 'n3']
  yield values.map(somethingAsync)
})
function* somethingAsync(x) {
  return x.substr(0, 1)
}