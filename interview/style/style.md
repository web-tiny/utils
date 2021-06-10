

## CSS相关

#### 1. 了解 Flex 布局么？平常有使用 Flex 进行布局么？

**思路**:

- 首先得说出 Flex 布局概念: Flexible box，Flex 的结构组成（Flex Container 、Flex Item），遇到的所有面试者都没有此回答

- 其次可以讲讲自己平常用的最多的 Flex 属性

- 最后可以讲讲自己平时常用的布局（左右两列，上下两行等）

- Flex Containe 6个属性:

  - flex-direction: 方向
  - flex-wrap: 换行
  - **flex-flow : flex-direction和flex-wrap的简写**
  - justify-content: 主轴排列方式
  - align-items: 侧轴排列方式
  - **align-content: 多根轴线的对齐方式, 一根轴线不起作用**

- Flex Item 6个属性

  - **order: 排列顺序**
  - flex-grow: 有剩余空间的时候的放大比列
  - flex-shrink: 空间不足的时候的缩放比例
  - flex-basis: 定义了在分配多余空间之前, 项目占据的主轴空间, 可以设置width和height一样的值
  - **flex:  flex-grow, flex thrink, flex-basis的缩写**
  - **align-self: 设置单个项目的对齐方式, 可覆盖 align-items**

  

#### 2. CSS 中解决浮动中高度塌陷的方案有哪些?

**思路**

- 可以先概括解决高度塌陷问题的两种类型：`clear` 属性 和 BFC 法
- 然后可以介绍两种类型的具体方案：
  - 追加元素并设置 clear 属性
  - 使用 CSS 样式插入伪元素
  - Bootstrap 的解决高度塌陷方案（BFC）



1. 高度塌陷产生的原因是什么？

由于浮动使得元素脱离正常文档流, 所以相邻的下面的元素就顶上去了, 于是就产生了父亲元素高度塌陷

2. `clear` 属性清除浮动的原理是什么？

3. 采用 BFC 解决高度塌陷和`clear` 属性清除浮动相比的优势是什么

#### 3. Flex 如何实现上下两行，上行高度自适应，下行高度 200px？

#### 4. 如何设计一个 4 列等宽布局，各列之间的边距是 10px（考虑浏览器的兼容性）？

#### 5. CSS 如何实现三列布局，左侧和右侧固定宽度，中间自适应宽度？

#### 6. CSS 清除浮动的原理是什么？

#### 7. BFC(Block Formating Context) 是什么？

1. BFC 是什么 ?

   BFC是W3C CSS 2.1规范中的一个概念, 意思是一个HTML元素在这个环境中不会影响到其他环境的布局, 把它理解成一个独立的容器, 且这个容器里的box布局与这个容器外的box毫不相干.

   这个太tm难理解了: 这么理解吧,  BFC内部子元素无论如何也不影响外部的元素

2. 触发BFC的条件是什么 ?

   1. float: 除了none以外的值

   2. position: absolute、fixed

   3. display: inline-block, table-cell, table-caption, [flow-root, 其作用](https://www.zhangxinxu.com/wordpress/2020/05/css-display-flow-root/)(让元素块状化，同时包含格式化上下文BFC, 清除浮动, 去除margin合并)
   4. overflow:  除了 visible 以外的值(hidden, auto, scroll)
   5. column-span: all(column-span值: none|inherit)

3. BFC的约束规则 是什么 ? 

   * 内部的盒会在垂直方向一个接一个排列
   * 处于同一个BFC中的元素相互影响，可能会发生外边距重叠
   * 每个元素的margin box的左边，与容器块border box的左边相接触
   * BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
   * 计算BFC的高度时，考虑BFC所包含的所有元素，连浮动元素也参与计算
   * 浮动盒区域不叠加到BFC上

4. BFC解决了什么问题 ? 

   1. 垂直外边距重叠问题
   2. 去除浮动
   3. 自适应两列布局（`float` + `overflow`）



#### 8. CSS 中的 `vertical-align` 有哪些值？它在什么情况下才能生效？

1. `vertical-align`属性值：

- 线类：`baseline`、`top`、`middle`、`bottom`
- 文本类：`text-top`、`text-bottom`
- 上标下标类：`sub`、`super`
- 数值百分比类：20px、2em、20%等（对于基线往上或往下偏移）

2. `vertical-align`生效前提：

- 内联元素`span`、`strong`、`em`、`img`、`button`、`input`等
- `display`值为`inline`、`inline-block`、`inline-table`或`table-cell`的元素
- **需要注意浮动和绝对定位会让元素块状化，因此此元素绝对不会生效**



#### 9. CSS 中选择器有哪些？CSS 选择器优先级是怎么去匹配？

!important <-- 内联样式 <-- ID选择器 <--类选择器/属性选择器/伪类选择器 <-- 元素选择器/伪元素选择器 <--关系选择器/通配符选择器

#### 10. [伪元素和伪类有什么区别？](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements)

* 伪类: 一种选择器, 操作对象是文档树中已有的元素,  以 : 开头
  1. 用户行为的伪类,  :hover、 :focus、:active、:link、:visited
  2. 伪类选择器,  :last-child、 :first-child、

* 伪元素 : 伪元素则创建了一个文档树外的元素, 以 :: 开头, eg: ::before、 ::after、::first-line、::first-letter



#### 11. CSS 中的 `background` 的 `background-image` 属性可以和 `background-color` 属性一起生效么？

不可以, background-image属性会覆盖background-color属性

* `background-color` 属性可以覆盖 `background-image` 属性吗？



#### 12. 了解 CSS 3 动画的硬件加速么？在重绘和回流方面有什么需要注意的点？

[css动画中使用硬件加速](https://juejin.cn/post/6844903649974435854)

1. 概念
   1. CSS3动画的硬件加速是: 利用GPU提升动画的流畅度, 直接在GPU处理, 不使用浏览器处理样式
   2. 重绘: 将回流得到的数据发送给GPU
   3. 回流: 是计算位置,大小等数据

2. 浏览器的渲染过程
   1. 生成DOM树和CSSOM树.  解析HTML,得到DOM树, 解析CSS, 得到CSSOM树
   2. 生成渲染树. 将DOM树和CSSOM树结合生成渲染树
   3. 回流. 根据生成的渲染树进行回流,得到几何信息(位置,大小等)
   4. 重绘. 根据渲染树和回流信息生成绝对像素
   5. display. 将像素发送给GPU, 展示在页面

3. [何时触发回流和重绘](http://47.98.159.95/my_blog/blogs/browser/browser-render/004.html#%E8%A7%A6%E5%8F%91%E6%9D%A1%E4%BB%B6-2)
* 何时触发回流
  
  1. 添加或删除可见的DOM元素
  
  2. 元素的位置发生变化
  
  3. 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
  
  4. 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代。
  
  5. 页面一开始渲染的时候（这肯定避免不了）
  
  6. 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）
  
* 何时发生重绘: 当页面中元素的样式改变并不影响它在文档流中的位置时, 浏览器会将新样式赋予给元素并重新绘制它, 这个过程叫重绘
4. 硬件加速

   1. 触发条件

      - transform
      - opacity
      - filter

   2. 需要注意的地方

      1. Memory(内存问题), 使用GPU过多可能会导致页面崩溃

      2. Font rendering:  在GPU渲染字体会导致抗锯齿无效, 最好在动画结束的时候关闭(怎么关闭 ??)硬件加速, 否则会产生字体模糊



#### 13. CSS 可以做哪些优化工作 ?

[使用CSS提高页面渲染速度](https://juejin.cn/post/6942661408181977118)

**思路**

1. **[内容可见性（content-visibility）](https://www.w3.org/TR/css-contain-2/#content-visibility)**

   1. content-visibility值: auto, visible, hidden
   2. content-visibility: hidden原理: 隐藏元素但是保留渲染状态, 隐藏元素的行为根display: none一样, 但是显示它的成本要低很多

2. **合理使用will-change:  浏览器将单独创建一个层, 交给GPU做优化, 表示该元素未来会发生变化**

   1. will-change值: 

      * auto
      * scroll-position
      * content
      * padding-top/right/bottom/left

   2. 使用注意事项

      1. 不要将will-change应用到太多元素上,

      2. 不要过早使用will-change优化, **will-change设计的初衷是作为最后的优化手段,用来解决现有的性能问题**

      3. **用在一些必要的动画上面,不要使用非动画元素 通过js添加和删除的方式使用它**

         ```javascript
         var el = document.getElementById('element');
         
         // 当鼠标移动到该元素上时给该元素设置 will-change 属性
         el.addEventListener('mouseenter', hintBrowser);
         // 当 CSS 动画结束后清除 will-change 属性
         el.addEventListener('animationEnd', removeHint);
         
         function hintBrowser() {
             // 填写上那些你知道的，会在 CSS 动画中发生改变的 CSS 属性名们
             this.style.willChange = 'transform, opacity';
         }
         
         function removeHint() {
             this.style.willChange = 'auto';
         }
         
         ```

3. **让元素及其内容尽可能独立于文档树的其余部分(contain)**

   * contain值:
     * layout: 告诉浏览器，容器的后代不应该导致其容器外元素的布局改变，反之亦然
     * paint: 告诉浏览器，容器的内容将永远不会绘制超出容器的尺寸，如果容器是模糊的，那么就根本不会绘制内容
     * size: 告诉浏览器，当其内容发生变化时，该容器不应导致页面上的位置移动
     * content: layout paint的缩写
     * strict:  layout paint size的缩写

4. **使用font-display解决-自定义字体由于字体造成的布局偏移（FOUT）**

   * font-display的值:

     * auto
     * block: 给予字体一个较短的阻塞时间（大多数情况下推荐使用 `3s`）和无限大的交换时间。换言之，如果字体未加载完成，浏览器将首先绘制“隐形”文本；一旦字体加载完成，立即切换字体。
     * swap: 使用 `swap`，则阻塞阶段时间为 `0`，交换阶段时间无限大。也就是说，如果字体没有完成加载，浏览器会立即绘制文字，一旦字体加载成功，立即切换字体
     * fallback: 这个可以说是`auto`和`swap`的一种折中方式。需要使用自定义字体渲染的文本会在较短的时间不可见
     * optional

   * **注: `font-display`一般放在 `@font-face`规则中使用**

   * eg:

     ```css
     @font-face {
         font-family: "Open Sans Regular";
         font-weight: 400;
         font-style: normal;
         src: url("fonts/OpenSans-Regular-BasicLatin.woff2") format("woff2");
         font-display: swap;
     }
     ```

     

5. **`scroll-behavior`让滚动更流畅**

   * `scroll-behavior`接受两个值

     * **`auto`** ：滚动框立即滚动
     * **`smooth`** ：滚动框通过一个用户代理定义的时间段使用定义的时间函数来实现平稳的滚动，用户代理平台应遵循约定，如果有的话, 除此之外，其还有三个全局的值：`inherit`、`initial`和`unset`

   * eg:

     ```css
     html {
         scroll-behavior:smooth;
     }
     ```

     ​	

6. **开启GPU渲染动画: 针对动画渲染问题**, 让主线程做的事情提前移动到GPU上执行, `transform`, `opacity`, `filter`, `will-change`

7. **减少渲染阻止时间: 针对媒体查询的样式**, 将一个样式文件拆分为多个

   * eg: 通过添加 `media`属性附加媒体查询，告诉浏览器何时应用样式表

     ```css
     <link rel="stylesheet" href="sm.css" media="(min-width: 20em)" />
     <link rel="stylesheet" href="md.css" media="(min-width: 64em)" />
     <link rel="stylesheet" href="lg.css" media="(min-width: 90em)" />
     <link rel="stylesheet" href="ex.css" media="(min-width: 120em)" />
     ```

8. **避免使用`@impoirt`包含多个样式表**, 如果`@import`样式表中嵌套了`@import`就会妨碍渲染性能

9. **注意动态修改自定义属性**

   * eg:

     ```css
     :root { --color: red; }
     
     button {
         color: var(--color);
     }
     // --color会被用在所有的button中, 更好的方式是使用setProperty来操作
     ```

     

#### 14. 浮动元素和绝对定位元素的区别和应用?

**思路: 浮动是什么, 绝对定位是什么, 分别有什么属性, 再说相同点, 不同点**

1. 相同点: 都会使元素脱离正常的文档流
2. 不同点:
   1. 浮动元素虽然脱离文档流, 但是其他元素会为它让位, 不会重叠
   2. 绝对定位的元素会与其他元素重叠



#### 15. CSS 中哪些属性可以继承？

1. 字体系列: ` font`, `font-weight`, `font-family`, `font-size`,` font-style`
2. 文本系列:  `text-indent`,` text-align`, `text-shadow`, `line-height`, `word-spacing`, `color`, `letter-spacing`
3. 列表元素: `list-style`、`list-style-type`、`list-style-position`、`list-style-image`
4. 盒模型相关的不可以继承



#### 16. 了解盒模型么 ?

1. W3C/ IE

#### 17. 如何实现左侧宽度固定，右侧宽度自适应的布局

1. 利用`float + margin`实现
2. 利用`calc`计算宽度
3. 利用`float + overflow`实现
4. 利用`flex`实现

#### 18. 说说z-index有什么需要注意的地方

[张大神的深入理解CSS中的层叠上下文和层叠顺序](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)

1. `z-index`值和`background`的覆盖关系

2. 绝对定位元素以及后来居上的准则

   谁大谁上, 后来居上

3. z-index默认值是什么，`0`和`auto`有没有区别？

   **z-index 默认值是: auto, 表示没有层叠上下文, 是个普通元素,**

   **z-index: 0 有层叠**

4. 层叠上下文形成条件

   1. position: absolute、relative、fixed、sticky且z-index不为auto
   2. flex容器的子元素 且z-index不为auto
   3. opacity属性值小于1的元素
   4. 以下属性值不为none: transform,filter, mask/mask-image/mask-border
   5. contain 属性值为 `layout`、`paint` 或包含它们其中之一的合成值（比如 `contain: strict`、`contain: content`）的元素
   6. 根元素html
   7. 元素`mix-blend-mode`值不是`normal`
   8. 元素的`isolation`值是`isolate`





## 疑问

1. 属性选择器, 关系选择器 ?
2. background-image属性会覆盖background-color属性, 为什么 ?
3. clear清除浮动的原理是什么 ?
4. Canvas