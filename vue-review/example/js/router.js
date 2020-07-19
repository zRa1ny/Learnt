define([
    'require',
    'vue',
    'vue-router',
    'index',
    'detail',
], function (require, Vue, VueRouter,index,detail) {
    'use strict';
    Vue.use(VueRouter)
    var router = new VueRouter({
        mode:"hash",
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
                    title: "首页",
                },
                component: index,  
            },
            {
                path: '/detail',
                name: 'detail',
                meta: {
                    title: "详情",
                },
                component: detail,  
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