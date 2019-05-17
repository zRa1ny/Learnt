define([
    'require',
    'vue',
    'vueDomainPool',
    'jQuery',
    'bootstrap',
    'bootstrapSelect',
    'bootstrapSelectLang'
], function(require, Vue,domainPool,$) {
    'use strict';
    //多选控件
    Vue.component('cig-select',
                {
                    props : ['options','name','value', 'multiple'],
                    template : "<div ref='seldiv' style='display: inline-block;'>\
                    <select ref='selector' :name='name' :multiple='multiple' style='display:none' class='selectpicker' data-live-search='true' title='请选择' data-live-search-placeholder='搜索'>\
                            <option v-if='!options || options.length==0'></option>\
                            <option :value='option.value' v-for='option in options'>{{ option.text }}</option>\
                    </select>\
                    </div>",
                    mounted : function () {
                        this.valueProxy=[];
                        var vm = this;
                        $(this.$refs.selector).selectpicker();
                        $(this.$refs.selector).selectpicker('val', this.value != null ? this.value : null);
                        $(this.$refs.selector).on('changed.bs.select', function () {
                            var val = $(this).val();
                            vm.$emit('input', val ? val : []);
                        });
                        $(this.$refs.selector).on('show.bs.select', function () {
                            
                            $(vm.$refs.seldiv).find(".dropdown-menu").css("display","block") //兼容IE11 强制隐藏后再显示
                            
                            //赋值
                            if(this._value){
                               $(this).val(this._value);
                            }
                            var val = $(this).val();
                            if(val!=null){
                                vm.$emit('input', val ? val : []);
                            }
                            
                        });

                        //兼容IE11 强制隐藏
                        $(this.$refs.selector).on('hidden.bs.select', function () {
                             $(vm.$refs.seldiv).find(".dropdown-menu").css("display","none")
                        })

                    },
                    watch:{
                        "options":function(){
                            this.update();
                        },
                        "value":function(newVal){
                            if(JSON.stringify(newVal) != JSON.stringify(this.valueProxy)){
                                this.valueProxy = newVal;
                                this.value = newVal;
                                this.update();
                            }
                        }
                    },
                    data:function(){
                        return {
                        };
                    },
                    methods:{
                        update : function () {
                            this.$nextTick(function(){
                                $(this.$refs.selector).selectpicker('val', this.value != null ? this.value : null);
                                $(this.$refs.selector).selectpicker('refresh');
                            });
                        },
                    },
                    destroyed : function () {
                        $(this.$refs.selector).selectpicker('destroy');
                    }
                });
});