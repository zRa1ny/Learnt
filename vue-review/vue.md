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

> `Vue.delete(target,key/index)`  删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到 property 被删除的限制，但是你应该很少会使用它。(跟this.$delete一样).  


> `Vue.nextTick` 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。 [§](./demos/Vue.delete&&set&&nextTick.html 'Vue.delete && set && nextTick.html')


> `Vue.use` 用于安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。当 install 方法被同一个插件多次调用，插件将只会被安装一次,并且通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成。 

```
// plugin install
// 这个插件必须具有install方法 
const plugin = {
 install (Vue, options) { 
    // 添加全局方法或者属性 
    Vue.myGlobMethod = function () {}; 
    // 添加全局指令 
    Vue.directive(); 
    // 添加混入 
    Vue.mixin(); 
    // 添加实例方法 
    Vue.prototype.$xxx = function () {}; 
    // 注册全局组件 
    Vue.component() 
 } 
} 

// plugin 函数
const plugin =  (Vue)=>{
  Vue.component(Add.name,Add)
}


// 安装
import Vue from 'vue'; 
// Vue.use内部会调用plugin的install方法
// Vue.use内部会蒋plugin函数当做install方法调用
Vue.use(plugin);

```

> Vue.mixin( mixin ) : 全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。插件作者可以使用混入，向组件注入自定义的行为。不推荐在应用代码中使用。

> Vue.extend( options )  使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

> Vue.component( id, [definition] ) 注册或获取全局组件。注册还会自动使用给定的 id 设置组件的名称

>Vue.directive( id, [definition] )  注册或获取全局指令。

>Vue.filter( id, [definition] )  注册或获取全局过滤器。


---

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
这部分主要给Vue.prototype增加了各种方法。
```
// initMixin(Vue)
// 为Vue的原型对象增加一个_init方法，该方法用于Vue实例时初始Vue实例对象。
export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
     ...
  }
}

// stateMixin(Vue)
// 初始化 $data $props 属性，定义$set，$delete，$watch 方法
export function stateMixin (Vue: Class<Component>) {
  ...
  Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)

  Vue.prototype.$set = set
  Vue.prototype.$delete = del

  Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
     ...
  }
}

// eventsMixin(Vue)
export function eventsMixin (Vue: Class<Component>) {
  const hookRE = /^hook:/
  Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
    ...
  }
  // $on(eventName) 监听事件

  Vue.prototype.$once = function (event: string, fn: Function): Component {
    ...
  }
  // $once(eventName) 监听事件触发一次

  Vue.prototype.$off = function (event?: string | Array<string>, fn?: Function): Component {
    ...
  }
  // $off(eventName) 解除监听事件

  Vue.prototype.$emit = function (event: string): Component {
    ...
  }
  // $emit(eventName) 触发事件
}

// lifecycleMixin(Vue)
export function lifecycleMixin (Vue: Class<Component>) {
  Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    ...
  }
  //_update 是实例的一个私有方法，它被调用的时机有 2 个，一个是首次渲染，一个是数据更新的时候渲染。第二种会触发beforeUpdate和updated生命周期钩子。

  Vue.prototype.$forceUpdate = function () {
    ...
  }
  // $forceUpdate强制更新，包括没有没有被页面监听到的变化，都会刷新到页面上，但是不会使这个值被监听到。

  Vue.prototype.$destroy = function () {
    callHook(vm, 'beforeDestroy')
    ...
    vm.__patch__(vm._vnode, null)
    callHook(vm, 'destroyed')
    vm.$off()
  }
  // $destroy只是完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。不会清除dom。会触发 beforeDestroy 和 destroyed；
}

//renderMixin(Vue)
export function renderMixin (Vue: Class<Component>) {
  installRenderHelpers(Vue.prototype)
  // 这就是 Vue 的各类渲染方法了

  Vue.prototype.$nextTick = function (fn: Function) {
    return nextTick(fn, this)
  }
  // 定义了 Vue 的 $nextTick 

  Vue.prototype._render = function (): VNode {
  
  }
  // 定义了 Vue 的 $nextTick 
  
}

// 最后导出Vue

```

# vue的生命周期

![图片alt](./vue/lifecycle.png 'vue生命周期图') 


> 每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。


初始化过程：设置数据监听，模板编译，挂载DOM与视图绑定，挂载方法。
生命周期钩子：初始化不同阶段调用的是函数，方便用于插入代码，另一些在特定动作的时候也会触发（更新和销毁）。

各个生命周期钩子的触发时机：
名称|触发时机|
--|:--
beforeCreate | 在实例初始化之后调用。
created | 在实例创建完成后被立即调用。
beforeMount | 在挂载开始之前被调用。
mounted | 实例被挂载后调用。
beforeUpdate | 数据更新时之后，虚拟DOM更新和页面重新渲染之前调用。
updated | 数据更改导致的虚拟DOM更新和页面重新渲染之后调用。
beforeDestroy | 实例销毁之前调用。
destroy | 实例销毁后调用。
activated | 被 keep-alive 缓存的组件激活时调用。
deactivated | 被 keep-alive 缓存的组件停用时调用。

### Vue的实例化过程




