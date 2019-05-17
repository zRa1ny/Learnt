## vueForm

+ __简介__ 集部分vue指令和cig-form表单组件，以及与表单相关方法为一体的js。
+ __require引用名__ `vueForm`
+ __依赖__ AMD方式（由requireJs加载管理)，依赖以下库和组件：

        'require'
        'vue'
        'vueDomainPool'
        'jQuery'

+ __使用__ 页面js文件中如下引入：

        define([
            'vueForm'
        ], function (form) {
            'use strict';
            ……//dosomething 你自己的代码
        });

## vue指令
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)
* _`v-date`_: 生成或双向绑定的日期值，format（格式）为"yyyy-mm-dd"
* _`v-month`_: 生成或双向绑定的年月值，format（格式）为"yyyy年m月"
* _`v-datetime`_: 生成或双向绑定的时间值，format（格式）为"YYYY-MM-DD H:mm:ss"

## cig-form
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

__props__ （属性配置）:
            
  + _`fieldsRender`_: { type:String||Funtion, default:'table2Render'} 表单布局，默认是两列布局，可选项"table1Render","table2Render","table3Render"或者是一个function:

        function(context,fields,createElement){
            // 自己写的布局方法，返回element数组
            fields  里面包括参数:
                slot 是创建好的表单控件及验证结果 
                groupClass 是验证的类型样式 success\warning\error   
        }
   
  + _`dataPath`_: {type: String, default: ''} 数据路径(与表单双向绑定的父级字段,vue实例$data中的值)。
   
  + _`fields`_: {type: Array,default: function () { return [] }} 字段数组，布局时按照数组顺序依次布局:

        示例：{ label: "只读",  name: "tDisplay", type: "display", colSpan: 2 }
            label   的值为表单的label，等于"nolable"时，label不占位，生成的表单将充满整个布局空间
            name    的值将会在dataPath字段下，生成一个与本表单双向绑定的子字段值
            colSpan 是布局方法用到的列属性，默认是1(即布局的1列); 如果不是table布局，可以不用这个属性
            type    表单的类型，支持一些基本字段，类型如下，针对不同类型，字段中有一些不同设置，详见如下说明：
                display         不可编辑的字段，直接显示值，如果有options或domainName 则按options和domainName转换为text显示
                radio           单选字段，必须有options或domainName中的一个字段
                checkbox:multi  多选字段，必须有options或domainName中的一个字段
                checkbox        复选字段，可以设置trueValue和falseValue，默认为1和0
                selected:multi  多选列表字段，必须有options或domainName中的一个字段
                selected        下拉框列表字段，必须有options或domainName中的一个字段
                textarea        大文本字段, 另含有placeholder字段
                number          数字字段, 另含有placeholder字段
                text            字符字段, 另含有placeholder字段

                自定义字段，可使用slot的形式传递，例如：
                    <cig-form>
                        <bs-tree 
                            slot="fieldslot.area" 
                            v-model="data.area" 
                            :data="tree">
                            <!--用树选择一个属性，会由布局方法渲染到area属性的位置-->
                        </bs-tree>
                    </cig-form>
  + _`formClass`_: {type:String,default: 'box-body'} 组件最外层div的样式。

__emit event__ （触发事件）:
            
  + _` @input`_: fn(value){……} 用户在操作表单（输入、选择或自定义操作时）；返回参数值value为当前操作表单的值。

__watch__ （监听）:
            
  + _`fields`_: 组件监听字段数组，当字段数组发生变化时，组件装实适渲染显示最新的dom。

__methods__ （方法）:通过vue实例中的$refs.form进行调用：
            
  + _`resetValidation`_: 在组件渲染完成，并启用表单验证[this.raiseValidate()](#helper.raiseValidate)之后，在修改过验证规则或让表单显示为初化，需要重置表单验证情况下调用：

        this.$refs.form.resetValidation();

  + _`hasError`_: 在组件渲染完成，并启用表单验证[this.raiseValidate()](#helper.raiseValidate)之后，通过此方法可以得知是否通过验证，返回值为boolean，当为true时表示没有通过，false则表示通过：

        this.$refs.form.hasError();


## Function && Object
[查看demo.html](./demo.html) 和 [demo.js](./demo.js)

js提供了四个与表单渲染相关对象和方法，如下
* [_`renders`_](#renders): 渲染表单布局方法集合对象
* [_`validators`_](#validators): 一个验证表单设置的只读对象（不可修改）
* [_`helper`_](#helper): 一个渲染表单字段和验证表单设置的方法集合对象
* [_`regValidator`_](#regValidator): 一个包含若干正则表达式集合对象


<a name="renders" href="#renders">__renders__</a> :  渲染表单布局方法集合对象   

  + <a name="renders.table1Render">_`renders.table1Render`_</a> :  渲染1列布局方法

        renders.table1Render (context, fields, createElement);
        // 返回element数组
        context 组件上下文信息
        fields  字段数组，里面包括参数:
            slot 是创建好的表单控件及验证结果 
            groupClass 是验证的类型样式 success\warning\error
        createElement vue创建element的方法

  + <a name="renders.table2Render">_`renders.table2Render`_</a> :  渲染2列布局方法

        renders.table2Render (context, fields, createElement);
        // 返回element数组
        context 组件上下文信息
        fields  字段数组，里面包括参数:
            slot 是创建好的表单控件及验证结果 
            groupClass 是验证的类型样式 success\warning\error
        createElement vue创建element的方法        

  + <a name="renders.table3Render">_`renders.table3Render`_</a> :  渲染3列布局方法

        renders.table2Render (context, fields, createElement);
        // 返回element数组
        context 组件上下文信息
        fields  字段数组，里面包括参数:
            slot 是创建好的表单控件及验证结果 
            groupClass 是验证的类型样式 success\warning\error
        createElement vue创建element的方法        

  + <a name="renders.groupRender">_`renders.groupRender`_</a> :  渲染表单群组的方法（渲染多个表单）

        renders.groupRender (groups, subRender, context, fields, createElement);
        // 返回element数组
        groups  数组，长度决定表单群组的数量，其中title字段为表单的标题
        subRender 渲染布局的方法，默认为renders.table2Render（2列布局）
        context 组件上下文信息
        fields  字段数组，里面包括参数:
            slot 是创建好的表单控件及验证结果 
            groupClass 是验证的类型样式 success\warning\error
        createElement vue创建element的方法        

<a name="validators" href="#validators">__validators__</a> :  一个验证表单设置的只读对象（不可修改）,信息如下： 

    {
        required: function (val) {
        var isValid = required(val);
        return {
            isValid: isValid,
            message: "必填项"
        }
        },
        pattern: function (val, arg) {
        var isValid = pattern(val, arg);
        return {
            isValid: isValid,
            message: "不满足正则表达式" + arg.toString()
        }
        },
        minlength: function (val, arg) {
        var isValid = minlength(val, arg);
        return {
            isValid: isValid,
            message: "长度必须大于等于" + arg
        }
        },
        maxlength: function (val, arg) {
        var isValid = maxlength(val, arg);
        return {
            isValid: isValid,
            message: "长度必须小于等于" + arg
        }
        },
        min: function (val, arg) {
        var isValid = min(val, arg);
        return {
            isValid: isValid,
            message: "值必须大于等于" + arg
        }
        },
        max: function (val, arg) {
        var isValid = max(val, arg);
        return {
            isValid: isValid,
            message: "值必须小于等于" + arg
        }
        }
    }

<a name="helper" href="#helper">__helper__</a> :  一个渲染表单字段和验证表单设置的方法集合对象   

  + <a name="helper.getFieldsMixin">_`helper.getFieldsMixin`_</a> :  向vue实例或组件混合渲染表单组件的方法

        helper.getFieldsMixin (fields, def, dataPath);
        // 返回vue表单组件，以便混合到需要表单组件的vue实例中
        fields  字段数组，里面包括参数:
            slot 是创建好的表单控件及验证结果 
            groupClass 是验证的类型样式 success\warning\error
        def 表单字段的默认值，用于表单重置时调用
        dataPath 数据路径(与表单双向绑定的父级字段,vue实例$data中的值)

  + <a name="helper.getValidatorMixin">_`helper.getValidatorMixin`_</a> :  向vue实例或组件混合渲染表单组件的验证

        helper.getValidatorMixin (validateOptions, formRef, dataPath);
        // 返回vue表单组件，以便混合到需要表单组件的vue实例中
        validateOptions 表单验证的设置，例：
            {
                "placeName":{required:true},                                                //必填
                "placeAddr":{pattern:/+W/,messages:{pattern:"身份证格式不正确"}},            //是否匹配正则
                "placeChargeperson":{minlength:15},                                         //最小长度
                "gridName":{maxlength:100},                                                 //最大长度
                "placeTypeMax":{min:5},                                                     //最小值
                "placeType":{max:100}                                                       //最大值
            }
            messages 字段可以每一项都能设置，是针对验证错误信息进行自定义提示语，messages中的key键与表单验证中的key为一一对应关系；
        formRef  vue实例中，表单的ref名称:
        dataPath 数据路径(与表单双向绑定的父级字段,vue实例$data中的值)        

  + <a name="helper.raiseValidate">_`helper.raiseValidate`_</a> :  表单验证混合到实例后，调用此方法进行启用

        helper.raiseValidate();

<a name="regValidator" href="#regValidator">__regValidator__</a> :  一个包含若干正则表达式字符集合对象,信息如下： 

    {
        phoneReg: "/(^(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])\\d{8}$)/",           //验证手机号正则字符串
        cardNumReg: "/(^(\\d{6})(18|19|20)?(\\d{2})([01]\\d)([0123]\\d)(\\d{3})(\\d|X)$)/"   //验证身份证号正则字符串
    }