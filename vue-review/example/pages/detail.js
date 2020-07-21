define([
    'require',
    'keeySpace',
    'aInterface',
], function(require,keeySpace,aInterface) {
    'use strict';
    return {
        name:"detail",
        mixins:[keeySpace],
        template:`
            <div class="page-detail">
                <div class="msg" v-if="value">
                    <div class="nickname">{{value.nickname}}</div>
                    <div class="score-group">
                        <span>{{value.score}}</span>
                        <span>{{value.date}}</span>
                    </div>
                </div>

                <div class="block1">
                    <h5>
                        <span>相册</span>
                        <label class="addimg">
                            <input type="file" multiple @change="readFile" ref="finput">
                            <span class="ziconfont z-iconzengjia"></span>
                        </label>
                    </h5>
                    <m-swiper :config="config" :data="imgs" class="pics">
                        <template v-slot="value">
                            <div class="img-preview" :style="{'background-image':'url('+value.value.base64+')'}">
                                <span class="ziconfont z-iconguanbi" @click="del(value.index)"></span>
                            </div>
                        </template>
                    </m-swiper>

                </div>

                <div class="block2">
                    <h5>
                        <span >日志</span>
                        <span class="ziconfont z-iconjiahaozhankai" @click.stop="toEdit()"></span>
                    </h5>
                    <ul ref="dailys" >
                        <li v-for="(val,index) in dailys" :key="index" @click.stop="toEdit(value)">
                            <span>{{val.title}}</span>
                            <span class="ziconfont z-iconjianhaoshouqi" @click.stop="delDaily(index)"></span>
                        </li>
                    </ul>
                </div>
            </div>
        `,
        data(){
            return{
                config: {
                    // autoplay: true,
                    // slidesPerView: 2,
                    direction: "horizontal",
                    loop: false,
                    pagination: true,
                    navigation: true,
                    scrollbar: false
                },
                imgs:[],
                dailys: [],
                value:null
            }
        },
        computed: {
            scrollEl(){
            return this.$refs.dailys
            }
        },
        inject:['addKeepAlive','removeKeepAlive'],
        methods:{
            readFile(){
                var _this=this;
                var fd = new FormData();
                var input =this.$refs.finput,iLen =input.files.length ;
              
                for(var i=0;i<iLen;i++){
                    if (!input['value'].match(/.jpg|.gif|.png|.jpeg|.bmp/i)){　　//判断上传文件格式
                        return alert("上传的图片格式不正确，请重新选择");
                    }
                    var reader = new FileReader();
                    fd.append(i,input.files[i]);
                    reader.readAsDataURL(input.files[i]);  //转成base64
                    reader.fileName = input.files[i].name;
                    reader.onload = function(e){
                        var imgMsg = {
                            name : this.fileName,//获取文件名
                            base64 : this.result   //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
                        }
                        _this.imgs.push(imgMsg)

                    }
                }
            },
            del(index){
                this.imgs.splice(index,1)
            },
            toEdit(value){
                if(!value)value ={pid:this.value.pid };
                this.$router.push({
                    name:"edit",
                    params:value
                })
            },
            delDaily(index){
                this.dailys.splice(index,1)
            },
            loadDaily(){
                aInterface.load(this.value.pid).then(res=>{
                    console.log("拉取日志数据")
                    this.dailys =  res;
                })
            }
        },
        created(){
            
            // 设置页面缓存
            this.addKeepAlive('detail');
            // 数据已经初始化成功
            // 可以开始初始化，加快数据渲染速度 避免出现空数据
            this.value = this.$route.params.value;
            this.loadDaily();
        },
        activated(){
            this.loadDaily();
        },
        
        deactivated() {
            if(this.$route.name == 'index'){
                this.removeKeepAlive('detail');
            }
        }
        
    } 
});