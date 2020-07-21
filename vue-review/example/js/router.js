define([
    'require',
    'vue',
    'vue-router',
    'index',
    'detail',
    'edit'
], function (require, Vue, VueRouter, index, detail, edit) {
    'use strict';
    Vue.use(VueRouter)
    var router = new VueRouter({
        mode: "hash",
        routes: [
            {
                path: '/',
                meta: {
                    hide: true
                },
                redirect: "index"
            },
            {
                path: '/index',
                name: 'index',
                meta: {
                    title: "首页",
                    keepAlive: false,
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
                path: '/edit',
                name: 'edit',
                meta: {
                    title: "编写日志",
                },
                component: edit
            },
            {
                path: '/login',
                name: 'login',
                meta: {
                    title: "登录",
                },
                component: { template: "<span>login</span>" },
            },
            {
                path: '*',
                redirect: "404"
            },
            {
                path: '/404',
                name: '404',
                meta: {
                    title: "未找到页面",
                    hide: true
                },
                component: { template: "<span>404</span>" }
            }
        ]
    })

    return router;
});