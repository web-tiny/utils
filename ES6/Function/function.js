/*
 * @Author: tiny.jiao@aliyun.com
 * @Date: 2019-08-12 22:14:38
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-12 23:28:33
 */

/** 
 *  下面的方法只有一个this。那就是foo方法的this，
 *  因为箭头函数内本就没有this，而是外层代码块的this
*/
function foo () {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

let f = foo.call({ id: 1 });
const t1 = f.call({ id: 2 })()(); // id: 1
const t2 = f().call({ id: 3 })(); // id: 1
const t3 = f()().call({ id: 4 }); // id: 1

function bar () {
  // return () => arguments
  return function () {
    return arguments
  }
}
console.log(bar(2, 4, 6, 8));
console.log(bar()(3, 5, 7));

function Fibonacci (n) {
  if (n <= 1) {
    return 1;
  } else {
    return Fibonacci(n - 1) + Fibonacci(n - 2);
  }
}
console.log(Fibonacci(10));
console.log(Fibonacci(100));
console.log(Fibonacci(500));

function Fibonacci2 (n, ac1 = 1, ac2 = 1) {
  if (n <= 1) {
    return ac2;
  }
  return Fibonacci2(n - 1, ac2, ac1 + ac2);
}
console.log(Fibonacci2(100));