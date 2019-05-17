## vue-attachment

+ __简介__ 一个弹窗显示的附件组件
+ __require引用名__ `vueAttachment`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require',
        'vue',
        'jQuery',
        'vueAttachment',
+ __使用__ 页面js文件中如下引入：

        define([
           'vueAttachment'
        ], function () {
            'use strict';
            ……//dosomething 你自己的代码
        });

## API
此组件包含三个子组件：
* [cig-preview](#cig-preview) 弹窗查看附件组件，将bs-pop组件和cig-files-previewimg组件结合封装的
* [cig-files-previewimg](#cig-files-previewimg) 基础组件
* [cig-files](#cig-files) 可点击上传附件组件

## cig-preview
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

在bs-pop组件和cig-files-previewimg组件基础上封装的，点击直接弹窗查看组件，自带关闭弹窗方法

__props__ （属性配置）:
            
  + _`url`_: {type:String,default:""} 附件图片渲染的网络路径
   
  + _`isImage`_: {type:Boolean,default:false} 附件是否为图片类型
   
  + _`isVideo`_: {type:Boolean,default:false} 附件是否为视频类型

  + _`imgFiles`_: {default:null} 有多个附件时，附件图片渲染的网络路径的数组

  + _`visitPath`_: {type:String,default:"visitPath"} 数据接口中取图片路径的值对应的键名

__emit event__ （触发事件）:
            
  + _` @input`_: fn(){……} 当切换图片时触发，返回当前切换的图片路径

__watch__ （监听）:
            
  + _`url`_: 当前查看图片的路径，当点击切换查看时，urlProxy变化为当前的url

__methods__ （方法）:

  + _` show`_: 附件弹窗显示的方法，附件标签加ref="xxx"，执行this.$refs.xxx.show();

## cig-files-previewimg
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

基础查看附件组件，支持拖拽、旋转、滚轮缩放、查看上一张下一张

__props__ （属性配置）:     

  + _`url`_: {} 附件图片渲染的网络路径。

  + _`files`_: {} 有多个附件时，附件图片渲染的网络路径的数组

  + _`visitPath`_: {type:String,default:"visitPath"} 数据接口中取图片路径的值对应的键名

__emit event__ （触发事件）:
            
  + _` @input`_:fn(){……} 当点击上一张、下一张图片时触发，改变当前图片路径为切换的图片路径

__watch__ （监听）:
            
  + _`url`_: url改变时重新执行active方法，改变当前图片路径curUrl为url

  + _`files`_: files改变时重新执行active方法，改变当前图片路径curUrl为url

## cig-files
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

支持本地上传的附件组件

__props__ （属性配置）:     

  + _`wrapClass`_: {type:String,default:""} 组件的calss类名

  + _`viewType`_: {default:"form",type:String} 组件的两种类型，grid和form

  + _`multiple`_: { type: Boolean,default: false} 可接受多个值的文件上传字段

  + _`ajaxUrl`_: {type:Object,default:obj} 发送ajax请求获取附件数据的配置，默认配置为：

        default:function(){
            return {
                "uploadFile": config.backendurl+"/common/uploadFile",
                "getFiles": config.backendurl+"/common/getFiles",
            }
        },

  + _`fileType`_: {default:"unkown",type:String} 获取附件的类型

  + _`busId`_: {default:""} 附件取数据时发送的ajax请求的参数id

  + _`mode`_: { default:"remove|add",type:String} 附件移动（remove）和新增（add）

  + _`allowCategories`_: {type:Object,default:obj} 附件可上传的类型，默认配置为：

        default:function(){
            return {
                "图片":['gif','png','jpg','jpeg','bmp'],
                "视频":["mov","mp4","rmvb","wmv","avi","rm","3gp","mkv"],
                "文档":["doc","docx","xls","xlsx","pdf","ppt","pptx"],
                "压缩包":["zip","rar"]
            }
        },

  + _`limitNum`_: {default:0} 附件上传时的个数限制

  + _`isRename`_: {default:false,type:Boolean} 是否可修改附件名称

__emit event__ （触发事件）:
            
  + _` @input`_: fn(value){……} 附件新增或删除时触发，返回新增和删除的附件id，"add":[],"del":[]

  + _` @fileschange`_: fn(value){……} 当files改变时触发，返回所有附件的数组

__watch__ （监听）:
            
  + _`busId`_: busId绑定的数据发生改变时，重新发送ajax请求获取数据并渲染

  + _`files`_: 当files改变时重新执行方法获取新增、删除的附件的id和所有附件的数组

## Function && Object

js提供了三个获取附件数组的方法，如下
* [_`getSource`_](#getSource): 获取数据后将所有数据返回到files中
* [_`getUrls`_](#getUrls): 获取数据后将所有数据的visitPath返回到urls中
* [_`getUrl`_](#getUrl): 获取数据后将数据的第0个数组的visitPath返回到obj的url中