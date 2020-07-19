define([
    'require',
    'vue',
    'swiper'
], function (require, Vue, Swiper) {
    'use strict';
    Vue.component("bread-crumbs", {
        functional: true,
        props: {
            data: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        render: function (creatElement, {
            props,
            listeners,
            children
        }) {
            var len = props.data.length,
                data = props.data.map(
                    (value, index) => {
                        if (index < len - 1) {
                            return [creatElement('div', {
                                class: "alink",
                                on: {
                                    click: function () {
                                        listeners.click(value, index, len)
                                    }
                                }
                            }, value.meta.name), creatElement('div', {
                                class: "interval"
                            }, ">")]
                        }
                        return creatElement('div', {
                            class: "alink on",
                            on: {
                                click: function () {
                                    listeners.click(value, index, len)
                                }
                            }
                        }, value.meta.name)
                    }
                )


            return creatElement('div', {
                class: "bread-crumbs"
            }, data)


        }
    })
    // 作用域插槽
    Vue.component("m-card", {
        template: `
            <div class="slot-area btn">
                <slot v-bind="value">
                    {{value}}
                </slot>
            </div>   
        `,
        props: {
            value: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        mounted() {
            console.log(this.value)
        }
    })
    // 基于dom的组件
    Vue.component("m-swiper", {
        template: `
                <div ref="swiper-container" class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(value,index) in data" :key="index">
                        <slot v-bind="value"> </slot>
                    </div>
                </div>
                <div class="swiper-pagination" v-show="params.pagination && data.length>0"></div>
                <div class="swiper-button-prev" v-show="params.navigation && data.length>0"></div>
                <div class="swiper-button-next" v-show="params.navigation && data.length>0"></div>
                <div class="swiper-scrollbar" v-show="params.scrollbar && data.length>0"></div>
            </div>
        `,
        props: {
            config: {
                type: Object,
                default () {
                    return {}
                }
            },
            data: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        computed: {
            params() {
                var defaultConfig = {
                        direction: false,
                        loop: false,
                        pagination: false,
                        navigation: false,
                        scrollbar: false,
                    },
                    opts = Object.assign({}, defaultConfig, this.config),
                    params = {};

                for (var key in opts) {
                    // 需要dom的参数转化
                    // 不需要转化的直接使用传入的参数
                    opts[key] && this[key] ? params[key] = this[key] : params[key] = opts[key];
                }
                this.init = false; // 配置改变重新初始化
                // console.log(params)
                return params;
            }
        },
        data() {
            return {
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                },
                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                // 如果需要滚动条
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
                init: false
            }
        },

        methods: {
            swiperInit(init) {
                if (this.swiper && this.init) {
                    this.swiper.update();
                    // console.log('数据更新')
                    return;
                }
                var _this = this;
                this.swiper = new Swiper(this.$refs['swiper-container'], Object.assign({}, this.params, {
                    on: {
                        slideChange: function () {
                            _this.$emit("slide-change", this)
                        }
                    }
                }));
                this.init = true;
            }
        },
        mounted: function () {
            this.swiperInit()
        },
        beforeUpdate() {
            // console.log('child beforeUpdate')
        },
        updated() {
            // console.log('child updated')
            this.swiperInit()

        },

    });

});