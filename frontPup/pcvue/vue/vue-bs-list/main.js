define([
    'require',
    'vue'
], function(require, Vue) {
    'use strict';
    Vue.component('bs-list',{
        props:{
            data:{
                type:Array,
                default:function(){
                    return [
                    ];
                }
            },
            multi:{
                default:false,
            },
            itemComponent:{
                default:"<span>{{item}}</span>"
            },
            valuePath:{
                default:null
            },
            value:{
                default:null
            },
            panel:{
                type:String,
                default:"ul"
            },
            panelClass:{
                type:[Object,String],
                default:function(){
                    return {
                        "list-group":true
                    }
                }
            },
            itemClass:{
                type:[Object,String],
                default:function(){
                    return {
                        "list-group-item":true
                    }
                }
            },
            selectedClass:{
                type:[Object,String],
                default:function(){
                    return {
                        "active":true
                    }
                }
            }
        },
        data:function(){
            return {
                valueProxy:this.getValueProxy()
            };
        },
        watch:{
            value:function(){
                this.$set(this,"valueProxy",this.getValueProxy())
            }
        },
        template:'<span :is="panel" :class="panelClass">\
                <template v-for="item in data">\
                    <span :is="getItemPanel()" v-if="multi" :class="[itemClass,valueProxy.indexOf(getValue(item))>=0 ? selectedClass : null]" >\
                        <div class="checkbox">\
                            <label >\
                                <input type="checkbox" :value="getValue(item)" @change="input" v-model="valueProxy"/>\
                                <span :is="getComponentName()" :item="item"></span>\
                            </label>\
                        </div>\
                    </span>\
                    <span :is="getItemPanel()" v-if="!multi" :class="[itemClass,getValue(item)==valueProxy ? selectedClass : null]" @click="itemClick(item)">\
                        <span :is="getComponentName()" :item="item"></span>\
                    </span>\
                </template>\
            </span>',
        beforeCreate:function(){
            var itemComponent = this.$options.propsData.itemComponent;
            if(!itemComponent){
                itemComponent = "<span>{{item}}</span>";
            }
            var name = "tmp"+this._uid;
            var tempComponent;
            switch(typeof(itemComponent)){
                case"string":
                    tempComponent= {
                        template:itemComponent,
                        props:["item"]
                    };
                    break;
                case"object":
                default:
                    tempComponent = itemComponent;
                    tempComponent.props = ['item'];
                    break
            }
            this.$options.components[name] =  tempComponent
        },
        methods:{
            getValueProxy:function(){
                return this.multi  
                    ?(
                        this.value && this.value.constructor == Array 
                        ? [].concat(this.value) 
                        : (
                            this.value === null || typeof(this.value) == "undefined"
                            ? []
                            : [this.value]
                        )
                    ) : this.value;
            },
            getComponentName:function(){
                return "tmp"+this._uid;
            },
            getItemPanel:function(){
                var panel = this.panel;
                switch(panel){
                    case "ul":
                        return "li";
                    default:
                        return panel;
                }
            },
            getValue:function(item){
                var value = item ? (this.valuePath ? item[this.valuePath] : item) : item;
                return value;
            },
            input:function(){
                this.$emit('input', this.valueProxy);
            },
            itemClick:function(item){
                var value = this.getValue(item);
                if(value!==this.valueProxy){
                    this.valueProxy = value;
                    this.$emit('input', value);
                }
            }
        }
    });
});