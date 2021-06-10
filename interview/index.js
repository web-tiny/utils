const MyPromise = require("./my-promise");
const promise = new MyPromise((resolve, reject) => {
  resolve("ok");
  // reject("fail");
  // setTimeout(() => {
  //   resolve("ok")
  // }, 2000);
  // throw new TypeError("失败")
});
promise.then((value) => {
  console.log(value);
  // throw new TypeError("then error")
  return 2000;
}, err => {
  console.log(err)
  throw new TypeError("reject error")
})
.then(value => {
  console.log(value)
}, err => {
  console.log(err)
});

function other() {
  return new MyPromise((resolve, reject) => {
    return resolve("other");
  })
}
promise.then((value) => {
  console.log(value);
  return other();
})
.then(res => {
  console.log(res);
});


// let p1 = promise.then(value => {
//   console.log(value);
//   return p1;
// });

// p1.then(ok => {
//   console.log(ok)
// }, fail => {
//   console.log(fail)
// })

promise.then().then().then(value => console.log(value), reason => console.log(reason) )

const p1 = function () {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      // resolve("p1 catch");
      reject("p1 error");
    }, 1000);
  })
};
const p2 = function () {
  return new MyPromise((resolve, reject) => {
    resolve("p2");
  })
};
MyPromise.all(["a", "b", "c", p1(), p2()]).then(res => {
  console.log(res)
})
MyPromise.resolve(10).then(value => console.log(value))
MyPromise.resolve(p1()).then(value => console.log(value))

p2().finally(() => {
  console.log("finally");
  return p1();
}).then((value) => {
  console.log(value)
})
p1()
.then((value) => {
  console.log(value);
})
.catch((error) => {
  console.log(error)
})
