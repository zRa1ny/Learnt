define([
    'require',
    'vue',
    'jQuery',
    'systemConfig',
    'vuePopComponent',
    'vueBsList',
    'css!cssObjectSelector'
], function(require, Vue, $, systemConfig, popComponent) {
    'use strict';
    Vue.component("cig-obj-selector",{
        mixins:[
            popComponent
        ],
        props:{
            autoSelect:{
                default:false,
            },
            startLoadLength:{
                type:Number,
                default:0
            },
            itemComponent:{
                default:"<span>{{item}}</span>"
            },
            value:{
                default:null
            },
            dataMapper:{
                default:null,
                type:Object
            },
            ajaxOptions:{
            },
            data:{
                default:null,
                type:Object
            }
        },
        template:'<div :class="[\'input-select-wrap\',isopen? \'focus\':\'\']">\
                <input type="text" \
                    ref="input"\
                    v-model="valueProxy" \
                    @input="input" \
                    @keydown="keydown" \
                    @blur="blur" \
                    class="form-control">\
                <bs-list v-if="!items || items.length == 0"\
                    :data="[\'没有找到匹配项\']"\
                    ></bs-list>\
                <bs-list \
                    :item-component="itemComponent" \
                    :data="items"\
                    v-model="selectItem"\
                    @input="select"\
                    ></bs-list>\
            <div>',
        data:function(){
            return {
                items:[],
                valueProxy:this.value,
                selectItem:null,
                isopen:false,
                ajax:null,
                ajaxVal:"",
                _selectDirty:true,
            }
        },
        watch:{
            value:function(newVal){
                this.$set(this,"valueProxy",newVal);
            }
        },
        methods:{
            focus:function(){
                $(this.$refs.input).focus();
            },
            keydown:function($event){
                this.$emit("keydown",$event);
            },
            input:function(){
                if(this._selectDirty == false){
                    this._selectDirty = true;
                    this.clearData();
                }
                this.isopen = true;
                this.$emit("input",this.valueProxy);
                if(this.autoSelect){
                    this.loadItems(this.selectIfOne.bind(this));
                }
                else{
                    this.loadItems();
                }
            },
            loadItems:function(callback){
                if((!this.valueProxy && this.startLoadLength != 0) 
                    || (this.valueProxy && this.valueProxy.length < this.startLoadLength)){
                    return;
                }
                if(callback || (this.ajaxVal != this.valueProxy || !this.valueProxy)){
                    if(this.ajax){
                        this.ajax.abort();
                    }
                    this.ajaxVal = this.valueProxy;
                    var ajaxOptions = null;
                    if(typeof(this.ajaxOptions) == "object"){
                        ajaxOptions = $.extend({},this.ajaxOptions);
                        ajaxOptions.data = $.extend({value:this.valueProxy},ajaxOptions.data);
                    } 
                    else if(typeof(this.ajaxOptions) == "function"){
                        ajaxOptions = this.ajaxOptions(this.valueProxy);
                    }
                    ajaxOptions.error = (function(){
                        this.ajax = null;
                        callback && callback();
                    }).bind(this);
                    ajaxOptions.success = (function(res){
                        this.ajax = null;
                        if(res.success){
                            this.setItems(res.data);
                        }
                        else{
                            this.setItems([]);
                        }
                        callback && callback();
                    }).bind(this);
                    this.ajax = $.ajax(ajaxOptions);
                }
            },
            setItems:function(items){
                this.$set(this,"items",items);
                // this.$set(this,"items",[{place:"aaa"},{place:"bbb"}]);
                // this.$set(this,"items",[
                //     {id:1,name:"王五",cardNum:"420922199001012223"}
                // ]);
            },
            blur:function(){
                setTimeout((function(){
                    this.loadItems(this.selectIfOne.bind(this));
                }).bind(this),1000);
            },
            selectIfOne:function(){
                if(this.isopen == false){
                    return;
                }
                if(this.items.length == 1){
                    this.selectItem = this.items[0];
                    this.select();
                }
                else{
                    this.selectItem = null;
                    this.clearData();
                    this.$emit("input",this.valueProxy);
                    this.isopen = false;
                }
            },
            clearData:function(){
                if(this.dataMapper && this.data){
                    for (var key in this.dataMapper) {
                        this.$set(this.data,this.dataMapper[key],null);
                    }
                }
            },
            select:function(item){
                console.log(item);
                this.isopen = false;
                this.$emit("input",this.valueProxy);
                this.$nextTick(function(){
                    var obj = this.selectItem;
                    if(this.dataMapper && this.data){
                        if(obj){
                            for (var key in this.dataMapper) {
                                if (obj.hasOwnProperty(key)) {
                                    this.$set(this.data,this.dataMapper[key],obj[key]);
                                }
                            }
                        }
                        else{
                            for (var key in this.dataMapper) {
                                this.$set(this.data,this.dataMapper[key],null);
                            }
                        }
                    }
                    this._selectDirty = false;
                    this.$emit("select");
                });
            }
        }
    });

    Vue.component('cig-person-selector',Vue.extend({
        template:'<cig-obj-selector \
                v-model="valueProxy"\
                @input="input"\
                :data="data"\
                :item-component="itemComponent"\
                :data-mapper="dataMapper"\
                :ajax-options="ajaxOptions">\
            </cig-obj-selector>',
        props:{
            data:{},
            value:{},
            itemComponent:{
                default:"<span>{{item.name}} - {{item.cardNum}}</span>"
            },
            dataMapper:{
                default:function(){
                    return {
                        id:'pId',
                        cardNum:'pCardNum',
                        name:'pName',
                        phone:'pPhone',
                        address:'pAddress',
                    };
                }
            }
        },
        data:function(){
            return {
                "ajaxOptions":function(val){
                    return {
                        //url:systemConfig.backendurl+"/realPerson/person/queryPersons",
                        url: "./items.json",
                        data:{
                            cardNum:val
                        },
                        type:"get"
                    }
                },
                valueProxy:this.value
            }
        },
        watch:{
            value:function(newVal){
                this.$set(this,"valueProxy",newVal);
            }
        },
        methods:{
            input:function(){
                this.$emit("input",this.valueProxy);
            }
        }
    }));

    Vue.component('cig-address-selector',Vue.extend({
        template:'<cig-obj-selector v-if="!dataPlace"\
                ref="placeSelector"\
                @select="placeSelect"\
                v-model="place"\
                :data="data"\
                :start-load-length="2"\
                :item-component="itemComponent"\
                :data-mapper="placeDataMapper"\
                :ajax-options="ajaxOptions1">\
            </cig-obj-selector>\
            <div v-else class="input-group">\
                <div class="input-group-addon">{{dataPlace}}</div>\
                <cig-obj-selector \
                    ref="detailSelector"\
                    v-model="addressDetail"\
                    @keydown="keydown" \
                    @select="detailSelect" \
                    :data="data"\
                    :item-component="itemDetailComponent"\
                    :data-mapper="detailDataMapper"\
                    :ajax-options="ajaxOptions2">\
                </cig-obj-selector>\
            </div>',
        props:{
            data:{},
            placeDataMapper:{
                default:function(){
                    return {
                        place:'place',
                    };
                }
            },
            detailDataMapper:{
                default:function(){
                    return {
                        addressDetail:'addressDetail',
                    };
                }
            },
            placeAjax:{
                default:function(){
                    return function(val){
                        return {
                            url:systemConfig.backendurl+"/realPerson/house/queryBuildingAddress",
                            data:{
                                place:val
                            },
                            type:"get"
                        }
                    }
                }
            },
            detailAjax:{
                default:function(){
                    var self = this;
                    return function(val){
                        return {
                            url:systemConfig.backendurl+"/realPerson/house/queryBuildingAddress",
                            data:{
                                place:self.dataPlace,
                                addressDetail:val||""
                            },
                            type:"get"
                        }
                    }
                }
            },
        },
        data:function(){
            return {
                place:this.data[this.placeDataMapper.place],
                addressDetail:this.data[this.detailDataMapper.addressDetail],
                itemComponent:"<span>{{item.place}}</span>",
                itemDetailComponent:"<span>{{item.place}} {{item.addressDetail}}</span>",
            }
        },
        watch:{
            data:function(newVal){
                this.addressDetail = this.data[this.detailDataMapper.addressDetail];
            }
        },
        computed:{
            dataPlace:function(){
                return this.data[this.placeDataMapper.place];
            },
            ajaxOptions1:function(){
                return this.placeAjax;
            },
            ajaxOptions2:function(){
                return this.detailAjax;
            }
        },
        methods:{
            placeSelect:function(){
                this.$nextTick(function(){
                    if(this.$refs.detailSelector) {
                        this.$refs.detailSelector.input();
                        this.$refs.detailSelector.focus();
                    }
                });
            },
            detailSelect:function(){
                this.addressDetail = this.data[this.detailDataMapper.addressDetail];
            },
            keydown:function($event){
                if(!this.addressDetail && $event.code == "Backspace"){
                    this.place = this.data[this.placeDataMapper.place];
                    this.place = this.place.substr(0,this.place.length-1);
                    this.$set(this.data,this.placeDataMapper.place,null);
                    this.$nextTick(function(){
                        if(this.$refs.placeSelector) {
                            this.$refs.placeSelector.focus();
                        }
                    });
                }
            }
        },
        mounted:function(){
            console.log(this.ajaxOptions1)
        }
        
    }))

});