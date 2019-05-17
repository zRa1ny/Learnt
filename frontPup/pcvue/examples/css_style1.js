define([
    'require',
    'vue',
    'vueDomainPool',
    'systemConfig',
    'jQuery',
    'vueForm',
    'vueTable',
    'vueAlert',
    'vueTableFilter',
    'vueArea',
    'vueBsPop',
    'vueBsTab',
    'vueBsTreeview',
], function(require, Vue, domainPool, systemConfig, $ , form, table, alert) {
    'use strict';
    // domainPool.cacheDomains(['gender','def']); //缓存当前页所需要的所有域
    var formHelper = form.helper;
    var tableHelper = table.helper;
    var role = systemConfig.getRole();
    var tableVm = new Vue({
        el:"#css",
        data:{
            data:{a:1,b:2},
            //设置快速查询项
            filters:[
                //支持设定辖区
                {
                    name:"dep",
                    text:"辖区",
                    type:"custom",
                    component:'<cig-ajax-area\
                        :ajax-options="data.ajaxOptions" \
                        @input="input" \
                        v-model="valueProxy" \
                        empty-text="请选择" \
                        :value="valueProxy" \></cig-ajax-area>',
                    ajaxOptions:{
                        type:"get",
                        "url":systemConfig.backendurl+"/system/queryUserDataDep"
                    },
                },
                {
                    name:"type",
                    text:"人口类型",
                    all:true,
                    multi:true,
                    type:"options",
                    options:[
                        {text:"常驻人口",value:"1"},
                        {text:"流动人口",value:"2"},
                    ]
                }
            ],
            //设置快速查询项的默认值
            filter:{
                dep:null,
                type:""
            },
            //设置domainName的时候，从服务器取options的接口
            domainAjaxOptions:false,
            //设置列表的按钮，按钮的click操作在method里面 ，方法名称为 command+id 例如id是query的按钮，会触发commandQuery
            btns:[
                {
                    id:"add",
                    name:"县内人员流入",
                    enableClass:"btn-danger",
                    visible:true
                }
            ],
            //设置列表的关键字查询
            keyword:"",
            //设置列表的参数，是否显示多选列
            tableConfig:{
                checkbox:false
            },
            //设置列表的列
            tableColumns:[
                {
                    title: '姓名',
                    width: '70px',
                    field: 'name',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: '<a target="_blank" :href="\'rkDetail.html?module=户籍人口&id=\'+row.id">{{row.name}}</a>',
                },
                {
                    title: '公民身份证号码',
                    width: '165px',
                    field: 'cardNum',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                }
            ],
            tableAjaxOptions:{
            }
        },
        methods:{
            //设置table的ajax选项，可以自己组织参数，设置后就会刷新列表
            computAjaxOptions:function(){
                this.tableAjaxOptions = {
                    type:"get",
                    data:{
                        keyword:this.keyword,//关键字参数
                        type:this.filter.type,
                        dwdm:this.filter.dep,
                    },
                    "url":systemConfig.backendurl+"/realPerson/person/familyPersons"
                }
            },
            //执行查询
            doSearch:function(){
                this.computAjaxOptions();
            },
            //按钮方法
            executeCommand:function(command){
                var func = "command"+command.substr(0,1).toUpperCase()+command.substr(1);
                if(this[func]){
                    this[func]();
                }
            },
            commandAdd:function(){
                addVm.show();
                addVm.reset();
            }
        }
    });
});