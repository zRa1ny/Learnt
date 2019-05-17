define([
    'require',
    'vue',
    'vueForm'
], function(require, Vue, form) {
    'use strict';
    var formHelper = form.helper,
        editFields1 = [
            { label: "只读",  name: "tDisplay", type: "display"},
            { label: "文字文本框",  name: "tText", type: "text", colSpan: 1, placeholder:"请输入文本" },
            { label: "数字文本框",  name: "tNumber", type: "number", colSpan: 1 , placeholder:"请输入数字"},
            { label: "单选", name: "tRadio", type: "radio", colSpan: 2,options:[
                {text:"选项1",value:1},{text:"选项2",value:2},{text:"选项3",value:3},
                {text:"选项4",value:4},{text:"选项5",value:5},{text:"选项6",value:6},
                {text:"选项7",value:7},{text:"选项8",value:8},{text:"选项9",value:9}
            ]},
            { label: "复选", name: "tCheckboxMulti", type: "checkbox:multi", colSpan: 1, options:[
                {text:"选项1",value:1},{text:"选项2",value:2},{text:"选项3",value:3},
                {text:"选项4",value:4},{text:"选项5",value:5},{text:"选项6",value:6}
            ]},
            { label: "复选(自定义选中和未选中的值)", name: "tCheckbox", type: "checkbox", colSpan: 1, trueValue:"选中值", falseValue:"没选中值"},
            { label: "下拉选择", name: "tSelected", type: "selected", colSpan: 1,options:[
                {text:"选项1",value:1},{text:"选项2",value:2},{text:"选项3",value:3},
                {text:"选项4",value:4},{text:"选项5",value:5},{text:"选项6",value:6}
            ]},
            { label: "下拉选择:多选", name: "tSelectedMulti", type: "selected:multi", colSpan: 1, options:[
                {text:"选项1",value:1},{text:"选项2",value:2},{text:"选项3",value:3},
                {text:"选项4",value:4},{text:"选项5",value:5},{text:"选项6",value:6},
                {text:"选项7",value:7},{text:"选项8",value:8},{text:"选项9",value:9}
            ]},
            { label: "多行文本", name: "tTextarea", type: "textarea", colSpan: 2, placeholder:"我是多行文本"},
            { label: "日期选择", name: "tDate", type: "date", colSpan: 1, placeholder:"请选择日期"},
            { label: "日期时间选择", name: "tDatetime", type: "datetime", colSpan: 1, placeholder:"请选择时间"},
            
        ],
        editFields2 = [
            { label: "文本最少5个字",  name: "tText1", type: "text", colSpan: 1 },
            { label: "文本最多10个字",  name: "tText2", type: "text", colSpan: 1 },
            { label: "单选必填跨2列", name: "tRadio", type: "radio", colSpan: 2,options:[
                {text:"选项1",value:1},{text:"选项2",value:2},{text:"选项3",value:3},
                {text:"选项4",value:4},{text:"选项5",value:5},{text:"选项6",value:6},
                {text:"选项7",value:7},{text:"选项8",value:8},{text:"选项9",value:9}
            ]},
            { label: "数字不能小于2",  name: "tNumber1", type: "number", colSpan: 1 },
            { label: "数字不能大于100",  name: "tNumber2", type: "number", colSpan: 1 },
            { label: "手机号正则验证",  name: "tphone", type: "text", colSpan: 1 },
            { label: "身份证正则验证",  name: "tCard", type: "text", colSpan: 1},
            { label: "自定义表单(选择颜色)", name: "tcolor", type: "display", colSpan: 2},
        ],
        fieldValidator2 = {
            "tText1":{
                minlength: 5,
                maxlength: 10,
                pattern: '/^[a-z]+$/',
                messages: {
                    minlength: "不得少于5个字符",
                    maxlength: "不得超过10个字符",
                    pattern: "必须是英文小写字符"
                }
            },
            "tText2":{maxlength:10},
            "tRadio":{require:true},
            "tNumber1":{min:2},
            "tNumber2":{max:100},
            "tphone":{pattern: form.regValidator.phoneReg},
            "tCard":{pattern: form.regValidator.cardNumReg, messages:{pattern:"身份证格式不对（自定义提示信息）"}},
        };
    
    var vm = new Vue({
        el:"#main",
        mixins: [
            formHelper.getFieldsMixin(editFields1, {},"mainInfo1"),
            formHelper.getFieldsMixin(editFields2, {},"mainInfo2"),
            formHelper.getValidatorMixin(fieldValidator2, "form2", "mainInfo2")
        ],
        data:{
            //vueForm 中的vue的指令配置
            vdate: '2018-08-25',
            vmonth: null,
            vdatetime: null,
            /*vdaterange: null,
            vrangemonth: null,
            config:{
                format:"YYYY年MM月DD日",
                min:"2017-12-31",
                max:"2018-12-31"
            },
            rangemonthconfig:{
                startMonth: "2017-12-31",
                endMonth: "2018-12-31"
            },*/

            //vueForm 中的cig-form的值及配置
            fields1: editFields1,
            fields2: editFields2,
            mainInfo1: {
                tDisplay : "只读的值",
                tText: null,
                tNumber: null,
                tRadio: null,
                tCheckboxMulti: null,
                tCheckbox: null,
                tSelected: null,
                tSelectedMulti: [],
                tTextarea: null,
                tDate: null,
                tDatetime: null,
            },
            mainInfo2:{
                "tText1":null,
                "tText2":null,
                "tRadio":null,
                "tNumber1":null,
                "tNumber2":null,
                "tphone":null,
                "tCard":null,
                tcolor: null
            },
            log1: null,
            log2: null,

            colors: ["red","blue","green","saddlebrown","yellow","blueviolet"],
        },
        watch:{
            "mainInfo2.tcolor":function(val){
                this.validateAct();
            }
        },
        mounted:function(){
            this.validateAct();
        },
        methods:{
           //指令中的值变化时
           input:function(val){
               console.log(val);
               console.log(this.$data);
           },
           validateAct: function(){
               this.raiseValidate();
               var state = {};
               if(!this.mainInfo2.tcolor){
                   state = {
                       type: "error",
                       message: "必须选择颜色"
                   }
               }
               this.$refs.form2.setValidation({
                   "tcolor":state
               });
           },
           btnClick1:function(){
              var _this=this;
              this.log1 = JSON.stringify(this.mainInfo1);
              setTimeout(function() {
                  _this.log1=null
              }, 5000);
           },
           btnClick2:function(){
              var _this=this;
              this.log2 = JSON.stringify(this.mainInfo2);
              setTimeout(function() {
                  _this.log2=null
              }, 5000);
           },
           colorClick:function(color){
               this.mainInfo2.tcolor=color;
           }
        }
    })

    
});