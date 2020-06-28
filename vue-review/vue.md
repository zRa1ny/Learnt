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

这里是通过new Vue实例化的是根节点的vue实例。
还有另一种情况，是vue的组件的情况，子组件注册的时候会把父实例挂载到自身的parent属性上。
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
所以子组件在initLifecycle过程中，满足上面判断中的parent存在。
判断当前组件是否为抽象组件：
抽象组件:没有真实的节点，在组件渲染的时候不会解析渲染成真实的dom节点，而只是作为中间的数据过度层处理,例如 transition,transition-group,keep-alive。
```
  if (parent && !options.abstract) {
      while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent;
      }
      parent.$children.push(vm);
  }

```
如果当前组件不是抽象组件，会反向拿到parent上的父组件vnode，如果父组件没有abstract属性，即为非抽象组件，为其$children属性添加该子组件vnode；如果在反向找父组件过程中，如果父组件有abstract属性，就判断该组件属性为抽象组件，此时利用parent的链条往上寻找，直到找的父组件不是抽象组件为止。


如果当前组件是抽象组件（options拥有abstract属性），直接跳过继续执行下面逻辑，即设置$parent为parent和$root为parent.$root.


总结：
`options.parent` ：
组件vm（非抽象和抽象）：vm的options.parent属性会存放注册时候的父组件（这里可以是抽象组件也可以。），并且parent属性不会改变，所以就形成了一个由下向上的链接。

`$parent` ：
抽象组件：vm的$parent属性，因为`parent && !options.abstract`判断不通过，直接跳过向上寻找父组件的过程，直接把options.parent赋给$parent。

非抽象组件：vm的$parent属性，因为`parent && !options.abstract`判断通过，接着判断options.parent即父组件是否是抽象组件？如果不是，那么直接把options.parent赋给$parent属性；如果是抽象组件，那么把这个抽象父组件的$parent（上一条已经说明了非抽象组件的$parent就是他的options.parent,所以抽象组件的$parent属性也可能是抽象组件，所以才有循环寻找）属性赋给parent缓存，在进行向上查找非抽象父组件的循环（所以非抽象组件的$parent一定是非抽象组件），当找到这个非抽象的父组件的时候，把自己加到这个父组件的$children中。这是通过$parent和$children,所有的非抽象组件形成了一个紧密的关系树。[§](./demos/vue_init/index.html?step=4) 


接下来初始化了生命周期相关的一些属性。

```
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
```
再回回到_init方法，继续执行`initEvents(vm)`，首先看下`initEvents`的代码：
```
  function initEvents (vm) {
    vm._events = Object.create(null);
    vm._hasHookEvent = false;
    // init parent attached events
    var listeners = vm.$options._parentListeners;
    if (listeners) {
      updateComponentListeners(vm, listeners);
    }
  }

```

1. 增加了一个_events属性，用Object.create(null)进行创建原型上比较干净。
2. 增加了一个_hasHookEvent,用来判断是否通过@hook监听组件生命周期函数。
3. 声明一个变量listeners储存vm.$options._parentListeners，_parentListeners，父组件绑定在当前组件上的事件属性是父组件绑定在当前组件上的事件。
4. 判断listeners是否存在，存在就执行`updateComponentListeners(vm, listeners)`

initEvents执行完毕，事件（父组件@监听的）相关已经初始化完成。[§](./demos/vue_init/index.html?step=5) 。

继续执行`initRender(vm)`，
```
  function initRender (vm) {
    vm._vnode = null; // the root of the child tree
    vm._staticTrees = null; // v-once cached trees
    var options = vm.$options;
    var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
    var renderContext = parentVnode && parentVnode.context;
    vm.$slots = resolveSlots(options._renderChildren, renderContext);
    vm.$scopedSlots = emptyObject;
    // bind the createElement fn to this instance
    // so that we get proper render context inside it.
    // args order: tag, data, children, normalizationType, alwaysNormalize
    // internal version is used by render functions compiled from templates
    vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
    // normalization is always applied for the public version, used in
    // user-written render functions.
    vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

    // $attrs & $listeners are exposed for easier HOC creation.
    // they need to be reactive so that HOCs using them are always updated
    var parentData = parentVnode && parentVnode.data;

    /* istanbul ignore else */
    {
      defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
        !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
      }, true);
      defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
        !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
      }, true);
    }
  }
```
首先为了实例增加了技术个属性值，接着往下看
```
    vm.$slots = resolveSlots(options._renderChildren, renderContext);
```
`renderContext` 是 `vm.$options._parentVnode`,`renderContext` 是 `vm.$options._parentVnode.context`,在我们new Vue() 过程中到这里，并没有在$options中添加和辅助`_parentVnode`，所以这里的两个值都`undefined`（组件实例化的时候_parentVnode存放自身VNode，context存放父级Vm），接下来再看看`resolveSlots`函数：
```
  function resolveSlots (
    children,
    context
  ) {
    if (!children || !children.length) {
      return {}
    }
    var slots = {};
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var data = child.data;
      // remove slot attribute if the node is resolved as a Vue slot node
      if (data && data.attrs && data.attrs.slot) {
        delete data.attrs.slot;
      }
      // named slots should only be respected if the vnode was rendered in the
      // same context.
      if ((child.context === context || child.fnContext === context) &&
        data && data.slot != null
      ) {
        var name = data.slot;
        var slot = (slots[name] || (slots[name] = []));
        if (child.tag === 'template') {
          slot.push.apply(slot, child.children || []);
        } else {
          slot.push(child);
        }
      } else {
        (slots.default || (slots.default = [])).push(child);
      }
    }
    // ignore slots that contains only whitespace
    for (var name$1 in slots) {
      if (slots[name$1].every(isWhitespace)) {
        delete slots[name$1];
      }
    }
    return slots
  }

```

首先判断传入的`children` 是否符合要求，不符合直接返回`{}`。（根Vue和没有slot的情况）
如果符合要求，就对传入的`children`进行遍历，寻找所有solt，然后返回slots。

这里new Vue()实例化，直接返回空，所以  `vm.$slots` 和 `vm.$scopedSlots` 初始化都 `{}`。

再看两个关键函数`vm._c` 和 `vm.$createElement `,两个函数是一样的，一个用于内部使用，一个提供给用户的方法。
```
 function (a, b, c, d) { return createElement(vm, a, b, c, d, true); }

```
内部直接调用`createElement`函数,`createElement`函数内部对数据进行校验，
```
  function createElement (
    context,
    tag,
    data,
    children,
    normalizationType,
    alwaysNormalize
  ) {
    if (Array.isArray(data) || isPrimitive(data)) {
      normalizationType = children;
      children = data;
      data = undefined;
    }
    if (isTrue(alwaysNormalize)) {
      normalizationType = ALWAYS_NORMALIZE;
    }
    return _createElement(context, tag, data, children, normalizationType)
  }

```

判断`data`是不是数组或者是基本类型，如果成立，则判断判断为省略了data参数，就把后面两个参数依次向前赋值，并把data设为undefined。判断`alwaysNormalize`是否`true`,是将`normalizationType`设置为`ALWAYS_NORMALIZE`(常量2 children的两种模式)。然后传入`_createElement`,`createElement`函数包装了一下`_createElement`，处理了一下传参。
再看看`_createElement`,代码有点长，我们直接拆分开看,
```
   if (isDef(data) && isDef((data).__ob__)) {
      warn(
        "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
        'Always create fresh vnode data objects in each render!',
        context
      );
      return createEmptyVNode()
    }

```
`isDef():`
```
 function isDef (v) {
    return v !== undefined && v !== null
 }

```
监测传入的`data`参数存在并且`(data).__ob__`存在，`__ob__`这个是Vue数据监测的时候加上的标识，这里判断传入的data不能是响应式的，vnode中的data不能是响应式的。如果是，则Vue抛出警告,返回一个空的`VNode`。

```
  if (isDef(data) && isDef(data.is)) {
      tag = data.is;
  }
```
`data`上有`is`属性（`<div is="bs-pop"></div>`），使用`is`的值作为`tag`的值。

```
  if (!tag) {
      // in case of component :is set to falsy value
      return createEmptyVNode()
    }
```
监测`tag`,如果没有值，想当于没有`tag`的初值，也没有`is`属性，即没有html标签也不是组件，直接返回一个空`VNode`。
```
   if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)
    ) {
      {
        warn(
          'Avoid using non-primitive value as key, ' +
          'use string/number value instead.',
          context
        );
      }
    }
```
继续判断`data.key`（`<li v-for="(value,index) :key="index"></li>`）不能是响应式的数据，
```
    if (Array.isArray(children) &&
      typeof children[0] === 'function'
    ) {
      data = data || {};
      data.scopedSlots = { default: children[0] };
      children.length = 0;
    }
   
```
当`createElement`函数 使用作用域插槽的时候，如果只有一个`default`插槽，可以直接使用一个函数。默认插入默认插槽。[§](./demos/slots.html?step=slots) 

```
    if (normalizationType === ALWAYS_NORMALIZE) {
      children = normalizeChildren(children);
    } else if (normalizationType === SIMPLE_NORMALIZE) {
      children = simpleNormalizeChildren(children);
    }

```
接下来我们来看下children的规范化:`normalizationType`不同对`children`做不同的处理，类型不同规范的方法也不同。
```
    vm.$createElement = function (a, b, c, d) {
       return createElement(vm, a, b, c, d, true);
     };

```
造成这种类型不同主要是由于`render`函数是用户自己手写的还是`template`生成的。提供给用用户的方法，默认给`createElement`传了`true`,所以会执行`normalizationType = ALWAYS_NORMALIZE`，另一种根据`template`生成的时候`normalizationType = SIMPLE_NORMALIZE`

接下来我们来看下`normalizeChildren`和`simpleNormalizeChildren`的实现:
```
 function normalizeChildren (children) {
    return isPrimitive(children)
      ? [createTextVNode(children)]
      : Array.isArray(children)
        ? normalizeArrayChildren(children)
        : undefined
  }

```
判断children是不是基础类型：
如果是，即`h('span','xxxx')`这种情况，

```
 function createTextVNode (val) {
    return new VNode(undefined, undefined, undefined, String(val))
  }
```
`createTextVNode`会返回一个标准文本`VNode{text:'xxx'}`,所以会返回标准格式的`[VNode]`。

如果不是基础类型，继续继续判断是不是数组，如果不是直接返回`undefined`;
如果是，执行`normalizeArrayChildren(children)`,再看`normalizeArrayChildren`这个函数,代码比较长，照样拆分开来看。
```
 var res = [];
 var i, c, lastIndex, last;
 ```
 定义了五个局部变量，`res`用来存放的是返回值，`i`是`chilren`的便利的下标，`c`在循环内储存的是每次循环的值，`lastIndex`是`res`最后一个值的下标，`last`是`res`的最后一个值。
```
for (i = 0; i < children.length; i++) {
      c = children[i];
      if (isUndef(c) || typeof c === 'boolean') { continue }
      lastIndex = res.length - 1;
      last = res[lastIndex];
      ...
}
```
进入循环，每次循环首先 `c = children[i]`,用变量缓存当次循环的值。
```
if (isUndef(c) || typeof c === 'boolean') { continue }
```
对`c`进行逻辑判断
```
  function isUndef (v) {
    return v === undefined || v === null
  }
```
`isUndef`判断值是否为`null`或`undefined`,所以当`c`为`null`或`undefined`或布尔值的时候，直接跳出这次循环进行下一次循环。

如果不是，继续此次循环，向下执行。
```
  lastIndex = res.length - 1;
  last = res[lastIndex];
  if (Array.isArray(c)) {
  } else if (isPrimitive(c)) {
  }else{
  }

```
先对`lastIndex`和`last`进行赋值。
然后判断当前的`c`是否是一个数组？
如果不是数组：
继续判断是否是基础类型的？
`c`是基础类型(&&不是数组)，则执行下面代码
```
  if (isTextNode(last)) {
      res[lastIndex] = createTextVNode(last.text + c)
    } else if (c !== '') {
      res.push(createTextVNode(c));
    }
```
```
  function isTextNode (node) {
    return isDef(node) && isDef(node.text) && isFalse(node.isComment)
  }
```
`isTextNode`判断当前传入的对象和对象的`text`属性均部位`undefined`和`null`，且`isComment`属性为`false`，即判断当前节点为`textNode`。
判断已经加入到`res`的最后一个节点`last`是否为`textNode`节点？如果是，则合并当前`c`的值和最后一个节点的值。如果不是，这继续判断当前的值`c`是否不为空，不为空就以`c`的值创建一个`textNode`加入到`res`中。

`c`不是基础类型（&&不是数组）：
```
   if (isTextNode(c) && isTextNode(last)) {
        res[lastIndex] = createTextVNode(last.text + c.text);
   } 
```
判断`c`和`last`是不是都是`textNode`？如果是就合并这两项，替换`res`现在的最后一位（`last`）。
如果不是，则继续判断
```
    else {
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
    }
```
如果`v-for`绑定的，判断是否有`tag`和当前是否传入的`nestIndex`并且没有`key`属性，则给`c`加一个`key`,采用`__vlist`+传入的下标+`_` + 当前的下标 + `__`，即这部分是为了没有加`key`属性的`v-for`操作加上`key`属性。
然后将`c`加入到`res`最后。


如果是数组：
```
 if (c.length > 0) {
    c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
    if (isTextNode(c[0]) && isTextNode(last)) {
      res[lastIndex] = createTextVNode(last.text + (c[0]).text);
      c.shift();
    }
    res.push.apply(res, c);
    console.log(res)
  }
```
判断长度是大于0？如果当前`c`是空数组，直接完成此次循环。
如果`c`长度大于0，则递归调用`normalizeArrayChildren`处理，然会一个标准的`VNode`数组。

```
  if (isTextNode(c[0]) && isTextNode(last)) {
      res[lastIndex] = createTextVNode(last.text + (c[0]).text);
      c.shift();
    }
```
如果返回的这个数组`c`的第一个节点是`TextNode`并且当前`res`的最后一个也是`TextNode`，合并这两个`TextNode`，并删除`c`的第一个节点。

最后，将`c`这个标准`VNode`数组通过`res.push.apply(res, c)`将每一项加入`res`最后。

当遍历完成的时候，`res`中存放的是标准的`VNode`节点数组，并且打平成一维数组。

另一种情况,由模板编译器`render`,这情况下`html`标签生成的渲染函数保证返回Array，如果是组件的情况下会进行规范。

```
    else if (normalizationType === SIMPLE_NORMALIZE) {
      children = simpleNormalizeChildren(children);
    }
```
```
  function simpleNormalizeChildren (children) {
    for (var i = 0; i < children.length; i++) {
      if (Array.isArray(children[i])) {
        return Array.prototype.concat.apply([], children)
      }
    }
    return children
  }
```
但是函数式组件返回的是 一个数组而不是一个节点，使用`Array.prototype.concat.apply([], children)`进行一层级的扁平化，而因为组件内部的子组件已经自己正常化了，所以只需要打平一层成一维数组。

`$createElement`和`_c`都是完成`children` 的规范化以及 `VNode` 的创建。[§](./demos/vue_init/index_vnode.html) 

继续回到`initRender`函数。当前`new Vue()`实例化过程中，`parentData`是`undifinded`,
```
 {
      defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
        !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
      }, true);
      defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
        !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
      }, true);
 }

```
`defineReactive$$1`这个函数用来创建响应式对象，简单来说就是给需要监听的对象，设置好`setter`里收集依赖，在`getter`里面触发，是对definePropoty的一层封装，这里是对响应式数据的初始化。

但是在这里，因为传了了第五个参数true,所以这里当前设置值的不会被设置监听，及没有`_ob_`属性。所这里相当给实例设置`$attrs`和`$listeners`两个值，并设置初始值，设置不可设置。

至此，`initRender`执行完成，实例上增加`$slots`,`$scopedSlots`,`$createElement`,`$attrs`,`$listeners`。

回到`_init`,
```
 callHook(vm, 'beforeCreate');
```
```
  function callHook (vm, hook) {
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        invokeWithErrorHandling(handlers[i], vm, null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
    popTarget();
  }
 ```
 `callHook`:触发生命周期钩子（即$options里面对呀的钩子方法）并将当前实例设置钩子函数的`this`，然后发送对面的hook事件。[§](./demos/vue_init/index.html?step=6)

 这里触发了`beforeCreate`，也就进入第一个生命周期钩子，官方将`new Vue()`到`callHook(vm, 'beforeCreate')`中间这个阶段称为`init Events & lifeCycle`。这一阶段，我们收集了父子组件之间的关系，收集父组件监听的子组件的事件，初始化了一系列参数和方法。 [§](./demos/vue_init/[§](./demos/vue_init/lifecyle.html?type=1)。

 继续回到`_init`执行`initInjections(vm)`：

 `initInjections`,取出当前组件需要注入的值并且返回。
 因为当时`new Vue()`,根组件不存在注入，先看数据是什么样提供，`initProvide(vm);`。

```
  function initProvide (vm) {
    var provide = vm.$options.provide;
    if (provide) {
      vm._provided = typeof provide === 'function'
        ? provide.call(vm)
        : provide;
    }
  }

```

因为要求`provide`是一个函数或者对象，所以这里判断并将返回值赋给实例的`_provided`属性。[§](./demos/vue_init/index.html?step=9)

再看组件注入数据。
```
  function initInjections (vm) {
    var result = resolveInject(vm.$options.inject, vm);
    if (result) {
      toggleObserving(false);
      Object.keys(result).forEach(function (key) {
        /* istanbul ignore else */
        {
          defineReactive$$1(vm, key, result[key], function () {
            warn(
              "Avoid mutating an injected value directly since the changes will be " +
              "overwritten whenever the provided component re-renders. " +
              "injection being mutated: \"" + key + "\"",
              vm
            );
          });
        }
      });
      toggleObserving(true);
    }
  }
```

`resolveInject`方法，根据当前组件的`$options.inject`属性，返回一个属性值对象（对应的值从`vm._provided`的上获取,如果没有，通过$parent向上寻找）,然后将返回值每一个值绑定到当前组件实例上，从而实现了上下游关系跨组件传值。[§](./demos/vue_init/index.html?step=7)

` initState(vm)`:初始化状态。
```
  function initState (vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.props) { initProps(vm, opts.props); }
    if (opts.methods) { initMethods(vm, opts.methods); }
    if (opts.data) {
      initData(vm);
    } else {
      observe(vm._data = {}, true /* asRootData */);
    }
    if (opts.computed) { initComputed(vm, opts.computed); }
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch);
    }
  }

```
首先初始一个`_watchers`，开始根据`$options`上的参数进行初始化：
```
if (opts.props) { initProps(vm, opts.props); }
```
判断是否有传入了`props`值，如果有就初始化：
拆解`initProps`，首先给实例增加一个`_prop`属性和实例的`$options.propsData`，
```
  for (var key in propsOptions) loop( key );
```
对`$options.props`属性进行遍历，执行`loop(ley)`

```
    var loop = function ( key ) {
      keys.push(key);
      var value = validateProp(key, propsOptions, propsData, vm);
      {
        var hyphenatedKey = hyphenate(key);
        if (isReservedAttribute(hyphenatedKey) ||
            config.isReservedAttr(hyphenatedKey)) {
          warn(
            ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
            vm
          );
        }
        defineReactive$$1(props, key, value, function () {
          if (!isRoot && !isUpdatingChildComponent) {
            warn(
              "Avoid mutating a prop directly since the value will be " +
              "overwritten whenever the parent component re-renders. " +
              "Instead, use a data or computed property based on the prop's " +
              "value. Prop being mutated: \"" + key + "\"",
              vm
            );
          }
        });
      }
      if (!(key in vm)) {
        proxy(vm, "_props", key);
      }
    };
```
`keys = vm.$options._propKeys = []`,储存传入的`prop`属性的键值。
`validateProp`，对数据进行类型检测和设置监听初始值，最后返回这个值。
`hyphenate`，将驼峰语法转化`-`链接并返回。
`isReservedAttribute(hyphenatedKey) ||config.isReservedAttr(hyphenatedKey)`,判断是不是保留的名称或者设置保留的。
设置对值监听的数据收集和数据更新，并将获取和设置实例的`props`上的属性代理到`_props`上。

完成`props`属性的初始化之后，继续初始化`methods`属性。
`initMethods`，检测`methods`中的方法是不是函数，并且有没有和现有的方法方法重名和`props`属性重名。并且设置访问实例对应名称的时候
```
 vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
```
访问对应的方法，并绑定实例为`this`.

继续初始化`data`属性：
```
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
```
判断是否传入了`data`参数，如果没有传入，就给`_data`赋值空对象，并设置监听。
如果传入了，`initData(vm)`。
```
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function'
      ? getData(data, vm)
      : data || {};

```

  首先获取`data`参数，将对象和函数传值通过话处理成对象。

```
    if (!isPlainObject(data)) {
      data = {};
      warn(
        'data functions should return an object:\n' +
        'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
        vm
      );
    }
```
  `isPlainObject`判断`data`参数类型必须为对象。

```
    // proxy data on instance
    var keys = Object.keys(data);
    var props = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;
    while (i--) {
      var key = keys[i];
      {
        if (methods && hasOwn(methods, key)) {
          warn(
            ("Method \"" + key + "\" has already been defined as a data property."),
            vm
          );
        }
      }
      if (props && hasOwn(props, key)) {
        warn(
          "The data property \"" + key + "\" is already declared as a prop. " +
          "Use prop default value instead.",
          vm
        );
      } else if (!isReserved(key)) {
        proxy(vm, "_data", key);
      }
    }
```

判断`data`中的键有没有和`props`和`methods`中和重合，并且不是`_`和`$`开头。
则将对实例访问`data`中的键时候，将其代理到`_data`上。

最后 监听整个`data`。

继续初始化计算属性，执行`initComputed(vm, opts.computed)`。
```
  var watchers = vm._computedWatchers = Object.create(null);
  var isSSR = isServerRendering();
```
首先给实例增加`_computedWatchers`属性，并设置两个局部变量，`watchers`等于`vm._computedWatchers`,`isSSR`是否是服务器渲染的标识。
```
  for (var key in computed) {
      var userDef = computed[key];
      var getter = typeof userDef === 'function' ? userDef : userDef.get;
      if (getter == null) {
        warn(
          ("Getter is missing for computed property \"" + key + "\"."),
          vm
        );
      }

      if (!isSSR) {
        // create internal watcher for the computed property.
        watchers[key] = new Watcher(
          vm,
          getter || noop,
          noop,
          computedWatcherOptions
        );
      }
      if (!(key in vm)) {
        defineComputed(vm, key, userDef);
      } else {
        if (key in vm.$data) {
          warn(("The computed property \"" + key + "\" is already defined in data."), vm);
        } else if (vm.$options.props && key in vm.$options.props) {
          warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
        }
      }
    }
```
遍历`computed`的值，如果对应的值是函数，则当作是这个属性的`getter`.此外属性的值还可以是一个对象，他只有三个有效字段set、get和cache，分别表示属性的setter、getter和是否启用缓存，其中get是必须的，cache默认为true。

如果不是服务端渲染，创建一个计算属性 watcher。
如果实例上没有与计算属性重名的值，执行`  defineComputed(vm, key, userDef)`,调用defineComputed函数，监听数据，为组件中的属性绑定getter及setter。

`initWatch(vm, opts.watch)`:
```
  function initWatch (vm, watch) {
    for (var key in watch) {
      var handler = watch[key];
      if (Array.isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i]);
        }
      } else {
        createWatcher(vm, key, handler);
      }
    }
  }
```
给`watch`参数中的每一项都创建`watcher`，如果是数组，则遍历每一个元素。
```
  function createWatcher (
    vm,
    expOrFn,
    handler,
    options
  ) {
    if (isPlainObject(handler)) {
      options = handler;
      handler = handler.handler;
    }
    if (typeof handler === 'string') {
      handler = vm[handler];
    }
    return vm.$watch(expOrFn, handler, options)
  }

```
处理对象和函数两种传参，然后通过`$watch`,监听数据变化，并执行回调。

至此，完成了生命周期的数据初始化，包括`props`,`methods`,`data`,`watch`,`computed`,`inject`,`provide`，这些数据已经绑定到实例上了，并且对应的属性已经被监听。此`$el`属性尚未初始化，也没有初始化页面和绑定，此时没有`dom`结构。

```
   callHook(vm, 'created');
```
执行回调。[§](./demos/vue_init/lifecyle.html?type=2)。

继续往下看`_init(options)`:
```
      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
```
如果没有`el`参数，那么初始化至此结束了，不会挂载到页面上，直到调用实例的`$mount`方法。
如果有`el`参数，直接在`_init()`最后调用并传入`el`参数。

拆解`$mount`:
```
  el = el && query(el);

  if (el === document.body || el === document.documentElement) {
    warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }
```
通过`el`参数获取对应的DOM,判断是否是`body`和`html`，如果是 抛出警告返回this结束。

- 如果没有传入`render`函数:
  1. 如果没传入`template`
  ```
    template = getOuterHTML(el);
  ```
  通过`el`获取`el`及其内部的元素作为`template`.
  
  2. 如果传入`template`
    - 判断`tempalte`参数传入的是不是字符串，如果是字符串，判断是否以"#"开头的。
      ```
        if (template.charAt(0) === '#') {
                template = idToTemplate(template);
                /* istanbul ignore if */
                if (!template) {
                  warn(
                    ("Template element not found or is empty: " + (options.template)),
                    this
                  );
                }
              }
      ```
      ```
      var idToTemplate = cached(function (id) {
        var el = query(id);
        return el && el.innerHTML
      });
      ```
      如果是，就当作元素的id去获取对应的DOM，并将其赋给template。接着判断是否获取到了DOM，没有抛出警告。

      如果不是"#"开头的字符串，就不做处理直接当作template。
      
    - 如果不是字符串
      当作DOM处理，判断`template.nodeType`,使用`innerHTML`作为`template`。
    - 其余情况直接抛出警告，返回实例结束。

  3. 将传入的`template`统一处理后，如果`tempalte`有值，
      ```
       var ref = compileToFunctions(template, {
          outputSourceRange: "development" !== 'production',
          shouldDecodeNewlines: shouldDecodeNewlines,
          shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
          delimiters: options.delimiters,
          comments: options.comments
        }, this);
        var render = ref.render;
        var staticRenderFns = ref.staticRenderFns;
        options.render = render;
        options.staticRenderFns = staticRenderFns;

      ```

      使用`compileToFunctions`,编译字符串模板，如果 shouldDecodeNewlines 为 true，意味着 Vue 在编译模板的时候，要对属性值中的换行符或制表符做兼容处理。而shouldDecodeNewlinesForHref为true 意味着Vue在编译模板的时候，要对a标签的 href 属性值中的换行符或制表符做兼容处理。delimiters改变纯文本插入分隔符，comments为true的时候保留html注释。
      编译完成后会返回一个对象，有两个属性`render`和`staticRenderFns`，一个获得绑定动态数据的VNode，一个是获得静态数据Vnode。

      然后把这两个属性绑定`options`参数上面。
      此时，`options` 也有`render`方法。
      最后 调用`return mount.call(this, el, hydrating)`。

- 如果传入`render`函数:
      直接调用`return mount.call(this, el, hydrating)`

再看看`mount`函数：
```
  mount = function (
    el,
    hydrating
  ) {
    el = el && inBrowser ? query(el) : undefined;
    return mountComponent(this, el, hydrating)
  };
```
判断`el`参数是否存在和是否在浏览器中，给el重新赋值为DOM或者undefined。
调用`mountComponent(this, el, hydrating)`,`this`是当前实例。
```
   vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode;
      {
        /* istanbul ignore if */
        if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
          vm.$options.el || el) {
          warn(
            'You are using the runtime-only build of Vue where the template ' +
            'compiler is not available. Either pre-compile the templates into ' +
            'render functions, or use the compiler-included build.',
            vm
          );
        } else {
          warn(
            'Failed to mount component: template or render function not defined.',
            vm
          );
        }
      }
    }
```
首先将`el`赋给实例的`#el`属性，如果在浏览器中，就是当前实例绑定的DOM。
如果没有`$options.render`,给`render`赋一个生产空VNode的函数,抛出错误。
```
 callHook(vm, 'beforeMount');
```

执行`beforeMount`回调，此时相对于之前，首先根据`el`参数，将`#el`赋值；其次，如果没有`render`参数，就根据`tempalte`生成一个并赋值给`options.render`。 此时还没有挂到页面上面，所以只有一个挂载节点的DOM存在。[§](./demos/vue_init/lifecyle.html?type=3)

申明一个函数，函数内部调用实例的`_update`方法，传入实例的`_render`方法。
```
 updateComponent = function () {
        vm._update(vm._render(), hydrating);
 };
```

先看下`_render`方法：
```
      var vm = this;
      var ref = vm.$options;
      var render = ref.render;
      var _parentVnode = ref._parentVnode;
     
      if (_parentVnode) {
        vm.$scopedSlots = normalizeScopedSlots(
          _parentVnode.data.scopedSlots,
          vm.$slots,
          vm.$scopedSlots
        );
      }
      vm.$vnode = _parentVnode;

```

首先接我们上一步，上一步中确保生成了一个`render`函数，赋给了`options`上，这里取出来存储在局部变量，准备使用，同时取出`_parentVnode`。
判断是否拥有`_parentVnode`属性，如果有这个属性，初始化作用域插槽。
然后把`_parentVnode`放在实例的`$vnode`属性上。
```
      ...
      vnode = render.call(vm._renderProxy, vm.$createElement);
      ...
      vnode.parent = _parentVnode;
      return vnode
```
通过call的方式调用`render`，传入当前实例作为`this`（`_renderProxy`是当前实例的代理）,第二参数`$createElement`根据参数创建`Vnode`。这里的`render`跟参数传入的`render`是一样的，这里是由模板编译得到的`render`。执行完成的返回结果`Vnode`。这里`_parentVnode`储存的是未经过`render`函数处理的`Vnode`,中间会含有vue的组件标签，经过`render`函数之后返回的vnode，是纯html标签的Vnode。

再回到`vm._update(vm._render(), hydrating);`,

_update主要是调用了patch函数，patch函数的主要功能将vnode转换为dom节点然后渲染在视图中。因此，为了生成dom节点，还需要判断vnode是否有子节点，一直递归到没有子节点时。开始创建子节点并插入在父节点中。最后再将原来定义的根节点移除，因为已经重新建立了新的节点替换原来的根节点。




[§](./demos/vue_init/mount.html)



























