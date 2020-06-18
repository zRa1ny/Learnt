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

|  名称   | 触发时机  |
|  ----  | ----  |
| beforeCreate  | 在实例初始化之后调用。 |
| created  | 在实例创建完成后被立即调用。 |
| beforeMount  | 在挂载开始之前被调用。 |
| mounted  | 实例被挂载后调用。 |
| beforeUpdate  | 数据更新时之后，虚拟DOM更新和页面重新渲染之前调用。 |
| updated  | 数据更改导致的虚拟DOM更新和页面重新渲染之后调用。 |
| beforeDestroy  | 实例销毁之前调用。 |
| destroy  | 实例销毁后调用。 |
| activated  |  被 keep-alive 缓存的组件激活时调用。 |
| deactivated  | 被 keep-alive 缓存的组件停用时调用。 |

### Vue的实例化过程

从 `new Vue()` 开始：

```
function Vue (options) {
    if (process.env.NODE_ENV !== 'production' &&
        !(this instanceof Vue)
    ) {
        warn('Vue is a constructor and should be called with the `new` keyword')
    }
    // 不是生产环境下，判断是否是通过new调用的函数，必须使用new调用 否则提示。
    this._init(options)
    // 开始_init
}

```

`_init`:创建和初始化实例，完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。

```
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    ...
    vm._uid = uid++
    vm._isVue = true
    // 初始化两个私有属性
    ...
    if (options && options._isComponent) {
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    // 优化内部组件实例化
    // 因为动态选项合并是相当慢的
    // 没有内部组件选项需要特殊处理。
    // mergeOptions 函数将会把 Vue.options 作为 父选项，把我们传递的实例选项作为子选项进行合并，合并的结果我们可以通过打印 $options 属性得知。

    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    //当前环境是开发环境，则调用initProxy方法
    //如果不是开发环境，则vue实例的_renderProxy属性指向vue实例本身。

    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

```

```
vm._uid = uid++
vm._isVue = true
``` 
首先，用vm缓存了当前的实例， 再添加了两个私有属性`_uid`和`_isVue`,一个是vue实例的编号，从0开始，一个是Vue的标识(为了vm对象避免被observed)。
```
 if (options && options._isComponent) {
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }

```

接着进行判断`options && options._isComponent`,
new Vue调用时传入的options，没有_isCommponet属性，进行else分支，执行`mergeOptions`方法，第一个是resolveConstructorOptions方法返回值(vm.constructor的options，即Vue.options)，第二是new Vue时传入的值(自定义的options)，第三个是vue对象本身。mergeOptions就是通过一系列的合并策略，将Vue的构造函数以及自定义的options进行合并。 [§](./demos/vue_init/index.html?step=1) 。

```
export function mergeOptions (
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child)
  }

  if (typeof child === 'function') {
    child = child.options
  }

  normalizeProps(child, vm)
  normalizeInject(child, vm)
  normalizeDirectives(child)

  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }

  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
```
`mergeOptions`方法中parent对应Vue.options,child对应实例化传入的options，vm实例本身。

```
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child)
  }
```
`checkComponents`会对传入的组件名称(options.components)的合法性校验， 包括不能与html标签冲突，名称包含字符，数字，连接符，并要以字母开头等。
 
```
 normalizeProps(child, vm)
 normalizeInject(child, vm)
 normalizeDirectives(child)

```

接着对输入的`Props` 、`Inject` 、`Directives` ,进行格式统一（因为Vue同一个选项可以接受不同形式的传值，例如数组，对象和函数等，这里统一进行转化。）

```
 if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }

```
child是new传入的options，所以_base属性是没有的（vue里面option上的_开头的都是私有属性），所以进进行下面代码。
判断是否传入了`mixins`和`extends`,对extends和mixins属性的处理。递归调用mergeOptions方法，将入参中的extends与mixins合并到parent上。
到这里，数据以及准备完毕。

```
  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
```

对于不同属性的key，Vue有不同的合并策略。
对其他属性的合并策略我们就不一一分析代码，总体原则：parent与child两者中只有一个有值，则就直接使用该值，如果两者都有，则视情况： [§](./demos/vue_init/index.html?step=2) 
1. beforeCreate/created/...：child的属性通过contact连接到parent后面。
2. watch:child的属性通过contact连接到parent后面。
3. props/methods/computed:child中属性值的覆盖parent的属性值。
4. data/provide:child中的属性值覆盖parent的属性值。
5. component/directive/filter：child中的属性值覆盖parent的属性值。


当component组件调用的时候,会设置`_isComponent=true`,执行第一种情况。


```
if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
```

根据环境判断，通过不同方式设置实例的`_renderProxy`, 在非生产环境下，使用initProxy，生产环境下，直接设置`vm._renderProxy = vm`。
```
  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      const options = vm.$options
      const handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler
      vm._renderProxy = new Proxy(vm, handlers)
    } else {
      vm._renderProxy = vm
    }
  }
```
 hasProxy：
 ```
  const hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

   function isNative (Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
  }
 ```
`isNative`判断传入的是否是函数，并且是否是内置的函数。
`hasProxy` 判断是否存在Proxy这个内置函数。（Proxy es6）
上面initProxy代码中，先判断是否存在Proxy，如果存在：
```
const options = vm.$options
const handlers = options.render && options.render._withStripped
? getHandler
: hasHandler
 vm._renderProxy = new Proxy(vm, handlers)
```
如果当前实例的$options上存在render属性，且render属性上存在_withStripped（traps其实也就是自定义方法）属性采用getHandler方法,否则采用hasHandler方法菜作为代理的handler函数。

这里$options已经初始化完成，new Vue(opts)情况下，_withStripped属性不存在（实际上这个属性在源码中也没有找到设置的地方，猜测是打包的过程注入？），所以使用`hasHandler`.
```
    var hasHandler = {
      has: function has (target, key) {
        var has = key in target;
        var isAllowed = allowedGlobals(key) ||
          (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
        if (!has && !isAllowed) {
          if (key in target.$data) { warnReservedPrefix(target, key); }
          else { warnNonPresent(target, key); }
        }
        return has || !isAllowed
      }
    };

```
使用Proxy代理的handler，设置has可以拦截hasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
```
    var allowedGlobals = makeMap(
      'Infinity,undefined,NaN,isFinite,isNaN,' +
      'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
      'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
      'require' // for Webpack/Browserify
    );

```

```
  function makeMap (
    str,
    expectsLowerCase
  ) {
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase
      ? function (val) { return map[val.toLowerCase()]; }
      : function (val) { return map[val]; }
  }

```
`allowedGlobals`判断了当前满足has拦截操作的key是否在定义集合中，在就返回true，不在就返回undefined。`!has && !isAllowed`代表目标不在这个值和这个值不允许has操作的时候，报错，否则就正常返回值。

`initProxy`如果Proxy属性存在，则把包装后的vm属性赋值给_renderProxy属性值。否则把vm是实例本身赋值给_renderProxy属性.[§](./demos/vue_init/index.html?step=3) 

```
 vm._self = vm;

```
将实例的_self属性设置为当前实例。然后执行`initLifecycle(vm)`，先看下initLifecycle的代码。

```
  function initLifecycle (vm) {
    var options = vm.$options;
    var parent = options.parent;
    if (parent && !options.abstract) {
      while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent;
      }
      parent.$children.push(vm);
    }

    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;

    vm.$children = [];
    vm.$refs = {};

    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
  }
```

首先获取实例的$options属性赋给options,然后获取options.parent赋给parent，当new Vue(opts)过程中，上一步得到$options中没有parent属性，所以parent是undefined。
```
  if (parent && !options.abstract) {
      while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent;
      }
      parent.$children.push(vm);
  }

   vm.$parent = parent;
   vm.$root = parent ? parent.$root : vm;

   vm.$children = [];

```

这里先接着上面的逻辑看，parent是undefined，直接跳过判断语句，执行下面的代码，设置实例的`$parent=parent=undefined`,三目表达式的结果是vm`vm.$root = parent ? parent.$root : vm `，所以设置$root属性为实例本身。

这里我通过new Vue实例化的是根节点的vue实例，
还有一种情况，是vue的组件的情况，子组件注册的时候会把父实例挂载到自身的parent属性上
```
  function createComponentInstanceForVnode (
    vnode, // we know it's MountedComponentVNode but flow doesn't
    parent // activeInstance in lifecycle state
  ) {
    var options = {
      _isComponent: true,
      _parentVnode: vnode,
      parent: parent
    };
    ...
  }

```
在initLifecycle过程中，会反向拿到parent上的父组件vnode,并为其$children属性添加该子组件vnode，如果在反向找父组件过程中，如果父组件有abstract属性，就判断该组件属性为抽象组件，此时利用parent的链条往上寻找，直到组件不是抽象组件为止。
2 .这样的处理，能让每隔组件都找到上层父组件以及下层的子组件，使得组件之间形成一个紧密的关系树

所以当前为子组件的时候满足上面判断中的parent存在。
```
  if (parent && !options.abstract) {
      while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent;
      }
      parent.$children.push(vm);
  }

```
如果当前组件是抽象组件（options拥有abstract属性），直接跳过继续执行下面逻辑，即设置$parent为parent和$root为parent.$root.
例如 transition,transition-group,keep-alive ，抽象组件没有真实的节点，在组件渲染的时候不会解析渲染成真实的dom节点，而只是作为中间的数据过度层处理.


如果当前的不是抽象组件。执行while循环,通过parent反向寻找父组件,判断父组件是否是抽象组件（parent.$options.abstract），如果不是，直接跳出循环，并自身实力加到父组件的$children中；如果parent是抽象组件，就将parent更新成parent.$parent，继续循环，向上级寻找，直到找到一个不是抽象组件的父组件跳出来循环，并自身实力加到父组件的$children中。

接着后面一样的设置$parent为parent和$root为parent.$root.
这样的处理，能让每个组件都找到上层父组件以及下层的子组件，使得组件之间形成一个紧密的关系树。
总结：

组件vm（非抽象和抽象）：vm的options.parent属性会存放注册时候的父组件（这里可以是抽象组件也可以。），并且parent属性不会改变，所以就形成了一个由下向上的链接。


vm的$parent属性会存放这个链接上的第一个非抽象组件的父组件，并且这个父组件会将这个组件加入到自己的$children中。










