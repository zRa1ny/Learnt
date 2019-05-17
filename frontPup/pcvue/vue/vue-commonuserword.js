define([
    'require',
    'vue',
    'jQuery',
], function(require, Vue, $) {
    'use strict';
    var commonusewords = {
        props:["comment"],
        data:function(){
            return {
                wordslist:['同意','拒绝'],
                mycomment: ""
            }
        },
        template:'<div class="common-user-words">\
                    <textarea rows="3" class="form-control comment" v-model="mycomment"></textarea>\
                    <div class="dropup">\
                        <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                            常用语\
                            <span class="caret"></span>\
                        </button>\
                        <button @click="addWord" type="button" class="btn btn-default">\
                            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\
                            添加为常用语\
                        </button>\
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">\
                            <template v-for="word in wordslist">\
                                <li><a href="javascript:void(0)" @click="setComment(word)">{{word}}</a></li>\
                            </template>\
                        </ul>\
                    </div>\
                </div>',
        created:function(){
            this.mycomment = this.$options.propsData.comment;
        },
        methods:{
            setComment:function(word){
                this.mycomment = word;
            },
            addWord:function() {
                if($.inArray(this.mycomment, this.wordslist) === -1){
                    this.wordslist.push(this.mycomment);
                }
            }
        }
    };
    Vue.component("commonwords",commonusewords);
});