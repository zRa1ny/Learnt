## Vue-commonuserword

+ __简介__ 一个可设置和添加常用语的组件
+ __require引用名__ `vueCommonUseWord`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require',
        'vue',
        'jQuery',
        'vueCommonUseWord'
+ __使用__ 页面js文件中如下引入：

        define([
            'vueCommonUseWord'
        ], function () {
            'use strict';
            ……//dosomething 你自己的代码
        }); 

## commonwords

  设置常用语的组件，当点击添加为常用语时，文本框的值会添加到下拉列表中，点击下拉列表中的某一项，文本框中的值会变为点击的数值
  
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__props__ （属性配置）:
            
  + _`comment`_: {type:String,default:null}，常用语数据路径(与文本框双向绑定的字段,vue实例$data中的值)

__emit event__ （触发事件）:
            
  + 无

__watch__ （监听）:
            
  + 无