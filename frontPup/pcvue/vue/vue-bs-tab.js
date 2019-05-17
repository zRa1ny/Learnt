define([
    'require',
    'vue'
], function(require, Vue) {
    'use strict';
    var tab = {
        props:["tabs","className","initTab","value"],
        data:function(){
            return {
                // curTab: this.initTab || null
                innerValue:"",
            }
        },
        computed:{
            curTab: {
                get: function(){
                    return (this.value ? this.getTab(this.value) : ( this.innerValue ? this.getTab(this.innerValue) : this.initTab));
                },
                set: function(val){
                    if(val){
                        this.innerValue = val.name;
                        this.$emit("input",val.name);
                    }
                }
            }
        },
        render:function(createElement){
            if(!this.curTab){
                this.curTab = this.tabs[0];
            }
            var curTab = this.curTab;
            var classObj = {
                "nav-tabs":true
            };
            if(this.className){
                classObj[this.className] = true;
            }
            return createElement("div",{
                class:classObj
            },[
                createElement("ul",{
                        class:{
                            "nav":true,
                            "nav-tabs":true,
                            "ui-sortable-handle":true
                        }
                    },this.tabs.map(function(tab){
                        return createElement('li',{
                                class:{
                                    "active":(tab && curTab && tab.name == curTab.name)
                                },
                            },[
                                createElement('a',{
                                    class:{
                                    },
                                    domProps:{
                                        "href":"javascript:;"
                                    },
                                    on:{
                                        click:this.tabClick.bind(this,tab)
                                    }
                                },[tab.text])
                            ]);
                    },this)),
                createElement("div",{
                        class:{
                            "tab-content":true,
                            "no-padding":true
                        }
                    },this.tabs.map(function(tab){
                        var slot = this.$slots[tab.name];
                        return createElement("div",{
                            class:{
                                "tab-pane":true,
                                "content":true,
                                "active":(tab && curTab && tab.name == curTab.name)
                            },
                        },slot);
                    },this))
            ]);
        },
        methods:{
            getTab:function(name){
                var tab = null;
                this.tabs.forEach(function(t){
                    if(t.name == name) tab = t;
                })
                return tab;
            },
            tabClick:function(tab){
                if(tab.enable === false) return; 
                this.$set(this,"curTab",tab);
                this.$emit("select",tab);
            }
        }
    };
    Vue.component("bs-tab",tab);
});