define([
    'require',
    'aInterface'
], function (require, aInterface) {
    'use strict';
    return {
        name: "edit",
        template: `
            <div class="edit">
                    <div class="form-control">
                        <label >
                            <span>标题：</span>
                            <input type="text" v-model="main.title">
                        </label>
                    </div>
                    <div class="form-control">
                        <label >
                            <span>内容：</span>
                            <textarea v-model="main.article" rows="10"></textarea>
                        </label>
                    </div>
                    <div @click="save" class="btn" >保存</div>
            </div>
        `,
        data () {
            return {
                main: {
                    pid: "",
                    id: "",
                    title: "",
                    article: ""
                }
            }
        },
        methods: {
            save () {
                aInterface.save(this.main).then(res => {
                    if (res.success) {
                        this.$router.go(-1)
                    }
                })
            }
        },
        created () {
            // 没有挂载$el
            this.main = this.$route.params;
           
        },


    }
});