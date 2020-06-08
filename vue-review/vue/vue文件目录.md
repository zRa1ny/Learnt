1. compiler 目录包含Vue.js 所有编译相关的代码。它包括把所有模板解析成ast 语法树， ast 语法树优化等功能。

 

2. core 目录 包含了Vue.js 的核心代码，包括内置组件，全局API封装，Vue 实例化，观察者，虚拟DOM, 工具函数等等。

    1. observer     相应系统，包含数据观测的核心代码。

    2. vdom     包含虚拟DOM 创建（creation）和打补丁(patching) 的代码

    3. instance  包含Vue 构建函数设计相关的代码

    4. global-api   包含给Vue 构造函数挂在全局（静态方法）或属性的代码

    5. components  包含抽象出来的通用组件

 3. platform Vue.js 是一个跨平台的MVVM 框架，它可以跑在web上，可以跑在weex 跑在，native客户端上，platform 是Vue.js 的入口，2 个目录代表2主要入口，

　　分别打包成运行在web 上和weex 上的Vue.js

 

4. server  Vue.js 2.0 支持了服务端渲染，所有服务端渲染相关的逻辑都在这个目录下，注意，这部部分代码是跑在服务端的Node.js, 不要和跑