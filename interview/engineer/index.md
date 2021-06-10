## 工程化相关

### 下面的优化都是针对webpack 4.x



#### 1. Webpack 构建速度优化有哪些方案？

**思路:** 通过**speed-measure-webpack-plugin** 监控面板先查原因, 能列出每个loader和plugin的耗时, 再精准优化, 影响发布速度的有两个方面: 1. 构建 2. 压缩

**构建:**

1. 高版本webpack 4.xx + 
2. 多线程构建: thread-loader, 放在高性能开销的loader前面
3. 充分利用二次缓存: 
   * babel-loader 开启缓存, 
   * terser-webpack-plugin 开启缓存, 
   * 使用 cache-loader 或者hard-source-webpack-plugin
4. 缩小打包作用域
   * exclude/include
   * resolve.modules: 指明第三方模块的绝对路径(减少不必要的查找)
   * 合理使用alias
   * IgnorePlugin: 完全排除模块
5. DLL: 使用DLLPlugin进行分包, 使用DLLReferencePlugin(索引链接)对manifest.json应用, 让一些基本不会改动的代码优先打包成静态资源,避免反复编译浪费时间

**打包体积:**

1. 压缩代码:
   1. mini-css-extract-plugin提取chunk中的css, optimize-css-assets-webpack- plugin压缩css
   2. 多进程并行压缩:  terser-webpack-plugin
2. 提取公共资源:
   1. html-webpack-externals-plugin 将基础包通过cdn引入, 不打入bundle中
   2. 将基础包分离, 通过cdn引入
3. tree-shaking
   1. 禁用babel-loader模块依赖解析, 否则webpack接收到的是commonjs, 无法进行tree-shaking
4. 图片压缩: image-webpack-loader
5. 动态polyfill: polyfill-service



- 未优化前构建需要多少时间，优化后构建需要多少时间？
- 有没有分析是什么问题导致构建速率变慢？
- 打包缓存: 通过filename设置对应的hash文件
  1. hash: 每一次都不一样
  2. chunkhash, 精确到文件变化
  3. contenthash: 8

#### 2. 说说你对 cz 生态的了解？

[git提交规范的限制](https://juejin.cn/post/6844903831893966856)

#### 3. 简单说说 Webpack 对于性能优化有哪些特性？

#### 4. 了解 webpack 的懒加载么

webpack懒加载核心原理就是jsonp

#### 5. Vue 如何配合 Echarts / OpenLayers 实现性能优化？

#### 6. Webpack的loader和plugins的区别

1. Loader:

   * 作用: 用于对模块源码的转换, webpack本身只支持js的处理, 非js模块的处理需要借助对应的loader来做转换, eg: sass-loader, style-loader, file-loader...

   * 工作原理: 首先是一个node模块,返回对source的处理结果

     ```javascript
     module.exports = source => {
       // ...
       return result(source)
     }
     ```

2. Plugin:

   * 作用: 打包, 优化, 压缩, 定义环境变量, 代码拷贝到指定目录, 可以处理各种各样的任务

#### 7. 说说Webpack的实现原理

#### 8. webpack核心工作原理

1. ---> 找到entry入口文件 

2. ---> 根据入口文件解析所有的依赖文件

3. ---> 生成一个依赖树

4. ---> 递归遍历依赖树找到每个节点对应的资源文件

5. ---> 根据rules属性找到模块对应的加载器, 加载对应的模块

6. ---> 将加载结果放在bundle.js结果文件中

   

#### 9. webpack构建流程主要有哪些环节 ?

1. 配置初始化: webpack首先读取配置文件, 执行默认配置
2. 编译前准备: webpack实例化compiler, 注册plugins,hooks
3. resolve 前准备: 实例化compilation, NormalModuleFactory,ContextModuleFactory
4. resolve 流程: 解析文件路径信息以及inline loader 和配置的loader合并,排序
5. 构建module: runLoaders处理源码, 得到一个编译后的字符串或buffer, 将文件解析成ast, 分析module间的依赖关系, 递归解析文件依赖
6. 生成chunk: 实例化chunk并生成chunk graph, 设置module id, chunk id, hash等
7. 资源构建: 使用不同的template渲染chunk资源
8. 结果文件生成: 创建目标文件夹并将资源写入, 打印构建信息

#### 10. [HMR原理](https://segmentfault.com/a/1190000020310371)





