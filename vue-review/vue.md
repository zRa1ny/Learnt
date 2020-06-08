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

  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })
  // ASSET_TYPES = [ 'component','directive','filter' ] 

  Vue.options._base = Vue
  // 初始化options
  
  extend(Vue.options.components, builtInComponents)
 

  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
  // 初始化Vue.extend，Vue.mixin，Vue.extend
  // AssetRegisters就是component，directive，filter三者
}

```



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
