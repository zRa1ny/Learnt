define([
    'require',
    'vue'
], function (require, Vue) {
    'use strict';
    
    return {
        setSession(pid,data){
            sessionStorage.setItem('z_data'+ pid,JSON.stringify(data))
        },
        getSession(pid){
            return JSON.parse(sessionStorage.getItem('z_data'+pid)) 
        },
        save (value) {
            return new Promise((res, rej) => {
                try {

                    var data = this.getSession(value.pid)?this.getSession(value.pid):[];
                    if (data.every(val => {
                        if (value.id === val.id) {
                            val.titie = value.title;
                            val.article = value.article;
                            return false
                        }
                        return true
                    })) {
                        value.id = data.length;
                        data.push(value);
                        this.setSession(value.pid,data)
                    }
                   
                    res({
                        success: 1,
                        data: "保存成功"
                    })
                } catch (error) {
                    rej(error)
                }


            })
        },
        load (pid) {
            return Promise.resolve(this.getSession(pid))
        }
    }
});