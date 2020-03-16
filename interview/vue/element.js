
// 用js对象模拟dom树,记录节点类型,属性,字节点
function Element (tagName, props, children) {
  this.tagName = tagName;
  this.props = props;
  this.children = children;
}

Element.prototype.render = function () {
  const el = document.createElement(this.tagName);
  const props = this.props;

  for (const propName in props) {
    if (props.hasOwnProperty(propName)) {
      const propValue = props[propName];
      el.setAttribute(propName, propValue)
    }
  }

  const children = this.children || [];
  
  children.forEach(child => {
    const childEl = (child instanceof Element)
      ? child.render()
      : document.createTextNode(child)
    el.appendChild(childEl)
  })

  return el;
}

module.exports = (tagName, props, children) => {
  return new Element(tagName, props, children);
}