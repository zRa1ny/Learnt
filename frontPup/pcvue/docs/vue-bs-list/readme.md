## vue-bs-list

+ __简介__ 一个选择列表组件
+ __require引用名__ `vueBsList`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require',
        'vue',
        'jQuery',
        'vueBsList',
+ __使用__ 页面js文件中如下引入：

        define([
           'vueBsList'
        ], function () {
            'use strict';
            ……//dosomething 你自己的代码
        });

## bs-list
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__props__ （属性配置）:

  + _`data`_: {type:Array，default:[]}，列表渲染的数据

  + _`multi`_:{type:Boolean,default:false}，是否可多选

  + _`itemComponent`_:{default:"<span>{{item}}</span>"}，选项列表的字段模板，即在option处显示哪些字段信息。

  + _`valuePath`_:{ default:null}，data为数组对象时，列表每一项的值为对象的某一个值

  + _`value`_: { default:null}，选中的项的数据值

  + _`panel`_: 组件的类型

  + _`panelClass`_: 组件的class类名

  + _`itemClass`_: 每一项的class类名

  + _`selectedClass`_: 选中的项的class类名
        
__emit event__ （触发事件）:
            
  + _` @input`_: fn(){……} 当点击选中了某项或某几项时触发，返回选中的数据

__watch__ （监听）:
            
  + _`value`_: 点击选中某一项或某几项时，value值变化为被选中的项的数据值

__methods__ （方法）:无
