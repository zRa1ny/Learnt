define([
    'require',
], function (require) {
    'use strict';
 
    return {
        data(){
            return {
                scrollTop:0
            }
        },
        computed: {
            scrollEl(){
            return this.$el
            }
        },
        mounted() {
            this.scrollEl.onscroll = ()=>{
                this.scrollTop= this.scrollEl.scrollTop;
            } 
        },
        activated() {
            // console.log("activated") 
            this.scrollEl.scrollTop= this.scrollTop;
         },
       
    };
});