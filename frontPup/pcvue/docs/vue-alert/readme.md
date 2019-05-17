## Vue-alert

+ __简介__ 提示框组件相关方法的js。
+ __require引用名__ `vueAlert`
+ __依赖__ AMD方式（由requireJs加载管理），依赖以下库和组件：

        'require',
        'jQuery',
        'vue'
+ __使用__ 页面js文件中如下引入：

        define([
            'vueAlert'
        ], function (alert) {//引入alert
            'use strict';
            ……//dosomething 你自己的代码
        });

## Function && Object
[查看demo.html](./demo.html#alert)和[demo.js](./demo.js)

js提供了四种类型提示框：
* [_`alert`_](#alert)，提示框一次确认的方法
* [_`confirm`_](#confirm)，提示框二次确认的方法，一般在防止误操作时使用
* [_`tips`_](#tips)，dialog类型提示的方法
* [_`getMixin`_](#getmixin)，在表单内的提示方法，一般用于填写表单时的错误信息提示

<a name="alert" href="#alert">__alert__</a> : 提示框一次确认的方法，信息如下：

    alert.alert({
        title:{type:String,default:"提示"}，提示框的名称
        message:{type:String,default:null}，提示信息，如果参数只写了一个字符串，默认为message
        callback:fn(){……}，点击确定或关闭提示框后执行的回调函数
    })

<a name="confirm" href="#confirm">__confirm__</a> : 提示框二次确认的方法，一般在防止误操作时使用

    alert.confirm({
        title:{type:String,default:"确认"}，提示框的名称
        message:{type:String,default:"是否确认"}，提示信息
        okFn:fn(){……}，点击确定后执行的函数
        cancelFn:fn(){……}，点击取消后执行的函数
    })

<a name="tips" href="#tips">__tips__</a> : dialog类型的提示的方法

    alert.tips({
        title:{type:String,default:null}，提示框的名称
        message:{type:String,default:"是否确认"}，提示信息，如果参数只写了一个字符串，默认为message
        timeout:{type:Number,default:2000(单位：ms))}，提示框出现后的隐藏时间
    })

<a name="getmixin" href="#getmixin">__getmixin__</a> : 在表单内的提示方法，一般用于填写表单时的错误信息提示，

    首先需要在vue对象中引入mixins:[alert.getMixin()],将vue-alert中getMixin的方法拷贝，然后在.tpl文件中加上ref属性'ref="alert"'，提示信息的DOM会存在加了ref="alert"的标签中，调用方法如下：

  + <a name="getmixin.showError">_`getmixin.showError`_</a> : 错误类型提示方法

        this.showError(message,hiddenTimeout);传递参数如下：
            message:{type:String,default:null},提示信息(必填项)
            hiddenTimeout:{type:Number,default:3000（单位：ms）},提示状态隐藏时间

  + <a name="getmixin.message">_`getmixin.message`_</a> :成功或警告类型提示方法

        this.message:(message,type,hiddenTimeout);传递参数如下：
            message:{type:String,default:null},提示信息(必填项)
            type:{type:String,default:{"success","warning"}（2选1）},提示类型(必填项))
            hiddenTimeout:{type:Number,default:inherit（单位：ms）},提示状态隐藏时间

  + <a name="getmixin.clearMessage">_`getmixin.clearMessage`_</a> :清除表单内所有提示状态的方法
    
        this.clearMessage();