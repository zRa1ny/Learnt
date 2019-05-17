define([
    'require',
    'vue',
    'vueDomainPool',
    'jQuery',
    'vueTableFilter',
    'systemConfig',
    'vueTable',
    'vueBsPop',
    'vueAlert',
    'bootstrap',
    'bootstrapDatePickerLang',
    'bootstrapDatePicker',
], function (require, Vue, domainPool, $, filters, systemConfig, table) {
    'use strict';
    var tableHelper = table.helper;
    var vmcheck;
    //多选控件//jctype 0、抽查检查 1、巡查情况
    /*
        在tpl页面上用的时候 添加样式 
        .detail {
            background: #f5f5f5;
            border-bottom: 1px solid #d7d7d7;
        }

        #det tr .detail:last-child {
            border-bottom: none;
        }
        
    */
    var checkvue = Vue.component('vm-check', {
        props: {
            id: {
                type: String
            },
            jctype: {
                type: String
            },
            tablepagesize: {
                type: String,
                default: "5"
            },
            placetype: {
                type: String
            }
        },
        template: "<div >\
                            <cig-table-filter ref='yymfiter' v-if='filters.length > 0' :mode='glb_proxy_filtermode' :filters='filters' v-model='filter'\
                                :pop-model='filterPopModel' @initfiter='resetFilterMain()' @popmodelchange='popModelChange()'\
                                @input='doSearch()'>\
                            </cig-table-filter>\
                            <div class='bootstrap-table'>\
                                <div class='fixed-table-toolbar clearfix'>\
                                    <div class='pull-left'>\
                                        <div class='content-title'>\
                                            <h4>{{typeTitle}}（{{countDatas}}）</h4>\
                                        </div>\
                                    </div>\
                                    <div class='columns columns-right pull-right'>\
                                        <button v-if=\"filters.length > 0 && filtermode =='pop'\" class='btn btn-primary' type='button' @click='openFilterPop()'>\
                                        高级搜索\
                                        </button>\
                                        <button class='btn btn-primary' type='button' @click='resetFilterMain()'>\
                                            重置\
                                        </button>\
                                    </div>\
                                    <div class='pull-right search' style='width: 220px;'>\
                                        <div class='input-group'>\
                                            <input class='form-control' v-model='filter.keyword' @keyup.enter='doSearch()' type='text' :placeholder='tablePlaceholder'>\
                                            <span class='input-group-btn'>\
                                                <button class='btn btn-default' type='button' @click='doSearch()'>\
                                                    <span class='glyphicon glyphicon-search'></span>\
                                            </button>\
                                            </span>\
                                        </div>\
                                    </div>\
                                </div>\
                                <cig-table ref='table' :config='tableConfig' @pagerdatachange='count' :page-size='tablepagesize'  :columns='tableColumns' :ajax-options='tableOption'>\
                                </cig-table>\
                            </div>\
                     <bs-pop  :title='tit' is='bs-pop' type='lg' ref='pop' v-model='checkmode'>\
                            <div ref='alert'></div>\
                            <div class='form-horizontal form-group-sm' v-if='checkDetail'>\
                                <cig-form :fields='fields' data-path='checkDetail' ref='form'>\
                                    <template slot='fieldslot.type'>\
                                        <span class='form-control' :title='checkDetail.type' >{{checkDetail.type}}</span>\
                                    </template>\
                                    <template slot='fieldslot.description'>\
                                        <span class='form-control' :title='checkDetail.description' >{{checkDetail.description}}</span>\
                                    </template>\
                                    <template slot='fieldslot.clcs'>\
                                        <span class='form-control' :title='checkDetail.clcs'>{{checkDetail.clcs}}</span>\
                                    </template>\
                                    <div slot='fieldslot.items' id='det'>\
                                        <table class='table table-bordered' v-if='show==1'>\
                                            <tbody>\
                                                    <tr v-for='(item,i) in checkDetail.items' v-if='item.show' >\
                                                        <td width='75px' style=' text-align: center; vertical-align: middle;background: #fff' ><label class='control-label'>{{item.text}}</label></td>\
                                                        <td style=' padding: 0px;background: #fff; border-bottom: none;'> \
                                                        <div v-for='(item1, index) in item.items' class='detail' v-if='item1.illegal && item1.text'>\
                                                            <div  style='border-right: 1px solid #d7d7d7;width:69%;padding: 10px; min-height: 30px;vertical-align:middle;word-wrap:break-word;word-break:break-all;display: inline-block;'>{{item1.text}}</div> \
                                                            <div style='width:30%;word-wrap:break-word; min-height: 30px;vertical-align:middle; vertical-align:middle;padding: 10px;word-break:break-all;display: inline-block;'>{{item1.opinion==''?'暂无备注信息':item1.opinion}}</div>\
                                                        </div>\
                                                           \
                                                            <div style=' padding: 10px;  border-top: 1px solid #d7d7d7;' v-show='item.fjs' > 附件：\
                                                            <cig-files ref='gridPerson'   @fileschange='filesChange($event,item)'  wrap-class='form-control' :bus-id='mainid' mode='' :file-type='item.code'>\
                                                            </cig-files>\</div>\
                                                        </td>\
                                                    </tr>\
                                            </tbody>\
                                        </table>\
                                        <span class='form-control' v-if='show==0'>经排查无异常情况\
                                        </span>\
                                    </div>\
                                    <template slot='fieldslot.fj' >\
                                        <cig-files ref='fj' wrap-class='form-control' :bus-id='mainid' mode='' file-type='check'>\
                                        </cig-files>\
                                    </template>\
                                </cig-form>\
                            </div>\
                            <template slot='footer'>\
                                <button type='button' class='btn btn-default' @click='close'>关闭</button>\
                            </template>\
                </bs-pop></div>",
        mounted: function () {
            vmcheck = this;
        },
        watch: {

        },
        computed: {

            tit: function () {
                if (this.content == 0) {
                    return "抽查内容"
                } else {
                    return "排查内容"
                }
            },
            fields: function () {
                if (this.content == 0) {
                    return [{
                            label: "抽查时间",
                            name: "checkDate",
                            type: "display",
                            colSpan: 1
                        },
                        {
                            label: "抽查人",
                            name: "userName",
                            type: "display",
                            colSpan: 1
                        },
                        {
                            label: "联系方式",
                            name: "phone",
                            type: "display",
                            colSpan: 1
                        },
                        {
                            label: "所属部门",
                            name: "deptName",
                            type: "display",
                            colSpan: 1
                        },
                        {
                            label: "抽查层级",
                            name: "checkLevel",
                            type: "display",
                            colSpan: 1
                        },
                        {
                            label: "抽查类型",
                            name: "type",
                            type: "display",
                            colSpan: 1
                        },
                        {
                            label: "抽查描述",
                            name: "description",
                            type: "display",
                            colSpan: 2
                        },
                        {
                            label: "抽查结果",
                            name: "items",
                            type: "display",
                            colSpan: 2
                        },
                        {
                            label: "整改类型",
                            name: "zglx",
                            type: "display",
                            domainName: "rectificationType",
                            colSpan: 1
                        },
                        {
                            label: "处理措施",
                            name: "clcs",
                            type: "display",
                            colSpan: 1
                        },
                        {
                            label: "附件",
                            name: "fj",
                            type: "display",
                            colSpan: 2
                        },
                    ]
                } else {
                    return [{
                            label: "排查时间",
                            name: "checkDate",
                            type: "display",
                            colSpan: 1
                        },
                        {
                            label: "排查人",
                            name: "userName",
                            type: "display",
                            colSpan: 1
                        },
                        {
                            label: "联系方式",
                            name: "phone",
                            type: "display",
                            colSpan: 1
                        },
                        {
                            label: "所属部门",
                            name: "deptName",
                            type: "display",
                            colSpan: 1
                        },
                        {
                            label: "排查层级",
                            name: "checkLevel",
                            type: "display",
                            colSpan: 1
                        },
                        {
                            label: "排查类型",
                            name: "type",
                            type: "display",
                            colSpan: 1
                        },
                        {
                            label: "排查描述",
                            name: "description",
                            type: "display",
                            colSpan: 2
                        },
                        {
                            label: "排查结果",
                            name: "items",
                            type: "display",
                            colSpan: 2
                        },
                        {
                            label: "整改类型",
                            name: "zglx",
                            type: "display",
                            domainName: "rectificationType",
                            colSpan: 1
                        },
                        {
                            label: "处理措施",
                            name: "clcs",
                            type: "display",
                            colSpan: 1
                        },
                        {
                            label: "附件",
                            name: "fj",
                            type: "display",
                            colSpan: 2
                        },
                    ]
                }
            },
            countDatas: function () {
                var count;

                count = (this.tableData.count ? this.tableData.count.total : 0);
                if (count == 0) {
                    return '无';
                } else {
                    return count;
                }
            }
        },
        data: function () {
            return {
                content: "0",
                show: "0",
                // placetype:this.placetype,
                val: "0",
                mainid: '',
                checkmode: false,
                checkDetail: "",
                tableData: {},
                jsitems: [],
                tableConfig: {
                    checkbox: false,
                    isRowSpan: true
                },
                filtermode: "pop",
                filterPopModel: false,
                tableOption: this.jctype == 0 ? {
                    type: "get",
                    data: {
                        checkPlaceId: this.id,
                        level: "1,2,3,4",
                        illegal: "1"
                    },
                    "url": systemConfig.backendurl + "/places/placeCheck/spotCheckQuery"
                } : {
                    type: "get",
                    data: {
                        checkPlaceId: this.id,
                        //placeType: this.placetype
                        level: "1,2,3,4",
                        illegal: "1"
                    },
                    "url": systemConfig.backendurl + "/places/placeCheck/patrolCheckQuery"
                },
                typeTitle: this.jctype == 0 ? "抽查检查" : "抽查不合格项",
                //typeTitle:"巡场排查",
                typetext: this.jctype == 0 ? "抽查" : "排查",
                // tablePlaceholder: this.jctype == 0 ? "所属部门/抽查类型/抽查人" : "所属部门/排查人",
                tablePlaceholder: "搜索",
                filter: {
                    birthday: {
                        startTime: null,
                        endTime: null
                    },
                    level: [],
                    typeId: [],
                    keyword: "",
                    //illegal: []
                },
                filters: [{
                        name: "birthday",
                        text: this.jctype == 0 ? "抽查时间" : "排查时间",
                        type: "custom",
                        component: '<div>\
                                <input style="display:inline-block;width:30%" class="form-control" @input="input" v-date v-model="valueProxy.startTime" placehold="起始时间"/>\
                                <span>至<span/>\
                                <input style="display:inline-block;width:30%" class="form-control" @input="input" v-date v-model="valueProxy.endTime" placehold="结束时间"/>\
                                </div>'
                    },
                    {
                        name: "typeId",
                        text: this.jctype == 0 ? "抽查类型" : "排查类型",
                        all: true,
                        multi: true,
                        type: "domain",
                        domainName: "checktype"
                    },
                    {
                        name: "level",
                        text: this.jctype == 0 ? "抽查层级" : "排查层级",
                        all: true,
                        multi: true,
                        type: "domain",
                        domainName: "checkLevel"
                    },
                    // {
                    //     name: "illegal",
                    //     text: this.jctype == 0 ? "抽查结果" : "排查结果",
                    //     all: true,
                    //     multi: true,
                    //     type: "options",
                    //     options: [{ text: "无异常", value: "0" }, { text: "异常", value: "1" }]
                    // },

                ],
                tableColumns: this.jctype == 0 ? [{
                        title: '抽查时间',
                        field: 'createDate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: {
                            template: '<span><a href="javascript:;" @click="nameDetail">{{row.createDate}}</a></span>',
                            methods: {
                                //弹出此人的一些信息
                                nameDetail: function () {
                                    vmcheck.opencheckmode(this.row, "0");
                                }
                            }
                        }
                    },
                    {
                        title: '所属部门',
                        field: 'departmentName',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '排查类型',
                        field: 'type1',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: tableHelper.getDomainDisplayComponent("type1", "checktype")
                    },
                    {
                        title: '抽查人',
                        field: 'userName',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '联系方式',
                        field: 'phone',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    }

                ] : [{
                        title: '排查时间',
                        field: 'createDate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: {
                            template: '<span><a href="javascript:;" @click="nameDetail">{{row.createDate}}</a></span>',
                            methods: {
                                //弹出此人的一些信息
                                nameDetail: function () {
                                    vmcheck.opencheckmode(this.row, "1");
                                }
                            }
                        }
                    },
                    {
                        title: '排查地点',
                        field: 'checkPlace',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '排查人',
                        field: 'userName',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '联系方式',
                        field: 'phone',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '排查描述',
                        field: 'description',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    }

                ]
            };
        },
        methods: {
            filesChange: function ($event, item) {
                if ($event.length != 0) {
                    for (var i = 0; i < this.checkDetail.items.length; i++) {
                        if (this.checkDetail.items[i] == item) {
                            this.checkDetail.items[i].fjs = true
                        } else {
                            this.checkDetail.items[i].fjs = false
                        }
                    }
                } else {
                    for (var i = 0; i < this.checkDetail.items.length; i++) {
                        if (this.checkDetail.items[i] == item) {
                            this.checkDetail.items[i].fjs = false
                        }
                    }
                }
            },
            count: function ($event) {
                this.$set(this.tableData, 'count', $event)
                this.$emit("cout", $event.total);
            },
            //打开排查结果界面
            opencheckmode: function (row, type) {
                this.content = type;
                this.mainid = row.id;
                this.show = "0"
                $.ajax({
                    type: "get",
                    data: {
                        id: row.id,
                    },
                    "url": systemConfig.backendurl + "/places/placeCheck/placeDetail",
                    "success": this.getPersonSuccess.bind(this),
                    "error": this.getPersonError.bind(this)
                });
            },
            getPersonSuccess: function (res) {
                // var ccid = res.data.id;
                // var that = this;
                if (res.success) {
                    if (res.data.items.length != 0) {
                        for (var i = 0; i < res.data.items.length; i++) {
                            res.data.items[i].fjs = true

                        }
                    }
                    this.checkmode = true;
                    //res.data.checkDate = res.data.checkDate ? new Date(res.data.checkDate).Format("yyyy-MM-dd hh:mm") : "";
                    this.getData(res.data.items)
                    this.getNape(res.data.items)
                    this.$set(this, "checkDetail", res.data);
                } else {
                    this.getPersonError(res);
                }
            },
            getData: function (type) {
                if (type.length != 0) {
                    for (var i = 0; i < type.length; i++) {
                        if (type[i].items.length != 0) {
                            for (var j = 0; j < type[i].items.length; j++) {
                                if (type[i].items[j].illegal) {
                                    this.show = "1";
                                    return
                                }
                            }
                        }
                    }
                }

            },
            getNape: function (type) {
                if (type.length != 0) {
                    for (var i = 0; i < type.length; i++) {
                        if (type[i].items.length != 0) {
                            for (var j = 0; j < type[i].items.length; j++) {
                                if (type[i].items[j].illegal && type[i].items[j].text) {
                                    type[i].show = true;
                                }
                            }
                        }
                    }
                }
            },
            getPersonError: function () {},
            close: function () {
                this.checkmode = false;
            },
            openFilterPop: function () {
                this.filterPopModel = true;
            },
            resetFilterMain: function () {
                for (var p in eval("this.filter")) { // 方法 
                    if (p == "birthday") {
                        for (var c in eval("this.filter")[p]) {
                            eval("this.filter")[p][c] = null;
                        }
                    } else if (eval("this.filter")[p] instanceof Array) {
                        eval("this.filter")[p] = [];
                    } else {
                        eval("this.filter")[p] = null;
                    }
                }
                eval("this.$refs.yymfiter").valueProxy = eval("this.filter");
                this.doSearch();
            },
            popModelChange: function () {
                this.filterPopModel = false;
            },
            doSearch: function () {
                var levels;
                if (this.filter.level) {
                    levels = this.filter.level
                } else {
                    levels = "1,2,3,4"
                }
                var data = {
                    checkPlaceId: this.id,
                    level: levels, //层级
                    startTime: this.filter.birthday.startTime, //开始时间
                    endTime: this.filter.birthday.endTime, //结束时间
                    typeId: this.filter.typeId, //抽查类型
                    keyword: this.filter.keyword,
                    //placeType: this.placetype,
                    // level: "1,2,3,4",
                    illegal: "1"
                }
                this.tableOption = {
                    type: "get",
                    url: this.tableOption.url,
                    data: data
                }
            },
        },
    });
});