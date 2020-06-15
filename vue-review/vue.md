# vue的生命周期

![图片alt](./vue/lifecycle.png 'vue生命周期图') 


> 每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。


初始化过程：设置数据监听，模板编译，挂载DOM与视图绑定，挂载方法。
生命周期钩子：初始化不同阶段调用的是函数，方便用于插入代码，另一些在特定动作的时候也会触发（更新和销毁）。

### Vue构造函数

Vue  的核心代码入口，包括内置组件，全局API封装，Vue 实例化，观察者，虚拟DOM, 工具函数等等（不包含模板编译部分,源码/core部分）。


```
 // 入口
 // /vue/src/core/index.js


import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
...

initGlobalAPI(Vue)

...

Vue.version = '__VERSION__'

export default Vue

```
Vue 是从/instance/index.js中导出的默认值。

`initGlobalAPI(Vue)`

```
export function initGlobalAPI (Vue: GlobalAPI) {
  const configDef = {}
  configDef.get = () => config
    ...
  Object.defineProperty(Vue, 'config', configDef)
  // 设置 Vue.config 是一个对象，包含 Vue 的全局配置

  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }
  // Vue的静态方法，非提供给用户的api，尽量别碰

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick
  // 绑定全局API——Vue.set，Vue.delete，Vue.nextTick

  ...

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })
  // ASSET_TYPES = [ 'component','directive','filter' ] 

  Vue.options._base = Vue
  // 初始化options
  
  extend(Vue.options.components, builtInComponents)
  // builtInComponents = KeepAlive
  // 将keeplive组件 加入Vue.options.components
 

  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
  // 初始化Vue.extend，Vue.mixin，Vue.extend
  // AssetRegisters就是component，directive，filter三者
}

```
这部分主要是给Vue构造函数上增加全局静态方法和属性。通过`Object.getOwnPropertyNames(Vue)` 可以查看。
>  `Vue.set( target, key, value )`   修改对象或者数组的指并触发数据监测。(跟this.$set一样) 

> `Vue.delete(target,key/index)`  删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到 property 被删除的限制，但是你应该很少会使用它。(跟this.$delete一样).   [§](./demos/Vue.delete&&set&&nextTick.html 'Vue.delete && set && nextTick.html')


> `Vue.nextTick` 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

> `Vue.use` 用于安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。当 install 方法被同一个插件多次调用，插件将只会被安装一次,并且通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成。


```
// /vue/src/core/insance/index.js

import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
    if (process.env.NODE_ENV !== 'production' &&
        !(this instanceof Vue)
    ) {
        warn('Vue is a constructor and should be called with the `new` keyword')
    }
    this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue

```
