## vue-building

+ __简介__ 一个查看房屋信息组件
+ __require引用名__ `vueBuilding`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require',
        'vue',
        'jQuery',
        'vueBuilding',
+ __使用__ 页面js文件中如下引入：

        define([
           'vueBuilding'
        ], function () {
            'use strict';
            ……//dosomething 你自己的代码
        });

## vue-building-people
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

显示房屋人员信息组件

__props__ （属性配置）:

  + _`peoples`_:{type: Array,default:[]} 房屋人员信息数据
        
__emit event__ （触发事件）:
            
  + _` @clickpeople`_: fn(){……} 点击人员图标，带出人员信息数据

__watch__ （监听）:无

__methods__ （方法）:无

## vue-building-house
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

显示一间房屋信息组件

__props__ （属性配置）:

  + _`x`_:{type: Number,default: 1} 房屋门牌号的户数，如602，x = 2

  + _`y`_:{type: Number,default: 1} 房屋门牌号的层数，如602，y = 6

  + _`title`_:{type: String,default: '101'} 房屋门牌号

  + _`prefix`_:{type: String,default: ''} 房屋单元号

  + _`postfix`_:{type: String,default: ''} 房屋入住信息，1空，2租，3无

  + _`paichaDate`_:{type: String,default: '无'} 近期排查时间

  + _`symbol`_:{type: String,default: ''} 房屋成员性质（党员、留守人员等）

  + _`hId`_:{type: String,default:"none"} 房屋ID，用来查看房屋详情

  + _`houseName`_:{type: String,default: "none"} 代表人/业主名称

  + _`houseArea`_:{type: Array,default:[]} 房屋面积
        
__emit event__ （触发事件）:
            
  + _` @clickpeople`_: fn(){……} 点击人员触发，带出人员信息

__watch__ （监听）:无

__methods__ （方法）:无

## vue-building
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

在vue-building-people组件和vue-building-house组件的基础上封装的，显示一栋房屋信息组件

__props__ （属性配置）:

  + _`buildingname`_:{type: String,default: ''} 房屋名称字段

  + _`height`_:{type: Number,default: 0} 房屋层数

  + _`width`_:{type: Number,default: 3} 每层户数

  + _`prefix`_:{type: String,default: ''} 房屋单元号

  + _`houses`_:{type: Array,default:[]} 所有房屋信息数据
        
__emit event__ （触发事件）:
            
  + _` @clickhouse`_: fn(){……} 点击房屋触发，带出点击区域类型和数据

__watch__ （监听）:无

__methods__ （方法）:无
