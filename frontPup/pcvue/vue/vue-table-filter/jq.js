define([
    'require',
    'vue',
    'jQuery',
    'vueTableFilter'
], function(require, Vue, $) {
    'use strict';
    $.fn.tableFilter = function(options){
        this.html('<cig-table-filter \
            :filters="filters" \
            :domain-ajax-options="domainAjaxOptions" \
            v-model="filter" \
            @input="input" \
            ></cig-table-filter>');
        this.each(function(){

            var data = {
                filters:options.filters,
                domainAjaxOptions:options.domainAjaxOptions,
                filter:$.extend({},options.filter)
            };
            var methods = {
                input:function(){
                    this.$nextTick(function(){
                        if(options.change)
                            options.change(this.filter);
                    })
                }
            };
            new Vue({
                el:this,
                data:data,
                methods:methods
            });
        });
    };
});