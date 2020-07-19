define([
    'require',
], function (require) {
    'use strict';
    var dynamicAllRouters = [];// 文件内引入
    var dynamicRouter = {
        data: {
          
            dRoutes: [],
            dynamicAllRouters: dynamicAllRouters,
        },
        computed: {
            routes () {
                return this.dRoutes.concat(this.$router.options.routes).filter(function (value) {
                    return !(value && value.meta && value.meta.hide)
                })
            }
        },
        methods: {
            $addRoutes (router) {
                if (!Array.isArray(router)) return;
                var _router = this.getRouterByName(router);
                console.log(_router)
                this.$router.addRoutes(_router);
                this.dRoutes = router.concat(this.dRoutes);
                this.setSession();
            },
            setSession () {
                sessionStorage.setItem("_dRoutes_", JSON.stringify(this.dRoutes))
            },
            getSession () {
                var sessionRouter = JSON.parse(sessionStorage.getItem("_dRoutes_"));
                sessionRouter = sessionRouter ? sessionRouter : [];
                this.$addRoutes(sessionRouter);
            },
            clear () {
                sessionStorage.setItem("_dRoutes_", null);
                window.location.reload();
            },
            beforeEach (to, from, next) {
                next()
            },
            setBeforeEach () {
                this.$router.beforeEach(this.beforeEach)
            },
            // 不双向控制 缓存整个路由
            // 修改  将整个路由层打平，只有一级路由，父子关系通过自己维护 随意配页面  每一个路由都是独立的页面
            // 升级  在meta中增加isChild的，为true，则该child不打平，添加到自己的父亲的child中 否则打平 此情况下加入自己的父路由中
            getRouterByName (router) {
                function seekRouter (router, result) {
                    var result = result ? result : [];
                    router.forEach((value, index) => {
                        var rt = deepClone(value);
                        // children需要继续内部匹配
                        if (rt.children != undefined) {
                            if (rt.meta.isChild) {
                                console.log('不打平')
                                seekRouter(rt.children,rt.children=[])
                            } else {
                                console.log('打平');
                                seekRouter(rt.children, result);
                                delete rt.children;
                            }
                        }else{
                            if (rt.path.indexOf('/') !== 0 && !rt.meta.isChild) {
                                rt.path = "/" + rt.path;
                            }
                        }
                        result.push(rt);
                    })

                    return result;
                }

                return seekRouter(router);
            },

        },
        mounted () {
            this.getSession();
            this.setBeforeEach();
        },
    }
    function deepClone (obj, pro) {
        return JSON.parse(JSON.stringify(obj))
    }
    return dynamicRouter;
});