## vue-area

+ __简介__ 区域选择，单位选择组件
+ __require引用名__ `vueArea`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require',
        'vue',
        'jQuery',
        'vueArea',
+ __使用__ 页面js文件中如下引入：

        define([
           'vueArea'
        ], function () {
            'use strict';
            ……//dosomething 你自己的代码
        });

## cig-area
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__props__ （属性配置）:

  + _`data`_: type: Array,default:obj, 加载的数据

  + _`valuePath`_: default: " ,点击节点获取value时取节点对应的键名

  + _`loading`_: default: false

  + _`value`_: 组件绑定的值

  + _`nodeComponent`_: default: "<span>{{item}}</span>"，选项的字段模板，即在option处显示哪些字段信息。

  + _`nodesPath`_: 子节点数据对应的键名

  + _`emptyText`_: type: String,default: "请选择", 选择提示文字
        
__emit event__ （触发事件）:
            
  + _` @expand`_: fn(){……} 点击某个区域，扩展到该区域下的子区域

  + _` @getAddressDetail`_: fn(){……} 获取当前选择的区域地址

  + _` @getId`_: fn(){……} 获取当前选择的区域id

  + _` @input`_: fn(){……} 获取value值

__watch__ （监听）:
            
  + _`data`_: 监听data变化，data发生改变重新更新弹窗内容

  + _`value`_: 监听value变化，value发生改变重新更新弹窗内容，并更新valueProxy

## cig-ajax-area
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__props__ （属性配置）:

  + _`ajaxOptions`_: 请求区域组件数据的ajax配置，通过设定不同接口，显示不同的数据

  + _`emptyText`_: type: String,default: "请选择", 选择提示文字

  + _`nodeComponent`_: default: "<span>{{item.name}}</span>"，选项的字段模板，即在option处显示哪些字段信息。

  + _`valuePath`_:  default: " ,点击节点获取value时取节点对应的键名

  + _`value`_: 组件绑定的值

  + _`nodesPath`_: 子节点数据对应的键名

  + _`rootPid`_: 根节点对应的id
        
__emit event__ （触发事件）:

  + _` @getAddressDetail`_: fn(){……} 获取当前选择的区域地址

  + _` @getId`_: fn(){……} 获取当前选择的区域id

  + _` @input`_: fn(){……} 获取value值

__watch__ （监听）:
            
  + _`value`_: 监听value变化，value发生改变时更新valueProxy