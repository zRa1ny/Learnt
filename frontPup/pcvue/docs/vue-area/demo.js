define([
    'require',
    'vue',
    'vueAlert',
    'vueArea'
], function(require, Vue, alert) {
    'use strict';
    //普通弹出框    
    var area1Vm = new Vue({
        el:"#area1",
        data:{
            dept:[{"id":"1187472557998080","name":"图影管委会"},{"id":"1209462790553600","name":"南太湖管委会"},{"id":"1143492092887040","name":"雉城街道"},{"id":"1152288185909248","name":"和平镇"},{"id":"1156686232420352","name":"虹星桥镇"},{"id":"1161084278931456","name":"洪桥镇"},{"id":"1165482325442560","name":"画溪街道"},{"id":"1174278418464768","name":"夹浦镇"},{"id":"1169880371953664","name":"小浦镇"},{"id":"1178676464975872","name":"李家巷镇"},{"id":"1183074511486976","name":"林城镇"},{"id":"1200666697531392","name":"吕山乡"},{"id":"1196268651020288","name":"龙山街道"},{"id":"1191870604509184","name":"太湖街道"},{"id":"1205064744042496","name":"煤山镇"},{"id":"1213860837064704","name":"水口乡"},{"id":"1218258883575808","name":"泗安镇"}],
            nodeComponent:"<span>{{item.name}}</span>"
        },
        methods:{
          
        }
    });
    var area2Vm = new Vue({
        el:"#area2",
        data:{
            ajaxOptions:{  
                type: "get",
                "url": 'https://test-zhzl.spacecig.com/zhzlbackend/realPerson/personGrider/getHouseAreas'
            }
        },
        methods:{
         
        }
    });
});