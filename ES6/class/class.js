/*
 * @Author: Tiny 
 * @Date: 2019-02-20 10:55:32 
 * @Last Modified by:   tiny.jiao@aliyun.com 
 * @Last Modified time: 2019-02-20 10:55:32 
 */

/**
 * class:
 *  new.target:
 *    1.子类继承父类时，new.target会返回子类
 *    2. Class内部调用new.target，返回当前的Class
 *    3. new.target属性可以用来确定构造函数是怎么调用的
 */
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {

    // 静态方法可以从super对象上调用
    return super.classMethod() + ', too';
  }
}

console.log(Bar.classMethod()); // hello, too

/**
 * 确定构造函数是怎么调用的，
 * 如果不是通过new命令调用则报错
 *
 * @param {*} name
 */
function Person(name) {
  // if (new.target !== undefined) {
  if (new.target === Person) {
    this.name = name
  } else {
    throw new Error('必须使用new命令生成实例')
  }
}
const person = new Person('san zhang')
const notPerson = Person.call(this, 'san zhang') // 报错

// Class内部调用new.target，返回当前的Class
class Reactangle {
  constructor(length, width) {
    this.length = length
    this.width = width
    console.log(new.target === Reactangle, this.length, this.width); // true
  }
}
const obj = new Reactangle(4, 3);

// 子类继承父类时，new.target会返回子类
class Father {
  constructor(age, name) {
    console.log(new.target) // [Function: Sun]
    console.log(new.target === Sun) // true
  }
}
class Sun extends Father {
  constructor(age) {
    super(age)
  }
}
const obj2 = new Sun(20)

/**
 * 利用 子类继承父类，new.target会返回子类这一特点，
 * 可以写出不能独立使用，必须继承后才能使用的类
 * @class Shape
 */
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化！')
    }
  }
}
class Rectangle extends Shape {
  constructor(length, width) {
    super()
  }
}
const x = new Shape() // 报错，本类不能实例化！
const y = new Rectangle(3, 4) // 正确