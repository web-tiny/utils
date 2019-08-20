/*
 * @Author: Tiny
 * @Date: 2019-08-20 15:13:20
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-20 15:44:52
 */

const main = require('../main');
const should = require('should');

describe('test/main.test.js', () => {
  it('should equal 0 when n === 0', () => {
    main.fibonacci(0).should.equal(0)
  });
  it('should equal 1 when n === 1', () => {
    main.fibonacci(1).should.equal(1)
  });
  it('should equal 55 when n === 10', () => {
    main.fibonacci(10).should.equal(55)
  });
  it('should throw when n > 10', () => {
    (() =>{
      main.fibonacci(11);
    }).should.throw('n should <=10');
  });
  it('should throw when n < 0', () => {
    (() =>{
      main.fibonacci(-1);
    }).should.throw('n should >=0');
  });
  it('should throw when n isnt Number', () => {
    (() =>{
      main.fibonacci('error');
    }).should.throw('n should should be a Number');
  });
});
