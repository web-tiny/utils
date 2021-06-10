const PADDING = "padding";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor){
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error)
    }
  }
  // 状态
  status = PADDING;
  // 成功回调的传值
  value = undefined;
  // 失败原因
  reason = undefined;
  // 成功回调
  successCallback = [];
  // 失败回调
  failCallback = [];

  resolve = (value) => {
    if(this.status !== PADDING) return;
    this.status = FULFILLED;
    this.value = value;
    // this.successCallback && this.successCallback(this.value);
    while (this.successCallback.length) {
      this.successCallback.shift()()
    }
  }
  reject = (reason) => {
    if(this.status !== PADDING) return;
    this.status = REJECTED;
    this.reason = reason;
    // this.failCallback && this.failCallback(this.reason);
    while (this.failCallback.length) {
      this.failCallback.shift()()
    }
  }
  then(successCallback, failCallback) {
    // 要链式调用,返回一个promise对象即可
    successCallback = successCallback ? successCallback : value => value;
    failCallback = failCallback ? failCallback : reason => { throw reason } ;
    const promise = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        // 加一个异步代码,否则拿不到promise对象
        setTimeout(() => {
          try {
            const x = successCallback(this.value);
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else if(this.status === REJECTED) {
        setTimeout(() => {
          try {
            const y = failCallback(this.reason);
            resolvePromise(promise, y, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else {
        // 存储异步方法
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              const x = successCallback(this.value);
              resolvePromise(promise, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              const y = failCallback(this.reason);
              resolvePromise(promise, y, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    })
    return promise;
  }
  static all(array) {
    let result = [];
    let index = 0;
    // all方法返回一个promise对象
    return new MyPromise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value;
        index++;
        if (index === array.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (item instanceof MyPromise) {
          // promise的实例对象
          item.then((value) => addData(i, value), reason => reject(reason))
        } else {
          // 普通值
          addData(i, item)
        }
      }
      return result;
    });
  }
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value))
  }
  /**
   * finally:
   * 1: 参数是一个回调方法, 回调方法里需要拿到异步状态
   * 2: 可以链式调用then方法, 如果then方法返回的是一个异步方法,那通过resolve方法等待回调方法执行后再
   * 返回value
   */
  finally(callback) {
    return this.then((value) => {
      return MyPromise.resolve(callback()).then(() => value);
    }, (reason) => { 
      return MyPromise.resolve(callback()).then(() => { throw reason });
    })
  }
  /**
   * 调用then方法注册一个失败回调
   * @param {失败回调} callback 
   */
  catch(callback) {
    return this.then(undefined, callback)
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError("promise 循环调用啦!"));
  }
  (x instanceof MyPromise) ? x.then(resolve, reject) : resolve(x);
}

module.exports = MyPromise;