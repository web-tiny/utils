/*
 * @Author: Tiny 
 * @Date: 2019-01-25 10:59:37 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-01-25 13:58:54
 */

function handleClick (e) {
  let popup = document.getElementById('popup')
  popup.style.left = e.clientX + 'px'
  popup.style.top = e.clientY + 'px'
  popup.className = 'reveal'
}

addListener(element, 'click', handleClick)
/** 
 * 上面这段代码有什么问题？
 *  事件处理程序与应用逻辑混在一起
*/

const myApplication = {
  handleClick: function (event) {
    this.showPopup(event)
  },
  showPopup: function (event) {
    let popup = document.getElementById('popup')
    popup.style.left = event.clientX + 'px'
    popup.style.top = event.clientY + 'px'
    popup.className = 'reveal'
  }
}
addListener(element, 'click', function (event) {
  myApplication.handleClick(event)
})
/** 
 * 上面这段代码有什么问题？
 *  1.event对象被无限制的分发
 *  2.事件处理程序，应用逻辑没有完全剥离
*/

/** 
 * 最佳实践代码如下：
 *  1：将事件处理相关全放在一个方法中
 *  2：将showPopup方法里的event对象换成参数，避免event对象的发现分发
*/
const MyApplication = {
  handleClick:  function (event) {
    event.preventDefault()
    event.stopPropagation()

    // 传入应用逻辑
    this.showPopup(event.clientX, event.clientY)
  },
  showPopup: function (x, y) {
    let popup = document.getElementById('popup')
    popup.style.left = x + 'px'
    popup.style.top = y + 'px'
    popup.className = 'reveal'
  }
}
