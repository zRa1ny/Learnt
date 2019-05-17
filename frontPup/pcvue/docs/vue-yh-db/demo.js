define([
    'require',
    'vue',    
    'vueAnalysisItem',
    "systemConfig",
    'jQuery',
    'yhapi',
    'vueBsTable',
    'bootstrap'
], function(require, Vue, analysisItem,systemConfig,$,yhapi) {
    'use strict';

    Date.prototype.Format = function (fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    analysisItem.getReport=function(options){
        $.ajax({
            //url:systemConfig.backendurl+"/yhproxy/getReportConfig",
            url: 'tableConfig.json',
            data:{
                config:options.config,
                report:options.report
            },
            type:"get",
            success:options.success,
            error:options.error
        })
    };
    analysisItem.customViewerComponent.methods.getData=function(){
        if(!this.userConfig || !this.report || !this.report.query){
            return;
        }
        this.loading = true;
        
        if(this.dataAjaxReq){
            this.dataAjaxReq.abort();
        }
        var methods = "getCubeQueryResult";
        var defaultProxy = "./table.json";
        var options = {
            query:this.report.query,
            filter:this.getFilter(),
            proxy:this.report.proxy ? this.report.proxy : defaultProxy,
            cols: this.userConfig.cols.map(function(item){return item.id}),
            rows: this.userConfig.rows.map(function(item){return item.id}),
            meas: this.userConfig.meas,
            measPos: this.userConfig.measPos,
            totalInfo: this.userConfig.totalInfo,
            sortInfo: this.userConfig.sortInfo,
            success: this.loadDataSuccess.bind(this),
            error: this.loadDataError.bind(this),
        }
        this.dataAjaxReq = yhapi[methods](options);
    };
    analysisItem.customViewerComponent.methods.exportReport=function(){
        if(this.loading){
            alert("正在加载数据，请稍后");
            return;
        }
        var csv = this.getCsv();
        if(!csv){
            alert("没有取到报表数据");
            return;
        }
        var filter = "";
        var filename = this.report.query + new Date().Format("yyyyMMddhhmmss");
        var template = "default";
        var methods = "exportExcel";
        var defaultProxy = "./table.json";
        var proxy = this.report.proxy ? this.report.proxy : defaultProxy;
        this.exportExcel(proxy+"/"+methods,csv,filter,filename,template);
    };
    Vue.component("bs-popover",{
        props:{
            placement:String,
            content:String,
            title:String,
            html:Boolean,
        },
        render:function(createElement){
            return createElement("div",{},this.$slots.default);
        },
        mounted:function(){
            $(this.$el).popover({
                placement:this.placement,
                content:this.content,
                title:this.title,
                html:this.html,
                trigger:"hover"
            })
        }
    });
    var commonMixins = [
            analysisItem.resizeComponent,
            analysisItem.chartComponent,
            analysisItem.analysisDataComponent,
        ],
        filterEventHub = new Vue(),
        filterComponent = {
            mounted:function(){
                filterEventHub.$on("filterChange",this.filterChange.bind(this));
            },
            methods:{
                filterChange:function(filter){
                    this.filter = filter;
                }
            }
        },
        now = new Date(),
        Y = now.getFullYear(),
        M = now.getMonth() + 1,
        D = now.getDate(),
        today = Y+"-"+(M>10?M:'0'+M)+"-"+(D>10?D:'0'+D)+"",
        month = Y+"-"+(M>10?M:'0'+M)+"-01",
        barParams={
            proxy: "./bar.json",
            filters: [
                        {text:"人口总数",where:""},
                        {text:"今日新增",where:"formatDate(\"新增日期\",'yyyy-MM-dd')='"+today+"'"},
                        {text:"本月新增",where:"formatDate(\"新增日期_月\",'yyyy-MM-dd')='"+month+"'"},
                    ],
            query: "人口",
            colDims: [
                        {id:"乡镇街道",alias:"乡镇街道"},
                        {id:"村社区",alias:"村社区"},
                    ],
            row: {id:"人口类型",alias:"人口类型"},
            mea: {col:"ID",tType:"COUNT",alias:"人口数量"}
        };



    var vm = new Vue({
        el:"#main",
        components:{
            bar:{
                mixins:commonMixins.concat([filterComponent]),
                data:function(){
                        var dataconfig = barParams.row ? {
                                type:"crossDimMea",
                                col:barParams.colDims[0],
                                row:barParams.row,
                                mea:barParams.mea
                            }:{
                                type:"dimMeas",
                                dim:barParams.colDims[0],
                                meas:[barParams.mea]
                            }
                        return {
                            clickedCols:[],
                            clickedNames:[],
                            query: barParams.query,
                            filter: "",
                            proxy: barParams.proxy,
                            dataconfig:dataconfig
                        }
                },
                methods:{
                     onClick:function(item){
                        if(item.componentType == "series" && this.clickedCols.length < barParams.colDims.length - 1){
                            var idx = this.clickedCols.length;
                            var val = item.name;
                            this.clickedCols.push(barParams.colDims[idx]);
                            this.clickedNames.push(val);
                            var colFilter = "";
                            this.clickedNames.forEach((function(name,index){
                                var col = this.clickedCols[index];
                                colFilter = analysisItem.andFilter(colFilter,'"'+col.id+'" = \''+name+'\'');
                            }).bind(this));
                            this.$emit("colitemclick",this.clickedNames,colFilter);
                            this.$set(this.dataconfig,"col", barParams.colDims[idx+1]);
                        }
                    }   
                },
                computed:{
                        options:function(){
                            var options = {
                                color:analysisItem.chartColor2,
                                legend: barParams.row ? {
                                    orient: 'horizontal',//'vertical',
                                    x: '5%',
                                    y: '5%',
                                    data: this.data ? this.data.rows:[],
                                } : {},
                                tooltip: {
                                    trigger: 'item',
                                    formatter: "{b}:{c}"
                                },
                                xAxis: {
                                    axisTick:{
                                        alignWithLabel:true,
                                        interval:0
                                    },
                                    axisLabel :{
                                        interval:0,
                                        formatter:function(val,index){
                                            return (index%2 ? "\n" :"")+val
                                        }
                                    },
                                    data: this.data ? (barParams.row?this.data.cols:this.data.dimVals) : []
                                },
                                yAxis: {
                                },
                                grid: {
                                    top:"15%",
                                    bottom:"8%",
                                    left:"5%",
                                    right:"5%",
                                },
                                series: this.data ? (barParams.row
                                        ? this.data.rows.map(function(row,idx){
                                            return {
                                                type:"bar",
                                                name:barParams.row,
                                                stack:barParams.mea.alias,
                                                data:this.data.data[idx]
                                            }
                                        }.bind(this)) 
                                        : [ {
                                                type:"bar",
                                                data:this.data.meas[0]
                                            }
                                        ]
                                ) : []
                            };
                            if(options.xAxis.data.length >= 1 && !options.xAxis.data[0]){
                                //去掉返回为空的值
                                options.xAxis.data.splice(0,1);
                                options.series.forEach(function(ser){
                                    ser.data.splice(0,1);
                                });
                            }
                            return options;
                        }
                }
            },
            tableTj:{
                mixins:[
                    analysisItem.customViewerComponent
                ],
                components:{
                    tablearea:{
                        props:{
                            value:Object,
                            data:Object,
                            report:{
                                proxy:"./table.json",
                                query:"",
                                dims:[
                                ],
                                meas:[
                                ],
                                domains:{}
                            },
                            view:Boolean
                        },
                        template:"<bs-table :config='{orderColumn:false}' :columns=columns :rows=rows></bs-table>",
                        data:function(){
                            var _this = this;
                            return {
                            }
                        },
                        methods:{
                            getField:function(mea){
                                var col = mea.name ? mea.name : mea.col;
                                if(typeof(col) == "object"){
                                    col = col.name;
                                }
                                return col;
                            }
                        },
                        computed:{
                            zffield:function(){
                                var meas =  this.value ? this.value.meas : [];
                                var zffield = "IS_ZF";
                                meas.forEach(function(mea){
                                    if(mea.alias == "实际走访人数"){
                                        zffield = this.getField(mea);
                                    }
                                },this);
                                return zffield;
                            },
                            columns:function(){
                                var _this = this;
                                var zffield = this.zffield;
                                var totalPos = this.value.totalInfo ? this.value.totalInfo.tablerow : "";
                                var notTotalIndex = totalPos == "top" ? "index > 0" : (totalPos == "bottom" ? ("index < "+(this.rows.length-1)) :"index>=0");
                                var isNotTotal = eval('(function(index){return ('+notTotalIndex+')})');
                                return [
                                    {title: '辖区',field: 'area',align: 'center',valign: 'middle',visible: true
                                        ,component: {
                                            template:"<a href='javascript:;' v-if='"+notTotalIndex+"' @click='cellclick(row.area)'>{{row.area}}</a><span v-else>{{row.area}}</span>",
                                            methods:{
                                                cellclick:function(val){
                                                    var rows = _this.value ? _this.value.rows : [];
                                                    _this.$emit("groupdimclick",rows[0].group,rows[0],'row',val);
                                                }
                                            }
                                        }},
                                    {title: '应走访总数',width: '70px',field: 'ZF_COUNT',align: 'center',valign: 'middle',visible: false
                                        ,component: '<bs-popover :content=row.popover1 :html="true">{{row.ZF_COUNT}}</bs-popover>'},
                                    {title: '实际走访总数',width: '70px',field: 'IS_ZF',align: 'center',valign: 'middle',visible: true
                                        ,component: '<bs-popover :content=row.popover1 :html="true">{{row.'+zffield+'}}</bs-popover>'},
                                    {title: '走访总数完成率',width: '70px',field: 'IS_ZF_PER',align: 'center',valign: 'middle',visible: false
                                        ,component: '<bs-popover :content=row.popover1 :html="true">{{row.ZF_COUNT == 0 ? "100%" : (row.'+zffield+'*100/row.ZF_COUNT).toFixed(2)+"%"}}</bs-popover>'},
                                    {title: '应走访重点管控人数',width: '70px',field: 'IS_CONTROL',align: 'center',valign: 'middle',visible: false
                                        ,component: '<bs-popover :content=row.popover2 :html="true">{{row.IS_CONTROL}}</bs-popover>'},
                                    {title: '实际走访重点管控人数',width: '70px',field: 'IS_ZF_IS_CONTROL',align: 'center',valign: 'middle',visible: true
                                        ,component: '<bs-popover :content=row.popover2 :html="true" placement="left">{{row.IS_ZF_IS_CONTROL}}</bs-popover>'},
                                    {title: '走访重点管控完成率',width: '70px',field: 'IS_ZF_IS_CONTROL_PER',align: 'center',valign: 'middle',visible: false
                                        ,component: '<bs-popover :content=row.popover2 :html="true" placement="left">{{row.IS_CONTROL == 0 ? "100%" : (row.IS_ZF_IS_CONTROL*100/row.IS_CONTROL).toFixed(2)+"%"}}</bs-popover>'},
                                    {title: '应走访重点服务人数',width: '70px',field: 'IS_SERVICE',align: 'center',valign: 'middle',visible: false
                                        ,component: '<bs-popover :content=row.popover3 :html="true" placement="left">{{row.IS_SERVICE}}</bs-popover>'},
                                    {title: '实际走访重点服务人数',width: '70px',field: 'IS_ZF_IS_SERVICE',align: 'center',valign: 'middle',visible: true
                                        ,component: '<bs-popover :content=row.popover3 :html="true" placement="left">{{row.IS_ZF_IS_SERVICE}}</bs-popover>'},
                                    {title: '走访重点服务完成率',width: '70px',field: 'IS_ZF_IS_SERVICE_PER',align: 'center',valign: 'middle',visible: false
                                        ,component: '<bs-popover :content=row.popover3 :html="true" placement="left">{{row.IS_SERVICE == 0 ? "100%" : (row.IS_ZF_IS_SERVICE*100/row.IS_SERVICE).toFixed(2)+"%"}}</bs-popover>'},
                                ]
                            },
                            rows:function(){
                                var data = (this.data && this.data.data) ? [].concat(this.data.data) : [];
                                data.shift();
                                var meas = this.value?this.value.meas:[];
                                var focusControls = this.report.domains.personTab.filter(function(item){
                                    return item.value.indexOf("IS_CONTROL_") >= 0;
                                });
                                var focusServices = this.report.domains.personTab.filter(function(item){
                                    return item.value.indexOf("IS_SERVICE_") >= 0;
                                });
                                var totalPos = this.value.totalInfo ? this.value.totalInfo.tablerow : "";
                                var notTotalIndex = totalPos == "top" ? "index > 0" : (totalPos == "bottom" ? ("index < "+(data.length-1)) :"index>=0");
                                var isNotTotal = eval('(function(index){return ('+notTotalIndex+')})');
                                return data.map(function(row,index){
                                    var obj = {};
                                    if(!isNotTotal(index)){
                                        obj.area = "合计";
                                    }
                                    else{
                                        obj.area = row[0];
                                    }
                                    meas.forEach(function(mea,index){
                                        index = index + 1;
                                        obj[this.getField(mea)] = parseInt(row[index]) || 0;
                                    },this)
                                    
                                    var popover2 = obj.popover2 = "<ul><li class='tit'>重点管控："+obj.IS_ZF_IS_CONTROL+"/"+obj.IS_CONTROL+"</li>"+
                                        focusControls.map(function(item){
                                            return "<li class='item'>"+item.text+"："+(obj["IS_ZF_"+item.value]||0)+"/"+(obj[item.value]||0)+"</li>";
                                        }).join("")
                                        +"</ul>";
                                    var popover3 = obj.popover3 = "<ul><li class='tit'>重点服务："+obj.IS_ZF_IS_SERVICE+"/"+obj.IS_SERVICE+"</li>"+
                                        focusServices.map(function(item){
                                            return "<li class='item'>"+item.text+"："+(obj["IS_ZF_"+item.value]||0)+"/"+(obj[item.value]||0)+"</li>";
                                        }).join("")
                                        +"</ul>";
                                    obj.popover1 = popover2 + popover3;
                                    return obj;
                                },this);
                            }
                        }
                    }
                },
                data:function(){
                    return {
                        report:{
                            proxy:"./table.json",
                            query:"",
                            dims:[
                            ],
                            meas:[
                            ],
                            domains:{}
                        },
                    }
                },                
                mounted:function(){
                    var _this = this;
                    analysisItem.getReport({
                        report:"visit",
                        config:"visit-default",
                        success:function(res){
                            if(res.success){
                                _this.report = res.data.report;
                                var config = res.data.config;
                                _this.config = config;
                            }
                            else{
                                alert(res.errMsg);
                            }
                        }
                    });
                },
                methods:{
                    getCsv:function(){
                        var tablearea = this.$refs.tablearea;
                        var rows = $(tablearea.$el).find("tbody tr");
                        return this.toCsv(rows.toArray().map(function(tr){
                            return $(tr).find("td").toArray().map(function(td){
                                return $(td).text();
                            });
                        }));
                    },
                    exportReport:function(){
                        if(this.loading){
                            alert("正在加载数据，请稍后");
                            return;
                        }
                        var csv = this.getCsv();
                        var filename = this.report.query + today;
                        var template = "visit-default";
                        var methods = "exportExcel";
                        var filter = "";
                        var defaultProxy = systemConfig.backendurl+"/yhproxy";
                        var proxy = this.report.proxy ? this.report.proxy : defaultProxy;
                        this.exportExcel(proxy+"/"+methods,csv,filter,filename,template);
                    }
                }
            }
        },
        data:{
            
        },
        mounted:function(){
            
        },
        methods:{
            colItemClick: function(item){
                console.log(item)
            }
            
        }
    })

    
});