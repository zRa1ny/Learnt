## vue-cig-check

+ __简介__ 一个抽查信息列表，可查看详情，带有高级搜索功能的组件
+ __require引用名__ `vueBuildingStatistics`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require',
        'vue',
        'jQuery',
        'vueBuildingStatistics',
+ __使用__ 页面js文件中如下引入：

        define([
           'vueBuildingStatistics'
        ], function () {
            'use strict';
            ……//dosomething 你自己的代码
        });

## vue-cig-check
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__props__ （属性配置）:

  + _`id`_:{type: String} 执行doSearch查询时的查询参数id

  + _`jctype`_:{type: Number,default: 0} 列表显示数据的类型，根据类型请求不同的接口数据，0、抽查检查 1、巡查情况

  + _`tablepagesize`_:{type: Number,default: 0} 入住户数

  + _`placetype`_:{type: Number,default: 1} 入住人数
        
__emit event__ （触发事件）:

  + _` @cout`_: fn(){……} 列表数据总数

__watch__ （监听）:无

__methods__ （方法）:无
