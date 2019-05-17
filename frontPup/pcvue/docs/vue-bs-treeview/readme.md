## vue-bs-treeview

+ __简介__ 一个树形组件
+ __require引用名__ `vueBsTreeview`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require',
        'vue',
        'jQuery',
        'vueBsTreeview',
+ __使用__ 页面js文件中如下引入：

        define([
           'vueBsTreeview'
        ], function () {
            'use strict';
            ……//dosomething 你自己的代码
        });

## bs-treeview
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__props__ （属性配置）:

  + _`data`_:{type:Array,default:[]} 树形组件渲染的数据

  + _`valuePath`_:{default:""} 每一项对应的取值的键名

  + _`iconPath`_:{default:""} 树形组件图标类型

  + _`value`_:{} 每一项对应的值

  + _`treeClass`_:{} 组件的class类名

  + _`nodeComponent`_:{default:"<span>{{item}}</span>"}，选项的字段模板，即在option处显示哪些字段信息。

  + _`nodesPath`_:{type:String,default:"nodes"} 根节点取数据的键名
        
__emit event__ （触发事件）:
            
  + _` @input`_: fn(){……} 点击某一项，返回该项的值
  
  + _` @curnode`_: fn(){……} 点击根节点，返回点击的根节点的数据

__watch__ （监听）:
            
  + _`value`_: 监听value的变化，点击某一子节点后更新value值并判断是否展开节点

__methods__ （方法）:无

