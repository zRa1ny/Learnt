## vue-bs-pop

+ __简介__ 一个弹窗组件
+ __require引用名__ `vueBsPop`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require',
        'vue',
        'jQuery',
        'vueBsPop',
+ __使用__ 页面js文件中如下引入：

        define([
           'vueBsPop'
        ], function () {
            'use strict';
            ……//dosomething 你自己的代码
        });

## bs-pop
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__props__ （属性配置）:

  + _`title`_: 弹窗名称

  + _`class`_: 弹窗class类名

  + _`type`_: 弹窗类型，type="lg"表示大弹窗，type="sm"表示小弹窗，默认中等大小弹窗

  + _`fade`_: 弹窗出现的方式，默认为true，从顶部进入，false表示直接出现

  + _`value`_: 渲染完成弹窗是否显示，默认false不显示，如果设为true，渲染完成后弹窗就显示
        
__emit event__ （触发事件）:
            
  + _` @closed`_: fn(){……} 解决多个弹窗的bug

__watch__ （监听）:
            
  + _`value`_: 弹窗是否显示的值，监听值的变化判断弹窗显示或隐藏

__methods__ （方法）:

  + _` hide`_: 弹窗隐藏的方法(缓慢隐藏)，执行 this.$refs.pop.hide();

  + _` hideImmediately`_: 弹窗隐藏的方法(直接隐藏)，执行 this.$refs.pop.hideImmediately();

  + _` show`_: 弹窗显示的方法，执行 this.$refs.pop.show();
