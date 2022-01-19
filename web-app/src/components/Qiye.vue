<template>
    <div class="index-content">
        <!-- 路由出口 -->
        <router-view></router-view>
        <div class="footer">
            <ul>
                <li v-for="(v,i) in obj" class="tab" :key="i">
                    <router-link :to="v.url" class="sidebar-list">
                        <i class="iconfont" :class="v.icon"></i>
                        <span>{{v.title}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            obj: [
                {title:'金渡小镇',url:'/xiaozhen',icon:"iconhuaban"},
                {title:'金渡生活',url:'/shenghuo',icon:"iconhi"},
                {title:'订单',url:'/dingdan',icon:"iconicon-"},
                {title:'我的',url:'/my',icon:"icongeren"}
            ],
        };
    },
}
</script>
<style scoped>
@import '../assets/font-app/iconfont.css';
.index-content {
    position: relative;
    height: 100%;
    margin-left: 200px;
}
.banner{
    width: 90%;
    height: 150px;
    margin: 0 auto;
    border: 1px solid yellow;
}
.footer{
    position: absolute;
    
    width: 100%;
    border: 1px solid #d5d5d5;
    background-color: #a2dde3;
    padding: 5px 0;
    bottom: 0;
    left: 0;
    text-align: center;
}
.tab {
    float: left;
    width: 25%;
}
.sidebar-list i, .sidebar-list span{
    display: block;
    color: #000; 
}
.sidebar-list i {
    font-size: 22px;
}
.active i, .active span{
    color: #fe8602;
}

</style>