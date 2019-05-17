define([
    'require',
    'echarts',
    'yhapi',
    'vue',
    'systemConfig',
    'vuedraggable',
    'vueForm',
    'css!cssTableFilter',
    'css!cssBsTable'
], function(require, echarts, yhapi,Vue,systemConfig) {
    'use strict';
    var resizeCache = {};
    resizeFn();
    function resizeFn(){
        for (var key in resizeCache) {
            if (resizeCache.hasOwnProperty(key)) {
                var element = resizeCache[key];
                element.updateWidth();
            }
        }
        setTimeout(resizeFn,500);
    }
    var components = {
        resizeComponent: {
            data:function(){
                return {
                    resize_ele_width:0
                };
            },
            watch:{
                resize_ele_width:function(){
                    if(this.onResize)this.onResize();
                }
            },
            methods:{
                updateWidth:function(){
                    this.resize_ele_width = this.$el.clientWidth;
                }
            },
            mounted:function(){
                resizeCache[this._uid] = this;
                this.resize_ele_width = this.$el.clientWidth;
            },
            destory:function(){
                delete resizeCache[this._uid];
            }
        },
        chartComponent: {
            data:function(){
                return {
                    chart:null,
                    chartData:null
                };
            },
            template:"<div ref='chart'></div>",
            watch:{
                options:function(){
                    if(this.chart)this.chart.setOption(this.options,true);
                },
                chartData:function(){
                    if(this.chart)this.chart.setOption(this.options,true);
                }
            },
            mounted:function(){
                this.chart = echarts.init(this.$refs.chart);
                this.chart.setOption(this.options,true);
                if(this.onClick){
                    this.chart.on('click',this.onClick);
                }
            },
            computed:{
                options:function(){
                    return {
                    }
                }
            },
            methods:{
                onResize:function(){
                    if(this.chart)this.chart.resize();
                }
            }
        },
        analysisDataComponent: {
            data:function(){
                return {
                    query:"",//人口
                    filter:"",//FOCUS_CONTROL=1
                    proxy:"",//systemConfig.backendurl+"/yhproxy"
                    dataconfig:{
                        type:"meas",
                        meas:[
                            // {col:"FOCUS_CONTROL_201",tType:"SUM",alias:"信访"},
                            // {col:"FOCUS_CONTROL_201",tType:"SUM",alias:"信访"},
                            // {col:"FOCUS_CONTROL_201",tType:"SUM",alias:"信访"},
                            // {col:"FOCUS_CONTROL_201",tType:"SUM",alias:"信访"},
                            // {col:"FOCUS_CONTROL_201",tType:"SUM",alias:"信访"},
                            // {col:"FOCUS_CONTROL_201",tType:"SUM",alias:"信访"},
                            // {col:"FOCUS_CONTROL_201",tType:"SUM",alias:"信访"},
                        ]
                        /*
                        type:"dimMeas",
                        dim:{id:"PERSON_TYPE",alias:"人口类型"},
                        meas:[
                            {col:"FOCUS_CONTROL_201",tType:"SUM",alias:"信访"},
                            {col:"FOCUS_CONTROL_202",tType:"SUM",alias:"社区矫正"},
                        ]
                        */
                        /*
                        type:"corssDimMea",
                        col:{id:"PERSON_TYPE",alias:"人口类型"},
                        row:{id:"AGE_AREA",alias:"年龄区间"},
                        mea:{col:"ID",tType:"COUNT",alias:"总人数"}
                        */
                        /*
                        type:"custom",
                        rows:[{id:"PERSON_TYPE",alias:"人口类型"}],
                        cols:[{id:"AGE_AREA",alias:"年龄区间"}],
                        meas:[
                            {col:"FOCUS_CONTROL",tType:"SUM",alias:"重点管控人数"}
                        ],
                        measPos:"col",
                        rDrill:[],
                        cDrill:[],
                        rDrillNode:[],
                        cDrillNode:[],
                        */
                    },
                    data:null,
                    dataAjaxReq:null
                }
            },
            mounted:function(){
                this.loadData();
            },
            watch:{
                query:function(){this.loadData();},
                filter:function(){this.loadData();},
                proxy:function(){this.loadData();},
                dataconfig:function(){this.loadData();},
            },
            methods:{
                loadData:function(){
                    if(this.dataAjaxReq){
                        this.dataAjaxReq.abort();
                    }
                    var options = JSON.parse(JSON.stringify(this.dataconfig));
                    options.query=this.query;
                    options.filter=this.filter;
                    options.proxy=this.proxy;
                    var methods = "";
                    switch(this.dataconfig.type){
                        case "meas":
                            methods = "getMeas";
                            break;
                        case "dimMeas":
                            methods = "getDimMeas";
                            options.dim = typeof(this.dataconfig.dim) == "string" ? this.dataconfig.dim : this.dataconfig.dim.id;
                            break;
                        case "crossDimMea":
                            methods = "getCrossDimMea";
                            this.dataconfig.col && (options.col = typeof(this.dataconfig.col) == "string" ? this.dataconfig.col : this.dataconfig.col.id);
                            this.dataconfig.row && (options.row = typeof(this.dataconfig.row) == "string" ? this.dataconfig.row : this.dataconfig.row.id);
                            break;
                        case "custom":
                        default:
                            this.dataconfig.cols.length && (options.cols = typeof(this.dataconfig.cols[0]) == "string" ? this.dataconfig.cols : this.dataconfig.cols.map(function(item){return item.id}));
                            this.dataconfig.rows.length && (options.rows = typeof(this.dataconfig.rows[0]) == "string" ? this.dataconfig.rows : this.dataconfig.rows.map(function(item){return item.id}));
                            methods = "getCubeQueryResult";
                            break;
                    }
                    options.success = this.loadDataSuccess.bind(this);
                    options.error = this.loadDataError.bind(this);
                    this.dataAjaxReq = yhapi[methods](options);
                },
                loadDataError:function(){

                },
                loadDataSuccess:function(result){
                    this.data = result;
                }
            }
        },
        analysisBarComponent: {
            data:function(){
                return {
                    query:"",//人口
                    filter:"",//FOCUS_CONTROL=1
                    proxy:"",//systemConfig.backendurl+"/yhproxy"
                    dataconfig:{
                        type:"dimMeas",
                        dim:{id:"PERSON_TYPE",alias:"人口类型"},
                        meas:[
                            {col:"ID",tType:"COUNT",alias:"人口数量"},
                        ]
                    }
                }
            },
            computed:{
                options:function(){
                    var options = {
                        legend: {
                        },
                        brush: {
                        },
                        tooltip: {},
                        xAxis: {
                            data: this.data ? this.data.dimVals : []
                        },
                        yAxis: {
                        },
                        grid: {
                        },
                        series: this.data ? this.data.meas.map(function(mea,idx){
                            return {
                                name:(this.dataconfig.meas[idx] && this.dataconfig.meas[idx].alias) ? this.dataconfig.meas[idx].alias : this.dataconfig.meas[idx],
                                data:this.data.meas[idx]
                            }
                        }.bind(this)) : []
                    };
                    return options;
                }
            }
        },
        customViewerComponent:(function(){
            var dims = {
                props:{
                    data:Array
                },
                template:"<div><span class='title'>维度</span><draggable element='span' :move=move @end=end  :value=data class='itemsrow' :options='{group:{name:\"report\",pull:\"clone\",put:false},sort:false,draggable:\".item\"}'><span class='item' v-for='(item,index) in data'>{{item.alias}}</span></draggable></div>",
                data:function(){
                    return {
                        draggedElement:null,
                        lastRelatedComponent:null,
                        toElement:null
                    }
                },
                methods:{
                    move:function($event){
                        var relatedComponent = $event && $event.relatedContext && $event.relatedContext.component ? $event.relatedContext.component : null;
                        var related = $event.related;
                        var originalEvent = $event.originalEvent;
                        var toElement = originalEvent ? originalEvent.toElement : null;
                        var draggedElement = $event && $event.draggedContext && $event.draggedContext.element ? $event.draggedContext.element : null;
                        if(!relatedComponent||!draggedElement||!toElement){
                        }
                        else{
                            if(relatedComponent.$parent && relatedComponent.$parent.handleDimDragMove){
                                this.lastRelatedComponent = relatedComponent.$parent;
                                this.draggedElement = draggedElement;
                                this.toElement = toElement;
                            }
                            else if(relatedComponent.handleDimDragMove){
                                this.lastRelatedComponent = relatedComponent;
                                this.draggedElement = draggedElement;
                                this.toElement = toElement;
                            }
                            else{
                                this.lastRelatedComponent = null;
                            }
                            if(this.lastRelatedComponent){
                                this.lastRelatedComponent.handleDimDragMove(this.draggedElement,this.toElement,{
                                    offsetX:originalEvent.offsetX,
                                    offsetY:originalEvent.offsetY
                                });
                            }
                        }
                        return false;
                    },
                    end:function($event){
                        var originalEvent = $event.originalEvent;
                        var toElement = originalEvent ? originalEvent.toElement : null;
                        if(this.lastRelatedComponent){
                            if(this.toElement == toElement){
                                this.lastRelatedComponent.handleDimDragDrop(this.draggedElement,this.toElement,{
                                    offsetX:originalEvent.offsetX,
                                    offsetY:originalEvent.offsetY
                                });
                            }
                            else{
                                this.lastRelatedComponent.clearHighlight();
                            }
                            this.lastRelatedComponent = null;
                        }
                    }
                }
            }
            var meas = {
                props:{
                    data:Array
                },
                template:"<div><span class='title'>度量</span><draggable element='span' :move=move @end=end :value=data class='itemsrow' :options='{group:{name:\"report\",pull:\"clone\",put:false},sort:false,draggable:\".item\"}'><span class='item' v-for='(item,index) in data'>{{item.alias}}</span></draggable></div>",
                data:function(){
                    return {
                        draggedElement:null,
                        lastRelatedComponent:null,
                        toElement:null
                    }
                },
                methods:{
                    move:function($event){
                        var relatedComponent = $event && $event.relatedContext && $event.relatedContext.component ? $event.relatedContext.component : null;
                        var related = $event.related;
                        var originalEvent = $event.originalEvent;
                        var toElement = originalEvent ? originalEvent.toElement : null;
                        var draggedElement = $event && $event.draggedContext && $event.draggedContext.element ? $event.draggedContext.element : null;
                        if(!relatedComponent||!draggedElement||!toElement){
                        }
                        else{
                            if(relatedComponent.$parent && relatedComponent.$parent.handleMeaDragMove){
                                this.lastRelatedComponent = relatedComponent.$parent;
                                this.draggedElement = draggedElement;
                                this.toElement = toElement;
                            }
                            else if(relatedComponent.handleMeaDragMove){
                                this.lastRelatedComponent = relatedComponent;
                                this.draggedElement = draggedElement;
                                this.toElement = toElement;
                            }
                            else{
                                this.lastRelatedComponent = null;
                            }
                            if(this.lastRelatedComponent){
                                this.lastRelatedComponent.handleMeaDragMove(this.draggedElement,this.toElement,{
                                    offsetX:originalEvent.offsetX,
                                    offsetY:originalEvent.offsetY
                                });
                            }
                        }
                        return false;
                    },
                    end:function($event){
                        var originalEvent = $event.originalEvent;
                        var toElement = originalEvent ? originalEvent.toElement : null;
                        if(this.lastRelatedComponent){
                            if(this.toElement == toElement){
                                this.lastRelatedComponent.handleMeaDragDrop(this.draggedElement,this.toElement,{
                                    offsetX:originalEvent.offsetX,
                                    offsetY:originalEvent.offsetY
                                });
                            }
                            else{
                                this.lastRelatedComponent.clearHighlight();
                            }
                            this.lastRelatedComponent = null;
                        }
                    }
                }
            }
            var filterComponents = {
                select:{
                    //select:domain/userrole
                    parseProps:function(params){
                        return {
                            type:params[0],
                            extra:params[1],
                        }
                    },
                    props:{
                        type:String,
                        value:String,
                        extra:String,
                        domains:Object
                    },
                    template:"<select style='width:160px;' v-model=valueProxy><option v-for='item in options' :value='item.value'>{{item.text}}</option></select>",
                    computed:{
                        options:function(){
                            return this.domains && this.domains[this.extra] ? this.domains[this.extra] : [] 
                        },
                        valueProxy:{
                            get:function(){
                                return this.value;
                            },
                            set:function(val){
                                this.$emit("input",val);
                            }
                        }
                    },
                    methods:{
                    }
                },
                input:{
                    //input:date/today$month/yyyy-MM
                    parseProps:function(params){
                        return {
                            type:params[0],
                            default:params[1],
                            format:params[2]
                        }
                    },
                    props:{
                        type:String,
                        default:String,
                        value:String,
                        format:String
                    },
                    template:"<input v-if='type==\"date\"' readonly type='text' v-datetime='{format:\"YYYY-MM\"}' v-model=valueProxy>\
                        <input v-else type='text' v-model=valueProxy>",
                    mounted:function(){
                        if(!this.value){
                            this.getDefault();
                        }
                    },
                    computed:{
                        valueProxy:{
                            get:function(){
                                return this.value;
                            },
                            set:function(val){
                                this.$emit("input",val);
                            }
                        }
                    },
                    methods:{
                        getDefault:function(){
                            var def = "";
                            switch(this.type){
                                case "date":
                                    var dateDef = this.getDateDefault();
                                    def = dateDef[this.default];
                                    break;
                            }
                            this.valueProxy = def;
                        },
                        getDateDefault:function(){
                            var today = new Date();
                            var todayMonth = new Date();
                            todayMonth.setDate(1);
                            return {
                                "today":today.Format("yyyy-MM-dd"),
                                "today$month":todayMonth.Format("yyyy-MM"),
                            }
                        }
                    }
                }
            }
            var filters = {
                props:{
                    domains:Object,
                    view:Boolean,
                    data:Array
                },
                data:function(){
                    return {
                        filter:{}
                    }
                },
                render:function(createElement){
                    function parseItemType(type){
                        var tmp = type.split(":");
                        return {
                            type:tmp[0],
                            params:tmp[1]?tmp[1].split("/"):[]
                        }
                    }
                    var _this = this;
                    return createElement("div",{
                            class:{
                                "table-filter-inline":true
                            }    
                        },
                        (this.data||[]).map(function(filter){
                            var typeDetail = parseItemType(filter.type);
                            var item = filterComponents[typeDetail.type];
                            var detail = {
                                props:(item && item.parseProps) ? item.parseProps(typeDetail.params) : {params:typeDetail.params}
                            }
                            if(!item){
                                item = "span";
                                detail = "未实现的类型:"+item.type;
                            }
                            else{
                                detail.props.domains = this.domains;
                                detail.props.value = this.filter[filter.name];
                                detail.on = {
                                    input:function(val){
                                        _this.$set(_this.filter,filter.name,val);
                                        _this.notifyFilter(filter,val);
                                    }
                                }
                                detail.class = {
                                    "form-control":true
                                }
                            }
                            return createElement("label",{
                                class:{
                                    "control-label":true
                                }
                            },[
                                filter.alias + " ",
                                createElement(item,detail)
                            ]);
                        },this));
                },
                methods:{
                    notifyFilter:function(filter,val){
                        function parseAction(action){
                            var tmp = action.split(":");
                            return {
                                type:tmp[0],
                                params:tmp[1]?tmp[1].split("/"):[],
                            }
                        }
                        function formatValue(str,val){
                            return new Vue({
                                template:"<span>"+str+"</span>",
                                data:function(){
                                    return {
                                        value:val
                                    }
                                }
                            }).$mount().$el.innerText;
                        }
                        var actionDetail = parseAction(filter.action);
                        switch(actionDetail.type){
                            case "filter":
                                //whereMap
                                //whereValue/formatDate(\"统计年月\",\'yyyy-MM\')='{{value}}'
                                var filterStr = "";
                                switch(actionDetail.params[0]){
                                    case "whereMap":
                                        filterStr = filter.map[val];
                                        break;
                                    case "whereValue":
                                        filterStr = formatValue(actionDetail.params[1],val ? val : "");
                                        break;
                                    default:
                                        break;
                                }
                                this.$emit("filterchange",filter.name,filterStr);
                                break;
                            case "switch":
                                this.$emit("switchmeas",filter.map[val]);
                                break;
                        }
                    }
                }
            }
            var groupfilter = {
                props:{
                    value:Object
                },
                template:"<div><div :class='[\"groupfilter-item-wrap\"]' v-for='(filters, key) in valueProxy'>\
                        <span class='title'>{{key}}</span>\
                        <span class='itemsrow'><span class='item' v-for='(f,index) in filters'>{{f.name}}<span @click='filterremove(key,filters,index)' class='filter-remove glyphicon glyphicon-remove'></span></span>\
                    </div></div>",
                computed:{
                    valueProxy:function(){
                        return this.value;
                    }
                },
                methods:{
                    filterremove:function(group,filters,index){
                        var newVal = {};
                        var filter = filters[index];
                        for (var key in this.valueProxy) {
                            if (this.valueProxy.hasOwnProperty(key)) {
                                var element = this.valueProxy[key];
                                if(key == group){
                                    var newFilters = [].concat(filters);
                                    newFilters.splice(index,newFilters.length-index);
                                    if(newFilters.length>0){
                                        newVal[key] = newFilters;
                                    }
                                }
                                else{
                                    newVal[key] = element;
                                }
                            }
                        }
                        this.$emit('input',newVal);
                        this.$emit("groupdimreplace",group,filter.dim,filter.pos);
                    }
                }
            }
            var tablearea = {
                props:{
                    value:Object,
                    data:Object,
                    report:Object,
                    view:Boolean
                },
                template:"<div :is='!view?\"draggable\":\"table\"' element=table :options='{group:{name:\"report\",put:true,pull:false},sort:false}' \
                        :class='[highlighttip,\"mea-wrap-\"+measPos,view?\"report-view\":\"report-edit\"]'>\
                        <tr v-for='tr in trs' :class='[tr.cls]'>\
                            <td v-for='td in tr.tds' \
                                v-if='td.show' \
                                :vid='td.vid' \
                                :rowspan='td.rowspan' \
                                :colspan='td.colspan' \
                                :class='[td.cls,td.vid&&td.vid==highlightvid?\"hilight\":\"\",td.vid==highlightvid?highlightextra:\"\",cancellclick(td)?\"link-cell\":\"\"]'\
                                @click='cellclick(td)'\
                                >{{td.text}}\
                                <span v-if='td.vid && td.vid.indexOf(\"drag-default\")<0 && (td.vid.indexOf(\"col-drag\")>=0||td.vid.indexOf(\"row-drag\")>=0)' @click='removeDim(td.vid)' class='dim-remove glyphicon glyphicon-remove'></span>\
                                <span v-if='td.meacell && meas.length > 1' title='切换计算列方向' class='mea-pos-switch glyphicon glyphicon-retweet' @click=switchMeaPos></span>\
                                <span v-if='td.meacell' \
                                    v-for='(mea,mindex) in meas' \
                                    :vid='\"mea-drag-\"+mindex' \
                                    :class='[\"mea-drag-cell\",\"mea-pos-\"+measPos,\"mea-drag-\"+mindex==highlightvid?highlightextra:\"\"]'\
                                    >{{mea.alias}}\
                                    <span class='mea-remove glyphicon glyphicon-remove' @click='removeMea(mindex)'></span>\
                                </span>\
                            </td>\
                        </tr>\
                    </div>",
                computed:{
                    showData:function(){
                        function cloneArray(arr){
                            return arr.map(function(sarr){
                                return [].concat(sarr);
                            })
                        }
                        var hideMeas = this.meas.length <= 1;
                        var measPosCol = this.measPos == "col";
                        var resultData = this.data ? cloneArray(this.data.data) : [];
                        var cs = this.cols;
                        var rs = this.rows;
                        var ms = this.meas;
                        if(hideMeas && this.meas.length == 1){
                            if(measPosCol){ 
                                resultData.splice(cs.length,1);
                            }
                            else{
                                resultData.forEach(function(row){
                                    row.splice(rs.length,1);
                                });
                            }
                        }
                        var meaCol = (hideMeas || measPosCol) ? -1 : rs.length;
                        var meaRow = (hideMeas || !measPosCol) ? -1 : cs.length;
                        resultData.forEach(function(r,rindex){
                            if(rindex == meaRow){
                                r.forEach(function(c,cindex){
                                    r[cindex] = cindex>=rs.length?ms[(cindex-rs.length)%ms.length].alias:c
                                })
                            }
                            else{
                                r.forEach(function(c,cindex){
                                    r[cindex] = cindex == meaCol && rindex>=cs.length ? ms[(rindex-cs.length)%ms.length].alias : c
                                })
                            }
                        });
                        return resultData;
                    },
                    trs:function(){
                        function getSpan(items,dims,measpan,level,parent){
                            if(typeof level == "undefined") level = 0;
                            if(typeof parent == "undefined") parent = -1;

                            var curSpans = [];
                            var spans = [curSpans];
                            for (var i = 0, len = items.length; i < len; i++) {
                                /*
                                -1 //上级节点索引
                                ,0//所属层级
                                ,true//是否末级
                                ,"年"//dim id
                                ,"2009"//value
                                */
                                var item = items[i];
                                var itemParent = item[0];
                                var itemLevel = item[1];
                                var isLeaf = item[2];
                                var dimid = item[3];
                                var dim = dims.filter(function(d){
                                    return d.id == dimid;
                                });
                                var value = item[4];
                                var valueFormat = (dim && dim[0] && dim[0].format) 
                                    ? ((value && typeof(value) == "object" && value.time) ? new Date(value.time).Format(dim[0].format) : value) 
                                    : value;
                                if(itemLevel == level && itemParent == parent){
                                    if(isLeaf){
                                        curSpans.push({
                                            span:measpan,
                                            value:value,
                                            dim:dim ? dim[0]: null,
                                            text:valueFormat
                                        });
                                    }
                                    else{
                                        var subSpans = getSpan(items,dims,measpan,level+1,i);
                                        var spanval = 0;
                                        subSpans[0].forEach(function(spanitem){
                                            spanval+=spanitem.span;
                                        })
                                        subSpans.forEach(function(subSpan,idx){
                                            if(spans[idx+1]){
                                                spans[idx+1] = spans[idx+1].concat(subSpan);
                                            }
                                            else{
                                                spans[idx+1] = [].concat(subSpan);
                                            }
                                        })
                                        curSpans.push({
                                            span:Math.max(spanval,measpan),
                                            value:value,
                                            dim:dim ? dim[0]: null,
                                            text:valueFormat
                                        });
                                    }
                                }
                            }
                            return spans;
                        }
                        try{
                            var hideMeas = this.meas.length <= 1;
                            var measPosCol = this.measPos == "col";
                            var drag = "拖放维度到这里";
                            var dragMeas = "拖放度量值到这里";
                            var cs = this.cols;
                            var rs = this.rows;
                            var ms = this.meas;
                            
                            var data = this.showData;
                            var tablecol = data[0]?data[0].length:0;
                            var tablerow = data.length;
                            var cspan = getSpan(this.data?this.data.cols:[],this.cols,measPosCol?Math.max(1,ms.length):1);
                            var rspan = getSpan(this.data?this.data.rows:[],this.rows,!measPosCol?Math.max(1,ms.length):1);
                            var meaCol = (hideMeas || measPosCol) ? -1 : rs.length;
                            var meaRow = (hideMeas || !measPosCol) ? -1 : cs.length;

                            var istotalcoltop = this.value && this.value.totalInfo && this.value.totalInfo.tablecol == "top";
                            var istotalrowtop = this.value && this.value.totalInfo && this.value.totalInfo.tablerow == "top";

                            var trs = data.map(function(r,rindex){
                                return {
                                    cls:((meaRow==-1 && rindex >= cs.length)||(meaRow!=-1&&rindex>meaRow)) ? "report-data" : "",
                                    tds:r.map(function(c,cindex){
                                        return {
                                            cls:"",
                                            rowspan:1,
                                            colspan:1,
                                            show:true,
                                            text:c
                                        } 
                                    })
                                }
                            });
                            if(rs.length==0&&cs.length==0){
                                trs = [
                                    {
                                        cls:"",
                                        tds:[
                                            {
                                                cls:"dim-cross",
                                                rowspan:1,
                                                colspan:1,
                                                show:true,
                                                text:""
                                            },
                                            {
                                                cls:"col-drag",
                                                vid:"col-drag-default",
                                                rowspan:1,
                                                colspan:1,
                                                show:true,
                                                text:drag
                                            }
                                        ]
                                    },
                                    {
                                        cls:"",
                                        tds:[
                                            {
                                                cls:"row-drag",
                                                vid:"row-drag-default",
                                                rowspan:1,
                                                colspan:1,
                                                show:true,
                                                text:drag
                                            },
                                            {
                                                vid:"mea-drag-default",
                                                cls:"mea-drag",
                                                rowspan:1,
                                                colspan:1,
                                                show:true,
                                                text:dragMeas
                                            }
                                        ]
                                    }
                                ]
                            }
                            else{
                                //左上空白区域
                                for (var i = 0, ilen = cs.length; i < ilen; i++) {
                                    var tr = trs[i];
                                    for (var j = 0, jlen = rs.length; j < jlen; j++) {
                                        var td = tr.tds[j];
                                        if(i==0&&j==0){
                                            td.text = "";
                                            td.rowspan = ilen;
                                            td.colspan = jlen;
                                            td.cls = "dim-cross";
                                        }
                                        else{
                                            td.show = false;
                                        }
                                    }
                                }
                                //右上列区域                                var istotalrowtop = this.value && this.value.totalInfo && this.value.totalInfo.tablerow == "top";
                                for (var i = 0, ilen = cs.length; i < ilen; i++) {
                                    var tr = trs[i];
                                    var spans = cspan[i];
                                    var idx = 0;
                                    var from = rs.length + (!hideMeas && !measPosCol?1:0) + (istotalcoltop?(!measPosCol?1:ms.length):0);
                                    var span = spans[idx].span;
                                    for (var j = from, jlen = tablecol; j < jlen; j++) {
                                        var td = tr.tds[j];
                                        if(j==from){
                                            td.colspan = span;
                                            td.text = spans[idx].text;
                                            td.value = spans[idx].value;
                                            td.pos = "col";
                                            td.cls = "report-header";
                                            td.dim = spans[idx].dim;
                                        }
                                        else if(j<from+span){
                                            td.show =false;
                                            td.text = "";
                                        }
                                        else if(j==from+span){
                                            idx++;
                                            from+=span;
                                            span=spans[idx].span;
                                            td.colspan = span;
                                            td.text = spans[idx].text;
                                            td.value = spans[idx].value;
                                            td.pos = "col";
                                            td.cls = "report-header";
                                            td.dim = spans[idx].dim;
                                        }
                                    }
                                }
                                //左下行区域
                                for (var j = 0, jlen = rs.length; j < jlen; j++) {
                                    var spans = rspan[j];
                                    var idx = 0;
                                    var from = cs.length + (!hideMeas && measPosCol?1:0) + (istotalrowtop?(measPosCol?1:ms.length):0);
                                    var span = spans[idx].span;
                                    for (var i = from, ilen = tablerow; i < ilen; i++) {
                                        var td = trs[i].tds[j];
                                        if(i==from){
                                            td.rowspan = span;
                                            td.text = spans[idx].text;
                                            td.value = spans[idx].value;
                                            td.pos = "row";
                                            td.cls = "report-header";
                                            td.dim = spans[idx].dim;
                                        }
                                        else if(i<from+span){
                                            td.show =false;
                                            td.text = "";
                                        }
                                        else if(i==from+span){
                                            idx++;
                                            from+=span;
                                            span=spans[idx].span;
                                            td.rowspan = span;
                                            td.text = spans[idx].text;
                                            td.value = spans[idx].value;
                                            td.pos = "row";
                                            td.cls = "report-header";
                                            td.dim = spans[idx].dim;
                                        }
                                    }
                                }
                                //插入拖拽行
                                var tds = [];
                                if(rs.length==0){
                                    //插入行的那一列
                                    trs.forEach(function(tr,i){
                                        var tds = tr.tds;
                                        tds.unshift({
                                            cls:(i==0?"dim-cross":"dim-row") + "  row-drag-td",
                                            rowspan:i==0?cs.length:1,
                                            colspan:1,
                                            show:i==0?true:i>=cs.length,
                                            text:""
                                        });
                                    })
                                    tds.push({
                                        cls:"row-drag",
                                        vid:"row-drag-default",
                                        rowspan:1,
                                        colspan:1,
                                        show:true,
                                        text:drag
                                    })
                                }
                                for (var i = 0, len = tablecol; i < len; i++) {
                                    if(i<rs.length){
                                        tds.push({
                                            cls:"row-drag",
                                            vid:"row-drag-"+i,
                                            rowspan:1,
                                            colspan:1,
                                            show:true,
                                            text:rs[i].alias
                                        })
                                    }
                                    else if(i==rs.length){
                                        tds.push({
                                            cls:"dim-row",
                                            rowspan:1,
                                            colspan:len-i,
                                            show:true,
                                            text:""
                                        })
                                    }
                                    else{
                                        tds.push({
                                            cls:"dim-row",
                                            rowspan:1,
                                            colspan:1,
                                            show:false,
                                            text:""
                                        })
                                    }
                                }
                                trs.splice(cs.length,0,{
                                    cls:"",
                                    tds:tds
                                });
                                //插入拖拽列
                                var colIdx = Math.max(1,rs.length);
                                for (var i = 0, len = tablerow+1; i < len; i++) {
                                    if(i<cs.length){
                                        trs[i].tds.splice(colIdx,0,{
                                            cls:"col-drag",
                                            vid:"col-drag-"+i,
                                            rowspan:1,
                                            colspan:1,
                                            show:true,
                                            text:cs[i].alias
                                        })
                                    }
                                    else if(i == cs.length){
                                        trs[i].tds.splice(colIdx,0,{
                                            cls:"mea-drag",
                                            rowspan:1,
                                            colspan:1,
                                            show:true,
                                            meacell:ms.length > 0,
                                            text:ms.length > 0 ? "" : dragMeas
                                        })
                                    }
                                    else if(i == cs.length+1){
                                        trs[i].tds.splice(colIdx,0,{
                                            cls:"dim-col",
                                            rowspan:len-i,
                                            colspan:1,
                                            show:true,
                                            text:""
                                        })
                                    }
                                    else{
                                        trs[i].tds.splice(colIdx,0,{
                                            cls:"dim-col",
                                            rowspan:1,
                                            colspan:1,
                                            show:false,
                                            text:""
                                        })
                                    }
                                }
                                if(cs.length==0){
                                    //插入列的那一行
                                    trs.unshift({
                                        cls:"col-drag-tr",
                                        tds:trs[0].tds.map(function(td,i){
                                            return {
                                                vid:i==rs.length?"col-drag-default":"",
                                                cls:i==0?"dim-cross":(i==rs.length?"col-drag":""),
                                                rowspan:1,
                                                colspan:i==0?rs.length:(i==rs.length+1?trs[0].tds.length-rs.length-1:1),
                                                show:i==0?true:(i==rs.length||i==rs.length+1),
                                                text:i==rs.length?drag:""
                                            }
                                        })
                                    })
                                }
                            }
                            return trs;
                        }
                        catch(e){
                            console.log(e);
                            return [
                                {
                                    cls:"error",
                                    tds:[
                                        {
                                            text:"返回数据结构有误"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                },
                data:function(){
                    return {
                        highlighttip:"",
                        highlightvid:"",
                        highlightextra:"",
                        meas:this.value?this.value.meas:[],
                        cols:this.value?this.value.cols:[],
                        rows:this.value?this.value.rows:[],
                        measPos:this.value?this.value.measPos:"col"
                    }
                },
                watch:{
                    value:function(){
                        this.meas=this.value?this.value.meas:[];
                        this.cols=this.value?this.value.cols:[];
                        this.rows=this.value?this.value.rows:[];
                        this.measPos=this.value?this.value.measPos:"col";
                    }
                },
                methods:{
                    cellclick:function(cell){
                        if(cell.dim && cell.dim.group && this.$parent && this.$parent.getNextDim){
                            var nextDim = this.$parent.getNextDim(cell.dim.group,cell.dim);
                            this.$emit("groupdimclick",cell.dim.group,cell.dim,cell.pos,cell.value);
                        }
                    },
                    cancellclick:function(cell){
                        var can = false;
                        if(cell.dim && cell.dim.group && this.$parent && this.$parent.getNextDim){
                            var nextDim = this.$parent.getNextDim(cell.dim.group,cell.dim);
                            if(nextDim){
                                can = true;
                            }
                        }
                        return can;
                    },
                    clearHighlight:function(){
                        this.highlightvid = "";
                        this.highlighttip = "";
                    },
                    switchMeaPos:function(){
                        this.$emit("input",{
                            meas:this.meas,
                            cols:this.cols,
                            rows:this.rows,
                            measPos:this.measPos == "col" ? "row" : "col",
                        })
                    },
                    getIndex:function(vid){
                        var idx = 0;
                        if(vid){
                            var tmp = vid.split("-");
                            idx = parseInt(tmp[tmp.length-1]);
                            if(idx < 0) idx = 0;
                        }
                        return idx;
                    },
                    removeDim:function(vid){
                        var cols = [].concat(this.cols);
                        var rows = [].concat(this.rows);
                        var index = this.getIndex(vid);
                        if(vid.indexOf("col-drag")>=0){
                            Array.prototype.splice.apply(cols,[index,1]);
                        }
                        else{
                            Array.prototype.splice.apply(rows,[index,1]);
                        }
                        this.$emit("input",{
                            meas:this.meas,
                            cols:cols,
                            rows:rows,
                            measPos:this.measPos,
                        })
                    },
                    handleDimDragMove:function(dim,ele,elePos){
                        this.highlighttip = "dim-highlight";
                        if(ele.className && (
                            ele.className.indexOf("col-drag")>=0
                            ||ele.className.indexOf("row-drag")>=0
                        )){
                            this.highlightvid = ele.getAttribute("vid");
                            this.highlightextra = 
                                "extra-" + (elePos.offsetX >= ele.clientWidth / 2 ? "right" : "left")
                                + " " +
                                "extra-" + (elePos.offsetY >= ele.clientHeight / 2 ? "bottom" : "top")
                        }
                        else{
                            this.highlightvid = "";
                            this.highlightextra = "";
                        }
                    },
                    handleDimDragDrop:function(dim,ele,elePos){
                        this.clearHighlight();
                        if(ele.className && (
                            ele.className.indexOf("col-drag")>=0
                            ||ele.className.indexOf("row-drag")>=0
                        )){
                            var cols = [].concat(this.cols);
                            var rows = [].concat(this.rows);
                            var index = this.getIndex(ele.getAttribute("vid"));
                            if(ele.className.indexOf("col-drag")>=0){
                                index += (elePos.offsetY >= ele.clientHeight / 2)?1:0;
                                Array.prototype.splice.apply(cols,[index,0].concat(dim.items ? [dim.items[0]] : [dim] ));
                            }
                            else{
                                index += (elePos.offsetX >= ele.clientWidth / 2)?1:0;
                                Array.prototype.splice.apply(rows,[index,0].concat(dim.items ? [dim.items[0]] : [dim] ));
                            }
                            this.$emit("input",{
                                meas:this.meas,
                                cols:cols,
                                rows:rows,
                                measPos:this.measPos,
                            })
                        }
                        else{
                        }
                    },
                    removeMea:function(mindex){
                        var meas = [].concat(this.meas);
                        Array.prototype.splice.apply(meas,[mindex,1]);
                        this.$emit("input",{
                            meas:meas,
                            cols:this.cols,
                            rows:this.rows,
                            measPos:this.measPos,
                        })
                    },
                    handleMeaDragMove:function(mea,ele,elePos){
                        // this.highlighttip = "dim-highlight";
                        this.highlighttip = "mea-highlight";
                        if(ele.className && ele.className.indexOf("mea-drag")>=0){
                            this.highlightvid = ele.getAttribute("vid");
                            if(this.highlightvid){
                                console.log(1);
                            }
                            this.highlightextra = 
                                "extra-" + (elePos.offsetX >= (ele.clientWidth||ele.offsetWidth) / 2 ? "right" : "left")
                                + " " +
                                "extra-" + (elePos.offsetY >= (ele.clientHeight||ele.offsetHeight) / 2 ? "bottom" : "top")
                        }
                        else{
                            this.highlightvid = "";
                        }
                    },
                    handleMeaDragDrop:function(mea,ele,elePos){
                        this.clearHighlight();
                        if(ele.className && ele.className.indexOf("mea-drag")>=0){
                            var meas = [].concat(this.meas);
                            var index = this.getIndex(ele.getAttribute("vid"));
                            if(this.measPos != "col"){
                                index += (elePos.offsetY >= ele.clientHeight / 2)?1:0;
                            }
                            else{
                                index += (elePos.offsetX >= ele.clientWidth / 2)?1:0;
                            }
                            Array.prototype.splice.apply(meas,[index,0].concat(mea.items ? mea.items : [mea] ));
                            // meas.splice(index,0,mea);
                            this.$emit("input",{
                                meas:meas,
                                cols:this.cols,
                                rows:this.rows,
                                measPos:this.measPos,
                            })
                        }
                        else{
                        }
                    }
                }
            }
            var viewer = {
                template:"<div class='bootstrap-table'>\
                        <dims class='drag-item-wrap' v-if='!view' :data='report.dims'></dims>\
                        <meas class='drag-item-wrap' v-if='!view' :data='report.meas'></meas>\
                        <div class='fixed-table-toolbar clearfix'>\
                            <div class='columns bs-bars pull-left cig-bars'>\
                                <div class='form-inline'>\
                                    <filters :view='view' \
                                        :domains='report.domains'\
                                        :data='userConfig.filters'\
                                        @switchmeas='switchmeas'\
                                        @filterchange='filterchange'>\
                                    </filters>\
                                </div>\
                            </div>\
                            <div class='pull-right cig-bars columns'>\
                                <slot name='buttons'>\
                                    <button class='btn btn-sm btn btn-primary' @click='exportReport'>导出</button>\
                                </slot>\
                            </div>\
                        </div>\
                        <groupfilter v-model='userConfig.groupFilter' @groupdimreplace='groupdimreplace'></groupfilter>\
                        <tablearea :view='view' \
                            ref=tablearea\
                            class='table table-bordered report-table'\
                            style='background: white;'\
                            v-if='!loading' \
                            @groupdimclick='groupdimclick' \
                            :data='table' \
                            :report='report' \
                            v-model=userConfig>\
                        </tablearea>\
                    </div>",
                components:{
                    dims:dims,
                    meas:meas,
                    filters:filters,
                    tablearea:tablearea,
                    groupfilter:groupfilter
                },
                data:function(){
                    return {
                        table:{},
                        dataAjaxReq:null,
                        loading:true,
                        userConfig:this.config,
                    }
                },
                watch:{
                    config:function(){
                        this.userConfig = this.config;
                    },
                    userConfig:function(){
                        this.getData();
                    },
                    'userConfig.groupFilter':{
                        deep:true,
                        handler:function(){
                            this.getData();
                        }
                    },
                    'userConfig.userFilter':{
                        deep:true,
                        handler:function(){
                            this.getData();
                        }
                    },
                    'userConfig.meas':function(){
                        this.getData();
                    }
                },
                props:{
                    report:{
                        type:Object,
                        default:function(){
                            return {
                                proxy:"",
                                query:"",
                                dims:[
                                ],
                                meas:[
                                ],
                                domains:{}
                            };
                        }
                    },
                    config:{
                        type:Object,
                        default:function(){
                            return {
                                cols:[],
                                rows:[],
                                meas:[],
                                measPos:"col",
                                filters:[]
                            };
                            // {
                            //     cols:sampleConfig.cols,//[{id:"乡镇街道",alias:"乡镇街道"}],
                            //     rows:sampleConfig.rows,//[{id:"人口类型",alias:"人口类型"}],
                            //     meas:sampleConfig.meas,//[],
                            //     measPos:sampleConfig.measPos,//"col"
                            //     filters:sampleConfig.filters
                            // };
                        }
                    },
                    view:{
                        type:Boolean,
                        default:true
                    }
                },
                mounted:function(){
                    this.getData();
                },
                methods:{
                    getNextDim:function(group,dim){
                        var dims = this.report.dims;
                        var nextDim = null;
                        for (var i = 0, len = dims.length; i < len; i++) {
                            var rdim = dims[i];
                            if(rdim.alias == group){
                                var items = rdim.items;
                                for (var j = 0, jlen = items.length; j < jlen; j++) {
                                    if(items[j].id == dim.id){
                                        nextDim = items[j+1];
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                        return nextDim;
                    },
                    groupdimreplace:function(group,dim,pos){
                        var dims = pos == 'row' ? this.userConfig.rows : this.userConfig.cols;
                        for (var i = 0, len = dims.length; i < len; i++) {
                            if(group == dims[i].group){
                                dims.splice(i,1,dim);
                                break;
                            }
                        }
                    },
                    groupdimclick:function(group,dim,pos,value){
                        if(this.view){
                            var nextDim = this.getNextDim(group,dim);
                            if(nextDim){
                                var filter = "\"" + dim.id + "\" = '" + value + "'";
                                var dims = pos == 'row' ? this.userConfig.rows : this.userConfig.cols;
                                
                                var groupFilter = (this.userConfig.groupFilter && this.userConfig.groupFilter[group]) ? this.userConfig.groupFilter[group] : [];
                                groupFilter.push({
                                    name:value,
                                    dim:dim,
                                    pos:pos,
                                    whereStr:filter
                                });
                                for (var i = 0, len = dims.length; i < len; i++) {
                                    if(dim.id == dims[i].id){
                                        dims.splice(i,1,nextDim);
                                        break;
                                    }
                                }
                                if(!this.userConfig.groupFilter){
                                    this.$set(this.userConfig,"groupFilter",{});
                                }
                                this.$set(this.userConfig.groupFilter,group,groupFilter);
                            }
                        }
                    },
                    filterchange:function(name,filterStr){
                        if(!this.userConfig.userFilter){
                            this.$set(this.userConfig,"userFilter",{});
                        }
                        this.$set(this.userConfig.userFilter,name,filterStr);
                    },
                    switchmeas:function(meas){
                        if(typeof(meas) == "string"){
                            var repMeas = this.report.meas;
                            
                            for (var i = 0, len = repMeas.length; i < len; i++) {
                                if(repMeas[i].alias == meas){
                                    Array.prototype.splice.apply(this.userConfig.meas,[
                                        0,this.userConfig.meas.length
                                    ].concat(repMeas[i].items));
                                    break;
                                }
                            }
                        }
                        else{
                            Array.prototype.splice.apply(this.userConfig.meas,[
                                0,this.userConfig.meas.length
                            ].concat(meas));
                        }
                        this.getData();
                    },
                    getFilter:function(){
                        var str = [];
                        if(this.userConfig.userFilter){
                            for (var key in this.userConfig.userFilter) {
                                if (this.userConfig.userFilter.hasOwnProperty(key)) {
                                    var element = this.userConfig.userFilter[key];
                                    if(element){
                                        str.push(element);
                                    }
                                }
                            }
                        }
                        if(this.userConfig.groupFilter){
                            for (var key in this.userConfig.groupFilter) {
                                if (this.userConfig.groupFilter.hasOwnProperty(key)) {
                                    var element = this.userConfig.groupFilter[key];
                                    if(element){
                                        element.forEach(function(item){
                                            if(item.whereStr){
                                                str.push(item.whereStr);
                                            }
                                        })
                                    }
                                }
                            }
                        }
                        return str.join(" and ");
                    },
                    getData:function(){
                        if(!this.userConfig || !this.report || !this.report.query){
                            return;
                        }
                        this.loading = true;
                        
                        if(this.dataAjaxReq){
                            this.dataAjaxReq.abort();
                        }
                        var methods = "getCubeQueryResult";
                        var defaultProxy = systemConfig.backendurl+"/yhproxy";
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
                    },
                    loadDataSuccess:function(res){
                        this.dataAjaxReq = null;
                        this.table = res.data;
                        this.loading = false;
                    },
                    loadDataError:function(res){
                        this.dataAjaxReq = null;
                        if(res && (res.statusText == "abort"||res.statusText == "abort"||res.statusText == "abort"))
                            return;
                        else{
                            alert(res ? (res.message || res.errMsg) : "加载数据错误");
                        }
                    },
                    toCsv:function(arr){
                        return arr.map(function(item){
                            return item.map(function(val){ return JSON.stringify((val===null||typeof(val) == "undefined")?"": val)}).join(",");
                        }).join("\r\n");
                    },
                    getCsv:function(){
                        return this.$refs.tablearea && this.$refs.tablearea.showData ?
                            this.toCsv(this.$refs.tablearea.showData)
                            : "";
                    },
                    exportReport:function(){
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
                        var defaultProxy = systemConfig.backendurl+"/yhproxy";
                        var proxy = this.report.proxy ? this.report.proxy : defaultProxy;
                        this.exportExcel(proxy+"/"+methods,csv,filter,filename,template);
                    },
                    exportExcel:function(url,csv,filter,filename,template){
                        var form = $("<form>").attr({
                            action:url+"?filter="+encodeURIComponent(filter)
                                +"&filename="+encodeURIComponent(filename)
                                +"&template="+encodeURIComponent(template),
                            method:"post",
                            target:"_blank"
                        });
                        form.append($("<textarea>").attr({
                            name:"csv"
                        }).val(csv));
                        form.css({
                            width:0,
                            height:0,
                            display: "block",
                            overflow: "hidden"
                        }).appendTo("body");
                        form[0].submit();
                        form.remove();
                    }
                }
            }
            return viewer;
        })()
    };
    var methods = {
        andFilter:function(filter1,filter2){
            var filter = "";
            if(filter1 && filter2){
                filter = "("+filter2+") and ("+filter1+")"
            }
            else{
                filter = filter1 ? filter1 : filter2;
            }
            return filter;
        },
        getReport:function(options){
            $.ajax({
                url:systemConfig.backendurl+"/yhproxy/getReportConfig",
                data:{
                    config:options.config,
                    report:options.report
                },
                type:"get",
                success:options.success,
                error:options.error
            })
        },
        chartColor1:["#ca7403","#c13853","#009ca2","#e9438a","#d96eef","#8f2fff","#6b00f9","#006dff","#00c5ff","#0cf796","#9cd334"],
        chartColor2:["#8f2fff","#6b00f9","#006dff","#00c5ff","#0cf796","#9cd334","#ca7403","#c13853","#009ca2","#e9438a","#d96eef"],
        chartColor3:["#00c5ff","#0cf796","#9cd334","#ca7403","#c13853","#009ca2","#e9438a","#d96eef","#8f2fff","#6b00f9","#006dff"]
    }
    for (var key in methods) {
        if (methods.hasOwnProperty(key)) {
            var element = methods[key];
            components[key] = element;
        }
    }
    return components;
});