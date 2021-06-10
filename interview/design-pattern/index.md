## 设计模式相关

#### 1. 设计模式中观察者模式和发布 / 订阅模式有哪些区别？

**思路**

1. 什么是观察者模式, 应用场景: vue的数据劫持就是使用观察者模式实现的, defineReactive中get方法里面收集依赖,添加观察者, set方法里面发布通知

   ```javascript
   // 发布者
   class Dep {
     constructor() {
       // 记录所有的观察者
       this.subs = []
     }
     // 添加观察者
     addSub(sub) {
       if(sub && sub.update) {
         this.subs.push(sub)
       }
     }
     
     // 发布通知
     notify() {
       this.subs.forEach(sub => {
         sub.update()
       })
     }
   }
   // 观察者
   class Watcher {
     update() {
       console.log("update")
     }
   }
   // 观察者
   class Watcher2 {
     update() {
       console.log("update 2")
     }
   }
   
   // test
   const dep = new Dep()
   const watcher = new Watcher()
   const watcher2 = new Watcher2()
   dep.addSub(watcher) // 添加观察者
   dep.addSub(watcher2) // 添加观察者
   dep.notify() // 发布者发布通知
   // update update2
   ```

   

2. 什么是发布/订阅模式,  应用场景: Vue的自定义事件就是使用发布/订阅模式

   ```javascript
   // 事件触发器
   class EventEmitter {
     constructor() {
       // 学生群
       this.subs = Object.create(null)
     }
     // 注册事件, 学生家长加入群
     $on(eventType, handler){
       this.subs[eventType] = this.subs[eventType] || []
       this.subs[eventType].push(handler)
     }
     // 触发事件
     $emit(eventType) {
       if(this.subs[eventType]){
         this.subs[eventType].forEach(handler => {
           // 每个老师发布成绩这个动作
           handler()
         })
       }
     }
   }
   // test
   // 先建一个微信群(当然这个群应该是班主任建的,因为只有班主任更熟悉各科任课老师和每位同学的家长)
   const ee = new EventEmitter()
   // 第一个同学的家长入群了(订阅孩子成绩)
   ee.$on("click", () => {
     console.log("click1")
   })
   // 又一个同学的家长入群了(订阅孩子成绩)
   ee.$on("click", () => {
     console.log("click2")
   })
   // 老师发布成绩
   ee.$emit("click")
   ```

3. 区别: 

   * 观察者模式由发布者调度, 发布者统一添加观察者和发布通知, 发布者和观察者之间有依赖关系
   * 发布/订阅模式, 发布者和订阅者不需要知道对方的存在, 因为有一个“经纪人”在统一调度

- 平常在哪些地方有使用到观察者或发布 / 订阅模式？

#### 2. 了解 MVC / MVP / MVVM 的区别吗？代表是啥 ?

[mvc-->mvp-->mvvm](https://juejin.cn/post/6844904099704471559#heading-0)



