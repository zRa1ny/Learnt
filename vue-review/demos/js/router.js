define([
    'require',
    'vue',
    'vue-router'
], function (require, Vue, VueRouter) {
    'use strict';
    Vue.use(VueRouter)
   
    var router = new VueRouter({
        routes: [
            {
                path: '/',
                meta:{
                    hide: true
                },
                redirect:"index"
            },
            {
                path: '/index',
                name: 'index',
                meta: {
                    name: "首页",
                },
                component: { template: "<span>index</span>" },  
            },
            {
                path: '/login',
                name: 'login',
                meta: {
                    name: "登录",
                },
                component: { template: "<span>login</span>" },
            },
            {
                path: '/404',
                name: '404',
                meta: {
                    name: "404",
                    hide: true
                },
                component: { template: "<span>404</span>" }
            }
        ]
    })
   return router;
});