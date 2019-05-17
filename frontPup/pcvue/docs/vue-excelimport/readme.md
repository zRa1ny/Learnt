## vueExcelImport

+ __简介__ 一个导入excel文件的组件。
+ __require引用名__ `vueExcelImport`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require'
        'vue'
        'jQuery'
        'systemConfig'
        'jQueryAjaxFileUpload'
        'css!cssAttachment'  //样式文件

+ __使用__ 页面js文件中如下引入：

        define([
            'vueExcelImport'
        ], function () {
            'use strict';
            ……//dosomething 你自己的代码
        });

## API

[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__注意事项__ :

  + 依赖后台接口对excel格式文件的处理。

__props__ （属性配置）:

  + _`wrapClass`_: {default: "",type: String} 组件最外层样式名（class)。
  + _`ajaxUrl`_: excel文件上传和获取的接口地址，默认值如下：
    ```
    {
      default: function () {
          return {
              "uploadFile": config.backendurl + "/agg/excelImportPre",
              //"getFiles": config.backendurl+"/common/getFiles",
          }
      },
      type: Object
    }
    ```
  + _`fileType`_: {default: "unkown",type: String} 从后台接口获取文件的文件类型。
  + _`busId`_: {default: "",type: String} 从后台接口获取文件的文件busId。
  + _`mode`_: {default: "remove|add",type: String} 组件的展示或操作形式，remove表示可以删除文件，add表示可以上传文件。
  + _`allowCategories`_: 允许文件上传的类型（扩展名），默认值如下：
    ```
    {
      default: function () {
          return {
              // "图片":['gif','png','jpg','jpeg'],
              // "文档":["zip","doc","docx","xls","xlsx"]
              "文档": ["xls", "xlsx"]
          }
      },
      type: Object
    }
    ```
  + _`outfiles`_: {default: [],type: Array} 获取文件或上传的文件信息。

__emit event__ （触发事件）:
            
  + _`@input`_: fn(value){……} 上传或获取文件时__`触发`__；返回参数值value为object对像，包括了组件新增add和删除del两个文件数组信息，如下：
    ```
    {
      add: [],
      del: []
    }
    ```


__watch__ （监听）:
            
  + _`busId`_: 组件监听busId值的变化，并及时刷新显示文件列表。