define([
    'require',
    'vue',
    'jQuery',
    'colResizable',
    'css!cssBsTable',
    'css!cssBsEditTable'
], function (require, Vue, $) {
    'use strict';

    Vue.component('bs-table', {
        props: {
            loadingMessage: {
                type: String,
                default: "正在努力地加载数据中，请稍候……"
            },
            tableStyle: {
                default: function(){
                    return {
                        bordered:true,
                        hover:true,
                        striped:true,
                        condensed:false,
                    }
                }
            },
            loading: Boolean,
            rows: {
                type: Array,
                default: function () {
                    return []
                }
            },
            columns: {
                type: Array,
                default: function () {
                    return []
                }
            },
            config: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            pager: Object,
        },
        template: '\
        <div class="fixed-table-container clearfix">\
            <div class="fixed-table-body">\
                <table :class="{\'table\':true,\'table-bordered\':tableStyle.bordered!==false,\'table-hover\':tableStyle.hover!==false,\'table-striped\':tableStyle.striped!==false,\'table-condensed\':tableStyle.condensed}" style="background:white" ref="table">\
                    <thead>\
                        <tr role="row" v-for="n in groupLevel">\
                            <th :rowspan="groupLevel+1" class="bs-checkbox" \
                                v-if="!!config.checkbox && n==1" \
                                style="text-align: center; vertical-align: middle; width: 36px;"\
                                >\
                                <div class="th-inner">\
                                    <input type="checkbox" v-model="checkAll" />\
                                </div>\
                            </th>\
                            <th :rowspan="groupLevel+1" class=""\
                                v-if="autoOrderColumn && n==1"\
                                width="50px;"\
                                style="text-align: center; vertical-align: middle;"\
                                >\
                                <div class="th-inner">\
                                    序号\
                                </div>\
                            </th>\
                            <template v-for="(col,i) in columns" >\
                                <th v-if="!col.group && n == 1" :rowspan="groupLevel+1" \
                                    :style=\'{"text-align": col.align,"vertical-align":col.valign}\'\
                                    :width="col.width ? col.width : \'\'"\
                                    v-show="col.visible">\
                                    <div class="th-inner" v-html="col.title">\
                                    </div>\
                                    <div class="fht-cell">\
                                    </div>\
                                </th>\
                                <th v-if="col.group && getHasColumnGroup(i,n,groupLevel)" \
                                    :colspan="getColumnGroupColSpan(i,n,groupLevel)" \
                                    :rowspan="getColumnGroupRowSpan(i,n,groupLevel)" \
                                    :style=\'{"text-align": col.align,"vertical-align":col.valign}\'\
                                    v-show="col.visible">\
                                    <div class="th-inner">\
                                        {{getColumnGroupText(i,n,groupLevel)}}\
                                    </div>\
                                    <div class="fht-cell">\
                                    </div>\
                                </th>\
                            </template>\
                        </tr>\
                        <tr role="row">\
                            <th class="bs-checkbox" \
                                v-if="!!config.checkbox && groupLevel==0" \
                                style="text-align: center; vertical-align: middle; width: 36px;"\
                                >\
                                <div class="th-inner">\
                                    <input type="checkbox" v-model="checkAll" />\
                                </div>\
                            </th>\
                            <th class=""\
                                v-if="autoOrderColumn && groupLevel==0"\
                                width="50px;"\
                                style="text-align: center; vertical-align: middle;"\
                                >\
                                <div class="th-inner">\
                                    序号\
                                </div>\
                            </th>\
                            <template v-for="col in columns">\
                                <th :style=\'{"text-align": col.align,"vertical-align":col.valign}\'\
                                    v-if="groupLevel == 0 || (col.group && (typeof(col.group) == \'string\' ? groupLevel == 1 : groupLevel == col.group.length))"\
                                    :width="col.width ? col.width : \'\'"\
                                    v-show="col.visible">\
                                    <div class="th-inner" v-html="col.title">\
                                    </div>\
                                    <div v-if="col.sortable" :class="[\'sort_icon\',{\'glyphicon glyphicon-sort-by-attributes\':sortStatus[col.field]==\'asc\',\'glyphicon glyphicon-sort-by-attributes-alt\':sortStatus[col.field]==\'desc\',\'glyphicon glyphicon-sort\':sortStatus[col.field]==\'default\'}]" @click="sortChange(col.field)"></div>\
                                    <div class="fht-cell">\
                                    </div>\
                                </th>\
                            </template>\
                        </tr>\
                    </thead>\
                    <tbody>\
                        <template v-if="loading">\
                            <tr class="no-records-found">\
                                <td colspan="999" class="text-center">{{loadingMessage}}</td>\
                            </tr>\
                        </template>\
                        <template v-if="!loading">\
                            <tr v-for="(row, index) in sortRows" :class="{selected:selectedRow == row}" @click="selectRow($event,row)">\
                                <td style="text-align: center;" class="bs-checkbox" v-if="!!config.checkbox">\
                                    <input type="checkbox" v-model="checkList" :value="row" class="checkbox" />\
                                </td>\
                                <td style="text-align: center;" width="40px" v-if="autoOrderColumn">\
                                    <span>{{index+1+(pager?(pager.page-1)*pager.size:0)}}</span>\
                                </td>\
                                <template v-for="col in columns" >\
                                    <td v-if="!col.isRowSpan||row[col.field][\'isFirst\']" :rowspan="row[col.field]&&row[col.field][\'isFirst\']?row[col.field][\'rows\']:1" :style=\'{"text-align": col.align,"vertical-align":col.valign}\'\
                                        v-show="col.visible"\
                                        @click="cellClick(col,row)"\
                                        >\
                                        <template v-if="!col.component">\
                                            <span :style="col.width ? {width:(parseInt(col.width)-16)+\'px\'} : {}" class="no-wrap" :title="(col.isRowSpan&&row[col.field]&&row[col.field][\'isFirst\'])?row[col.field][\'value\']:row[col.field]" >{{(col.isRowSpan&&row[col.field]&&row[col.field][\'isFirst\'])?row[col.field][\'value\']:row[col.field]}}</span>\
                                        </template>\
                                        <template v-else>\
                                            <span :style="col.width ? {width:(parseInt(col.width)-16)+\'px\'} : {}" class="no-wrap" ><span :is="getComponentName(col)" :row="row"></span></span>\
                                        </template>\
                                    </td>\
                                </template>\
                            </tr>\
                            <template v-if="false && pager && pager.size && rows.length > 0">\
                                <template v-for="n in pager.size">\
                                    <tr v-if="n>rows.length">\
                                        <td v-if="false" colspan="999" class="text-center">&nbsp;</td>\
                                        <td v-if="false" colspan="1" v-for="n3 in columns.length+!!config.checkbox+autoOrderColumn" class="text-center">&nbsp;</td>\
                                        <td v-if="true && !!config.checkbox" colspan="1" class="text-center">&nbsp;</td>\
                                        <td v-if="true && autoOrderColumn" colspan="1" class="text-center">&nbsp;</td>\
                                        <td v-if="true" colspan="1" v-for="n3 in columns.length" class="text-center">&nbsp;</td>\
                                    </tr>\
                                </template>\
                            </template>\
                            <tr class="no-records-found" v-if="rows.length === 0">\
                                <td colspan="999" class="text-center">没有找到匹配的记录</td>\
                            </tr>\
                        </template>\
                    </tbody>\
                </table>\
            </div>\
            <pager v-if="pager" :pager="pager" @pagerChange="pagerChange"></pager>\
        </div>',
        components: {
            "pager": {
                template: '\
                    <div class="fixed-table-pagination">\
                        <div class="pull-left pagination-detail">\
                            <span class="pagination-info">显示第 {{rowStart}} 到第 {{rowEnd}} 条记录，总共 {{pager.total}} 条记录</span>\
                            <span class="pagination-info form-inline">每页显示 <select class="form-control input-sm" v-model="pager.size" @change="pageSizeChange"><option>10</option><option>20</option><option>50</option></select> 条记录</span>\
                            <!--<span class="page-list">每页显示 \
                                <span class="btn-group dropup">\
                                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\
                                        <span class="page-size">{{pager.size}}</span><span class="caret"></span>\
                                    </button>\
                                    <ul class="dropdown-menu" role="menu">\
                                        <li class="active"><a href="javascript:void(0)">10</a></li>\
                                        <li><a href="javascript:void(0)">25</a></li>\
                                        <li><a href="javascript:void(0)">50</a></li>\
                                        <li><a href="javascript:void(0)">100</a></li>\
                                    </ul>\
                                </span> 条记录\
                            </span>-->\
                        </div>\
                        <div class="pull-right pagination">\
                            <ul class="pagination">\
                                <li class="page-jumper"><a>跳转至 <input type="text" v-model.number="inputPage" @keyup.enter="pageJump(inputPage)" style="height: 19px;width: 50px;"> 页</a></li>\
                                <li :class=\'{disabled:!pagerInfo.hasPre,"page-pre":true}\'><a href="javascript:void(0)" @click="pagerInfo.hasPre && pageJump(pager.page-1)">‹</a></li>\
                                <li v-show="pagerInfo.hasFirst" class="page-number"><a href="javascript:void(0)" @click="pageJump(1)">1</a></li>\
                                <li v-show="pagerInfo.hasPreSeparator" class="page-last-separator disabled"><a href="javascript:void(0)">...</a></li>\
                                <li v-for="page in pagerInfo.prePages" class="page-number"><a href="javascript:void(0)" @click="pageJump(page)">{{page}}</a></li>\
                                <li class="page-number active"><a href="javascript:void(0)">{{pager.page}}</a></li>\
                                <li v-for="page in pagerInfo.nextPages" class="page-number"><a href="javascript:void(0)" @click="pageJump(page)">{{page}}</a></li>\
                                <li v-show="pagerInfo.hasNextSeparator" class="page-last-separator disabled"><a href="javascript:void(0)">...</a></li>\
                                <li v-show="pagerInfo.hasLast" class="page-last"><a href="javascript:void(0)" @click="pageJump(pagerInfo.totalPages)">{{pagerInfo.totalPages}}</a></li>\
                                <li :class=\'{disabled:!pagerInfo.hasNext,"page-next":true}\'><a href="javascript:void(0)" @click="pagerInfo.hasNext && pageJump(pager.page+1)">›</a></li>\
                            </ul>\
                        </div>\
                    </div>',
                props: ["pager"],
                beforeCreate: function () {
                    var pager = this.$options.propsData.pager;
                    if (!pager) {
                        pager = {
                            total: 0,
                            size: 10
                        };
                        this.$options.propsData.pager = pager;
                    }
                    if (pager.total < 0) pager.total = 0;
                    if (pager.size <= 0) pager.size = 10;
                    var totalPages = Math.ceil(pager.total / pager.size);
                    totalPages = totalPages < 1 ? 1 : totalPages;
                    if (pager.page > totalPages) {
                        pager.page = totalPages;
                    } else if (pager.page < 1) {
                        pager.page = 1;
                    }
                },
                data: function () {
                    return {
                        inputPage: ""
                    };
                },
                computed: {
                    //pager
                    rowStart: function () {
                        return (this.pager.page - 1) * this.pager.size + 1;
                    },
                    rowEnd: function () {
                        var rowEnd = (this.pager.page) * this.pager.size;
                        rowEnd = rowEnd > this.pager.total ? this.pager.total : rowEnd;
                        return rowEnd;
                    },
                    pagerInfo: function () {
                        var totalPages = Math.ceil(this.pager.total / this.pager.size);
                        totalPages = totalPages < 1 ? 1 : totalPages;
                        var hasPre,
                            hasFirst,
                            hasPreSeparator,
                            prePages = [],
                            nextPages = [],
                            hasNextSeparator,
                            hasLast,
                            hasNext;
                        var from, to, i;
                        hasPre = this.pager.page > 1;
                        if (totalPages < 5) {
                            from = 1;
                            to = totalPages;
                        } else {
                            from = this.pager.page - 2;
                            to = from + 4;
                            if (from < 1) {
                                from = 1;
                                to = 5;
                            }
                            if (to > totalPages) {
                                to = totalPages;
                                from = to - 4;
                            }
                        }

                        if (totalPages >= 6) {
                            if (this.pager.page >= 3) {
                                hasFirst = true;
                                from++;
                            }

                            if (this.pager.page >= 4) {
                                if (this.pager.page == 4 || totalPages == 6 || totalPages == 7) {
                                    from--;
                                } else {
                                    hasPreSeparator = true;
                                }
                                to--;
                            }
                        }

                        if (totalPages >= 7) {
                            if (this.pager.page >= (totalPages - 2)) {
                                from--;
                            }
                        }

                        if (totalPages == 6) {
                            if (this.pager.page >= (totalPages - 2)) {
                                to++;
                            }
                        } else if (totalPages >= 7) {
                            if (totalPages == 7 || this.pager.page >= (totalPages - 3)) {
                                to++;
                            }
                        }

                        for (i = from; i <= to; i++) {
                            if (i < this.pager.page) {
                                prePages.push(i);
                            } else if (i > this.pager.page) {
                                nextPages.push(i);
                            }
                        }

                        if (totalPages >= 8) {
                            if (this.pager.page <= (totalPages - 4)) {
                                hasNextSeparator = true;
                            }
                        }

                        if (totalPages >= 6) {
                            if (this.pager.page <= (totalPages - 3)) {
                                hasLast = totalPages === this.pager.page ? false : true;
                            }
                        }
                        hasNext = totalPages > this.pager.page;
                        return {
                            hasPre: hasPre,
                            hasFirst: hasFirst,
                            hasPreSeparator: hasPreSeparator,
                            prePages: prePages,
                            nextPages: nextPages,
                            hasNextSeparator: hasNextSeparator,
                            hasLast: hasLast,
                            hasNext: hasNext,
                            totalPages: totalPages
                        }
                    },
                },
                methods: {
                    pageSizeChange: function () {
                        this.pager.page = 1;
                        this.$nextTick(function () {
                            this.$emit("pagerChange");
                        });
                    },
                    pageJump: function (page) {
                        var totalPages = this.pagerInfo.totalPages;
                        this.pager.page = Math.min(Math.max(1, page), totalPages);
                        this.$emit("pagerChange");
                    }
                }
            }
        },
        data: function () {
            return {
                checkList: [],
                selectedRow: null,
                sort: {
                    field: "",
                    type: "default"
                },
                hasColResizableInit: false,
            }
        },
        watch: {
            checkList: function () {
                this.$emit("selectchange");
            },
            rows: function (newVal) {
                if (this.rows.indexOf(this.selectedRow) < 0) {
                    this.selectedRow = null;
                }
                //触发onRowsChange方法，供一些异步取数据的列去获取数据
                this.columns.forEach(function(column){
                    if(column.onRowsChange){
                        column.onRowsChange(newVal);
                    }
                })
            }
        },
        computed: {
            autoOrderColumn: function () {
                for (var i = 0, len = this.columns.length; i < len; i++) {
                    var col = this.columns[i];
                    if (col.title == "序号") {
                        return false;
                    }
                }
                return true;
            },
            //check
            checkAll: {
                set: function (value) {
                    if (value) {
                        this.checkList = [].concat(this.rows);
                        if (this.rows.length == 1) {
                            this.selectedRow = this.rows[0];
                        }
                    } else {
                        this.checkList = [];
                        this.selectedRow = null;
                    }
                },
                get: function () {
                    return (this.rows && this.rows.length) ? this.checkList.length == this.rows.length : false;
                }
            },
            groupLevel: function () {
                var level = 0;
                for (var i = 0, col; col = this.columns[i]; i++) {
                    if (col.group) {
                        level = Math.max(level, col.group.constructor == Array ? col.group.length : 1);
                    }
                }
                return level;
            },
            sortStatus: function () {
                var res = {};
                var sort = this.sort;
                this.columns.forEach(function (col) {
                    res[col.field] = sort.field == col.field ? sort.type : "default";
                });
                return res;
            },
            sortRows: function () {
                if (this.$vnode.componentOptions.listeners && this.$vnode.componentOptions.listeners.sorted) {
                    return this.rows;
                } else {
                    var sort = this.sort;
                    if (sort.field) {
                        var sortFn1 = function (a, b) {
                            return a[sort.field] > b[sort.field] ? 1 : (a[sort.field] < b[sort.field] ? -1 : 0);
                        }
                        var sortFn2 = function (a, b) {
                            return a[sort.field] < b[sort.field] ? 1 : (a[sort.field] > b[sort.field] ? -1 : 0);
                        }
                        switch (sort.type) {
                            case "asc":
                                return [].concat(this.rows).sort(sortFn1);
                            case "desc":
                                return [].concat(this.rows).sort(sortFn2);
                            case "default":
                            default:
                                break;
                        }
                    }
                    return this.rows;
                }
            }
        },
        methods: {
            colResizableInit:function(){
                var self=this,
                    el=this.$refs.table || null;
                this.config.colResizable && el && !this.hasColResizableInit && this.$nextTick(function(){
                    $(el).find("th").each(function(){
                        $(this).css('width', ($(this).outerWidth() + 0) + 'px');
                    });
                    $(el).colResizable({
                        liveDrag: true,
                        draggingClass: "dragging",
                        partialRefresh: true,
                    });
                    self.hasColResizableInit = true
                })
                this.config.colResizable && el && this.hasColResizableInit && this.$nextTick(function(){
                    $.fn.colResizable_Resize();
                });
            },
            resetState: function () {
                this.checkList.splice(0);
                this.selectedRow = null;
            },
            selectRow: function ($event,row) {
                var tagName = $event ? $event.target.tagName.toUpperCase() : "";
                if(tagName == "INPUT" || tagName == "SELECT" || tagName == "A") {
                    return;
                }
                if (this.selectedRow == row) {
                    this.selectedRow = null;
                } else {
                    this.selectedRow = row;
                }
            },
            sortChange: function (field) {
                var sort = this.sort;
                if (sort.field == field) {
                    switch (sort.type) {
                        case "default":
                            sort.type = "asc";
                            break;
                        case "asc":
                            sort.type = "desc";
                            break;
                        case "desc":
                            sort.type = "default";
                            break;
                    }
                } else {
                    sort.field = field;
                    sort.type = "asc";
                }
                if (this.$vnode.componentOptions.listeners && this.$vnode.componentOptions.listeners.sorted) {
                    this.$emit("sorted", sort);
                }
            },
            /**
             * 处理合并表头的方法
             * col1.group = "合并"
             * col2.group = "合并"
             * col3.group = ["合并","子表头"]
             * col4.group = null
             * col5.group = ["合并","子表头"]
             * col6.group = ["合并",null]
             * col7.group = "合并"
             * 
             * 渲染结果
             * 
             * |        合并          |       |        合并            |
             * | col1 | col2 | 子表头 |  col4 | 子表头 |  col6 | col7  |
             * |      |      | col3   |       | col5  |       |       |
             * 
             * 
             */
            getColumnGroup: function (i, n, gl) {
                var show = true;
                var text = "";
                var colspan = 1;
                var rowspan = 1;
                var pre = i > 0 ? this.columns[i - 1] : null;
                var col = this.columns[i];

                var groups = getGroups(col);
                if (pre) {
                    var preGroups = getGroups(pre);
                    show = !isGroupsEqual(groups, preGroups, n);
                } else {
                    show = n <= groups.length;
                }
                if (n == groups.length + 1) {
                    show = true;
                    text = col.title;
                    rowspan = gl + 1 - groups.length;
                } else if (show) {
                    colspan = 1;
                    text = groups[n - 1];
                    rowspan = (n == groups.length + 1) ? (gl + 1 - n) : 1;
                    for (var j = 1, nextCol; nextCol = this.columns[j + i]; j++) {
                        var nextGroups = getGroups(nextCol);
                        if (isGroupsEqual(groups, nextGroups, n)) {
                            colspan++;
                            rowspan = Math.min(rowspan, (n == nextGroups.length) ? (gl + 1 - n) : 1);
                        } else {
                            break;
                        }
                    }
                }
                var res = {
                    show: show,
                    rowspan: rowspan,
                    colspan: colspan,
                    text: text
                }
                return res;

                function isGroupsEqual(group1, group2, len) {
                    var e = true;
                    for (var i = 0; i < len; i++) {
                        if ((group1[i] && group2[i] && group1[i] == group2[i] || (!group1[i] && !group2[i]))) {} else {
                            e = false;
                            break;
                        }
                    }
                    return e;
                }

                function getGroups(col) {
                    var groups = col.group ?
                        (typeof (col.group) == "string" ? [col.group] : col.group) :
                        [];
                    while (groups.length && !groups[groups.length - 1]) {
                        groups.pop();
                    }
                    return groups;
                }
            },
            getHasColumnGroup: function (i, n, gl) {
                return this.getColumnGroup(i, n, gl).show;
            },
            getColumnGroupText: function (i, n, gl) {
                return this.getColumnGroup(i, n, gl).text;
            },
            getColumnGroupColSpan: function (i, n, gl) {
                return this.getColumnGroup(i, n, gl).colspan;
            },
            getColumnGroupRowSpan: function (i, n, gl) {
                return this.getColumnGroup(i, n, gl).rowspan;
            },
            cellClick: function (column, row) {
                var clickCell = {
                    column: column,
                    row: row
                };
                this.$emit("cellclick", clickCell);
            },
            getComponentName: function(column){
                var tempComponent = {
                    template:"<span>错误的component配置</span>"
                };
                if(column.component){
                    switch(typeof(column.component)){
                        case"string":
                            tempComponent= {
                                template:column.component,
                                props:["row","index"]
                            };
                            break;
                        case"object":
                        default:
                            tempComponent = column.component;
                            tempComponent.props = ['row','index'];
                            break
                    }
                }
                return tempComponent;
                // return "tmp"+this._uid+"_"+column.field;
            },
            pagerChange: function () {
                this.$emit("pagerchange");
            }
        },
        // beforeCreate:function(){
        //     var columns = this.$options.propsData.columns;
        //     if(columns){
        //         columns.forEach(function(column) {
        //             if(column.component){
        //                 var name = "tmp"+this._uid+"_"+column.field;
        //                 var tempComponent;
        //                 switch(typeof(column.component)){
        //                     case"string":
        //                         tempComponent= {
        //                             template:column.component,
        //                             props:["row","index"]
        //                         };
        //                         break;
        //                     case"object":
        //                     default:
        //                         tempComponent = column.component;
        //                         tempComponent.props = ['row','index'];
        //                         break
        //                 }
        //                 this.$options.components[name] =  tempComponent
        //             }
        //         }, this);
        //     }
        // },
        created: function(){
        },
        updated: function () {
            this.colResizableInit();
        },
        mounted:function(){
            this.colResizableInit();
            //var el=this.$refs.table;
            //this.$nextTick(function(){
            //    $(el).find("th").each(function(){
            //        $(this).css('width', ($(this).outerWidth() + 0) + 'px');
            //    });
            //    $(el).colResizable({
            //        liveDrag: true,
            //        draggingClass: "dragging",
            //        //postbackSafe: true,
            //        //fixed: false,
            //        partialRefresh: true,
            //    });
            //})            
        },
        destroyed: function () {}
    });
    Vue.component('bs-edit-table', {
        props: {
            loadingMessage: {},
            loading: Boolean,
            rows: {},
            columns: {},
            tableStyle:{}
        },
        template: "<bs-table \
                :table-style='tableStyle'\
                :loading='loading'\
                :rows='tableRows'\
                :columns='templateColumns'\
                :config='{checkbox:false}'\
                :loading-message='loadingMessage'>\
            <bs-table>",
        data: function () {
            return {
                tableRows: [].concat(this.rows),
                rowStates: this.rows.map(function () {
                    return "normal"; //edit//delete
                })
            }
        },
        watch: {
            rows: function (newVal) {
                this.$set(this, "tableRows", [].concat(newVal));
                this.$set(this, "rowStates", newVal.map(function () {
                    return "normal"; //edit//delete
                }));
            }
        },
        computed: {
            templateColumns: function () {
                var operateColumn = {
                    title: "操作",
                    field: "operate",
                    align: "center",
                    valign: "middle",
                    visible: true,
                    width: "200px",
                    component: {
                        template: "<span>\
                            <span class='normal-unit'>\
                                <a href='javascript:;' @click='setEditMode'>编辑</a>|<a href='javascript:;' @click='setDeleteMode()'>删除</a>\
                            </span>\
                            <a class='delete-unit' href='javascript:;' @click='resetDeleteMode()'>恢复</a>\
                            </span>",
                        methods: {
                            setEditMode: function () {
                                context.setRowState(this.row, "edit");
                            },
                            setDeleteMode: function () {
                                context.setRowState(this.row, "delete");
                            },
                            resetDeleteMode: function () {
                                context.setRowState(this.row, "normal");
                            }
                        }
                    },
                    editComponent: {
                        template: "<span>\
                                <a href='javascript:;' @click='save'>保存</a>|<a href='javascript:;' @click='setDeleteMode()'>删除</a>\
                            </span>",
                        methods: {
                            save: function () {
                                context.setRowState(this.row, "normal");
                            },
                            setDeleteMode: function () {
                                context.setRowState(this.row, "delete");
                            }
                        }
                    }
                };
                var context = this;
                return this.columns.map(function (column) {
                    return this.getTemplateColumn(column);
                }, this).concat([
                    this.getTemplateColumn(operateColumn)
                ]);
            }
        },
        methods: {
            getTemplateColumn: function (column) {
                var context = this;
                return {
                    title: column.title,
                    field: column.field,
                    align: column.align,
                    valign: column.valign,
                    visible: column.visible,
                    width: column.width,
                    group: column.group,
                    sortable: column.sortable,
                    component: {
                        // beforeCreate:function(){
                        //     if(column.component){
                        //         var name = "tmp"+this._uid+"_"+column.field;
                        //         var tempComponent;
                        //         switch(typeof(column.component)){
                        //             case"string":
                        //                 tempComponent= {
                        //                     template:column.component,
                        //                     props:["row"]
                        //                 };
                        //                 break;
                        //             case"object":
                        //             default:
                        //                 tempComponent = column.component;
                        //                 tempComponent.props = ['row'];
                        //                 break
                        //         }
                        //         this.$options.components[name] = tempComponent
                        //     }
                        //     if(column.editComponent){
                        //         var name = "tmp"+this._uid+"_edit_"+column.field;
                        //         var tempComponent;
                        //         switch(typeof(column.editComponent)){
                        //             case"string":
                        //                 tempComponent= {
                        //                     template:column.editComponent,
                        //                     props:["row"]
                        //                 };
                        //                 break;
                        //             case"object":
                        //             default:
                        //                 tempComponent = column.editComponent;
                        //                 tempComponent.props = ['row'];
                        //                 break
                        //         }
                        //         this.$options.components[name] = tempComponent
                        //     }
                        // },
                        data: function(){
                            return {
                                dep: context.rowStates
                            }
                        },
                        render: function(createElement){
                            // var nameNormal = "tmp"+this._uid+"_"+column.field;
                            // var nameEdit = "tmp"+this._uid+"_edit_"+column.field;
                            var self = this;
                            var row = this.row;
                            var index = context.tableRows.indexOf(row);
                            var rowState = context.rowStates[index];
                            switch (rowState) {
                                case "normal":
                                    return renderNormal();
                                case "edit":
                                    if (column.editComponent) {
                                        return renderEdit();
                                    }
                                    return renderNormal();
                                    break;
                                case "delete":
                                    return renderNormal(true);
                                    break;
                            }
                            function getComponent(component){
                                var tempComponent = {
                                    template:"<span>错误的component配置</span>"
                                };
                                if(component){
                                    switch(typeof(component)){
                                        case"string":
                                            tempComponent= {
                                                template:component,
                                                props:["row","index"]
                                            };
                                            break;
                                        case"object":
                                        default:
                                            tempComponent = component;
                                            tempComponent.props = ['row','index'];
                                            break
                                    }
                                }
                                return tempComponent;
                            }
                            function renderEdit(){
                                return createElement(getComponent(column.editComponent),{
                                    props:{row:row}
                                })
                                // var res = Vue.compile("<span is='"+nameEdit+"' :row='row'></span>");
                                // return res.render.call(self, createElement);
                            }
                            function renderNormal(del){
                                if(column.component){
                                    return createElement("div",{
                                        class:{
                                            "row-del":del
                                        }
                                    },[
                                        createElement(getComponent(column.component),{
                                            props:{row:row}
                                        })
                                    ]);
                                    // var res = Vue.compile("<div class='"+(del?"row-del":"")+"'><span is='"+nameNormal+"' :row='row'></span></span>");
                                    // return res.render.call(self, createElement);
                                }
                                return createElement("div", {
                                    class: {
                                        "row-del": del
                                    }
                                }, row[column.field]);
                            }
                        }
                    }
                }
            },
            setRowState: function (row, state) {
                var rIndex = this.tableRows.indexOf(row);
                this.$set(this.rowStates, rIndex, state);
                if (state == "edit") {
                    this.rowStates.forEach(function (state, index) {
                        if (index != rIndex && state == "edit") {
                            this.$set(this.rowStates, index, "normal");
                        }
                    }, this);
                }
            },
            addRow: function (row) {
                this.tableRows.push(row);
                this.rowStates.push("normal");
                this.setRowState(row, "edit");
            },
            getRows: function () {
                return this.tableRows.filter(function (row, index) {
                    return this.rowStates[index] != "delete";
                }, this);
            }
        }
    })
});