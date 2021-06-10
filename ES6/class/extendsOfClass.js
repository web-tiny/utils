/*
 * @Author: Tiny 
 * @Date: 2019-02-20 10:56:22 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-02-20 15:49:18
 */

/** 
 * Class的继承：
 *  1：Object.getPrototypeOf()
 *  2：super关键字
 *    1：在子类构造函数中，只有调用super之后才可以使用this关键字，否则会报错
 *  3：原生构造函数的继承
 *  4：Mixin 模式的实现
 *  5: Class作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链
*/

/** 
 * 子类必须在constructor中调用super方法，
 * 因为子类的this对象必须通过父类的构造函数完成塑造，
 * 得到与父类同样的实例属性和方法，这样才能得到子类的this对象
*/
class Point {
}
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y)
    this.color = color
  }
  toString() {
    return this.color + ' ' + super.toString()
  }
}

// ColorPoint的构造方法没有调用super方法，故新建实列时报错
class Point2 {
}
class ColorPoint2 extends Point2 {
  constructor() {
  }
}
// Must call super constructor in derived class before accessing 'this' or returning from derived constructor
const cp = new ColorPoint2() // ReferenceError

// 子类的构造方法，如果没有显示定义，会被默认添加
class ColorPoint3 extends Point {

}
// 等同于
class ColorPoint4 extends Point {
  constructor(...args) {
    super(...args)
  }
}

// 在子类构造函数中，只有调用super之后才可以使用this关键字，否则会报错
class Point5 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}
class ColorPoint5 extends Point {
  constructor(x, y, color) {

    // 在super调用之前使用this，所以报错
    // this.color = color // ReferenceError
    super(x, y)
    this.color = color
  }
}
const cp2 = new ColorPoint(3, 4, 'red')

/** 
 * Object.getPrototypeOf():
 *  可以用来从子类获取父类
 *  因此可以用来判断一个类是否继承另一个类
*/
const isExtentsParentClass = (child, parent) => Object.getPrototypeOf(child) === parent
console.log(isExtentsParentClass(ColorPoint, Point)) // true

// 父类的静态方法会被子类继承
class A {
  static hello() {
    console.log('hello world')
  }
}
class B extends A {}
B.hello() // hello world

/** 
 * super关键字：
 *  1：可以当作函数用：
 *    1: 代表父类的构造函数
 *    2: 只能用在子类的构造函数中，用在其他地方会报错
 *  2：可以当作对象使用
 *    1: 在普通方法中，指向父类的原型对象
 *    2: 在静态方法中，super指向父类，而不是父类的原型对象
 *  3：使用super的时候，必须显示指定是作为函数还是对象使用，否则会报错
 *  4：可以在任意一个对象中使用super关键字，因为对象总是继承其他对象的
*/

/** 
 * super()
 * 注意：
 * super虽然代表了父类A的构造函数，但是返回的是子类B的实例，
 * 即super内部的this指的是B的实例
 * 此时的super相当于：A.prototype.constructor.call(this)
*/
class A {
  constructor() {
    console.log(new.target.name)
  }
}
class B extends A {
  constructor() {
    super()
  }

  // super()只能用在子类的构造函数中
  m() {
    super() // 报错
  }
}
console.log(new A()) // A
console.log(new B()) // B


// super当作对象使用
class SuperObject {
  constructor() {
    this.p = 2
  }
  pValue() {
    return 3
  }
  print() {
    console.log(this.p)
  }
}

SuperObject.prototype.x = 10

class childSuperObject extends SuperObject {
  constructor() {
    super()
    this.p = 5
    // super作为对象在普通方法中指向父类的原型
    // super.p() === A.prototype.p()
    console.log(super.pValue()) // 3

    // x是定义在SuperObject.prototype，所以super.x可以取到它的值
    console.log(super.x) //  10
  }

  /** 
   * 注意：
   *  由于super指向父类的原型对象，所以定义在父类实例上的方法或属性是无法通过super调用的
  */
  get m() {
    return super.p // undefined
  }

  // ES6规定，在子类普通方法中通过super调用父类方法时，方法内部的this指向当前的子类实例
  d() {
    super.print()
  }
}
let child = new childSuperObject()
console.log(child.m) // undefined
console.log(child.d()) // 5

/** 
 * 由于this指向子类实例，
 * 所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性
*/
class A {
  constructor() {
    this.x = 1
  }
}
class B extends A {
  constructor() {
    super()
    this.x = 2
    super.x = 3

    // super.x = 3，等同于this.x = 3,当读取super.x时，实际时A.prototype.x，所以值是undefined
    console.log(super.x) // undefined
    console.log(this.x) // 3
  }
}
let b3 = new B()

/** 
 * 在静态方法中，super指向父类，而不是父类的原型对象
 * 在普通方法之中指向父类的原型对象。
*/
class Parent {
  constructor() {
    this.x = 1
  }
  static print() {
    console.log(this.x)
  }
  static myMethod(msg) {
    console.log('static', msg)
  }
  myMethod(msg) {
    console.log('instance', msg);
  }
}
class Son extends Parent {
  constructor() {
    super()
    this.x = 2
  }

  // 在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例
  static m() {
    super.print()
  }
  static myMethod(msg) {
    super.myMethod(msg)
  }
  myMethod(msg) {
    super.myMethod(msg)
  }
}
Son.myMethod('son') // static son
const son = new Son()
son.myMethod('big Son') // instance big Son

Son.x = 3
Son.m() // 3

// 可以在任意一个对象中使用super关键字，因为对象总是继承其他对象的
let obj = {
  toString() {
    return 'myObject: ' + super.toString()
  }
}
console.log(obj.toString()) // myObject: [object Object]

/** 
 * 类的prototype和__proto__:
 *  1: 子类的__proto__属性，表示构造函数的继承，总是指向父类
 *  2: 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性
*/
class A {

}
class B extends A {
  
}
console.log(B.__proto__ === A) // true
console.log(B.prototype.__proto__ === A.prototype) // true

/** 
 * 类的继承是怎么实现的 ?
 *  Object.setPrototypeOf() 这个是什么玩意？
*/
class AA {}
class BB {}

// BB的实例继承AA的实例
Object.setPrototypeOf(BB.prototype, AA.prototype)
// 等同于
BB.prototype.__proto__ = AA.prototype

// BB继承AA的静态属性
Object.setPrototypeOf(BB, AA)
// 等同于
BB.__proto__ = AA

const bb = new BB()

/** 
 * extends关键字后面可以跟多种类型的值
 *   1：任意函数
 *   2：Object类
*/
// extends关键字后面跟Object类
class A extends Object {}
console.log(A.__proto__ === Object) // true
console.log(A.prototype.__proto__ === Object.prototype) // true

// 不存在任何继承。
class A { }
console.log(A.__proto__ === Function.prototype) // true
console.log(A.prototype.__proto__ === Object.prototype) // true

/** 
 * 实例的__proto__
*/
class A {}
class B extends A {}
let p = new A()
let c =new B()
console.log(c.__proto__.__proto__ === p.__proto__) // true
console.log(c.__proto__ === p.__proto__) // false

/** 
 * ES6允许继承原始构造函数定义子类,而ES5是无法做到的
 * 原生构造函数:
 *  Boolean()
 *  Number()
 *  String()
 *  Array()
 *  Date()
 *  Function()
 *  RegExp()
 *  Error()
 *  Object()
*/
// 定义一个自己的数组继承自原生Array()构造函数
class MyArray extends Array {
  constructor(...args) {
    super(...args)
  }
}
let arr = new MyArray()
arr.push(10)
console.log(arr) // MyArray [ 10 ]
console.log(arr[0]) // 10

/** 
 * 下面自定义的NewObj无法通过super方法向父类Object传参，是因为：
 *  ES6改变了Object构造函数的行为，一旦发现Object方法不是通过new Object()这种方式调用的时候
 *  ES6规定Object构造函数会忽略参数
*/
class NewObj extends Object {
  constructor() {
    super(...arguments)
  }
}
let o = new NewObj({ attr: true })
console.log(o.attr === true) // false