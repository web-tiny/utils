/*
 * @Author: Tiny 
 * @Date: 2020-03-16 16:49:13 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2020-03-16 16:53:22
 */

/**
 * let, const
 * 注意: const声明不允许修改绑定,但允许修改值
 */
const data = {
  value: 1
}
data.value = 2
data.num = 3

console.log(data.value)
// data = {}

/**
 * 最佳实践:
 * 然而另一种做法日益普及：默认使用 const，只有当确实需要改变变量的值的时候才使用 let。这是因为大部分的变量的值在初始化后不应再改变，
 * 而预料之外的变量之的改变是很多 bug 的源头。
 */