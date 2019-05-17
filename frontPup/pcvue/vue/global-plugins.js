define('vueGlobalPlugins',[
    'require',
    'vue',
    'jQuery'
], function(require, Vue, $) {
    'use strict';
    //console.log("plugins.loaded");
    
        // <cig-table-filter v-if="filters && filters.length > 0" :filters="filters" :domain-ajax-options="domainAjaxOptions" v-model="filter" @input="doSearch()"></cig-table-filter>
        // <div class="bootstrap-table">
        //     <div class="fixed-table-toolbar clearfix">
        //         <div class="bs-bars pull-left cig-bars">
        //             <template v-for="btn in btns">
        //                 <button v-if="btn.visible !== false"
        //                     :class="['btn btn-sm',btn.baseClass, btn.disabled ? 'disabled' : btn.enableClass]" 
        //                     :disabled="btn.disabled" 
        //                     @click="executeCommand(btn.id)">{{btn.name}}</button>
        //             </template>
        //         </div>
        //         <div class="columns columns-right btn-group pull-right">
        //             <form class="form-inline">
        //                 <div class="input-group">
        //                     <input class="form-control" v-model="keyword" @keyup.enter="doSearch()" type="text" placeholder="搜索">
        //                     <span class="input-group-btn"> 
        //                         <button class="btn btn-default" type="button" @click="doSearch()">
        //                             <span class="glyphicon glyphicon-search"></span>
        //                         </button> 
        //                     </span> 
        //                 </div>
        //                 <button v-if="filters && filters.length > 0" class="btn btn-default" type="button">
        //                     高级搜索
        //                 </button> 
        //             </form>
        //         </div>
        //     </div>
        //     <cig-table ref="table"
        //         :config="tableConfig"
        //         :columns="tableColumns"
        //         @selectchange="tableSelectChange?tableSelectChange():(1)"
        //         :ajax-options="tableAjaxOptions">
        //     </cig-table>
        // </div>
    var queryTablePlugin = {
        install:function(Vue, options){
            var clone = function(item){
                return JSON.parse(JSON.stringify(item))
            }
            Vue.mixin({
                // data:function(){
                //     var options = this.$options;
                //     if("#"+window.__templateId__mainTable === options.el){
                //         return {
                //             filters:[],
                //             domainAjaxOptions:{},
                //             filter:null,
                //             btns:[],
                //             keyword:"",
                //             tableConfig:{},
                //             tableColumns:[],
                //             tableAjaxOptions:{},
                //             glb_plugin:{
                //                 filterMode:"pop",
                //             }
                //         };
                //     }
                //     return {
                //     }
                // },
                data:function(){
                    return {
                        pluginState:{
                            filterPopModel:false
                        },
                        pluginData:{
                            keywordType:""
                        }
                    }
                },
                filters:{
                    filtersUnshow:function(oldArr){return oldArr;}
                },
                mounted:function(){
                    this.pluginData._oriFilter = this.filter ? clone(this.filter) : null;
                },
                computed:{
                    glb_search_placehoder:function(){ return this.placeholder ? this.placeholder : "搜索" },
                    glb_proxy_filters:function(){ return this.filters ? this.filters : [] },
                    glb_proxy_filter:{
                        get:function(){ return this.filter ? this.filter : {} },
                        set:function(v){ return this.$set(this,"filter",v) },
                    },
                    glb_proxy_filtermode:function(){ return this.filtermode ? this.filtermode : "pop" },
                    glb_proxy_domainAjaxOptions:function(){ return this.domainAjaxOptions ? this.domainAjaxOptions : {} },
                    glb_proxy_btns:function(){ return this.btns ? this.btns : [] },
                    glb_proxy_tableAjaxOptions:{
                        get:function(){ return typeof(this.tableAjaxOptions) !== "undefined" ? this.tableAjaxOptions : this.pluginState.tableAjaxOptions },
                        set:function(v){ return this.$set(typeof(this.tableAjaxOptions) !== "undefined" ? this : this.pluginState,"tableAjaxOptions",v) },
                    },
                    glb_proxy_keywordTypes:function(){ return this.keywordTypes ? this.keywordTypes : [] },
                    glb_proxy_keywordType:{
                        get:function(){ return typeof(this.keywordType) !== "undefined" ? this.keywordType : this.pluginData.keywordType },
                        set:function(v){ return this.$set(typeof(this.keywordType) !== "undefined" ? this : this.pluginData,"keywordType",v) },
                    },
                    glb_proxy_keyword:{
                        get:function(){ return typeof(this.keyword) !== "undefined" ? this.keyword : this.pluginData.keyword },
                        set:function(v){ return this.$set(typeof(this.keyword) !== "undefined" ? this : this.pluginData,"keyword",v) },
                    },
                    glb_proxy_tableConfig:function(){ return this.tableConfig ? this.tableConfig : {checkbox:false} },
                    glb_proxy_tableColumns:function(){ return this.tableColumns ? this.tableColumns : [] },
                    glb_proxy_filterPopModel:{
                        get:function(){ return typeof(this.filterPopModel) !== "undefined" ? this.filterPopModel : this.pluginState.filterPopModel },
                        set:function(v){ return this.$set(typeof(this.filterPopModel) !== "undefined" ? this : this.pluginState,"filterPopModel",v) },
                    },
                },
                methods:{
                    glb_proxy_tableSelectChange:function(){
                        if(this.tableSelectChange){
                            this.tableSelectChange.apply(this,arguments);
                        }
                    },
                    glb_proxy_doSearch:function(){
                        if(this.doSearch){
                            this.doSearch.apply(this,arguments);
                        }
                    },
                    glb_proxy_executeCommand:function(id){
                        if(this.executeCommand){
                            this.executeCommand.apply(this,arguments);
                        }
                        else{
                            var func = "command"+command.substr(0,1).toUpperCase()+command.substr(1);
                            if(this[func]){
                                this[func]();
                            }
                        }
                    },
                    glb_proxy_filterPopModelChange:function(popModel){
                        if(this.filterPopModel){
                            this.filterPopModel.apply(this,arguments);
                        }
                        else{
                            this.glb_proxy_filterPopModel = popModel;
                        }
                    },
                    glb_proxy_openFilterPop:function(){
                        if(this.openFilterPop){
                            this.openFilterPop.apply(this,arguments);
                        }
                        else{
                            this.glb_proxy_filterPopModel = true;
                        }
                    },
                    glb_proxy_resetFilter:function(){
                        if(this.keyword){
                            this.keyword = "";
                        }
                        if(this.glb_proxy_filter){
                            this.$set(this,"glb_proxy_filter",clone(this.pluginData._oriFilter));
                        }
                        this.glb_proxy_doSearch();
                    }
                }
            })
        }
    };
    Vue.config.frameMode = top!==window && !!top.mainVm;
    Vue.use(queryTablePlugin);
    var framePopStylePlugin = {
        install:function(Vue, options){
            function updateLayout(){
                if(Vue.config.frameMode){
                    if(top!==window){
                        var $b = $(window.document.body);
                        var $tb = $(top.document.body);
                        if($b.hasClass("modal-open")){
                            if(!$tb.hasClass("modal-open-top")){
                                $tb.find("iframe").each(function(){
                                    try{
                                        if(this.contentWindow === window){
                                            var offset = $(this).offset();
                                            // $tb.find(".sys-frame").height($(this).height());
                                            $b.css({
                                                padding: offset.top+"px 10px 0 "+offset.left+"px",
                                                background: "transparent"
                                            })
                                        }
                                    }
                                    catch(e){}
                                });
                            }
                            $tb.addClass("modal-open-top");
                        }
                        else{
                            $tb.removeClass("modal-open-top");
                            // $tb.find(".sys-frame").height("auto");
                            $b.css({
                                padding: "0",
                                background: "transparent",
                            })
                        }
                    }
                }
            }
            Vue.mixin({
                mounted:function(){
                    if(this.$options.name == "bs-pop"){
                        $(this.$el).on("show.bs.modal",setTimeout.bind(null,updateLayout,1));
                        $(this.$el).on("hide.bs.modal",setTimeout.bind(null,updateLayout,1));
                        $(this.$el).on("hidden.bs.modal",updateLayout);

                        var self = this;
                        this.eventHub.$on("beforeUnload",this.hideImmediately);
                    }
                },
                beforeDestroy:function(){
                    if(this.$options.name == "bs-pop"){
                        this.eventHub.$off("beforeUnload",this.hideImmediately);
                    }
                }
            })
        }
    };
    Vue.use(framePopStylePlugin);
    var eventHub = top.mainVm ? top.mainVm.eventHub : new Vue();
    var vmList = [];
    var framworkPlugin = {
        install:function(Vue, options){
            Vue.mixin({
                data:function(){
                    return {
                        eventHub:{
                            $on:function(){
                                eventHub.$on.apply(eventHub,arguments);
                            },
                            $off:function(){
                                eventHub.$off.apply(eventHub,arguments);
                            },
                            $emit:function(){
                                eventHub.$emit.apply(eventHub,arguments);
                            }
                        }
                    }
                },
                mounted:function(){
                    if(this.onFrmShow){
                        this.eventHub.$on("onFrmShow",this.onFrmShow);
                    }
                    vmList.push(this);
                },
                beforeDestroy:function(){
                    if(this.onFrmShow){
                        this.eventHub.$off("onFrmShow",this.onFrmShow);
                    }
                },
                methods:{
                    openSubUrl:function(url){
                        $("<a>").attr("target","_blank").attr("href",url).appendTo("body").click().remove();
                    },
                    "$frmOpenSubUrl":function(url){
                        if(Vue.config.frameMode){
                            this.openSubUrl(url);
                        }
                        else{
                            location = url;
                        }
                    },
                    "$frmBackToMain":function(args){
                        if(Vue.config.frameMode){
                            this.eventHub.$emit("onTopNaviToRoot");
                            this.eventHub.$emit("onFrmShow",args);
                        }
                        else{
                            window.history.back();
                        }
                    }
                }
            })
        }
    };
    window.onbeforeunload = function(){
        eventHub.$emit("beforeUnload");
        vmList.forEach(function(item){
            item.$destroy();
        })
        // eventHub.$offAll(window);
    };
    // eventHub.$emit("plugin")
    Vue.use(framworkPlugin);
    return;
});
requirejs(['vueGlobalPlugins'],function(){});
