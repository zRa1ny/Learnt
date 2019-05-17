define(['require'
    ,'vue'
    ,'ueditor','ueditorLangConfig'],function(require,Vue){
    Vue.component("cig-editor",{
        template:'<div>\
                    <script ref="script" type="text/plain"></script>\
                    <div v-if="isIE" style="width:0;height:0;overflow:hidden;">\
                        <input type="text" name="isIE" ref="isIE">\
                    </div>\
                </div>',
        props:['value'],
        data:function(){
            return {
                ue: null,
                valueProxy: null,
                isIE: false,
            }
        },
        mounted:function(){
            var ue = UE.getEditor(this.$refs.script);
            this.ue = ue;
            var self = this;
            ue.ready(function(){
                self.setContent(self.value);
                (function hackDialogUrl(ue){
                    var host = location.host;
                    host = host.split(":")[0];
                    var mapUrl = ue.ui.mapUrl;
                    if(document.domain != host){
                        for (var key in ue.ui._dialogs) {
                            if (ue.ui._dialogs.hasOwnProperty(key)) {
                                var _dialog = ue.ui._dialogs[key];
                                if(_dialog.iframeUrl){
                                    var url = _dialog.iframeUrl;
                                    _dialog.iframeUrl = url + (url.indexOf("?")>=0 ? "&" : "?")+"CROSS=1";
                                }
                            }
                        }
                    }
                })(ue);
                ue.addListener('contentChange',self.contentChange.bind(self));
                self.scrollBlur();
            });
            
        },
        watch:{
            value:function(newVal){
                if(this.valueProxy != newVal){
                    this.valueProxy = newVal;
                    this.setContent(newVal);
                }
            }
        },
        methods:{
            setContent:function(html){
                if(this.ue && this.ue.isReady){
                    this.ue.setContent(html||"");
                }
            },
            contentChange:function(){
                var html = this.ue.getContent();
                if(this.value != html){
                    this.valueProxy = html;
                    this.$emit('input',html);
                }
            },

            //针对IE浏览器 当窗口滚动时，让编辑器失去焦点
            scrollBlur:function(){
                var patt = /(msie)|(MSIE)|(rv:11.0)/g;
                this.isIE = patt.test(navigator.userAgent);
                if(this.isIE){
                    var self = this,
                        nowW = window,
                        childW = this.ue.iframe.contentWindow,
                        parentW = parent,
                        winArray = [parentW,nowW,childW]
                    winArray.forEach(function(ifr) {
                        ifr.onscroll=function(){
                            self.$refs.isIE.focus();
                        }
                    });
                }
            }
        }
    })
})