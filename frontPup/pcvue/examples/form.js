define([
    'require',
    'vue',
    'jQuery',
    'systemConfig',
    'vueForm',
    'vueTable',
    'vueBsTable',
    'vueArticleEditor'
], function(require, Vue, $, systemConfig,form,table) {
    'use strict';
    var query = systemConfig.getQueryParams();
    var role = systemConfig.getRole();
    var formHelper = form.helper;
    var formVm = new Vue({
        el:"#form",
        data:{
            data:{
                field1:null,
                field2:null,
                field2_1:null,
                field3:"123",
                field4:"01",
                field5:"11111212 哈哈热特人跟他说广泛大使馆的是士大夫v发v发的哈哈热特人跟他说广泛大使馆的是士大夫v发v发的哈哈热特人跟他说广泛大使馆的是士大夫v发v发的",
                field6:"value1",
                field7:null,
                field8:null,
                field9:null,
                field10:null,
                field11:null,
                field12:null,
                field13:null,
                field14:[],
                field15:[],
            },
            fields:[
                {label:"field1 checkbox",name:"field1",type:"checkbox",colSpan:1},
                {label:"field2 date",name:"field2",type:"date",colSpan:1},
                {label:"field2_1 datetime",name:"field2_1",type:"datetime",colSpan:1},
                {label:"field3 显示字段",name:"field3",type:"display",colSpan:1},
                {label:"field4 用域显示字段",name:"field4",type:"display",domainName:"gender",colSpan:1},
                {label:"field5 显示多行的字段",name:"field5",type:"display",colSpan:1,multi:true},
                {label:"field6 用选项值显示字段",name:"field6",type:"display",options:[{ text: "显示1", value: "value1" },{ text: "显示2", value: "value2" }],colSpan:1},
                {label:"field7 数字",name:"field7",type:"number",colSpan:1},
                {label:"field8 单选，默认用域填充",name:"field8",type:"radio",domainName:"gender",colSpan:1},
                {label:"field9 单选，用选项值填充",name:"field9",type:"radio",options:[{ text: "显示1", value: "value1" },{ text: "显示2", value: "value2" }],colSpan:1},
                {label:"field10 下拉单选，默认用域填充",name:"field10",type:"selected",domainName:"gender",colSpan:1},
                {label:"field11 下拉单选，用选项值填充",name:"field11",type:"selected",options:[{ text: "显示1", value: "value1" },{ text: "显示2", value: "value2" }],colSpan:1},
                {label:"field12 普通文本",name:"field12",type:"text",colSpan:1},
                {label:"field13 多行文本",name:"field13",type:"textarea",colSpan:2},
                
                {label:"field14 checkbox多选，默认用域填充",name:"field14",type:"checkbox:multi",domainName:"gender",colSpan:1},
                {label:"field15 checkbox多选，用选项值填充",name:"field15",type:"checkbox:multi",options:[{ text: "显示1", value: "value1" },{ text: "显示2", value: "value2" }],colSpan:1},
            ]
        },
        mounted:function(){
        },
        methods:{
            showData:function(){
                window.alert(JSON.stringify(this.data));
            }
        },
        computed:{
        }
    });

    var formVm2 = new Vue({
        el:"#form2",
        data:{
            data:{
                field1:null,
                field2:null,
                field3:null,
                field4:null,
                field5:null,
            },
            fields:[
                {label:"一列1",name:"field1",type:"text",colSpan:1},
                {label:"一列2",name:"field2",type:"text",colSpan:1},
                {label:"两列1",name:"field3",type:"text",colSpan:2},
                {label:"一列3",name:"field4",type:"text",colSpan:1},
                {label:"两列2",name:"field5",type:"text",colSpan:2},
            ]
        }
    });

    var formVm3 = new Vue({
        el:"#form3",
        data:{
            render:"table3Render",
            data:{
                field1:null,
                field2:null,
                field3:null,
                field4:null,
                field5:null,
                field6:null,
            },
            fields:[
                {label:"一列1",name:"field1",type:"text",colSpan:1},
                {label:"一列2",name:"field2",type:"text",colSpan:1},
                {label:"一列3",name:"field3",type:"text",colSpan:1},
                {label:"两列1",name:"field4",type:"text",colSpan:2},
                {label:"一列4",name:"field5",type:"text",colSpan:1},
                {label:"三列1",name:"field6",type:"text",colSpan:3},
            ]
        }
    })

    

    require([
        'vueAttachment',
    ],function(){
        var formVm4 = new Vue({
            el:"#form4",
            components:{
                haha:{
                    template:"<span>{{content}}</span>",
                    props:{
                        count:{default:0}
                    },
                    computed:{
                        content:function(){
                            var arr = [];
                            for (var i = 0; i < this.count; i++) {
                                arr.push("哈哈");
                            }
                            return  arr.join("");
                        }
                    }
                }
            },
            data:{
                data:{
                    field1:null,
                    field2:2,
                    field3:null,
                    field4:null,
                    field5:null,
                    field6:null,
                },
                fields:[
                    {label:"多一个重置按钮",name:"field1",type:"text",colSpan:1},
                    {label:"自定义的控件",name:"field2",type:"text",colSpan:1},
                    {label:"正常的文本",name:"field3",type:"text",colSpan:1},
                    {label:"引用上传",name:"field4",type:"text",colSpan:1},
                ]
            },
            methods:{
                reset:function(){
                    this.data.field1 = "100";
                }
            }
        })
    })

    
    var formVm5 = new Vue({
        el:"#form5",
        mixins:[
            formHelper.getFieldsMixin([
                {label:"必填字段1",name:"field1",type:"text",colSpan:1},
                {label:"限制大小字段2",name:"field2",type:"number",colSpan:1},
                {label:"限制长度字段3",name:"field3",type:"text",colSpan:1},
                {label:"手机号字段4",name:"field4",type:"text",colSpan:1},
            ], {
                field1:"默认为1",
                field3:"默认为3",
            }),
            formHelper.getValidatorMixin({
                field1:{required:true},
                field2:{required:true,max:999,min:100},
                field3:{maxlength:10,minlength:2},
                field4:{
                    pattern:"/(^(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])\\d{8}$)/",
                    messages:{pattern:"不是正确的手机号码"}
                },
            }, "form", "data"),
        ],
        data:{
        },
        methods:{
        }
    })
    
    var formVm6 = new Vue({
        el:"#form6",
        mixins:[
            formHelper.getFieldsMixin([
                {label:"必填字段1",name:"field1",type:"text",colSpan:1},
                {label:"限制大小字段2",name:"field2",type:"number",colSpan:1},
                {label:"field3",name:"field3",type:"text",colSpan:1},
                {label:"手机号字段4",name:"field4",type:"text",colSpan:1},
                {label:"如果不包含field3则不通过",name:"field5",type:"text",colSpan:1},
            ], {
                field1:"默认为1",
                field3:"默认为3",
            }),
            formHelper.getValidatorMixin({
                field1:{required:true},
                field2:{required:true,max:999,min:100},
                field3:{maxlength:10,minlength:2},
                field4:{
                    pattern:"/(^(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])\\d{8}$)/",
                    messages:{pattern:"不是正确的手机号码"}
                },
            }, "form", "data"),
        ],
        data:{
        },
        watch:{
            "data.field5":function(){
                this.raiseField5();
            },
            "data.field3":function(){
                this.raiseField5();
            }
        },
        methods:{
            validate:function(){
                this.raiseValidate();
                this.raiseField5();
            },
            raiseField5:function(){
                var state = {
                };
                if(!this.data.field5  || this.data.field5.indexOf(this.data.field3)<0){
                    state = {
                        type: "error",
                        message: "必须包含["+this.data.field3+"]"
                    }
                }
                this.$refs.form.setValidation({
                    "field5":state
                });
            }
        }
    })
    
    
    var formVm7 = new Vue({
        el:"#form7",
        mixins:[
            formHelper.getFieldsMixin([
                {label:"如果为1，则没有field3",name:"field1",type:"text",colSpan:1},
                {label:"如果为2，field4只读",name:"field2",type:"number",colSpan:1},
                {label:"field3",name:"field3",type:"text",colSpan:1},
                {label:"手机号字段4",name:"field4",type:"text",colSpan:1},
            ], {
                field1:"默认为1",
                field3:"默认为3",
            }),
            formHelper.getValidatorMixin({
                field1:{required:true},
                field2:{required:true,max:999,min:100},
                field3:{maxlength:10,minlength:2},
                field4:{
                    pattern:"/(^(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])\\d{8}$)/",
                    messages:{pattern:"不是正确的手机号码"}
                },
            }, "form", "data"),
        ],
        data:{
        },
        computed:{
            computedFields:function(){
                if(this.data.field1 != "1"){
                    return this.fields.map(function(field){
                        if(this.data.field2 == "2" && field.name == "field4"){
                             return $.extend({},field,{type:"display"})
                        }
                        return field;
                    },this);
                }
                return this.fields.filter(function(field){
                    return field.name != "field3"
                }).map(function(field){
                    if(this.data.field2 == "2" && field.name == "field4"){
                        return $.extend({},field,{type:"display"})
                    }
                    return field;
                },this);
            }
        }
    })

    
    var formVm8 = new Vue({
        el:"#form8",
        mixins:[
            formHelper.getFieldsMixin([
                {label:"如果为1，则没有field3",name:"field1",type:"text",colSpan:1},
                {label:"如果为2，field4只读",name:"field2",type:"number",colSpan:1},
                {label:"field3",name:"field3",type:"text",colSpan:1},
                {label:"手机号字段4",name:"field4",type:"text",colSpan:1},
            ], {
                field1:"默认为1",
                field3:"默认为3",
            }),
            formHelper.getValidatorMixin({
                field1:{required:true},
                field2:{required:true,max:999,min:100},
                field3:{maxlength:10,minlength:2},
                field4:{
                    pattern:"/(^(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])\\d{8}$)/",
                    messages:{pattern:"不是正确的手机号码"}
                },
            }, "form", "data"),
        ],
        data:{
            render:form.renders.groupRender.bind(null,[
                {
                    title:"分组1",
                    fields:["field1","field3"]
                },
                {
                    title:"分组2",
                    fields:["field2","field4"]
                }
            ],null)
        },
        computed:{
            computedFields:function(){
                if(this.data.field1 != "1"){
                    return this.fields.map(function(field){
                        if(this.data.field2 == "2" && field.name == "field4"){
                             return $.extend({},field,{type:"display"})
                        }
                        return field;
                    },this);
                }
                return this.fields.filter(function(field){
                    return field.name != "field3"
                }).map(function(field){
                    if(this.data.field2 == "2" && field.name == "field4"){
                        return $.extend({},field,{type:"display"})
                    }
                    return field;
                },this);
            }
        }
    })
});