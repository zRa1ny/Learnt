## vue-bs-table

+ __简介__ 一个不分页列表组件
+ __require引用名__ `vueBsTable`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require',
        'vue',
        'jQuery',
        'vueBsTable',
+ __使用__ 页面js文件中如下引入：

        define([
           'vueBsTable'
        ], function () {
            'use strict';
            ……//dosomething 你自己的代码
        });

## vue指令

* _`v-tableresize`_:table标签添加v-tableresize指令，可拖动调整表格列宽

## bs-table
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__props__ （属性配置）:

  + _`loadingMessage`_: {type:String,default:"正在努力地加载数据中，请稍候……"} 数据还未加载完成时的提示信息
    
  + _`colResizable`_: {type:Boolean,default:true}设置列表是否可拖拽调整列宽，默认为true

  + _`rows`_:{type: Array,default:obj},表格的列表数据，为 __`必填属性`__
   
  + _`columns`_:{type: Array,default:obj},表格的列表内容配置，为 __`必填属性`__，默认配置如下：

        title: {type:String,default:null},//表格中显示的文字，
        field: {type:String,default:null},//和title对应的字段，
        align: {type:String,default:null},//表格text-align样式，
        valign: {type:String,default:null},//表格vertical-align样式，
        visible:{type:Boolean,default:false},//设置该列是否显示，
        width:{type:String,default:null},//设置表格的宽度，
        group:{type:String,default:null},//多行表头进行合并，通过group字段来判断
        sortable:{type:Boolean,default:false},//设置表头是否有排序按钮，
        component:{type:Object,default:null},//普通列没有component，判断列、域列、链接列、按钮列、自定义列方法查看demo.js中table3

  + _`config`_: {type: Object,,default:false} 列表第一列是否有复选框，checkbox:true表示有复选框，checkbox:false无复选框，默认为false
        
__emit event__ （触发事件）:
            
  + _` @selectchange`_: fn(value){……} 当列表第一列为复选框时，选择的状态改变时触发，返回勾选的数据

  + _` @pagerChange`_: fn(){……} 当列表数据发生改变时触发

  + _` @sorted`_:fn(){……} 当列表数据进行排序时触发，例如设置sortable为true后，点击进行排序会触发
  
  + _` @cellclick`_: fn(){……} 在列表中区域点击row触发的事件，返回点击区域的column配置和该行数据row

__watch__ （监听）:
            
  + _`checkList`_: 当勾选参数发生改变时，触发selectchange事件
    
  + _`rows`_: 监听rows数据的变化，勾选的数据会置空

__methods__ （方法）:无




