
/**
 * class:
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
