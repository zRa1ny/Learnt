## vue-object-selector

+ __简介__ 一个通过关键字搜索，发送请求，进行下拉选择，得到关联关系中的值的组件。
+ __require引用名__ `vueObjectSelector`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require',
        'vue',
        'jQuery',
        'systemConfig',
        'vuePopComponent',
        'vueBsList',
        'css!cssObjectSelector'  //此组件样式文件
+ __使用__ 页面js文件中如下引入：

        define([
            'vueObjectSelector'
        ], function () {
            'use strict';
            ……//dosomething 你自己的代码
        });

## API
此组件包含三个子组件：
* [cig-obj-selector](#cig-obj-selector) 基础组件
* [cig-person-selector](#cig-person-selector) 在`cig-obj-selector`基础上封装的，选择能获取与__ _人口 ___相关的`id:'pId'`,`cardNum:'pCardNum'`,`name:'pName'`,`phone:'pPhone'`,`address:'pAddress'`字段值的组件
* [cig-address-selector](#cig-address-selector) 在`cig-obj-selector`基础上封装的，选择能获取与__ _区域地址 ___相关的`place:'place'`,`addressDetail:'addressDetail'`字段值的组件

## cig-obj-selector
[查看demo.html](./demo.html#obj) 和 [demo.js](./demo.js)

__props__ （属性配置）:
            
  + _`autoSelect`_: {type:Boolean,default:false} 是否自动选择,适用选择项只有一项的情况。
   
  + _`startLoadLength`_: {type:Number,default:0} 触发加载选择列表请求的搜索关键字的长度。
   
  + _`itemComponent`_: {type:String,default:"<span>{{item}}</span>"} 选项列表的字段模板，即在option处显示哪些字段信息。

  + _`value`_: {default:null} 搜索框里的初始值。

  + _`dataMapper`_: {type:Object,default:null} 关联值的应射关系（对照关系），即"选项字段"=》"取值的字段"
        
  + _`ajaxOptions`_: {type:Object,default:null} 发送ajax请求（获取选项列表）的配置，为 __`必填属性`__，主要有url字段。

  + _`data`_: {default:null,type:Object} 获取字段值的父级, 在选择事件触发后，此对象中子级将为`dataMapper`中设置的"取值的字段"键对值。

__emit event__ （触发事件）:
            
  + _` @input`_: fn(value){……} 用户输入或选择时__`触发`__；返回参数值value为当前搜索框中的值。

  + _` @select`_: fn(){……} 用户选择时__`触发`__；不返回参数值。

  + _` @keydow`_: fn(event){……} 用户输入时__`触发`__；返回参数event为当前事件对象。


__watch__ （监听）:
            
  + _`value`_: 组件监听用户输入的值

## cig-person-selector
[查看demo.html](./demo.html#person) 和 [demo.js](./demo.js)

在`cig-obj-selector`基础上封装的，选择能获取与__ _人口 ___相关的`id:'pId'`,`cardNum:'pCardNum'`,`name:'pName'`,`phone:'pPhone'`,`address:'pAddress'`字段值的组件

__特性__ (强藕合性组件) : 

  + 请求地址和获取字段固定，建议获取与__ _人口 ___相关的时才使用

__props__ （属性配置）:     

  + _`itemComponent`_: {type:String,default:"<span>{{item}}</span>"} 选项列表的字段模板，即在option处显示哪些字段信息。

  + _`value`_: {default:null} 搜索框里的初始值。

  + _`dataMapper`_: {type:Object,default:{id:'pId',cardNum:'pCardNum',name:'pName',phone:'pPhone',address:'pAddress'}} 关联值的应射关系（对照关系），即"选项字段"=》"取值的字段"，能设置与__ _人口 ___相关的`id:'pId'`,`cardNum:'pCardNum'`,`name:'pName'`,`phone:'pPhone'`,`address:'pAddress'`字段值

  + _`data`_: {default:null,type:Object} 获取字段值的父级, 在选择事件触发后，此对象中子级将为`dataMapper`中设置的"取值的字段"键对值，能获取与__ _人口 ___相关的`id:'pId'`,`cardNum:'pCardNum'`,`name:'pName'`,`phone:'pPhone'`,`address:'pAddress'`字段值。

__emit event__ （触发事件）:
            
  + _` @input`_: fn(value){……} 用户输入或选择时__`触发`__；返回参数值value为当前搜索框中的值。

__watch__ （监听）:
            
  + _`value`_: 组件监听用户输入的值

## cig-address-selector
[查看demo.html](./demo.html#address) 和 [demo.js](./demo.js)

在`cig-obj-selector`基础上封装的，选择能获取与__ _区域地址 ___相关的`place:'place'`,`addressDetail:'addressDetail'`字段值的组件

__特性__ (强藕合性组件) : 

  + 请求前后字段联动时，才建议使用。

__props__ （属性配置）:     

  + _`placeDataMapper`_: {type:Object,default:{place:'place'}} 区域关联值的应射关系（对照关系），即"选项字段"=》"取值的字段"

  + _`detailDataMapper`_: {type:Object,default:{addressDetail:'addressDetail'}} 详细地址关联值的应射关系（对照关系），即"选项字段"=》"取值的字段"

  + _`placeAjax`_: {type:Object,default:obj} 发送ajax请求（获取区域选项列表）的配置，默认配置为：

        return function(val){
            return {
                url:systemConfig.backendurl+"/realPerson/house/queryBuildingAddress",
                data:{
                    place:val
                },
                type:"get"
            }
        }

  + _`detailAjax`_: {type:Object,default:obj} 发送ajax请求（获取详细地址选项列表）的配置，默认配置为：

        var self = this;
        return function(val){
            return {
                url:systemConfig.backson/house/queryBuildingAddress",
                data:{
                    place:self.dataPlace,
                    addressDetail:val||""
                },
                type:"get"
            }
        }

  + _`data`_: {default:null,type:Object} 获取字段值的父级, 在选择事件触发后，此对象中子级将为`dataMapper`中设置的"取值的字段"键对值。

__emit event__ （触发事件）:
            
  + 无

__watch__ （监听）:
            
  + _`data`_: 当区域或详情地址发生变化，显示发生变化。