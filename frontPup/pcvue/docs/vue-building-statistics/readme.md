## vue-building-statistics

+ __简介__ 一个显示楼栋综合数据信息的组件
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

## vue-building-statistics
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__props__ （属性配置）:

  + _`symbols`_:{type: Object} 房屋名称字段，默认配置如下：

        default: function () {
          return {
              CCPNum: 0,
              zdfuNum: 0,
              under14Num: 0,
              crimeIlegalNum: 0,
              breakNum: 0,
              zdgkNum: 0,
              xmsfNum: 0,
              sqjzNum: 0,
              jsbNum: 0,
              xdryNum: 0,
              azbNum: 0,
              zdsfNum: 0,
              zdqsnNum: 0,
              xjryNum: 0,
              nclsetNum: 0,
              kclrNum: 0,
              tkryNum: 0,
              lsjzNum: 0,
              cjrNum: 0,
              dbryNum: 0
          };
        }

  + _`dhouseholds`_:{type: Number,default: 0} 设计户数

  + _`households`_:{type: Number,default: 0} 入住户数

  + _`inpersons`_:{type: Number,default: 1} 入住人数

  + _`rentalnum`_:{type: Number,default: 1} 出租房数

  + _`vacantnum`_:{type: Number,default: 1} 空置房屋数
        
__emit event__ （触发事件）:无

__watch__ （监听）:无

__methods__ （方法）:无
