## cig-editor

+ __简介__ 一个基于[UEditor](http://ueditor.baidu.com/website/)的html编辑器组件。
+ __require引用名__ `vueArticleEditor`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require',
        'vue',
        'ueditor',
        'cssUeditor',
        'cssUeditorView'
        'ZeroClipboard'
        'ueditorConfig'
        'ueditorLangConfig'

+ __使用__ 页面js文件中如下引入：

        define([
            'vueArticleEditor'
        ], function () {
            'use strict';
            ……//dosomething 你自己的代码
        });

## API

[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__注意事项__ :

  + 编辑器中编辑工具和上传图片等配置在依赖`ueditorConfig`中，并且demo.html中图片上传功能不可用。

__props__ （属性配置）:

  + _`value`_: {default:undefined} 初始化和编辑后的值(html)字段，可用指令`v-model`进行双向绑定。

__emit event__ （触发事件）:
            
  + _`@input`_: fn(value){……} 用户输入或编辑时__`触发`__；返回参数值value为当前编辑器中的html代码。


__watch__ （监听）:
            
  + _`value`_: 组件监听值的变化，并及时刷新编辑器的显示。