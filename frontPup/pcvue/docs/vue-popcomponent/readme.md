## Vue-popcomponent

+ __简介__ 用来实现小弹层控件的，弹层后点击空白位置会将其他弹层关闭，页面上如果有多个弹层，当打开一个的时候，另外一个会自动关闭
+ __require引用名__ `vuePopComponent`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require',
        'vue',
        'jQuery',
        'vuePopComponent'
+ __使用__ 页面js文件中如下引入：

        define([
            'vuePopComponent'
        ], function () {
            'use strict';
            ……//dosomething 你自己的代码
        });

##  Object
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

js提供了三个方法，如下：
* [_`mounted`_](#mounted): 渲染设定当前this指向
* [_`destroyed`_](#destroyed): 销毁当前的实例
* [_`watch`_](#watch):监听isopen的值，如果有多个弹层，当打开一个时，将另一个弹层关闭

<a name="mounted" href="#mounted">__mounted__</a> :  渲染设定当前this指向

    mounted:function(){
        _allPops[this._uid] = this;
    },

<a name="destroyed" href="#destroyed">__destroyed__</a> :  销毁当前的实例

    destroyed:function(){
        delete _allPops[this._uid];
    },

<a name="watch" href="#watch">__watch__</a> : 监听isopen的值，如果有多个弹层，当打开一个时，将另一个弹层关闭

    watch:{
      "isopen":function(newVal){
          if(newVal){
              for (var key in _allPops) {
                  if (_allPops.hasOwnProperty(key)) {
                      var element = _allPops[key];
                      if(element.isopen && element!=this){
                          element.isopen = false;
                      }
                  }
              }
          }
      }
    }