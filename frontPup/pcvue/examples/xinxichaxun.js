define([
    'require',
    'vue',
    'vueDomainPool',
    'systemConfig',
    'jQuery',
    'vueTable',
    'vueAlert',
    'vueTableFilter',
], function(require, Vue, domainPool, systemConfig, $ , table, alert) {
    'use strict';
    new Vue({
        el:"#defaultTable",
        data:{
            filters:[],
            btns:[
                {
                    id:"add",
                    name:"新增",
                    enableClass:"btn-danger"
                },
                {
                    id:"modify",
                    name:"修改",
                    enableClass:"btn-danger"
                },
                {
                    id:"dele",
                    name:"删除",
                    enableClass:"btn-danger"
                },
                {
                    id:"view",
                    name:"查看",
                    enableClass:"btn-danger"
                },
            ],
              keyword:"",
            tableConfig:{checkbox:true},
            tableColumns:[
                {
                    title: '户主',
                    field: 'name',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                },
                {
                    title: '姓名',
                    field: 'name1',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                },
                {
                    title: '与户主关系',
                    field: 'name2',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                },
                {
                    title: '居住地址',
                    field: 'name3',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                },
                {
                    title: '所属网格',
                    field: 'name4',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                },
                {
                    title: '户籍地址',
                    field: 'name5',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                },
                {
                    title: '采集人',
                    field: 'name6',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                },
                {
                    title: '采集时间',
                    field: 'name7',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                }
            ]
        },
        methods:{
            computAjaxOptions:function(){
                this.tableAjaxOptions = {
                    url:"./table_data/gzrz.json"+"?keyword="+this.keyword,
                    data:{
                        key:this.filter.key
                    }
                }
            },
            //执行查询
            doSearch:function(){
                this.computAjaxOptions();
            },
        }
    })
});