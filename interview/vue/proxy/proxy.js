const arr = [];
const resultArr = new Proxy(arr,  {
  get(target, key) {
    console.log("get:", key);
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    console.log("set:", key);
    return Reflect.set(target, key, value);
  }
});
resultArr.push(1);
arr[1] = 8;