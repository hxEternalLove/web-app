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
                {title:'企业管理',url:'/qiye',icon:"iconqiye"},
                {title:'财务管理',url:'/caiwu',icon:"iconcaiwu"},
                {title:'产品管理',url:'/canpin',icon:"iconchanpin"},
                {title:'订单管理',url:'/dingdan',icon:"iconorder-copy"},
                {title:'管理会员',url:'/huiyuan',icon:"iconhuiyuan"},
                {title:'数据概括',url:'/shuju',icon:"iconshuju"},


                {title:'金渡小镇',url:'/xiaozhen',icon:"iconhuaban"},
                {title:'金渡生活',url:'/shenghuo',icon:"iconhi"},
                {title:'订单',url:'/dingdan',icon:"iconicon-"},
                {title:'我的',url:'/my',icon:"icongeren"}
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
    height: 100%;
    background-color: #7f8fe8;
    color: #fff;
    font-size: 16px;
    float: left;
    text-align: left;
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
    background-color:  yellow;
}
</style>