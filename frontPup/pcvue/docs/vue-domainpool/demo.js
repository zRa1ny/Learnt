define([
    'require',
    'vue',
    'vueDomainPool',
    'systemConfig',
    'jQuery',
], function (require, Vue, domainPool, systemConfig, $) {
    'use strict';
    var domains = domainPool.getDomainOptions(["checktype", "checkLevel", "platform", "rectificationType"]);
    console.log(domains)
    var main = new Vue({
        el: "#domainpool",
        data: {
            domains:domains
        },
        mounted: function () {
           
        },
        watch: {

        },
        methods: {
        },
        computed: {
        }
    })
});