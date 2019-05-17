## Vue-depmap

+ __简介__ 一个通过发送请求，获得数据，加载地图的插件
+ __require引用名__ `vueDepMap`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require',
        'vue',
        'jQuery',
        'vueDepMap'
+ __使用__ 页面js文件中如下引入：

        define([
            'vueDepMap'
        ], function () {
            'use strict';
            ……//dosomething 你自己的代码
        });

## cig-dep-map
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__props__ （属性配置）:
            
  + _`map`_: {type:Object,default:null} 渲染地图需要的数据
   
  + _`randomColor`_: {type:Boolean,default:true} 地图渲染区域的颜色，设置为true则渲染的颜色为方法中设置的颜色，如果为false则为白色
   
  + _`roam`_:  {type:Boolean,default:true} 设置地图是否可拖动

__emit event__ （触发事件）:
            
  + _` @itemclick`_: fn(value){……} 点击地图上某一块区域触发，返回点击区域的name


__watch__ （监听）:
            
  + _`map`_: 监听地图数据的值，当地图数据改变时，更新地图