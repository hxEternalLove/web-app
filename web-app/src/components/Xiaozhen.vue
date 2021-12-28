<template>
    <div class="home">
         <!-- 轮播功能 -->
        <div class="banner">
            <img v-for="(v,i) in items" :key="i" :src="v" v-show="cur==i"/>
            <div class="banner-circle">
                <ul>
                    <li v-for="(v,i) in items" :key="i" :class="{'selected':cur==i}"></li>   
                </ul> 
            </div>
        </div>
    </div>
</template>
<script>
import img1 from '@/assets/images/2.jpg'

export default {
  data(){
    return {
      img1,
      cur:0, //初始化
      items:[
        require('@/assets/images/1.jpg'),
        require('@/assets/images/2.jpg'),
        require('@/assets/images/1.jpg'),
        require('@/assets/images/2.jpg')
      ],
      timer:null  //定时器初始化
    }
  },
  //props:['items'],   //获取父传的参数
  methods:{
    autoPlay(){
      this.timer = setInterval(this.play,2000);  //定时器
    },
    play(){
      this.cur ++;
      if(this.cur == this.items.length){
        this.cur = 0;
      }
    }
  },
  mounted:function(){    //生命周期，挂载完成
    this.autoPlay()
  },
  destroyed(){  //生命周期，销毁
    clearInterval(this.timer);   //清除定时器
  }
}
</script>
<style scoped>
.home{
    width: 720px;
    margin: 0 auto;
    overflow-x: hidden;
}


.banner {
    position: relative;
    float:left;
}
.banner .banner-circle {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    color: #fff;
}
.banner .banner-circle li{
    display:inline-block;
    background: rgba(0,0,0,.3);
    border-radius: 50%;
    padding:5px;
    margin:2px;
}
.banner .banner-circle ul {
    text-align: center;
}
.banner .banner-circle .selected {
    background: rgba(0,0,0,.8);
}
.banner img {
    max-width: 100%;
    margin: 0;
    padding: 0;
}
</style>