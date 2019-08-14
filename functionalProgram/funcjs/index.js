/*
 * @Author: tiny.jiao@aliyun.com
 * @Date: 2019-08-14 22:48:08
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-14 23:46:34
 */
/**
 * javascript函数式编程
 */
const _ = require('lodash');

function unsplat (f) {
  return function () {
    return f.call(null, _.toArray(arguments));
  };
}

const joinElements = unsplat( str => str.join(' '));
console.log(joinElements('-', '%', '$')); // - % $

function splat (f) {
  return function (array) {
    return f.apply(null, array);
  };
}
const addArrayElements = splat((x, y) => x + y);
console.log(addArrayElements([2, 3])); // 5

function parseAge (age) {
  if (!_.isString(age)) {
    throw new Error('Expecting a string !');
  }
  let a = '';
  console.log('Attempting to parse an age');

  a = Number.parseInt(age, 10);
  if (_.isNaN(a)) {
    console.log(['Could not parse age: ', age].join(' '));
    a = 0;
  }
  return a;
}

// 功能与逻辑的分开，重构
function fail (thing) {
  throw new Error(thing);
}
function warn (thing) {
  console.log(['WARNING:', thing].join(' '));
}
function note (thing) {
  console.log(['NOTE:', thing].join(' '));
}

function parseAgeGood (age) {
  if (!_.isString(age)) {
    fail('Expecting a string !');
  }
  let a = '';
  note('Attempting to parse an age');

  a = Number.parseInt(age, 10);
  if (_.isNaN(a)) {
    warn(['Could not parse age: ', age].join(' '));
    a = 0;
  }
  return a;
}