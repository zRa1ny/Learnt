define([
    'require',
    'vue',
    'jQuery',
    'bootstrap'
], function (require, Vue, $) {
    'use strict';

    Vue.component("bs-pop", {
        props: {
            class: {
            },
            title: {
            },
            type: {
                default: ""
            },
            fade: {
                default: true
            },
            value: {
                default: false
            }
        },
        data: function () {
            return {
                hasFooter: false
            }
        },
        template: '<div :class="{\'modal\':true,\'fade\':fade} ">\
                    <div :class="[\'modal-dialog\',{\'modal-lg\':type==\'lg\'},{\'modal-sm\':type==\'sm\'}]">\
                        <div class="modal-content">\
                            <div class="modal-header">\
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\
                            &times;\
                        </button>\
                                <!-- /.modal-header -->\
                                <h4 class="modal-title">\
                                    {{title}}\
                                </h4>\
                            </div>\
                            <div class="modal-body">\
                                <slot></slot>\
                            </div>\
                            <div class="modal-footer center" v-if="hasFooter">\
                                <slot name="footer"></slot>\
                            </div>\
                        </div>\
                    </div>\
                </div>',
        mounted: function () {
            this.$set(this, 'hasFooter', !!this.$slots.footer);
            $(this.$el).on("hidden.bs.modal", this.closed.bind(this));
            if (this.value) {
                this.show();
            }
            
            /** 拖拽模态框*/
            var mouseStartPoint = { "left": 0, "top": 0 };
            var mouseEndPoint = { "left": 0, "top": 0 };
            var mouseDragDown = false;
            var oldP = { "left": 0, "top": 0 };
            var moveTartet;
            $(document).on("mousedown", ".modal-header", function (e) {
                if ($(e.target).hasClass("close"))//点关闭按钮不能移动对话框
                    return;
                mouseDragDown = true;
                moveTartet = $(this).parent();
                mouseStartPoint = { "left": e.clientX, "top": e.clientY };
                oldP = moveTartet.offset();
            });
            $(document).on("mouseup", function (e) {
                mouseDragDown = false;
                moveTartet = undefined;
                mouseStartPoint = { "left": 0, "top": 0 };
                oldP = { "left": 0, "top": 0 };
            });
            $(document).on("mousemove", function (e) {
                if (!mouseDragDown || moveTartet == undefined) return;
                var mousX = e.clientX;
                var mousY = e.clientY;
                if (mousX < 0) mousX = 0;
                if (mousY < 0) mousY = 25;
                mouseEndPoint = { "left": mousX, "top": mousY };
                var width = moveTartet.width();
                var height = moveTartet.height();
                mouseEndPoint.left = mouseEndPoint.left - (mouseStartPoint.left - oldP.left);//移动修正，更平滑
                mouseEndPoint.top = mouseEndPoint.top - (mouseStartPoint.top - oldP.top);
                moveTartet.offset(mouseEndPoint);
            });           
            // $(this.$el).remove().appendTo($(top.document.body));
        },
        watch: {
            value: function (newVal) {
                if (newVal) {
                    this.show();
                }
                else {
                    this.hide();
                }
            }
        },
        methods: {
            hide: function () {
                $(this.$el).modal("hide");
            },
            hideImmediately: function () {
                $(this.$el).removeClass("fade");
                this.hide();
            },
            show: function () {
                $(".modal-content").css({"left":0 + 'px',"top":25 + 'px'});    
                $(this.$el).modal("show");
            },
            closed: function () {
                //解决多个弹窗的bug
                if ($(".modal.in").length && !$("body").is(".modal-open")) {
                    $("body").addClass("modal-open");
                }
                this.$emit("closed");
                this.$emit("input", false);
            }
        }
    });
});