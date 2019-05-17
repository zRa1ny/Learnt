## vue-cig-select

+ __简介__ 一个基于bootstrap样式的下拉选择组件。
+ __require引用名__ `vueCigSelect`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require',
        'vue',
        'jQuery',
        'bootstrap',
        'bootstrapSelect',
        'bootstrapSelectLang'

+ __使用__ 页面js文件中如下引入：

        define([
            'vueCigSelect'
        ], function () {
            'use strict';
            ……//dosomething 你自己的代码
        });

## API

[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__props__ （属性配置）:
            
  + _`options`_: {type:Array,default:undefined} options配置项，与原生select表单options相似，必须包括value和text两个字段，示例如下：
    ```
    [
      {text:"选项1",value:1},
      {text:"选项2",value:2},
      {text:"选项3",value:3},
      {text:"选项4",value:4}
    ]
    ```
   
  + _`name`_: {type:String,default:undefined} 原生select表单name属性。
   
  + _`multiple`_: {type:Boolean,default:undefined} 决定组件是单选还是多选。

  + _`value`_: {default:undefined} 初始化值和选择后的值字段，类型由`multiple`决定，如果multiple为true，值为Array，否则为String。

__emit event__ （触发事件）:
            
  + 无


__watch__ （监听）:
            
  + _`options`_: 组件监听选项的变化，并及时刷新显示。
  + _`value`_: 组件监听值的变化，并及时刷新显示。