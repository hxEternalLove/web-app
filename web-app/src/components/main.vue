<template>
    <div class="container">
        <div class="sidebar">
            <div class="title">金渡教育后台管理</div>
            <ul>
                <li v-for="(v,i) in obj" :key="i">
                    <router-link :to="v.url" class="sidebar-list">
                        <i class="iconfont" :class="v.icon"></i><span>{{v.title}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="sidebar-content">
            <!-- 路由出口 -->
            <router-view />  
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            n:1,
            obj:[
                {title:'首页',url:'/home',icon:"iconshouye1"},
                {title:'企业小镇App',url:'/qiye',icon:"iconqiye"},
                {title:'QQ空间时光轴',url:'/caiwu',icon:"iconcaiwu"},
                {title:'产品管理',url:'/canpin',icon:"iconchanpin"},
                {title:'订单管理',url:'/dingdanguanli',icon:"iconorder-copy"},
                {title:'管理会员',url:'/huiyuan',icon:"iconhuiyuan"},
                {title:'数据概括',url:'/shuju',icon:"iconshuju"},
            ],
        }
    },
    methods:{   //管理函数
        action(i){
            this.n = i;
        }
    },
    
}
</script>
<style scoped>
/* 引入字体图标 */
@import '../assets/font/iconfont.css';
.container {
    width: 100%;
    height: 100vh;
}
.sidebar {
    width: 200px;
    min-height: 100%;
    background-color: #7f8fe8;
    color: #fff;
    font-size: 16px;
    /* float: left; */
    text-align: left;
    position: fixed;
    left: 0;top: 0;

}
.title {
    padding: 15px;
}
.sidebar-list {
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    display: block;
    padding: 15px;  
    cursor:pointer;
}
.sidebar li span {
    padding-left: 20px;
}
.sidebar li i {   
    font-size: 18px;
}
.active, .sidebar li:hover{
    background-color: #a1acf1;
}
/* sidebar结束 */
/* sidebar-content开始 */
.sidebar-content {
    height: 100%;
}
</style>