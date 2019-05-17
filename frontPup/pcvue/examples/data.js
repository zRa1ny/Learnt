/**
 * Created by Administrator on 2017/6/20.
 */
define([
    'require',
    'vue',
    'jQuery',
    'systemConfig',
    'vueForm',
    'vueTable',
    'vueBsTable',
], function(require, Vue, $, systemConfig,form,table) {
    'use strict';
     new Vue({
        el:"#form",
        data:{
            data:{
                field1:null,
                field2:null,
                field2_1:null,
                field3:"王星",
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
                field16:null,
                field17:null,
                field18:null,
                field19:null,
                field20:null,
                field21:null,
            },
            fields:[
                {label:"姓名",name:"field12",type:"text",colSpan:1},
                {label:"所属网格",name:"field11",type:"selected",options:[{ text: "显示1", value: "value1" },{ text: "显示2", value: "value2" }],colSpan:1},
                {label:"采集人",name:"field3",type:"display",colSpan:1},
                {label:"采集时间",name:"field2_1",type:"datetime",colSpan:1},
                {label:"身份证号",name:"field16",type:"text",colSpan:1},
                {label:"性别",name:"field17",type:"selected",options:[{ text: "男", value: "value1" },{ text: "女", value: "value2" },{ text: "未知", value: "value3" },{ text: "未说明", value: "value4" }],colSpan:1},
                {label:"出生日期",name:"field2",type:"date",colSpan:1},
                {label:"婚姻状况",name:"field18",type:"selected",options:[{ text: "离婚", value: "value1" },{ text: "丧偶", value: "value2" },{ text: "未婚", value: "value3" },{ text: "已婚", value: "value4" },{ text: "初婚", value: "value5" },{ text: "再婚", value: "value6" },{ text: "复婚", value: "value7" },{ text: "未说明", value: "value8" }],colSpan:1},
                {label:"与房主/户主关系",name:"field19",type:"selected",options:[{ text: "本人或户主", value: "value1" },{ text: "兄、弟、姐、妹", value: "value2" },{ text: "其它", value: "value3" },{ text: "承租", value: "value4" },{ text: "配偶", value: "value5" },{ text: "父母", value: "value6" }
                ,{ text: "子", value: "value7" },{ text: "女", value: "value8" },{ text: "媳", value: "value9" },{ text: "婿", value: "value10" },{ text: "孙子、孙女或外孙子、外孙女", value: "value11" },{ text: "祖父母或外祖父母", value: "value12" }],colSpan:1},
                {label:"学历",name:"field120",type:"selected",options:[{ text: "显示1", value: "value1" },{ text: "显示2", value: "value2" }],colSpan:1},
                {label:"房主/户主姓名",name:"field21",type:"text",colSpan:2},
                {label:"居住地址",name:"field22",type:"text",colSpan:1},
                {label:"政治面貌",name:"field23",type:"selected",
                options:[
                    { text: "群众", value: "value1" },
                    { text: "中国致公党党员", value: "value2" },
                    { text: "九三学社社员", value: "value3" },
                    { text: "台湾民主自治同盟盟员", value: "value4" },
                    { text: "无党派民主人士", value: "value5" },
                    { text: "中国共产党党员", value: "value6" },
                    { text: "中国共产党预备党员", value: "value7" },
                    { text: "中国共产主义青年团团员", value: "value8" },
                    { text: "中国国民党革命委员会会员", value: "value9" },
                    { text: "中国民主同盟盟员", value: "value10" },
                    { text: "中国民主建国会会员", value: "value11" },
                    { text: "中国民主促进会会员", value: "value12" },
                    { text: "中国农工民主党党员", value: "value13" }
                    ],colSpan:1},
                {label:"户籍地址",name:"field24",type:"text",colSpan:2},
                {label:"工作单位",name:"field25",type:"text",colSpan:1},
                {label:"联系电话",name:"field26",type:"text",colSpan:1},
                {label:"人口类型",name:"field27",type:"selected",options:[
                    { text: "常住人口", value: "value1" },
                    { text: "县内流动人口", value: "value2" },
                    { text: "县外流入人口", value: "value3" },
                    { text: "其他", value: "value4" }
                    ],colSpan:1},
                {label:"流出地",name:"field28",type:"text",colSpan:1},
                {label:"兴趣爱好",name:"field29",type:"checkbox:multi",options:[
                    { text: "摄影", value: "value1" },
                    { text: "篮球", value: "value2" },
                    { text: "羽毛球", value: "value3" },
                    { text: "兵乓球", value: "value4" },
                    { text: "游泳", value: "value5" },
                    { text: "自行车", value: "value6" },
                    { text: "其它", value: "value7" },
                    { text: "垂钓", value: "value8" },
                    { text: "歌舞", value: "value9" },
                    { text: "书画", value: "value10" },
                    { text: "表演", value: "value10" },
                    { text: "动漫", value: "value11" },
                    { text: "小说", value: "value12" },
                    { text: "影视剧", value: "value13" },
                    { text: "足球", value: "value14" }
                    ],colSpan:2},
                {label:"重点管控人员",name:"field30",type:"checkbox:multi",options:[
                    { text: "无", value: "value1" },
                    { text: "刑满释放人员", value: "value2" },
                    { text: "社区矫正", value: "value3" },
                    { text: "吸毒人员", value: "value4" },
                    { text: "精神病障碍患者", value: "value5" },
                    { text: "重点上访人员", value: "value6" },
                    { text: "重点青少年", value: "value7" },
                    { text: "艾滋病危险人员", value: "value8" },
                    { text: "邪教人员", value: "value9" },
                    ],colSpan:2},
                {label:"重点服务人员",name:"field31",type:"checkbox:multi",options:[
                    { text: "无", value: "value1" },
                    { text: "低保户", value: "value2" },
                    { text: "孤儿", value: "value3" },
                    { text: "居家养老", value: "value4" },
                    { text: "留守人员", value: "value5" },
                    { text: "需求救助", value: "value6" },
                    { text: "贫困人员", value: "value7" },
                    { text: "流浪乞讨人员", value: "value8" },
                    { text: "五保户", value: "value9" },
                    { text: "60-90岁老人", value: "value10" },
                    { text: "残疾人", value: "value10" },
                    { text: "90岁以上老人", value: "value11" },
                    { text: "孤寡老人", value: "value12" },
                    { text: "计生奖抚对象", value: "value13" },
                    { text: "计生特抚对象", value: "value14" }
                    ],colSpan:3},
            ],
            btns:[
                {
                    id:"add",
                    name:"保存",
                    enableClass:"btn-danger"
                },
                {
                    id:"baochen",
                    name:"返回",
                    enableClass:"btn-danger"
                },
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

});