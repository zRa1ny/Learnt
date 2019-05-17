## vueTableFilter

+ __简介__ 返回cig-table-filter表格筛选组件，以及与它一样功效的未实例化未挂载的vue组件对象。
+ __require引用名__ `vueTableFilter`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require'
        'vue'
        'jQuery'
        'vueDomainPool'
        'vueBsList'
        'vueBsPop'
        'css!cssTableFilter'
        'vueCigSelect'

+ __使用__ 页面js文件中如下引入：

        define([
            'vueTableFilter'
        ], function (tableFilter) {
            'use strict';
            ……//dosomething 你自己的代码
        });

## cig-table-filter
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__props__ （属性配置）:
   
  + _`mode`_: {type:String,default:"default"} 组件显示模式：

        "default" : 默认模式，将把筛选项生成普通的html表单，插入展示在组件所在DOM中的位置；
        "limit"   : 精简模式，将把筛选项中的列如多选或单选通过下拉组件进行展示，把生成html尽量以单行形式显示在表格上方，
                    并且筛选项可以通过filters中的字段isOut控制，是否生成html；
        "pop"     : 弹窗模式，将把筛选项生成普通的html表单，插入展示在弹窗组件内，通过弹窗API进行显示和隐藏；


  + _`filters`_: { type:Array, default:[] } 表格筛选项的配置数组，具体配置如下:

        name: "dep",      // 当前筛选项字段，可通过它取值。

        text: "所属辖区",  // 当前筛选项展示时label位置的标题。

        type: "options"   // 当前筛选项的类型，有如下三种：
                    "options" 选择类型，会根据mode属性，生成下拉选择或点击选择的html表单；
                    "domain"  ajax选择类型，与"options"相同，会根据mode属性，生成下拉选择或点击选择的html表单，
                              不同的是选项将根据domainName字段，去请求接口获取；
                    "custom"  自定义类型，可以自定义组，设定此类型后，必须提供一个自定义的模板component字段，如
                              component:'<input v-model="valueProxy" @input="input" style="border: 0;width: 100%;" />'
                              其中v-model="valueProxy" @input="input" 为固定的搭配的触发事件。

        multi: true       // 针对type为"options"或"domain"时，设置是否为多选项，true为多选，false或undefined为单选。

        all:   true       // 针对type为"options"或"domain"时，且multi为true时，设置选项中是否添加一个全选选项。

        options: []       // 针对type为"options"时，提选项数组，如：
                            [                                
                                {value:"0",text:"0-1000㎡"},
                                {value:"1",text:"1000㎡-5000㎡"},
                                {value:"2",text:"5000㎡以上"}
                            ]

        domainName:""     // 针对type为"domain"时，设置去请求接口获取选项的参数。

        component:""      // 针对type为"custom"时，设置的模板字符串，如：
                             '<input v-model="valueProxy" @input="input" style="border: 0;width: 100%;" />',
                             其中v-model="valueProxy" @input="input" 为固定的搭配的触发事件。

        isOut:   true     // 当mode属性为"limit"时，决定是否生成此筛选项。                    



  + _`value`_: { type: Object, default: function () { return {} }} 筛选项的值，其中子字段应该与filters中的name字段为对应关系。

  + _`domainAjaxOptions`_: { type: Object, default: function () { return {} }} 当filters中的type为domain时，去请求接口的配置，如：

        {
            type: "get",
            "url": systemConfig.backendurl+"/system/queryUserDataDep"
        }

  + _`popModel`_: { type:Boolean, default:false } 当mode属性为"pop"时，此值控制弹窗的显示与隐藏，true为显示，false为隐藏。

__emit event__ （触发事件）:
            
  + _` @input`_: fn(value){……} 用户在操作筛选表单（输入、选择或自定义操作时）和弹窗点击"确定”或“重置”按钮时，触发；返回参数值value为所有筛选项的值的集合，即等同于props中的value。

__watch__ （监听）:
            
  + _`value`_: 组件监听筛选项值的变化，并适时生成新的HTML展示。
  + _`popModel`_: 组件监听弹窗模式下弹窗是否显示，并适时显示或隐藏。


## Object

js返回一个与cig-table-filter一样功效的未实例化的vue组件对象，可如下引用，进行混合或挂载：

    define([
        'vueTableFilter'
    ], function (tableFilter) {
        'use strict';

        var cigFilterComponent = tableFilter.tableFilter

        //实例化组件
        Vue.component("table-filter",cigFilterComponent)

        //混合
        var Vm = new Vue({
            el: "#app",
            mixins: [
                cigFilterComponent
            ],
        });

    });
