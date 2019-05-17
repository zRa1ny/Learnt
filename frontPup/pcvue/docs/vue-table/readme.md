## vue-table

+ __简介__ 一个可以通过关键字，查询条件搜索的获取数据的分页列表组件，组件还提供了按钮方法
+ __require引用名__ `vueTable`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require',
        'vue',
        'jQuery',
        'vueDomainPool',
        'vueBsTable',
+ __使用__ 页面js文件中如下引入：

        define([
            'vueTable',
            'vueTableFilter',//查询
        ], function () {
            'use strict';
            ……//dosomething 你自己的代码
        });

## cig-table
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__props__ （属性配置）:
            
  + _`columns`_:{type: Array,default:obj},表格的列表内容配置，为 __`必填属性`__，默认配置如下：

        title: {type:String,default:null},//表格中显示的文字，
        field: {type:String,default:null},//和title对应的字段，
        align: {type:String,default:null},//表格text-align样式，
        valign: {type:String,default:null},//表格vertical-align样式，
        visible:{type:Boolean,default:false},//设置该列是否显示，
        width:{type:String,default:null},//设置表格的宽度，
        sortable:{type:Boolean,default:false},//设置表头是否有排序按钮，
        component:{type:Object,default:null},//普通列没有component，判断列、域列、链接列、按钮列、自定义列方法查看demo.js中table2

  + _`ajaxOptions`_: {type:Object,default:null} 发送ajax请求（获取列表数据）的配置，为 __`必填属性`__，主要有url字段。

  + _`config`_: {type: Object,,default:false} 列表第一列是否有复选框，checkbox:true表示有复选框，checkbox:false无复选框，默认为false

  + _`pageSize`_: {type: Number,,default:10} 列表每页显示数据的条数

  + _`loadingMessage`_: {type:String,default:"正在努力地加载数据中，请稍候……"} 数据还未加载完成时的提示信息
        
__emit event__ （触发事件）:
            
  + _` @selectchange`_: fn(value){……} 当列表第一列为复选框时，选择的状态改变时触发，返回勾选的数据

  + _` @pagerdatachange`_: fn(){……} 当列表数据发生改变时触发

  + _` @sorted`_:fn(){……} 当列表数据进行排序时触发，例如设置sortable为true后，点击进行排序会触发

__watch__ （监听）:
            
  + _`ajaxOptions`_: 当ajaxOptions（请求参数）改变时，重新执行loadRows加载数据

__methods__ （方法）:通过vue实例中的$refs.table进行调用：

  + _`loadRows`_: 刷新或重新加载数据后执行

        this.$refs.table.loadRows();

## Object
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

    要使用vue-table提供的这些方法，需要在define加载组件时将table传到function()中，再将vue-table中help中的方法拷贝到js中的变量上，如：
        define([
            'vueTable'
        ], function (table) {
            'use strict';
            var tableHelper = table.helper;
            ……//dosomething 你自己的代码
        });

* [_`helper`_](#helper): 一个渲染列表字段和验证列表设置的方法集合对象

<a name="helper" href="#helper">__helper__</a> : 一个渲染列表字段和验证列表设置的方法集合对象

  + <a name="helper.getDomainDisplayComponent">_`helper.getDomainDisplayComponent`_</a> :  将列表中的单个值进行转义 

        helper.getDomainDisplayComponent(field, domainName)，在getDomainMixin方法的基础上重新封装的方法，
        field为column中对应的field，
        domainName为发送的ajax请求中的options，
        {
            title: '完成状态',
            field: 'endStatus',
            align: 'center',
            valign: 'middle',
            visible: true,
            component: tableHelper.getDomainDisplayComponent("endStatus", "cigdsendstate")
        },

  + <a name="helper.getDomainDisplayMultiComponent">_`helper.getDomainDisplayMultiComponent`_</a> :  将列表中的多个值进行转义  

        helper.getDomainDisplayMultiComponent(field, domainName)，在getDomainMixin方法的基础上重新封装的方法
        field为column中对应的field，
        domainName为发送的ajax请求中的options，

  + <a name="helper.getDomainMixin">_`helper.getDomainMixin`_</a> :  发送ajax请求获取指定domainName的数据，

        helper.getDomainMixin(domainName)，在getDomainOptions的基础上重新封装的方法，
        domainName为发送的ajax请求中的options，一般用于获取指定domainName的数据




