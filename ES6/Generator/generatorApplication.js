/*
 * @Author: tiny.jiao 
 * @Date: 2019-02-25 22:33:33 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2020-01-09 14:21:15
 */

 /**
  * Generator可以暂停函数执行，返回任意表达式的值，这种特点使得Generator有多种应用场景：
  * 1: 异步操作的同步化表达：处理异步操作，改写回调函数
  * 2: 控制流管理
  * 3: 部署Iterator接口
  * 4: 作为数据结构
  */
// 1: 异步操作的同步化表达：处理异步操作，改写回调函数
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
function showLoadingScreen() {
  console.log('loading');
}
function hideLoadingScreen() {
  console.log('hide');
}
function loadUIDataAsynchronously() {
  console.log('this is some datas !');
}
const loader = loadUI();
// 加载ui
loader.next();
// 卸载ui
loader.next();

// Ajax 是典型的异步操作，通过 Generator 函数部署 Ajax 操作，可以用同步的方式表达
function* main() {
  const result = yield request('http://some.url');
  const res = JSON.parse(result);
  console.log(res.value);
}
function request(url) {
  makeAjaxcall(url, function(res){
    it.next(res);
  })
}
function makeAjaxcall(url,fn){
  
}
const it = main();
it.next()

/**
 * 控制流管理
 */
step1(function (value1) {
  step2(value1, function (value2){
    step3(value2, function (value3){
      step4(value3, function (value4){
        // do something
      });
    });
  });
});

// 上面的代码用Promise改写如下：
Promise.resolve(step1)
  .then(step2)
  .then(step3)
  .then(step4)
  .then(function (value4) {
    // do something
  }, function (error) {
    // handle error
  });

// 用Generator函数改写如下：
function* longRunningTask(value1) {
  try {
    let value2 = yield step1(value1);
    let value3 = yield step2(value2);
    let value4 = yield step2(value3);
    let value5 = yield step2(value4);

    // do something
  } catch (e) {
    console.log(e);
  }
}
// 然后使用一个函数按次序自动执行所有步骤
scheduler(longRunningTask('initialValue'));

function scheduler(task) {
  let taskObj = task.next(task.value);

  if (!taskObj.done) {
    task.value = taskObj.value;
    scheduler(task);
  }
}

// 利用for...of循环会自动依次执行yield命令的特性，提供一种更一般的控制流管理的方法
// 数组steps封装了一个任务的多个步骤，Generator 函数iterateSteps则是依次为这些步骤加上yield命令
let steps = [step1Func, step2Func, step3Func];
function* iterateSteps(steps) {
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    yield step();
  }
}
// 数组jobs封装了一个项目的多个任务，Generator 函数iterateJobs则是依次为这些任务加上yield*命令
let jobs = [job1, job2, job3];
function* iterateJobs(jobs) {
  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    yield* iterateSteps(job.steps);
  }
}
// 最后，就可以用for...of循环一次性依次执行所有任务的所有步骤
for (const step of iterateJobs(jobs)) {
  console.log(step.id);
}
// 上面的做法只能用于所有步骤都是同步操作的情况，不能有异步操作的步骤

/**
 * 部署 Iterator 接口
 */
// 利用 Generator 函数，可以在任意对象上部署 Iterator 接口
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    yield [key, obj[key]];
  }
}
let myObj = {
  foo: 3,
  bar: 7
};
for (const [k, v] of iterEntries(myObj)) {

  // foo : 3
  // bar : 7
  console.log(k + ' : ' + v);
}

// 下面是一个对数组部署 Iterator 接口的例子，尽管数组原生具有这个接口
function* makeSimpleGenerator(arr) {
  let nextIndex = 0;

  while (nextIndex < arr.length) {
    yield arr[nextIndex++];
  }
}
const gen = makeSimpleGenerator(['name', 'age']);
console.log(gen.next().value); // name
console.log(gen.next().value); // age
console.log(gen.next().done); // true

/**
 * 作为数据结构:
 * Generator 可以看作是数据结构，更确切地说，可以看作是一个数组结构，因为 Generator 函数可以返回一系列的值，
 * 这意味着它可以对任意表达式，提供类似数组的接口
 */
function* doStuff() {
  yield fs.readFile.bind(null, 'hello.txt');
  yield fs.readFile.bind(null, 'world.txt');
  yield fs.readFile.bind(null, 'and-such.txt');
}
for (const task of doStuff()) {
  // do something
}