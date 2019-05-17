define([
    'require',
    'vue',
    'jQuery',
    'vueDepMap'
], function (require, Vue, $) {
    'use strict';
    var main = new Vue({
        el: "#depmap",
        data: {
          
        },
        mounted: function () {

        },
        watch: {

        },
        methods: {
            mapClick: function (item) {
                console.log(item)
            }
        },
        computed:{
            map:function(){
                return "json!"+require.toUrl("./changxing.json");
            }
        }
    })
});