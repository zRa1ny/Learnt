define([
    'require',
    'vue',
    'jQuery',
    'systemConfig',
    'vuePopComponent',
    "vueObjectSelector"
], function(require, Vue , $, systemConfig,popComponent) {
    'use strict';
    console.log(popComponent)
    var vm = new Vue({
        el:"#main",
        data:{

            //cig-obj-selector props等配置
            obj:{
                autoSelect: false,
                startLoadLength: 10,
                itemComponent: "<span>{{item.name}}</span>",
                ajaxOptions: {
                    url: './obj.json',
                    error: function(err){
                        console.log(err);
                    }
                },
                keyword: 'nothing',
                value: {},
                dataMapper:{
                    pId:"id",
                    name:"name"
                }
            },

            //cig-person-selector props等配置
            person:{
                itemComponent: "<span>{{item.name}} - {{item.cardNum}}</span>",
                ajaxOptions: function(val){
                    return {
                        url: './person.json',
                        data:{
                            cardNum:val
                        },
                        type:"get"
                    }
                },
                keyword: null,
                value: {},
                dataMapper:{
                    id:'pId',
                    cardNum:'pCardNum',
                    name:'pName',
                    phone:'pPhone',
                    address:'pAddress',
                }
            },

            //cig-address-selector props等配置
            address:{                
                value: {},
                placeDataMapper:{
                    place:'place'
                },
                detailDataMapper:{
                    addressDetail:'addressDetail'
                },
                placeAjax: function(val){
                    return {
                        url:"./place.json",
                        data:{
                            place:val
                        },
                        type:"get"
                    }
                },
                detailAjax: function(val){
                    return {
                        url:"./address.json",
                        data:{
                            place:self.dataPlace,
                            addressDetail:val||""
                        },
                        type:"get"
                    }
                }
            },

            


        },
        mounted:function(){
            this.start=true;
        },
        methods:{
           objSelect:function(){
               console.log('组件cig-obj-selector触发了选择事件');
           },
           personSelect:function(){
               console.log('组件cig-person-selector触发了事件');
           }
        }
    })
});