define([
    'require',
    'vue',    
    'vueTableFilter',
    'vueTable'
], function(require, Vue, tableFilter) {
    'use strict';
    var _oriFilter={
        dep:"123",
        placeStaffnum:null,
        placeTypeMax:"",
        tagtype:[],
        placeKeyAttribute:[],
        placeArea:[]
    },
    clone = function(obj){
        return JSON.parse(JSON.stringify(obj))
    }


    var vm = new Vue({
        el:"#main",
        data:{
            //设置筛选项
            filters:[
                {
                    name:"dep",
                    text:"所属辖区",
                    isOut:true,
                    type:"custom",
                    component:'<input v-model="valueProxy" @input="input" style="border: 0;width: 100%;" />',
                },
                {
                    name:"placeArea",
                    text:"场所面积",
                    multi:true,
                    all:true,
                    type:"options", 
                    options:[
                        //{value:"all",text:"全部"},
                        {value:"0",text:"0-1000㎡"},
                        {value:"1",text:"1000㎡-5000㎡"},
                        {value:"2",text:"5000㎡以上"}
                    ]
                },
                {
                    name:"placeTypeMax",
                    text:"场所类别",
                    all:true,
                    isOut:true,
                    multi:true,
                    type:"options", 
                    options:[
                        {value:"all",text:"全部"},
                        {value:"0",text:"小区住宅"},
                        {value:"1",text:"酒店娱乐"},
                        {value:"2",text:"金融机构"}
                    ]
                },
                {
                    name:"tagtype",
                    text:"关联组织结构",
                    all:true,
                    multi:true,
                    type:"options", 
                    options:[
                        {value:"all",text:"全部"},
                        {value:"0",text:"行政管理"},
                        {value:"1",text:"公共交通"},
                        {value:"2",text:"社会福利"}
                    ]
                },
                {
                    name:"placeKeyAttribute",
                    text:"重点属性",
                    all:true,
                    multi:false,
                    isOut:true,
                    type:"options", 
                    options:[
                        {value:"0",text:"消防"},
                        {value:"1",text:"安全"},
                        {value:"2",text:"教育"}
                    ]
                }
            ],
            //设置筛选项的默认值
            filter: clone(_oriFilter),
            filtermode : "pop",
            filtermode2 : "limit", //可设置为default试一试
            filterPopModel : false,
            keyword:"",
            //设置列表的参数，是否显示多选列
            tableConfig:{
                checkbox:true,
                colResizable:true,
            },
            placeholder:"场所名称/场所编码",
            //设置列表的列
            tableColumns:[
                {
                    title: '场所名称',
                    field: 'placeName',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: '<a target="_blank" href="javascript:;">{{row.placeName}}</a>'
                },
                {
                    title: '场所详址',
                    field: 'placeAddr',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '场所类型',
                    field: 'placeTypeMax',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component:{ 
                        template:'<span>{{getStr(row.placeTypeMax)}}</span>',
                        methods:{
                            getStr: function(val){
                                var arr = [
                                    {value:"all",text:"全部"},
                                    {value:"0",text:"小区住宅"},
                                    {value:"1",text:"酒店娱乐"},
                                    {value:"2",text:"金融机构"}
                                ]
                                arr.map(function(item){
                                    if(item.value===val){
                                        val = item.text;
                                    }
                                })
                                return val;
                            }
                        }
                    }
                },
                {
                    title: '场所类型小类',
                    field: 'placeType',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                },
                {
                    title: '所属网格',
                    field: 'areaName',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                }
            ],
            tableAjaxOptions:{
            }
        },
        mounted:function(){
            this.doSearch();
        },
        methods:{
            openFilterPop:function(){
                this.filterPopModel = true;
            },
            tableSelectChange:function(){
                console.log("表格选择了")
            },
            resetFilter:function(){
                if(this.keyword){
                    this.keyword = "";
                }
                if(this.filter){
                    this.$set(this,"filter",clone(_oriFilter));
                }
                this.doSearch();
            },
            //table发送请求
            doSearch:function(){
                this.tableAjaxOptions = {
                    type:"get",
                    data:{
                        keyword:this.keyword,
                        departmentId:this.filter.dep,
                        placeArea:this.filter.placeArea,
                        placeTypeMax:this.filter.placeTypeMax === "" ? "all" : this.filter.placeTypeMax,
                        placeType:"",
                        tagtype:this.filter.tagtype,
                        placeKeyAttribute:this.filter.placeKeyAttribute,
                    },
                    "url":"./table"+Math.ceil(Math.random()*3)+".json"
                }
                
            },
        }
    })

    
});