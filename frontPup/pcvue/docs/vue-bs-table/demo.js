define([
    'require',
    'vue',
    'jQuery',
    'vueBsTable',
    'vueAlert'
], function (require, Vue, $, table,alert) {
    'use strict';

    var tableVm1 = new Vue({
        el: "#table1",
        data: {
            tableColumns: [{
                    title: '总数',
                    field: 'sum',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    group: null
                },
                {
                    title: '标题一',
                    field: 'title1',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    group: "表头"
                },
                {
                    title: '标题二',
                    field: 'title2',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    group: "表头"
                },
                {
                    title: '标题三',
                    field: 'title3',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    group: "表头"
                }
            ],
            tableRows: [{
                    "id": "1",
                    "sum": "10",
                    "title1": "2",
                    "title2": "3",
                    "title3": "5"
                },
                {
                    "id": "2",
                    "sum": "10",
                    "title1": "2",
                    "title2": "3",
                    "title3": "5"
                }, {
                    "id": "3",
                    "sum": "10",
                    "title1": "2",
                    "title2": "3",
                    "title3": "5"
                }, {
                    "id": "4",
                    "sum": "10",
                    "title1": "2",
                    "title2": "3",
                    "title3": "5"
                }
            ]
        },
        methods: {
            changeData: function () {
                var self = this;
                $.getJSON("./table_data/table_data4.json", function (rows) {
                    self.tableRows = rows;
                })
            },
            cellClick:function(column){
                console.log(column)
            },
            tableSelectChange: function () {
                console.log(this.$refs.table.checkList)
            },
            sortRow: function () {
                console.log(111)
            }
        }
    });

    var tableVm2 = new Vue({
        el: "#table2",
        data: {
            tableColumns: [{
                    title: '名称',
                    field: 'name',
                    align: 'center',
                    valign: 'middle',
                    visible: '<a href="./"></a>',
                    editComponent: '<input v-model="row.name"/>'
                },
                {
                    title: '性别',
                    field: 'xb',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    editComponent: '<select v-model="row.xb"><option>男</option><option>女</option></select>'
                }
            ],
            tableRows: [{
                    name: "自己写1",
                    xb: "男"
                },
                {
                    name: "自己写2",
                    xb: "男"
                },
                {
                    name: "自己写3",
                    xb: "男"
                },
                {
                    name: "自己写3",
                    xb: "男"
                },
                {
                    name: "自己写3",
                    xb: "男"
                },
            ]
        }
    });

    var tableVm3 = new Vue({
        el: "#table3",
        data: {
            type: "1",
            tableColumns: [{
                    title: '普通列',
                    field: 'column1',
                    align: 'center',
                    valign: 'middle',
                    visible: true
                },
                {
                    title: '判断列',
                    field: 'column2',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: '<span>\
                    <span v-if="row.column2==1">一</span>\
                    <span v-if="row.column2==2">二</span>\
                </span>'
                },
                {
                    title: '域列',
                    field: 'column3',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    //component: tableHelper.getDomainDisplayComponent("column3", "gender")
                },
                {
                    title: '链接列',
                    field: 'column4',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: '<a target="_blank" :href="\'http://cn.bing.com/?q=\'+row.column4">bing {{row.column4}}</a>',
                },
                {
                    title: '按钮列',
                    field: 'column5',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: {
                        template: '<span>\
                    <a target="_blank" @click="itemClick" href="javascript:;">弹个框</a>\
                    |\
                    <a target="_blank" @click="getType" href="javascript:;">看当前的数据源</a>\
                    </span>',
                        methods: {
                            itemClick: function () {
                                alert.alert("123")
                            },
                            getType: function () {
                                alert.alert(tableVm3.type);
                            }
                        }
                    },
                },
                {
                    title: '自定义列',
                    field: 'column6',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    component: {
                        template: '<span>\
                    <input v-model="row.column6"><input type="button" @click="save" value="保存">\
                    </span>',
                        methods: {
                            save: function () {
                                alert.alert("column6 保存的值为" + this.row.column6)
                            }
                        }
                    },
                }
            ],
            tableRows: [{
                    "column1": "1",
                    "column2": "1",
                    "column3": "01",
                    "column4": "百度",
                    "column5": "男",
                    "column6": "101"
                },
                {
                    "column1": "哈哈2",
                    "column2": "1",
                    "column3": "02",
                    "column4": "高考",
                    "column5": "男",
                    "column6": "102"
                },
                {
                    "column1": "活脱脱3",
                    "column2": "2",
                    "column3": "03",
                    "column4": "航天",
                    "column5": "男",
                    "column6": "103"
                },
                {
                    "column1": "uui4",
                    "column2": "1",
                    "column3": "04",
                    "column4": "还想啥",
                    "column5": "男",
                    "column6": "104"
                },
                {
                    "column1": "顶顶顶顶顶顶顶顶顶顶5",
                    "column2": "1",
                    "column3": "05",
                    "column4": "动画片",
                    "column5": "男",
                    "column6": "105"
                }
            ]
        }
    });
});